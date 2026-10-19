import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { portfolioData } from '../../data';
import { NAV_LINKS } from '../../data/navigation';
import NavLinks from '../layout/NavLinks.jsx';
import ThemeToggle from '../layout/ThemeToggle';
import MobileMenu from '../layout/MobileMenu.jsx';
import { scrollToSection } from '../../lib/navigation';
import Logo from '../common/Logo';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const location = useLocation();
  const navigate = useNavigate();
  const { name } = portfolioData.personalInfo;
  const sectionIds = useMemo(() => NAV_LINKS.map((link) => link.href), []);

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
    if (!location.hash) {
      return;
    }

    if (location.pathname === '/') {
      scrollToSection(location.hash.slice(1), 'auto');
      navigate('/', { replace: true });
      return;
    }

    navigate({ pathname: location.pathname }, { replace: true });
  }, [location.hash, location.pathname, navigate]);

  useEffect(() => {
    if (location.pathname !== '/') {
      return;
    }

    const updateActiveSection = () => {
      const elements = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);

      if (elements.length === 0) {
        return;
      }

      const scrollBottom = window.innerHeight + window.scrollY;
      const isAtBottom = scrollBottom >= document.documentElement.scrollHeight - 60;
      if (isAtBottom) {
        if (sectionIds.includes('contact')) {
          setActiveSection('contact');
          return;
        }
      }

      if (window.scrollY < 120) {
        setActiveSection('hero');
        return;
      }

      elements.sort(
        (a, b) =>
          a.getBoundingClientRect().top +
          window.scrollY -
          (b.getBoundingClientRect().top + window.scrollY)
      );

      const anchorY = Math.max(120, window.innerHeight * 0.35);
      let nextActive = elements[0].id;

      for (const element of elements) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= anchorY && rect.bottom > anchorY) {
          nextActive = element.id;
          break;
        } else if (rect.top <= anchorY) {
          nextActive = element.id;
        }
      }

      setActiveSection((previous) => (previous === nextActive ? previous : nextActive));
    };

    updateActiveSection();

    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    const timer1 = setTimeout(updateActiveSection, 150);
    const timer2 = setTimeout(updateActiveSection, 500);
    const timer3 = setTimeout(updateActiveSection, 1200);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [location.pathname, sectionIds]);

  useEffect(() => {
    if (location.pathname !== '/') {
      return;
    }

    const targetSection = location.state?.scrollToSection;
    if (!targetSection || !sectionIds.includes(targetSection)) {
      return;
    }

    scrollToSection(targetSection);
    navigate('/', { replace: true, state: null });
  }, [location.pathname, location.state, navigate, sectionIds]);

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    const clickedElement = e.currentTarget;

    if (e.detail > 0 && clickedElement instanceof window.HTMLElement) {
      clickedElement.blur();
    }

    if (!sectionIds.includes(sectionId)) {
      return;
    }

    setIsOpen(false);
    setActiveSection(sectionId);

    if (location.pathname !== '/') {
      navigate('/', { state: { scrollToSection: sectionId } });
      return;
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
          className="transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary rounded-xl"
          aria-label={`${name} - Home`}
        >
          <Logo size="md" />
        </Link>

        <nav className="hidden items-center gap-5 lg:gap-6 md:flex" aria-label="Primary navigation">
          <NavLinks activeSection={activeSection} onNavigate={handleNavClick} />
          <div className="h-4 w-px bg-default/60" />
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
