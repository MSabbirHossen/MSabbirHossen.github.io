import { memo } from 'react';
import MessageBubble from './MessageBubble';
import { useTranslation } from '../../../i18n';

function EmptyState({ onAction }) {
  const { t } = useTranslation();

  const starterPrompts = [
    {
      id: 'starter-reportbd',
      label: t('ai.promptReportBd', {}, '🌟 Tell me about Report BD (Latest Project)'),
      prompt: 'Tell me about Report BD',
    },
    {
      id: 'starter-why-hire',
      label: t('ai.promptWhyHire', {}, '💡 Why consider Sabbir for your team?'),
      prompt: 'Why should we hire Sabbir?',
    },
    {
      id: 'starter-mern',
      label: t('ai.promptMern', {}, '⚡ Explore MERN Stack & Architecture'),
      prompt: 'Show MERN stack projects',
    },
    {
      id: 'starter-ts-zod',
      label: t('ai.promptTsZod', {}, '🛠 TypeScript & Schema Validation (Zod)'),
      prompt: 'Do you use TypeScript and Zod?',
    },
    {
      id: 'starter-llms',
      label: t('ai.promptLlms', {}, '🤖 View Machine-Readable Profile (llms.txt)'),
      prompt: 'Tell me about llms.txt',
    },
    {
      id: 'starter-whatsapp',
      label: t('ai.promptWhatsapp', {}, '📞 Chat on WhatsApp & Contact Options'),
      prompt: 'How can I contact Sabbir on WhatsApp?',
    },
  ];

  return (
    <section
      className="space-y-3 rounded-2xl border border-default bg-surface/70 p-4"
      aria-label={t('ai.suggestedActions', {}, 'Suggested Recruiter Questions')}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted">
          {t('ai.suggestedActions', {}, 'Suggested Recruiter Questions')}
        </h3>
        <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-500">
          {t('ai.guideTitle', {}, 'Portfolio Guide')}
        </span>
      </div>
      <div
        className="grid grid-cols-1 gap-2 sm:grid-cols-2"
        aria-label={t('ai.suggestedActions', {}, 'Starter prompts')}
      >
        {starterPrompts.map((prompt) => (
          <button
            key={prompt.id}
            type="button"
            onClick={() => onAction({ kind: 'prompt', prompt: prompt.prompt, label: prompt.label })}
            className="rounded-xl border border-default p-2.5 text-start text-xs font-medium text-secondary transition-colors hover:border-accent-primary/40 hover:bg-accent-primary/5 hover:text-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/35"
          >
            {prompt.label}
          </button>
        ))}
      </div>
    </section>
  );
}

function MessageList({
  messages,
  isTyping,
  onAction,
  hasConversation,
  messageListRef,
  typingIndicator,
}) {
  const { t } = useTranslation();

  return (
    <div
      ref={messageListRef}
      className="flex-1 space-y-3 overflow-y-auto px-4 py-4 sm:px-5"
      role="log"
      aria-live="polite"
      aria-relevant="additions text"
      aria-label={t('ai.guideTitle', {}, 'Conversation')}
    >
      {!hasConversation && <EmptyState onAction={onAction} />}

      {messages.map((message, index) => {
        const isLatestAssistant =
          message.role === 'assistant' && index === messages.length - 1 && !isTyping;

        return (
          <MessageBubble
            key={message.id}
            message={message}
            onAction={onAction}
            showInteractiveControls={isLatestAssistant && hasConversation}
          />
        );
      })}

      {isTyping && typingIndicator}
    </div>
  );
}

export default memo(MessageList);
