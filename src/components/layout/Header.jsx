import { useEffect, useState } from 'react';
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
