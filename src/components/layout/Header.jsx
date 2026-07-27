import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { portfolioData } from '../../data/portfolioData';

import { NAV_LINKS } from '../../data/navigation';
import NavLinks from '../layout/NavLinks.jsx';
import ThemeToggle from '../layout/ThemeToggle';
import MobileMenu from '../layout/MobileMenu.jsx';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const location = useLocation();
  const navigate = useNavigate();
  const { name } = portfolioData.personalInfo;
  const sectionIds = useMemo(() => NAV_LINKS.map((link) => link.href), []);

  const scrollToSection = useCallback((sectionId, behavior = 'smooth') => {
    let attempts = 0;
    const maxAttempts = 20;

    const tryScroll = () => {
      const element = document.getElementById(sectionId);

      if (element) {
        element.scrollIntoView({ behavior, block: 'start' });
        return;
      }

      if (attempts < maxAttempts) {
        attempts += 1;
        window.requestAnimationFrame(tryScroll);
      }
    };

    tryScroll();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const hashSection = location.hash.replace('#', '');

    if (location.pathname !== '/') {
      if (!hashSection) {
        return;
      }

      if (sectionIds.includes(hashSection)) {
        navigate({ pathname: '/', hash: `#${hashSection}` }, { replace: true });
        return;
      }

      navigate({ pathname: location.pathname }, { replace: true });
      return;
    }

    if (!hashSection) {
      return;
    }

    if (!sectionIds.includes(hashSection)) {
      navigate('/', { replace: true });
      return;
    }

    window.requestAnimationFrame(() => {
      setActiveSection(hashSection);
    });
    scrollToSection(hashSection);
  }, [location.hash, location.pathname, navigate, scrollToSection, sectionIds]);

  useEffect(() => {
    if (location.pathname !== '/') {
      return;
    }

    const Observer = window.IntersectionObserver;
    if (!Observer) {
      return;
    }

    const observedSections = sectionIds
      .map((sectionId) => document.getElementById(sectionId))
      .filter(Boolean);

    if (observedSections.length === 0) {
      return;
    }

    const observer = new Observer(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length > 0) {
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: '-35% 0px -55% 0px',
        threshold: [0.1, 0.25, 0.5, 0.75],
      }
    );

    observedSections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, [location.pathname, sectionIds]);

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    setIsOpen(false);
    setActiveSection(sectionId);

    if (e.detail > 0 && e.currentTarget instanceof window.HTMLElement) {
      window.requestAnimationFrame(() => {
        e.currentTarget.blur();
      });
    }

    if (location.pathname !== '/') {
      navigate({ pathname: '/', hash: `#${sectionId}` });
      return;
    }

    if (location.hash !== `#${sectionId}`) {
      navigate({ pathname: '/', hash: `#${sectionId}` }, { replace: true });
    }

    scrollToSection(sectionId);
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
          className="text-xl font-semibold text-primary transition-opacity hover:opacity-80"
        >
          {name}
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          <NavLinks activeSection={activeSection} onNavigate={handleNavClick} />
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setIsOpen((value) => !value)}
            className="rounded-lg p-2 text-primary transition-colors hover:bg-accent-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-light-bg dark:focus-visible:ring-offset-dark-bg"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            {isOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <MobileMenu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        activeSection={activeSection}
        onNavigate={handleNavClick}
      />
    </header>
  );
}
