import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiMenu, HiMoon, HiSun, HiX } from 'react-icons/hi';
import { portfolioData } from '../../data/portfolioData';
import { useTheme } from '../../contexts/ThemeContext';

import { NAV_LINKS } from '../../data/navigation';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const location = useLocation();
  const navigate = useNavigate();
  const { name } = portfolioData.personalInfo;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    const Observer = window.IntersectionObserver;
    if (!Observer) {
      return () => window.removeEventListener('scroll', handleScroll);
    }

    const observedSections = NAV_LINKS.map((link) => document.getElementById(link.href)).filter(
      Boolean
    );

    const observer = new Observer(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-35% 0px -55% 0px',
        threshold: 0.1,
      }
    );

    observedSections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    setIsOpen(false);
    setActiveSection(sectionId);

    const scrollToSection = () => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
      window.setTimeout(scrollToSection, 100);
      return;
    }

    scrollToSection();
  };

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'glass py-4 shadow-lg' : 'bg-transparent py-6'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <Link
          to="/"
          onClick={(e) => handleNavClick(e, 'hero')}
          className="text-xl font-bold text-slate-900 transition-opacity hover:opacity-80 dark:text-slate-100"
        >
          {name}
        </Link>

        <nav className="hidden items-center space-x-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={`#${link.href}`}
              onClick={(e) => handleNavClick(e, link.href)}
              aria-current={activeSection === link.href ? 'page' : undefined}
              className={`text-sm font-medium transition-colors hover:text-accent-primary ${
                activeSection === link.href
                  ? 'text-accent-primary'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              {link.name}
            </a>
          ))}

          <button
            onClick={toggleTheme}
            className="rounded-full border border-slate-200 p-2 text-slate-800 transition-colors hover:bg-slate-100 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-800"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <HiSun className="h-5 w-5" /> : <HiMoon className="h-5 w-5" />}
          </button>
        </nav>

        <div className="flex items-center space-x-4 md:hidden">
          <button
            onClick={toggleTheme}
            className="rounded-full border border-slate-200 p-2 text-slate-800 transition-colors hover:bg-slate-100 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-800"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <HiSun className="h-5 w-5" /> : <HiMoon className="h-5 w-5" />}
          </button>

          <button
            onClick={() => setIsOpen((value) => !value)}
            className="rounded-md p-2 text-slate-800 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            {isOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="glass absolute left-0 top-full w-full border-t border-slate-200 px-6 py-6 shadow-xl dark:border-slate-800 md:hidden"
          >
            <div className="flex flex-col space-y-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={`#${link.href}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                  aria-current={activeSection === link.href ? 'page' : undefined}
                  className={`border-b border-slate-100 py-2 text-base font-medium transition-colors hover:text-accent-primary dark:border-slate-800/50 ${
                    activeSection === link.href
                      ? 'text-accent-primary'
                      : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
