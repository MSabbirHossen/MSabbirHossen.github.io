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
  onNewChat,
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
      onNewChat={onNewChat}
      onChange={onChange}
      onSend={onSend}
      onAction={onAction}
    />
  );
}
