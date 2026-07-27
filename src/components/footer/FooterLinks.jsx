import Typography from '../common/Typography';
import { FOOTER_LINKS } from '../../data/navigation';
import { Link } from 'react-router-dom';

const FooterLinks = () => {
  return (
    <nav aria-label="Footer navigation">
      <Typography variant="subtitle" className="mb-4 text-primary">
        Explore
      </Typography>

      <ul className="space-y-3">
        {FOOTER_LINKS.map((link) => (
          <li key={link.href}>
            <Link
              to={`/${link.href}`}
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
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default FooterLinks;
