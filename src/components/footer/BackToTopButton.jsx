import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 350);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
          className="
            fixed bottom-6 right-6 z-50
            flex h-12 w-12 items-center justify-center
            rounded-full
            bg-accent-primary text-white
            shadow-lg
            transition-all duration-300
            hover:-translate-y-1 hover:shadow-xl
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-accent-primary
            focus-visible:ring-offset-2
            focus-visible:ring-offset-light-bg
            dark:focus-visible:ring-offset-dark-bg
          "
        >
          <FaArrowUp className="h-4 w-4" title="Back to Top" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
