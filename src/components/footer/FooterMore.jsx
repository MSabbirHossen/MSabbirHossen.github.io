import Typography from '../common/Typography';
import { FOOTER_MORE_LINKS } from '../../data/navigation';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { navigateToSection } from '../../lib/navigation';

export default function FooterMore() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav aria-label="Footer additional pages">
      <Typography
        variant="subtitle"
        className="mb-4 text-xs font-bold uppercase tracking-wider text-primary"
      >
        Pages
      </Typography>
      <ul className="space-y-2.5">
        {FOOTER_MORE_LINKS.map((link) => (
          <li key={link.label}>
            {link.to ? (
              <Link
                to={link.to}
                className="inline-block text-sm text-secondary transition-all duration-200 hover:text-accent-primary hover:translate-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary rounded"
              >
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
                className="inline-block text-sm text-secondary transition-all duration-200 hover:text-accent-primary hover:translate-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary rounded"
              >
                {link.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
