import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { HiMoon, HiSun, HiDesktopComputer, HiChevronDown, HiCheck } from 'react-icons/hi';

import { useTheme } from '../../contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const CurrentIcon = resolvedTheme === 'dark' ? HiMoon : HiSun;

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

  const themeOptions = [
    {
      value: 'light',
      label: 'Light',
      icon: HiSun,
    },
    {
      value: 'dark',
      label: 'Dark',
      icon: HiMoon,
    },
    {
      value: 'system',
      label: 'System',
      icon: HiDesktopComputer,
    },
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Theme selector"
        className="flex items-center gap-1.5 rounded-lg px-2 py-2 text-secondary transition-all hover:text-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-light-bg dark:focus-visible:ring-offset-dark-bg"
      >
        <CurrentIcon className="h-5 w-5" />

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
            className="glass absolute right-0 top-full z-50 mt-2 w-44 overflow-hidden rounded-xl shadow-xl"
          >
            {themeOptions.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                type="button"
                role="menuitem"
                onClick={() => {
                  setTheme(value);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between px-4 py-3 text-sm transition-colors ${
                  theme === value
                    ? 'bg-accent-primary/10 text-accent-primary'
                    : 'text-secondary hover:bg-accent-primary/10'
                }`}
              >
                <span className="flex items-center gap-3">
                  <Icon className="h-5 w-5" />
                  {label}
                </span>

                {theme === value && <HiCheck className="h-4 w-4" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
