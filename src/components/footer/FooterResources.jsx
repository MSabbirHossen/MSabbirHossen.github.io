import React from 'react';
import Typography from '../common/Typography';
import { resources } from '../../data/navigation';

const FooterResources = () => {
  return (
    <div>
      <Typography
        variant="subtitle"
        className="mb-4 font-semibold text-slate-800 dark:text-slate-100"
      >
        Connect with Me
      </Typography>
      <ul className="space-y-3">
        {resources.map((link, index) => (
          <li key={link.label}>
            <a
              href={link.href}
              {...(link.external && {
                target: '_blank',
                rel: 'noopener noreferrer',
              })}
              className="
rounded-md
text-slate-500
transition-colors
hover:text-accent-primary
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-accent-primary
focus-visible:ring-offset-2
dark:text-slate-400
dark:focus-visible:ring-offset-slate-900
"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterResources;
