import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import { PRIMARY_NAV_LINKS, MORE_NAV_LINKS } from '../../data/navigation';
import Button from '../common/Button';
import { useTranslation } from '../../i18n';

const getNavLinkLabel = (link, t) => {
  const map = {
    projects: 'navigation.projects',
    about: 'navigation.about',
    experience: 'navigation.experience',
    skills: 'navigation.skills',
    recruiter: 'navigation.recruiterQuickScan',
    guide: 'navigation.portfolioGuide',
    education: 'navigation.education',
    certifications: 'navigation.certifications',
    'github-stats': 'navigation.githubStats',
  };
  const key = map[link.href];
  return key ? t(key, {}, link.name) : link.name;
};

export default function NavLinks({ activeSection, onNavigate, onClose, mobile = false }) {
  const { t, isRTL } = useTranslation();
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
            const label = getNavLinkLabel(link, t);
            return (
              <button
                key={link.name}
                type="button"
                onClick={(e) => onNavigate(e, link.href)}
                aria-current={isActive ? 'page' : undefined}
                className={`w-full py-2.5 text-start text-base font-semibold transition-colors border-b border-default/50 ${
                  isActive ? 'text-accent-primary' : 'text-secondary hover:text-primary'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* More Sub-sections */}
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-muted mb-1 px-1">
            {t('navigation.moreSections', {}, 'More Sections')}
          </p>
          <div className="flex flex-col gap-1">
            {MORE_NAV_LINKS.map((item) => {
              const Icon = item.icon;
              const isRoute = !!item.to;
              const label = getNavLinkLabel(item, t);

              if (isRoute) {
                return (
                  <Link
                    key={item.name}
                    to={item.to}
                    onClick={() => onClose && onClose()}
                    className="flex items-center gap-3 w-full py-2 px-2 rounded-xl text-start text-sm transition-colors text-secondary hover:bg-surface hover:text-primary"
                  >
                    <Icon className="h-4 w-4 text-accent-secondary shrink-0" />
                    <span>{label}</span>
                  </Link>
                );
              }

              const isActive = activeSection === item.href;
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={(e) => onNavigate(e, item.href)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center gap-3 w-full py-2 px-2 rounded-xl text-start text-sm transition-colors ${
                    isActive
                      ? 'bg-accent-primary/10 text-accent-primary font-semibold'
                      : 'text-secondary hover:bg-surface hover:text-primary'
                  }`}
                >
                  <Icon className="h-4 w-4 text-accent-secondary shrink-0" />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Fast Action CTAs */}
        <div className="pt-2 flex flex-col gap-2.5">
          <Button
            as={Link}
            to="/recruiter"
            variant="primary"
            size="md"
            onClick={() => onClose && onClose()}
            className="w-full justify-center text-sm font-semibold"
          >
            {t('navigation.recruiterQuickScan', {}, 'Recruiter Quick Scan')}
          </Button>

          <Button
            variant={activeSection === 'contact' ? 'primary' : 'outline'}
            size="md"
            onClick={(e) => onNavigate(e, 'contact')}
            className="w-full justify-center"
          >
            {t('common.contactMe', {}, 'Contact Me')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 lg:gap-5">
      {/* Primary Links */}
      {PRIMARY_NAV_LINKS.map((link) => {
        const isActive = activeSection === link.href;
        const label = getNavLinkLabel(link, t);

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
              {label}
            </button>

            {isActive && (
              <motion.div
                layoutId="active-nav-indicator"
                className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-accent-primary"
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
          <span>{t('navigation.more', {}, 'More')}</span>
          <FaChevronDown
            className={`h-2.5 w-2.5 transition-transform duration-200 ${
              isMoreOpen ? 'rotate-180 text-accent-primary' : 'text-muted'
            }`}
          />
        </button>

        {isMoreActive && (
          <motion.div
            layoutId="active-nav-indicator"
            className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-accent-primary"
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
          <div
            className={`dropdown-menu absolute top-full mt-2.5 w-52 rounded-xl p-1.5 z-50 animate-fade-in shadow-xl ${
              isRTL ? 'left-0 right-auto' : 'right-0 left-auto'
            }`}
          >
            <div className="space-y-1">
              {MORE_NAV_LINKS.map((item) => {
                const Icon = item.icon;
                const isRoute = !!item.to;
                const label = getNavLinkLabel(item, t);

                if (isRoute) {
                  return (
                    <Link
                      key={item.name}
                      to={item.to}
                      onClick={() => setIsMoreOpen(false)}
                      className="dropdown-item w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-start cursor-pointer text-sm font-medium"
                    >
                      <Icon className="h-4 w-4 text-accent-secondary shrink-0" />
                      <span>{label}</span>
                    </Link>
                  );
                }

                const isActive = activeSection === item.href;
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={(e) => {
                      setIsMoreOpen(false);
                      onNavigate(e, item.href);
                    }}
                    className={`dropdown-item w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-start cursor-pointer text-sm font-medium ${
                      isActive ? 'bg-accent-primary/10 text-accent-primary font-semibold' : ''
                    }`}
                  >
                    <Icon className="h-4 w-4 text-accent-secondary shrink-0" />
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Recruiter View Shortcut Pill */}
      <Button
        as={Link}
        to="/recruiter"
        variant="ghost"
        size="sm"
        className="text-xs font-semibold text-accent-primary hover:bg-accent-primary/10 border border-accent-primary/30 py-1 px-2.5"
      >
        {t('navigation.recruiterView', {}, 'Recruiter View')}
      </Button>

      {/* Symmetrical Contact CTA Button */}
      <Button
        variant={activeSection === 'contact' ? 'primary' : 'outline'}
        size="sm"
        onClick={(e) => onNavigate(e, 'contact')}
        className="text-xs font-semibold shadow-sm"
      >
        {t('navigation.contact', {}, 'Contact')}
      </Button>
    </div>
  );
}
