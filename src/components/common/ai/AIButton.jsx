import { motion, useReducedMotion } from 'framer-motion';
import { FaRobot } from 'react-icons/fa';

export default function AIButton({ onClick, isOpen }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? 'Close AI assistant' : 'Open AI assistant'}
      aria-expanded={isOpen}
      aria-controls="ai-assistant-dialog"
      aria-keyshortcuts="Control+K Meta+K"
      className="fixed bottom-5 right-4 z-40 inline-flex items-center gap-3 rounded-full border border-default surface px-4 py-3 text-sm font-semibold text-primary shadow-2xl shadow-black/20 backdrop-blur-xl transition-colors hover:bg-accent-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-light-bg dark:focus-visible:ring-offset-dark-bg sm:bottom-6 sm:right-6"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: 'easeOut' }}
      whileHover={shouldReduceMotion ? undefined : { y: -3 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary text-white">
        <FaRobot className="h-4 w-4" aria-hidden="true" />
      </span>
      <span className="hidden sm:inline">AI Assistant</span>
      <span className="sr-only">Shortcut: Control or Command plus K</span>
    </motion.button>
  );
}
