import { memo } from 'react';
import MessageBubble from './MessageBubble';

function EmptyState({ quickPrompts, onAction }) {
  const starterPrompts = quickPrompts.filter((prompt) =>
    ['quick-projects', 'quick-skills', 'quick-experience', 'quick-contact'].includes(prompt.id)
  );

  return (
    <section
      className="space-y-4 rounded-2xl border border-default bg-surface/70 p-4"
      aria-label="Popular assistant questions"
    >
      <h3 className="text-sm font-semibold text-primary">Start with popular recruiter questions</h3>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2" aria-label="Starter prompts">
        {starterPrompts.map((prompt) => (
          <button
            key={prompt.id}
            type="button"
            onClick={() => onAction(prompt)}
            className="rounded-xl border border-default px-3 py-2 text-left text-xs font-medium text-secondary transition-colors hover:border-accent-primary/40 hover:bg-accent-primary/5 hover:text-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/35"
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
  quickPrompts,
  hasConversation,
  messageListRef,
  typingIndicator,
}) {
  return (
    <div
      ref={messageListRef}
      className="flex-1 space-y-3 overflow-y-auto px-4 py-4 sm:px-5"
      role="log"
      aria-live="polite"
      aria-relevant="additions text"
      aria-label="Conversation"
    >
      {!hasConversation && <EmptyState quickPrompts={quickPrompts} onAction={onAction} />}

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
