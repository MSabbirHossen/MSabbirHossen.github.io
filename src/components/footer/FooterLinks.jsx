import Typography from '../common/Typography';
import { FOOTER_LINKS } from '../../data/navigation';
import { useLocation, useNavigate } from 'react-router-dom';
import { navigateToSection } from '../../lib/navigation';

export default function FooterLinks() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav aria-label="Footer navigation">
      <Typography
        variant="subtitle"
        className="mb-4 text-xs font-bold uppercase tracking-wider text-primary"
      >
        Navigation
      </Typography>

      <ul className="space-y-2.5">
        {FOOTER_LINKS.map((link) => (
          <li key={link.href}>
            <a
              href={`/#${link.href}`}
              onClick={(event) =>
                navigateToSection({ event, sectionId: link.href, location, navigate })
              }
              className="inline-block text-sm text-secondary transition-all duration-200 hover:text-accent-primary hover:translate-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary rounded"
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
