import Typography from '../common/Typography';

import { resources } from '../../data/navigation';

const FooterResources = () => {
  return (
    <nav aria-label="Footer resources">
      <Typography variant="subtitle" className="mb-4 font-semibold text-primary">
        Connect with Me
      </Typography>
      <ul className="space-y-3">
        {resources.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              {...(link.external && {
                target: '_blank',
                rel: 'noopener noreferrer',
              })}
              className="
rounded-md
text-secondary
transition-colors
hover:text-accent-primary
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-accent-primary
focus-visible:ring-offset-2
focus-visible:ring-offset-light-bg
dark:focus-visible:ring-offset-dark-bg
"
            >
              {link.icon && (
                <span className="mr-1 inline-block align-middle">
                  <link.icon className="h-4 w-4" />{' '}
                </span>
              )}{' '}
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default FooterResources;
