import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FaRobot } from 'react-icons/fa';

export default function AIButton({ onClick, isOpen }) {
  const shouldReduceMotion = useReducedMotion();
  const [showAttention, setShowAttention] = useState(false);

  useEffect(() => {
    if (window.sessionStorage.getItem('portfolio-guide-attention-shown')) {
      return undefined;
    }

    window.sessionStorage.setItem('portfolio-guide-attention-shown', 'true');
    const timeoutId = window.setTimeout(() => setShowAttention(true), 3500);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? 'Close Portfolio Guide' : 'Open Portfolio Guide'}
      aria-expanded={isOpen}
      aria-controls="ai-assistant-dialog"
      aria-keyshortcuts="Control+K Meta+K"
      className={`fixed bottom-5 left-4 z-40 inline-flex items-center gap-3 rounded-full border border-default surface px-4 py-3 text-sm font-semibold text-primary shadow-2xl shadow-black/20 backdrop-blur-xl transition-colors hover:bg-accent-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-light-bg dark:focus-visible:ring-offset-dark-bg sm:bottom-6 sm:left-6 ${showAttention && !shouldReduceMotion ? 'animate-[pulse_1.5s_ease-in-out_1]' : ''}`}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: 'easeOut' }}
      whileHover={shouldReduceMotion ? undefined : { y: -3 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary text-white">
        <FaRobot className="h-4 w-4" aria-hidden="true" />
      </span>
      <span className="hidden sm:inline">Portfolio Guide</span>
      <span className="sr-only">Shortcut: Control or Command plus K</span>
    </motion.button>
  );
}
