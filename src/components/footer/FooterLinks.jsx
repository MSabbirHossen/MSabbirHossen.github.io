import Typography from '../common/Typography';
import { FOOTER_LINKS } from '../../data/navigation';
import { useLocation, useNavigate } from 'react-router-dom';
import { navigateToSection } from '../../lib/navigation';
import { useTranslation } from '../../i18n';

export default function FooterLinks() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const getLocalizedLinkName = (link) => {
    switch (link.href) {
      case 'highlights':
        return t('navigation.highlights');
      case 'projects':
        return t('navigation.projects');
      case 'skills':
        return t('navigation.skills');
      case 'about':
        return t('navigation.about');
      case 'experience':
        return t('navigation.experience');
      case 'contact':
        return t('navigation.contact');
      default:
        return link.name;
    }
  };

  return (
    <nav aria-label={t('footer.navigationCol', {}, 'Footer navigation')}>
      <Typography
        variant="subtitle"
        className="mb-4 text-xs font-bold uppercase tracking-wider text-primary"
      >
        {t('footer.navigationCol')}
      </Typography>

      <ul className="space-y-2.5">
        {FOOTER_LINKS.map((link) => (
          <li key={link.href}>
            <a
              href={`/#${link.href}`}
              onClick={(event) =>
                navigateToSection({ event, sectionId: link.href, location, navigate })
              }
              className="inline-block text-sm text-secondary transition-all duration-200 hover:text-accent-primary hover:translate-x-1 rtl:hover:-translate-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary rounded"
            >
              {getLocalizedLinkName(link)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
