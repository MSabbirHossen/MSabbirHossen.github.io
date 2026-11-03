import Typography from '../common/Typography';
import { portfolioData } from '../../data';
import Logo from '../common/Logo';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useTranslation } from '../../i18n';

export default function FooterBrand() {
  const { t } = useTranslation();
  const { personalInfo } = portfolioData;

  return (
    <div className="space-y-4">
      <Logo size="md" />

      <Typography variant="body" className="max-w-sm text-sm leading-relaxed text-secondary">
        {t('footer.brandTagline')}
      </Typography>

      <div className="flex flex-col gap-2 pt-1 text-xs text-muted">
        <span className="inline-flex items-center gap-1.5 font-medium text-emerald-400">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          {t('footer.statusBadge')}
        </span>
        <span className="inline-flex items-center gap-1.5 text-secondary">
          <FaMapMarkerAlt className="h-3.5 w-3.5 text-accent-secondary shrink-0" />
          {personalInfo.location}
        </span>
      </div>
    </div>
  );
}
