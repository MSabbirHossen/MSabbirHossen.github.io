import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { portfolioData } from '../../data/portfolioData';
import { forwardRef } from 'react';
import NavLinks from './NavLinks';
import Button from '../common/Button';
import { FaFileAlt } from 'react-icons/fa';
import { HiX } from 'react-icons/hi';

const { personalInfo } = portfolioData;
const { name } = personalInfo;

const MobileMenu = forwardRef(function MobileMenu(
  { isOpen, setIsOpen, activeSection, onNavigate },
  ref
) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            id="mobile-navigation"
            ref={ref}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={shouldReduceMotion ? false : { x: '100%' }}
            animate={{ x: 0 }}
            exit={shouldReduceMotion ? undefined : { x: '100%' }}
            transition={{
              type: 'spring',
              stiffness: shouldReduceMotion ? 0 : 350,
              damping: shouldReduceMotion ? 0 : 32,
              duration: shouldReduceMotion ? 0 : undefined,
            }}
            className="fixed right-0 top-0 z-50 h-screen w-[82%] max-w-sm border-l border-default bg-dark-surface/95 shadow-2xl backdrop-blur-xl md:hidden"
          >
            <div className="flex h-full flex-col gap-6 p-6">
              <header className="flex items-center justify-between border-b border-default pb-4">
                <h2 className="text-xl font-semibold text-primary">{name}</h2>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-2 text-secondary transition-colors hover:bg-accent-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-light-bg dark:focus-visible:ring-offset-dark-bg"
                  aria-label="Close navigation menu"
                >
                  <HiX className="h-6 w-6" />
                </button>
              </header>

              <nav className="flex flex-col gap-2" aria-label="Mobile navigation links">
                <NavLinks mobile activeSection={activeSection} onNavigate={onNavigate} />
              </nav>

              <Button
                as="a"
                href="/resume/Md_Sabbir_Hossen_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
                variant="primary"
              >
                <FaFileAlt className="h-4 w-4" />
                Resume
              </Button>
            </div>
          </motion.div>

          <motion.button
            type="button"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={() => setIsOpen(false)}
            aria-label="Close navigation menu"
          />
        </>
      )}
    </AnimatePresence>
  );
});

export default MobileMenu;
