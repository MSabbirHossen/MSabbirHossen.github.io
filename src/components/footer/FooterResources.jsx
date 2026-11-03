import Typography from '../common/Typography';
import { resources } from '../../data/navigation';
import { useTranslation } from '../../i18n';

export default function FooterResources() {
  const { t } = useTranslation();

  return (
    <nav aria-label={t('footer.connectCol', {}, 'Footer connect links')}>
      <Typography
        variant="subtitle"
        className="mb-4 text-xs font-bold uppercase tracking-wider text-primary"
      >
        {t('footer.connectCol')}
      </Typography>
      <ul className="space-y-2.5">
        {resources.map((link) => {
          const Icon = link.icon;
          return (
            <li key={link.label}>
              <a
                href={link.href}
                {...(link.external && {
                  target: '_blank',
                  rel: 'noopener noreferrer',
                })}
                className="group inline-flex items-center gap-2.5 text-sm text-secondary transition-all duration-200 hover:text-accent-primary hover:translate-x-1 rtl:hover:-translate-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary rounded"
              >
                {Icon && (
                  <Icon className="h-4 w-4 shrink-0 text-muted transition-colors group-hover:text-accent-primary" />
                )}
                <span>{link.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
