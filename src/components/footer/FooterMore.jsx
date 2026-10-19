import Typography from '../common/Typography';
import { FOOTER_MORE_LINKS } from '../../data/navigation';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { navigateToSection } from '../../lib/navigation';

const FooterMore = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const linkClass =
    'rounded-md text-secondary transition-colors hover:text-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-light-bg dark:focus-visible:ring-offset-dark-bg';

  return (
    <nav aria-label="Footer additional links">
      <Typography variant="subtitle" className="mb-4 font-semibold text-primary">
        More
      </Typography>
      <ul className="space-y-3">
        {FOOTER_MORE_LINKS.map((link) => (
          <li key={link.label}>
            {link.to ? (
              <Link to={link.to} className={linkClass}>
                {link.icon && (
                  <span className="mr-1 inline-block align-middle">
                    <link.icon className="h-4 w-4" />{' '}
                  </span>
                )}{' '}
                {link.label}
              </Link>
            ) : (
              <a
                href={link.href}
                onClick={
                  link.external
                    ? undefined
                    : (event) =>
                        navigateToSection({ event, sectionId: link.href, location, navigate })
                }
                {...(link.external && {
                  target: '_blank',
                  rel: 'noopener noreferrer',
                })}
                className={linkClass}
              >
                {link.icon && (
                  <span className="mr-1 inline-block align-middle">
                    <link.icon className="h-4 w-4" />{' '}
                  </span>
                )}{' '}
                {link.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default FooterMore;
