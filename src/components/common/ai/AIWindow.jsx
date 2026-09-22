import { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FaPlus, FaRobot, FaTimes } from 'react-icons/fa';
import Card from '../Card';
import Typography from '../Typography';
import MessageList from './MessageList';
import InputArea from './InputArea';
import TypingIndicator from './TypingIndicator';

export default function AIWindow({
  isOpen,
  messages,
  input,
  isTyping,
  quickPrompts,
  hasConversation,
  announcement,
  onClose,
  onNewChat,
  onChange,
  onSend,
  onAction,
}) {
  const shouldReduceMotion = useReducedMotion();
  const messageListRef = useRef(null);
  const dialogRef = useRef(null);
  const inputRef = useRef(null);
  const previousActiveElementRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages, isTyping, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      previousActiveElementRef.current?.focus?.();
      return;
    }

    previousActiveElementRef.current = document.activeElement;
    window.requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
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
          className="fixed inset-0 z-40 flex items-end justify-center bg-slate-950/60 px-2 py-2 backdrop-blur-sm sm:items-center sm:px-4 sm:py-6"
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
            id="ai-assistant-dialog"
            aria-modal="true"
            aria-labelledby="ai-chat-title"
            aria-describedby="ai-chat-description"
            tabIndex={-1}
            className="w-full max-w-xl"
          >
            <Card
              className="flex h-[calc(100dvh-0.75rem)] max-h-[calc(100dvh-0.75rem)] flex-col overflow-hidden p-0 sm:h-auto sm:max-h-[84vh]"
              style={{
                paddingBottom: 'env(safe-area-inset-bottom)',
              }}
            >
              <div className="flex items-start justify-between border-b border-default px-5 py-4">
                <div className="flex items-start gap-3">
                  <span className="relative mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-primary to-accent-secondary text-white shadow-md">
                    <FaRobot className="h-4 w-4" aria-hidden="true" />
                    <span
                      className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-surface bg-emerald-400"
                      aria-label="Online"
                    />
                  </span>
                  <div>
                    <Typography id="ai-chat-title" variant="subtitle" className="text-primary">
                      Portfolio Guide
                    </Typography>
                    <p className="mt-0.5 text-[11px] font-medium text-emerald-500">Online guide</p>
                    <Typography id="ai-chat-description" variant="caption" className="text-muted">
                      Your guided recruiter view of projects, skills, and contact options.
                    </Typography>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={onNewChat}
                    className="rounded-full p-2 text-muted transition-colors hover:bg-accent-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/40 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Start a new chat"
                    title="New chat"
                  >
                    <FaPlus className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-full p-2 text-muted transition-colors hover:bg-accent-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/40"
                    aria-label="Close Portfolio Guide"
                  >
                    <FaTimes className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <MessageList
                messages={messages}
                isTyping={isTyping}
                onAction={onAction}
                quickPrompts={quickPrompts}
                hasConversation={hasConversation}
                messageListRef={messageListRef}
                typingIndicator={<TypingIndicator />}
              />

              <div
                className="border-t border-default bg-surface/70 px-4 pb-4 pt-3 sm:px-5"
                style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
              >
                <InputArea
                  input={input}
                  isTyping={isTyping}
                  onChange={onChange}
                  onSend={onSend}
                  inputRef={inputRef}
                />
              </div>

              <div className="sr-only" aria-live="polite" aria-atomic="true">
                {announcement}
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
