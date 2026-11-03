import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from '../../../i18n';

export default function TypingIndicator() {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  const typingText = t('ai.typing', {}, 'Assistant is typing');
  const thinkingText = t('ai.thinking', {}, 'Thinking');

  return (
    <div className="flex justify-start" role="status" aria-live="polite" aria-label={typingText}>
      <div className="surface inline-flex items-center gap-2 rounded-2xl border border-default px-4 py-3 text-sm text-muted">
        <span className="sr-only">{typingText}</span>
        <span aria-hidden="true">{thinkingText}</span>
        <div className="inline-flex items-center gap-1" aria-hidden="true">
          {[0, 1, 2].map((dot) => (
            <motion.span
              key={dot}
              className="h-1.5 w-1.5 rounded-full bg-accent-primary"
              animate={
                shouldReduceMotion ? { opacity: 0.6 } : { opacity: [0.2, 1, 0.2], y: [0, -2, 0] }
              }
              transition={{
                duration: shouldReduceMotion ? 0 : 1,
                repeat: shouldReduceMotion ? 0 : Number.POSITIVE_INFINITY,
                delay: shouldReduceMotion ? 0 : dot * 0.14,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
