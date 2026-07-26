import { motion, useReducedMotion } from 'framer-motion';
import { NAV_LINKS } from '../../data/navigation';

export default function NavLinks({ activeSection, onNavigate, mobile = false }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      {NAV_LINKS.map((link) => {
        const isActive = activeSection === link.href;

        return (
          <div className="relative" key={link.name}>
            <a
              href={`#${link.href}`}
              onClick={(e) => onNavigate(e, link.href)}
              aria-current={isActive ? 'page' : undefined}
              className={`relative rounded-md px-1 py-1 text-sm font-medium transition-all duration-300 hover:text-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-light-bg dark:focus-visible:ring-offset-dark-bg ${
                mobile
                  ? `w-full border-b border-default py-2 text-base ${
                      isActive ? 'text-accent-primary' : 'text-secondary'
                    }`
                  : isActive
                    ? 'text-accent-primary'
                    : 'text-secondary'
              }`}
            >
              {link.name}
            </a>

            {isActive && !mobile && (
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
    </>
  );
}
