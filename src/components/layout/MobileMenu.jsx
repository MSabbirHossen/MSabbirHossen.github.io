import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { forwardRef, useEffect } from 'react';
import NavLinks from './NavLinks';
import Button from '../common/Button';
import { FaFileAlt } from 'react-icons/fa';
import { HiX } from 'react-icons/hi';
import Logo from '../common/Logo';
import { useTranslation } from '../../i18n';

const MobileMenu = forwardRef(function MobileMenu(
  { isOpen, setIsOpen, activeSection, onNavigate },
  ref
) {
  const { t, isRTL } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  // Close mobile navigation on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, setIsOpen]);

  const slideInitial = isRTL ? '-100%' : '100%';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            id="mobile-navigation"
            ref={ref}
            role="dialog"
            aria-modal="true"
            aria-label={t('navigation.mobileNav', {}, 'Mobile navigation')}
            initial={shouldReduceMotion ? false : { x: slideInitial }}
            animate={{ x: 0 }}
            exit={shouldReduceMotion ? undefined : { x: slideInitial }}
            transition={{
              type: 'spring',
              stiffness: shouldReduceMotion ? 0 : 350,
              damping: shouldReduceMotion ? 0 : 32,
              duration: shouldReduceMotion ? 0 : undefined,
            }}
            className={`fixed top-0 z-50 h-screen w-[82%] max-w-sm surface text-primary shadow-2xl backdrop-blur-xl md:hidden ${
              isRTL ? 'left-0 border-r border-default' : 'right-0 border-l border-default'
            }`}
          >
            <div className="flex h-full flex-col gap-6 p-6 overflow-y-auto overscroll-contain">
              <header className="flex items-center justify-between border-b pb-4">
                <Logo size="sm" />
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-2 text-secondary transition-colors hover:bg-accent-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-light-bg dark:focus-visible:ring-offset-dark-bg cursor-pointer"
                  aria-label={t('navigation.navMenuClose', {}, 'Close navigation menu')}
                >
                  <HiX className="h-6 w-6" />
                </button>
              </header>

              <nav
                className="flex flex-col gap-2"
                aria-label={t('navigation.mobileNav', {}, 'Mobile navigation links')}
              >
                <NavLinks
                  mobile
                  activeSection={activeSection}
                  onNavigate={onNavigate}
                  onClose={() => setIsOpen(false)}
                />
              </nav>

              <Button
                as="a"
                href="/resume/Md_Sabbir_Hossen_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
                variant="outline"
              >
                <FaFileAlt className="h-4 w-4" />
                <span>{t('navigation.resume', {}, 'Resume')}</span>
              </Button>
            </div>
          </motion.div>

          <motion.button
            type="button"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
            className="fixed inset-0 z-40 bg-black/25 backdrop-blur-sm md:hidden"
            onClick={() => setIsOpen(false)}
            aria-label={t('navigation.navMenuClose', {}, 'Close navigation menu')}
          />
        </>
      )}
    </AnimatePresence>
  );
});

export default MobileMenu;
