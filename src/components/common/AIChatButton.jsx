import { motion, useReducedMotion } from 'framer-motion';
import { FaRobot } from 'react-icons/fa';

export default function AIChatButton({ onClick, isOpen }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? 'Close AI assistant' : 'Open AI assistant'}
      aria-expanded={isOpen}
      className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-3 rounded-full border border-default surface px-4 py-3 text-sm font-semibold text-primary shadow-2xl shadow-black/20 backdrop-blur-xl transition-colors hover:bg-accent-primary/10"
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
    </motion.button>
  );
}
