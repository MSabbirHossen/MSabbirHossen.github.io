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
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({ behavior, block: 'start' });
    }
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
    if (!location.hash) {
      return;
    }

    if (location.pathname === '/') {
      navigate('/', { replace: true });
      return;
    }

    navigate({ pathname: location.pathname }, { replace: true });
  }, [location.hash, location.pathname, navigate]);

  useEffect(() => {
    if (location.pathname !== '/') {
      return;
    }

    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
    if (sections.length === 0) {
      return;
    }

    const updateActiveSection = () => {
      const viewportAnchor = window.scrollY + 160;
      let nextActive = sections[0].id;

      for (const section of sections) {
        if (section.offsetTop <= viewportAnchor) {
          nextActive = section.id;
        }
      }

      setActiveSection((previous) => (previous === nextActive ? previous : nextActive));
    };

    updateActiveSection();

    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
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
  }, [location.pathname, location.state, navigate, scrollToSection, sectionIds]);

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
