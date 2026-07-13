import { motion } from 'framer-motion';
import { NAV_LINKS } from '../../data/navigation';

export default function NavLinks({
  activeSection,
  onNavigate,
  mobile = false,
}) {
  return (
    <>
      {NAV_LINKS.map((link) => (
        <a
          key={link.name}
          href={`#${link.href}`}
          onClick={(e) => onNavigate(e, link.href)}
          aria-current={activeSection === link.href ? 'page' : undefined}
          className={`relative transition-colors hover:text-accent-primary ${
            mobile
              ? `border-b border-slate-100 py-2 text-base font-medium dark:border-slate-800/50 ${
                  activeSection === link.href
                    ? 'text-accent-primary'
                    : 'text-slate-700 dark:text-slate-300'
                }`
              : `text-sm font-medium ${
                  activeSection === link.href
                    ? 'text-accent-primary'
                    : 'text-slate-600 dark:text-slate-300'
                }`
          }`}
        >
          {link.name}
        </a>
      ))}
    </>
  );
}