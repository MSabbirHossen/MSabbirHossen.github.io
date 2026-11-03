import Card from '../common/Card';
import Typography from '../common/Typography';
import { useTranslation } from '../../i18n';

export default function JourneyCard({ journey }) {
  const { t } = useTranslation();

  return (
    <Card className="h-full space-y-5">
      <Typography variant="subtitle" className="text-primary">
        {t('about.journeyTitle', {}, '🚀 My Journey')}
      </Typography>

      <Typography variant="body" className="leading-8 text-secondary md:text-justify">
        {journey}
      </Typography>
    </Card>
  );
}
