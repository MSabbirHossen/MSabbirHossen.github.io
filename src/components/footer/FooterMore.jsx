import Typography from '../common/Typography';
import { FOOTER_MORE_LINKS } from '../../data/navigation';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { navigateToSection } from '../../lib/navigation';
import { useTranslation } from '../../i18n';

export default function FooterMore() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const getLocalizedMoreLabel = (link) => {
    switch (link.label) {
      case 'Recruiter Quick Scan':
        return t('navigation.recruiterQuickScan');
      case 'Portfolio Guide':
        return t('navigation.portfolioGuide');
      case 'All Projects':
        return t('navigation.allProjects');
      case 'Experience Timeline':
        return t('navigation.experienceTimeline');
      case 'Education Timeline':
        return t('navigation.educationTimeline');
      case 'All Certifications':
        return t('navigation.allCertifications');
      case 'Developer Hub':
        return t('navigation.developerHub');
      case 'AI Profile (llms.txt)':
        return t('navigation.aiProfile');
      default:
        return link.label;
    }
  };

  return (
    <nav aria-label={t('footer.pagesCol', {}, 'Footer additional pages')}>
      <Typography
        variant="subtitle"
        className="mb-4 text-xs font-bold uppercase tracking-wider text-primary"
      >
        {t('footer.pagesCol')}
      </Typography>
      <ul className="space-y-2.5">
        {FOOTER_MORE_LINKS.map((link) => (
          <li key={link.label}>
            {link.to ? (
              <Link
                to={link.to}
                className="inline-block text-sm text-secondary transition-all duration-200 hover:text-accent-primary hover:translate-x-1 rtl:hover:-translate-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary rounded"
              >
                {getLocalizedMoreLabel(link)}
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
                className="inline-block text-sm text-secondary transition-all duration-200 hover:text-accent-primary hover:translate-x-1 rtl:hover:-translate-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary rounded"
              >
                {getLocalizedMoreLabel(link)}
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
