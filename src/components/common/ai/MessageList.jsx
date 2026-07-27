import { memo } from 'react';
import { FaGithub, FaRegFilePdf } from 'react-icons/fa';
import MessageBubble from './MessageBubble';
import QuickActions from './QuickActions';
import Button from '../Button';

function EmptyState({ quickPrompts, featuredProjectHighlights, recentWorkHighlights, onAction }) {
  return (
    <section
      className="space-y-4 rounded-2xl border border-default bg-surface/70 p-4"
      aria-label="Popular assistant questions"
    >
      <h3 className="text-sm font-semibold text-primary">Start with popular recruiter questions</h3>
      <QuickActions actions={quickPrompts} onAction={onAction} label="Popular questions" />
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <Button
          size="sm"
          variant="outline"
          icon={FaRegFilePdf}
          onClick={() => onAction({ kind: 'prompt', prompt: 'Show resume' })}
          className="justify-start"
        >
          Open Resume
        </Button>
        <Button
          size="sm"
          variant="outline"
          icon={FaGithub}
          onClick={() => onAction({ kind: 'prompt', prompt: 'Show GitHub highlights' })}
          className="justify-start"
        >
          GitHub Highlights
        </Button>
      </div>

      <div className="space-y-2" aria-label="Featured projects">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">
          Featured projects
        </p>
        <div className="flex flex-wrap gap-2">
          {featuredProjectHighlights.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onAction({ kind: 'prompt', prompt: item.prompt })}
              className="rounded-full border border-default px-3 py-1 text-xs text-secondary transition-colors hover:border-accent-primary/40 hover:text-accent-primary"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2" aria-label="Recent work">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">Recent work</p>
        <div className="flex flex-wrap gap-2">
          {recentWorkHighlights.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onAction({ kind: 'prompt', prompt: item.prompt })}
              className="rounded-full border border-default px-3 py-1 text-xs text-secondary transition-colors hover:border-accent-primary/40 hover:text-accent-primary"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function MessageList({
  messages,
  isTyping,
  onAction,
  quickPrompts,
  featuredProjectHighlights,
  recentWorkHighlights,
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
      {!hasConversation && (
        <EmptyState
          quickPrompts={quickPrompts}
          featuredProjectHighlights={featuredProjectHighlights}
          recentWorkHighlights={recentWorkHighlights}
          onAction={onAction}
        />
      )}

      {messages.map((message, index) => {
        const isLatestAssistant =
          message.role === 'assistant' && index === messages.length - 1 && !isTyping;

        return (
          <MessageBubble
            key={message.id}
            message={message}
            onAction={onAction}
            showInteractiveControls={isLatestAssistant}
          />
        );
      })}

      {isTyping && typingIndicator}
    </div>
  );
}

export default memo(MessageList);
