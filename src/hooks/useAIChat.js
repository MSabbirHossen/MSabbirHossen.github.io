import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { assistantPortfolioData } from '../data/assistantPortfolioData';
import { createKnowledgeEngine } from '../lib/ai/knowledgeEngine';
import { generateAIResponse } from '../lib/ai/responseBuilder';

const WELCOME_MESSAGE = {
  id: 1,
  role: 'assistant',
  content:
    "Hi! I'm Sabbir's Portfolio Guide. I can help you discover projects, evaluate technical depth, and quickly find contact options.",
  followUps: ['Best projects', 'Show experience', 'How can I contact Sabbir?'],
};

const QUICK_ACTIONS = [
  { id: 'quick-projects', kind: 'prompt', label: '🚀 Best Projects', prompt: 'Best projects' },
  {
    id: 'quick-experience',
    kind: 'prompt',
    label: '💼 Experience',
    prompt: 'Show experience',
  },
  { id: 'quick-skills', kind: 'prompt', label: '🛠 Skills', prompt: 'Show skills' },
  {
    id: 'quick-github',
    kind: 'prompt',
    label: '📈 GitHub Highlights',
    prompt: 'Show GitHub highlights',
  },
  { id: 'quick-education', kind: 'prompt', label: '🎓 Education', prompt: 'Show education' },
  {
    id: 'quick-certs',
    kind: 'prompt',
    label: '🏆 Certifications',
    prompt: 'Show certifications',
  },
  {
    id: 'quick-contact',
    kind: 'prompt',
    label: '📞 Contact',
    prompt: 'How can I contact Sabbir?',
  },
  { id: 'quick-resume', kind: 'prompt', label: '📄 Resume', prompt: 'Show resume' },
];

const CHAT_HISTORY_KEY = 'portfolio-guide-history';
const MAX_HISTORY_MESSAGES = 24;
const CONTEXT_MESSAGES = 8;

function createMessage(role, content, extras = {}) {
  return {
    id: Date.now() + Math.random(),
    role,
    content,
    ...extras,
  };
}

export default function useAIChat() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => loadChatHistory());
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const [memory, setMemory] = useState({
    lastIntent: null,
    lastProjectId: null,
    lastTopic: null,
  });
  const generationRef = useRef(0);
  const messagesRef = useRef(messages);
  const pendingScrollTargetRef = useRef(null);

  const knowledge = useMemo(() => createKnowledgeEngine(assistantPortfolioData), []);

  useEffect(() => {
    messagesRef.current = messages;

    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(
        CHAT_HISTORY_KEY,
        JSON.stringify(messages.slice(-MAX_HISTORY_MESSAGES))
      );
    }
  }, [messages]);

  const openChat = useCallback(() => {
    setIsOpen(true);
    setAnnouncement('Portfolio guide opened.');
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
    setAnnouncement('Portfolio guide closed.');
  }, []);

  const toggleChat = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const startNewChat = useCallback(() => {
    generationRef.current += 1;
    messagesRef.current = [WELCOME_MESSAGE];
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem(CHAT_HISTORY_KEY);
    }
    setMessages([WELCOME_MESSAGE]);
    setInput('');
    setIsTyping(false);
    setMemory({
      lastIntent: null,
      lastProjectId: null,
      lastTopic: null,
    });
    setAnnouncement('New portfolio guide chat started.');
  }, []);

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);

    if (!element) {
      return false;
    }

    element.scrollIntoView({ behavior: 'smooth', block: 'start' });

    return true;
  }, []);

  const navigateToSection = useCallback(
    (sectionId) => {
      if (location.pathname === '/') {
        if (!scrollToSection(sectionId)) {
          pendingScrollTargetRef.current = sectionId;
        }
        return;
      }

      pendingScrollTargetRef.current = sectionId;
      navigate('/');
    },
    [location.pathname, navigate, scrollToSection]
  );

  const runAction = useCallback(
    async (actionConfig) => {
      if (!actionConfig) {
        return;
      }

      if (actionConfig.kind === 'prompt') {
        return;
      }

      if (actionConfig.kind === 'scroll' && actionConfig.target) {
        navigateToSection(actionConfig.target);
        setIsOpen(false);
        setAnnouncement(`Navigating to ${actionConfig.target} section.`);
        return;
      }

      if (actionConfig.kind === 'route' && actionConfig.target) {
        navigate(actionConfig.target);
        setIsOpen(false);
        setAnnouncement('Opened requested portfolio page.');
        return;
      }

      if (actionConfig.kind === 'external' && actionConfig.target) {
        window.open(actionConfig.target, '_blank', 'noopener,noreferrer');
        setIsOpen(false);
        setAnnouncement('Opened external link in a new tab.');
        return;
      }

      if (actionConfig.kind === 'copy-email' && actionConfig.value) {
        try {
          await navigator.clipboard.writeText(actionConfig.value);
          setAnnouncement('Email copied to clipboard.');
        } catch {
          setAnnouncement('Unable to copy email automatically.');
        }
      }
    },
    [navigate, navigateToSection]
  );

  const sendMessage = useCallback(
    async (messageText) => {
      const text = (messageText ?? input).trim();

      if (!text || isTyping) {
        return;
      }

      const userMessage = createMessage('user', text);
      const assistantMessageId = createMessage('assistant', '').id;
      const conversation = messagesRef.current
        .filter((message) => message.content)
        .slice(-CONTEXT_MESSAGES)
        .map(({ role, content }) => ({ role, content }));

      setMessages((currentMessages) => [
        ...currentMessages,
        userMessage,
        createMessage('assistant', '', { id: assistantMessageId, isStreaming: true }),
      ]);
      setInput('');
      setIsTyping(true);
      setAnnouncement(`You said: ${text}`);

      const generationId = ++generationRef.current;

      try {
        const response = await generateAIResponse({
          message: text,
          knowledge,
          portfolio: assistantPortfolioData,
          memory,
          conversation,
        });

        await streamResponse(response.text, (content) => {
          if (generationId !== generationRef.current) {
            return;
          }

          setMessages((currentMessages) =>
            currentMessages.map((message) =>
              message.id === assistantMessageId ? { ...message, content } : message
            )
          );
        });

        if (generationId !== generationRef.current) {
          return;
        }

        setMessages((currentMessages) =>
          currentMessages.map((message) =>
            message.id === assistantMessageId
              ? {
                  ...message,
                  isStreaming: false,
                  cards: response.cards ?? [],
                  actions: response.actions ?? [],
                  followUps: response.followUps ?? [],
                  intent: response.intent,
                }
              : message
          )
        );
        setMemory((currentMemory) => ({
          ...currentMemory,
          lastIntent: response.intent,
          ...(response.memory ?? {}),
        }));
        setAnnouncement(`Assistant replied: ${response.text}`);
      } catch {
        if (generationId !== generationRef.current) {
          return;
        }

        const fallbackText =
          'I ran into an issue preparing that response. Please try again, or use the quick actions to navigate projects, skills, or contact details.';

        setMessages((currentMessages) =>
          currentMessages.map((message) =>
            message.id === assistantMessageId
              ? {
                  ...message,
                  content: fallbackText,
                  isStreaming: false,
                  actions: [
                    {
                      id: 'prompt-best-projects-fallback',
                      kind: 'prompt',
                      label: 'Best Projects',
                      prompt: 'Best projects',
                    },
                    {
                      id: 'prompt-contact-fallback',
                      kind: 'prompt',
                      label: 'Contact',
                      prompt: 'How can I contact Sabbir?',
                    },
                  ],
                }
              : message
          )
        );
        setAnnouncement('Assistant could not complete that response.');
      } finally {
        setIsTyping(false);
      }
    },
    [input, isTyping, knowledge, memory]
  );

  const triggerAction = useCallback(
    async (actionConfig) => {
      if (!actionConfig) {
        return;
      }

      if ((actionConfig.kind === 'prompt' || actionConfig.prompt) && actionConfig.prompt) {
        await sendMessage(actionConfig.prompt);
        return;
      }

      await runAction(actionConfig);
    },
    [runAction, sendMessage]
  );

  useEffect(() => {
    if (location.pathname !== '/' || !pendingScrollTargetRef.current) {
      return;
    }

    const target = pendingScrollTargetRef.current;
    pendingScrollTargetRef.current = null;

    window.requestAnimationFrame(() => {
      scrollToSection(target);
    });
  }, [location.pathname, scrollToSection]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const isMetaShortcut = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k';

      if (isMetaShortcut) {
        event.preventDefault();
        openChat();
        return;
      }

      if (event.key === 'Escape' && isOpen) {
        closeChat();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);

      generationRef.current += 1;
    };
  }, [closeChat, isOpen, openChat]);

  const quickPrompts = useMemo(() => QUICK_ACTIONS, []);
  const featuredProjectHighlights = useMemo(
    () =>
      assistantPortfolioData.featuredProjects.slice(0, 3).map((project) => ({
        id: `featured-${project.id}`,
        label: project.title,
        prompt: `Tell me about ${project.title}`,
      })),
    []
  );
  const recentWorkHighlights = useMemo(
    () =>
      assistantPortfolioData.currentFocus.slice(0, 3).map((item) => ({
        id: `focus-${item.title.toLowerCase().replace(/\s+/g, '-')}`,
        label: item.title,
        prompt: `Tell me about ${item.title}`,
      })),
    []
  );
  const hasConversation = messages.some((message) => message.role === 'user');

  return {
    isOpen,
    messages,
    input,
    isTyping,
    announcement,
    quickPrompts,
    featuredProjectHighlights,
    recentWorkHighlights,
    hasConversation,
    closeChat,
    openChat,
    toggleChat,
    startNewChat,
    setInput,
    sendMessage,
    triggerAction,
  };
}

async function streamResponse(text, onChunk) {
  const words = text.split(/(\s+)/).filter(Boolean);
  let streamedText = '';

  for (const word of words) {
    streamedText += word;
    onChunk(streamedText);
    await new Promise((resolve) => window.setTimeout(resolve, 18));
  }
}

function loadChatHistory() {
  if (typeof window === 'undefined') {
    return [WELCOME_MESSAGE];
  }

  try {
    const savedMessages = JSON.parse(window.sessionStorage.getItem(CHAT_HISTORY_KEY));

    return Array.isArray(savedMessages) && savedMessages.length > 0
      ? savedMessages
      : [WELCOME_MESSAGE];
  } catch {
    return [WELCOME_MESSAGE];
  }
}
