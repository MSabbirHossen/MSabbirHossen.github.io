import Typography from '../common/Typography';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaExclamationTriangle } from 'react-icons/fa';
import Card from '../common/Card';
import Button from '../common/Button';
import { useTranslation } from '../../i18n';

const ProjectNotFound = () => {
  const { t, isRTL } = useTranslation();

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6 sm:py-28">
      <Card spotlight className="space-y-6 text-center border-default p-8 sm:p-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500">
          <FaExclamationTriangle className="h-7 w-7" aria-hidden="true" />
        </div>

        <Typography variant="h2" className="text-2xl sm:text-3xl font-bold text-primary">
          {t('projectDetails.notFoundTitle')}
        </Typography>

        <Typography variant="body" className="text-sm sm:text-base text-secondary max-w-md mx-auto">
          {t('projectDetails.notFoundDesc')}
        </Typography>

        <div className="flex justify-center pt-2">
          <Button
            as={Link}
            to="/#projects"
            state={{ scrollToSection: 'projects' }}
            variant="primary"
            size="md"
            icon={FaArrowLeft}
            className={isRTL ? '[&>svg]:rotate-180' : ''}
          >
            {t('projectDetails.backToFeatured')}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ProjectNotFound;
