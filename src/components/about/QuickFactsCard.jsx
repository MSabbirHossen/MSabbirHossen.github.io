import Card from '../common/Card';
import Typography from '../common/Typography';
import { useTranslation } from '../../i18n';

export default function QuickFactsCard({ title, studyingAt, location }) {
  const { t } = useTranslation();

  return (
    <Card className="space-y-5">
      <Typography variant="subtitle" className="text-primary">
        {t('about.quickFactsTitle', {}, '👨 Quick Facts')}
      </Typography>

      <div className="space-y-4 text-secondary">
        <div>
          <p className="text-sm text-muted">{t('about.roleLabel', {}, 'Role')}</p>
          <p className="mt-1 font-medium text-primary">{t('hero.title', {}, title)}</p>
        </div>

        <div>
          <p className="text-sm text-muted">{t('about.studyingAtLabel', {}, 'Studying At')}</p>
          <p className="mt-1 font-medium text-primary">
            {t('education.ribbonInstitution', {}, studyingAt)}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted">{t('about.locationLabel', {}, 'Location')}</p>
          <p className="mt-1 font-medium text-primary">{t('hero.location', {}, location)}</p>
        </div>
      </div>
    </Card>
  );
}
