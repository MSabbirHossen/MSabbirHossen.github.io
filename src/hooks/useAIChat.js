import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { assistantPortfolioData } from '../data/assistantPortfolioData';
import { createKnowledgeEngine } from '../lib/ai/knowledgeEngine';
import { generateAIResponse } from '../lib/ai/responseBuilder';

const WELCOME_MESSAGE = {
  id: 1,
  role: 'assistant',
  content:
    "Hi! I'm Sabbir's AI Portfolio Assistant. I can help you discover projects, evaluate technical depth, and quickly find contact options.",
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
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const [memory, setMemory] = useState({
    lastIntent: null,
    lastProjectId: null,
    lastTopic: null,
  });
  const timeoutRef = useRef(null);
  const pendingScrollTargetRef = useRef(null);

  const knowledge = useMemo(() => createKnowledgeEngine(assistantPortfolioData), []);

  const openChat = useCallback(() => {
    setIsOpen(true);
    setAnnouncement('Portfolio assistant opened.');
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
    setAnnouncement('Portfolio assistant closed.');
  }, []);

  const toggleChat = useCallback(() => {
    setIsOpen((value) => !value);
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

      setMessages((currentMessages) => [...currentMessages, userMessage]);
      setInput('');
      setIsTyping(true);
      setAnnouncement(`You said: ${text}`);

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(async () => {
        try {
          const response = await generateAIResponse({
            message: text,
            knowledge,
            portfolio: assistantPortfolioData,
            memory,
          });

          const assistantMessage = createMessage('assistant', response.text, {
            cards: response.cards ?? [],
            actions: response.actions ?? [],
            followUps: response.followUps ?? [],
            intent: response.intent,
          });

          setMessages((currentMessages) => [...currentMessages, assistantMessage]);
          setMemory((currentMemory) => ({
            ...currentMemory,
            lastIntent: response.intent,
            ...(response.memory ?? {}),
          }));
          setAnnouncement(`Assistant replied: ${response.text}`);
        } catch {
          const fallbackText =
            'I ran into an issue preparing that response. Please try again, or use the quick actions to navigate projects, skills, or contact details.';

          setMessages((currentMessages) => [
            ...currentMessages,
            createMessage('assistant', fallbackText, {
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
            }),
          ]);
          setAnnouncement('Assistant could not complete that response.');
        } finally {
          setIsTyping(false);
        }
      }, 550);
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

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
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
    setInput,
    sendMessage,
    triggerAction,
  };
}
