import { useState, useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import { PRIMARY_NAV_LINKS, MORE_NAV_LINKS } from '../../data/navigation';
import Button from '../common/Button';

export default function NavLinks({ activeSection, onNavigate, mobile = false }) {
  const shouldReduceMotion = useReducedMotion();
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside or escape key
  useEffect(() => {
    if (!isMoreOpen) return;

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMoreOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMoreOpen(false);
      }
    };

    document.addEventListener('pointerdown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMoreOpen]);

  const isMoreActive = MORE_NAV_LINKS.some((link) => link.href === activeSection);

  if (mobile) {
    return (
      <div className="flex flex-col gap-4">
        {/* Primary Links */}
        <div className="flex flex-col">
          {PRIMARY_NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <button
                key={link.name}
                type="button"
                onClick={(e) => onNavigate(e, link.href)}
                aria-current={isActive ? 'page' : undefined}
                className={`w-full py-2.5 text-left text-base font-semibold transition-colors border-b border-default/50 ${
                  isActive ? 'text-accent-primary' : 'text-secondary hover:text-primary'
                }`}
              >
                {link.name}
              </button>
            );
          })}
        </div>

        {/* More Sub-sections */}
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-muted mb-1 px-1">
            More Sections
          </p>
          <div className="flex flex-col gap-1">
            {MORE_NAV_LINKS.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.href;
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={(e) => onNavigate(e, item.href)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center gap-3 w-full py-2 px-2 rounded-xl text-left text-sm transition-colors ${
                    isActive
                      ? 'bg-accent-primary/10 text-accent-primary font-semibold'
                      : 'text-secondary hover:bg-surface hover:text-primary'
                  }`}
                >
                  <Icon className="h-4 w-4 text-accent-secondary shrink-0" />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="pt-2">
          <Button
            variant={activeSection === 'contact' ? 'primary' : 'outline'}
            size="md"
            onClick={(e) => onNavigate(e, 'contact')}
            className="w-full justify-center"
          >
            Contact Me
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-5 lg:gap-6">
      {/* Primary Links */}
      {PRIMARY_NAV_LINKS.map((link) => {
        const isActive = activeSection === link.href;

        return (
          <div className="relative" key={link.name}>
            <button
              type="button"
              onClick={(e) => onNavigate(e, link.href)}
              aria-current={isActive ? 'page' : undefined}
              className={`relative rounded-md px-1 py-1 text-sm font-medium transition-all duration-200 hover:text-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-light-bg dark:focus-visible:ring-offset-dark-bg cursor-pointer ${
                isActive ? 'text-accent-primary font-semibold' : 'text-secondary'
              }`}
            >
              {link.name}
            </button>

            {isActive && (
              <motion.div
                layoutId="active-nav-indicator"
                className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-accent-primary"
                transition={{
                  type: 'spring',
                  stiffness: shouldReduceMotion ? 0 : 500,
                  damping: shouldReduceMotion ? 0 : 35,
                  duration: shouldReduceMotion ? 0 : undefined,
                }}
              />
            )}
          </div>
        );
      })}

      {/* More Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsMoreOpen((prev) => !prev)}
          aria-expanded={isMoreOpen}
          aria-haspopup="true"
          className={`relative flex items-center gap-1.5 rounded-md px-1.5 py-1 text-sm font-medium transition-all duration-200 hover:text-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary cursor-pointer ${
            isMoreActive || isMoreOpen ? 'text-accent-primary font-semibold' : 'text-secondary'
          }`}
        >
          <span>More</span>
          <FaChevronDown
            className={`h-2.5 w-2.5 transition-transform duration-200 ${
              isMoreOpen ? 'rotate-180 text-accent-primary' : 'text-muted'
            }`}
          />
        </button>

        {isMoreActive && (
          <motion.div
            layoutId="active-nav-indicator"
            className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-accent-primary"
            transition={{
              type: 'spring',
              stiffness: shouldReduceMotion ? 0 : 500,
              damping: shouldReduceMotion ? 0 : 35,
              duration: shouldReduceMotion ? 0 : undefined,
            }}
          />
        )}

        {/* Dropdown Menu */}
        {isMoreOpen && (
          <div className="dropdown-menu absolute top-full right-0 mt-2.5 w-48 rounded-xl p-1.5 z-50 animate-fade-in">
            <div className="space-y-1">
              {MORE_NAV_LINKS.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.href;
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={(e) => {
                      setIsMoreOpen(false);
                      onNavigate(e, item.href);
                    }}
                    className={`dropdown-item w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left cursor-pointer text-sm font-medium ${
                      isActive ? 'bg-accent-primary/10 text-accent-primary font-semibold' : ''
                    }`}
                  >
                    <Icon className="h-4 w-4 text-accent-secondary shrink-0" />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Symmetrical Contact CTA Button */}
      <Button
        variant={activeSection === 'contact' ? 'primary' : 'outline'}
        size="sm"
        onClick={(e) => onNavigate(e, 'contact')}
        className="ml-1 text-xs font-semibold shadow-sm"
      >
        Contact
      </Button>
    </div>
  );
}
