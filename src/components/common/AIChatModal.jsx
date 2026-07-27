import AIWindow from './ai/AIWindow';

export default function AIChatModal({
  isOpen,
  messages,
  input,
  isTyping,
  quickPrompts,
  featuredProjectHighlights,
  recentWorkHighlights,
  hasConversation,
  announcement,
  onClose,
  onChange,
  onSend,
  onAction,
}) {
  return (
    <AIWindow
      isOpen={isOpen}
      messages={messages}
      input={input}
      isTyping={isTyping}
      quickPrompts={quickPrompts}
      featuredProjectHighlights={featuredProjectHighlights}
      recentWorkHighlights={recentWorkHighlights}
      hasConversation={hasConversation}
      announcement={announcement}
      onClose={onClose}
      onChange={onChange}
      onSend={onSend}
      onAction={onAction}
    />
  );
}
