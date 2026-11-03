import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { HiGlobeAlt, HiChevronDown, HiCheck } from 'react-icons/hi';
import { useLanguage } from '../../i18n';

export default function LanguageToggle() {
  const { currentLanguage, setLanguage, supportedLanguages, isRTL, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const activeLangConfig = supportedLanguages[currentLanguage];

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t('navigation.languageSelector', {}, 'Language selector')}
        className="flex items-center gap-1.5 rounded-lg px-2 py-2 text-secondary transition-all hover:text-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-light-bg dark:focus-visible:ring-offset-dark-bg cursor-pointer"
      >
        <HiGlobeAlt className="h-5 w-5" />
        <span className="text-xs font-semibold uppercase tracking-wider hidden lg:inline">
          {activeLangConfig?.code}
        </span>
        <HiChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={shouldReduceMotion ? false : { opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.15 }}
            className={`glass absolute top-full z-50 mt-2 w-44 overflow-hidden rounded-xl shadow-xl ${
              isRTL ? 'left-0 right-auto' : 'right-0 left-auto'
            }`}
          >
            {Object.values(supportedLanguages).map((lang) => {
              const isSelected = currentLanguage === lang.code;

              return (
                <button
                  key={lang.code}
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setLanguage(lang.code);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between px-4 py-3 text-sm transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-accent-primary/10 text-accent-primary font-bold'
                      : 'text-secondary hover:bg-accent-primary/10 hover:text-primary'
                  }`}
                >
                  <span className="flex flex-col text-start">
                    <span className="font-semibold text-sm">{lang.nativeName}</span>
                    <span className="text-[10px] text-muted">{lang.name}</span>
                  </span>

                  {isSelected && <HiCheck className="h-4 w-4 shrink-0 text-accent-primary" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
