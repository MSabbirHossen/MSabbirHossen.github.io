import { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FaPaperPlane, FaTimes } from 'react-icons/fa';
import Button from './Button';
import Card from './Card';
import Typography from './Typography';

export default function AIChatModal({
  isOpen,
  messages,
  input,
  isTyping,
  quickPrompts,
  onClose,
  onChange,
  onSend,
}) {
  const shouldReduceMotion = useReducedMotion();
  const messageListRef = useRef(null);
  const dialogRef = useRef(null);
  const inputRef = useRef(null);
  const previousActiveElementRef = useRef(null);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages, isTyping, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      previousActiveElementRef.current?.focus?.();
      return undefined;
    }

    previousActiveElementRef.current = document.activeElement;
    window.requestAnimationFrame(() => {
      inputRef.current?.focus();
    });

    return undefined;
  }, [isOpen]);

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.stopPropagation();
      onClose();
      return;
    }

    if (event.key !== 'Tab' || !dialogRef.current) {
      return;
    }

    const focusableElements = dialogRef.current.querySelectorAll(
      'button, textarea, [href], input, select, [tabindex]:not([tabindex="-1"])'
    );
    const focusables = Array.from(focusableElements).filter(
      (element) => !element.hasAttribute('disabled')
    );

    if (!focusables.length) {
      return;
    }

    const firstFocusable = focusables[0];
    const lastFocusable = focusables[focusables.length - 1];
    const isShiftTab = event.shiftKey;

    if (isShiftTab && document.activeElement === firstFocusable) {
      event.preventDefault();
      lastFocusable.focus();
    } else if (!isShiftTab && document.activeElement === lastFocusable) {
      event.preventDefault();
      firstFocusable.focus();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-40 flex items-end justify-center bg-slate-950/60 px-4 py-6 backdrop-blur-sm sm:items-center"
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
          onMouseDown={onClose}
        >
          <motion.div
            ref={dialogRef}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: 'easeOut' }}
            onMouseDown={(event) => event.stopPropagation()}
            onKeyDown={handleKeyDown}
            role="dialog"
            aria-modal="true"
            aria-labelledby="ai-chat-title"
            aria-describedby="ai-chat-description"
            tabIndex={-1}
            className="w-full max-w-md"
          >
            <Card className="flex max-h-[80vh] flex-col overflow-hidden p-0">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div>
                  <Typography id="ai-chat-title" variant="subtitle" className="text-slate-100">
                    AI Portfolio Assistant
                  </Typography>
                  <Typography id="ai-chat-description" variant="caption" className="text-slate-400">
                    Mock assistant for future integration
                  </Typography>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full p-2 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
                  aria-label="Close AI assistant"
                >
                  <FaTimes className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <div ref={messageListRef} className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        message.role === 'user'
                          ? 'bg-accent-primary text-white'
                          : 'bg-white/5 text-slate-200'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="rounded-2xl bg-white/5 px-4 py-3 text-sm text-slate-300">
                      Typing...
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-white/10 px-5 py-4">
                <div className="mb-3 flex flex-wrap gap-2">
                  {quickPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => onSend(prompt)}
                      className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-accent-primary/40 hover:text-white"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>

                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    onSend();
                  }}
                  className="flex items-end gap-3"
                >
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(event) => onChange(event.target.value)}
                    rows={2}
                    placeholder="Ask about the portfolio..."
                    className="min-h-[52px] flex-1 resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20"
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    size="icon"
                    icon={FaPaperPlane}
                    ariaLabel="Send message"
                  />
                </form>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
