import { useEffect, useRef } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import Button from '../Button';
import { useTranslation } from '../../../i18n';

const MAX_CHARS = 600;

export default function InputArea({ input, isTyping, onChange, onSend, inputRef }) {
  const { t, isRTL } = useTranslation();
  const localRef = useRef(null);
  const textAreaRef = inputRef || localRef;
  const trimmedLength = input.trim().length;

  useEffect(() => {
    if (!textAreaRef.current) {
      return;
    }

    textAreaRef.current.style.height = 'auto';
    textAreaRef.current.style.height = `${Math.min(textAreaRef.current.scrollHeight, 180)}px`;
  }, [input, textAreaRef]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      onSend();
    }
  };

  const placeholderText = t(
    'ai.placeholder',
    {},
    'Ask about projects, skills, experience, or contact...'
  );

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSend();
      }}
      className="space-y-2"
      aria-label={t('ai.sendAria', {}, 'Message input')}
    >
      <div className="flex items-end gap-3">
        <label htmlFor="assistant-input" className="sr-only">
          {placeholderText}
        </label>
        <textarea
          id="assistant-input"
          ref={textAreaRef}
          value={input}
          onChange={(event) => onChange(event.target.value.slice(0, MAX_CHARS))}
          onKeyDown={handleKeyDown}
          rows={2}
          placeholder={placeholderText}
          className="min-h-13 max-h-45 flex-1 resize-none rounded-2xl border border-default bg-surface px-4 py-3 text-sm text-primary outline-none placeholder:text-muted focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20"
          aria-describedby="assistant-input-help assistant-input-count"
        />
        <Button
          type="submit"
          variant="primary"
          size="icon"
          icon={FaPaperPlane}
          className={isRTL ? '[&>svg]:-scale-x-100' : ''}
          ariaLabel={t('ai.sendAria', {}, 'Send message')}
          disabled={trimmedLength === 0 || isTyping}
          loading={isTyping}
        />
      </div>

      <div
        className="flex items-center justify-between text-[11px] text-muted"
        id="assistant-input-help"
      >
        <p>{t('ai.inputHelp', {}, 'Enter sends. Shift+Enter adds a new line.')}</p>
        <p className="hidden items-center gap-1 sm:flex">
          <kbd className="rounded border border-default bg-surface px-1.5 py-0.5 font-mono text-[10px]">
            {t('ai.shortcutKey', {}, 'Ctrl/Cmd + K')}
          </kbd>
        </p>
        <p id="assistant-input-count" aria-live="polite">
          {input.length > 300 ? `${input.length}/${MAX_CHARS}` : ''}
        </p>
      </div>
    </form>
  );
}
