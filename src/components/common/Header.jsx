import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { portfolioData } from '../../data/portfolioData';

import { NAV_LINKS } from '../../data/navigation';
import NavLinks from '../layout/NavLinks.jsx';
import ThemeToggle from '../layout/ThemeToggle';
import MobileMenu from '../layout/MobileMenu.jsx';
import { FaFileAlt } from 'react-icons/fa';

import { useRef } from 'react';
import Button from './Button.jsx';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const location = useLocation();
  const navigate = useNavigate();
  const { name } = portfolioData.personalInfo;

  const menuRef = useRef(null);
  const toggleButtonRef = useRef(null);

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

    const observer = new Observer(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -50% 0px',
        threshold: 0,
      }
    );
    requestAnimationFrame(() => {
      const sections = NAV_LINKS.map((link) => document.getElementById(link.href)).filter(Boolean);

      sections.forEach((section) => observer.observe(section));
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = previousOverflow || '';
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event) => {
      if (
        menuRef.current?.contains(event.target) ||
        toggleButtonRef.current?.contains(event.target)
      ) {
        return;
      }

      setIsOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isOpen]);

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

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-8 md:flex">
          <NavLinks activeSection={activeSection} onNavigate={handleNavClick} />

          <ThemeToggle />
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
        </nav>

        <div className="flex items-center space-x-4 md:hidden">
          <ThemeToggle />

          <button
            ref={toggleButtonRef}
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

      {/* Mobile Navigation */}
      <MobileMenu
        ref={menuRef}
        isOpen={isOpen}
        activeSection={activeSection}
        onNavigate={handleNavClick}
      />
    </header>
  );
}
