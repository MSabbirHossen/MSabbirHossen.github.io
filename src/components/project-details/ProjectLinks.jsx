import ProjectLinkCard from './ProjectLinkCard';
import Typography from '../common/Typography';
import Card from '../common/Card';
import { FaExternalLinkAlt, FaGithub, FaLink } from 'react-icons/fa';
import { useTranslation } from '../../i18n';

const ProjectLinks = ({ githubUrl, liveUrl }) => {
  const { t } = useTranslation();
  if (!githubUrl && !liveUrl) return null;

  return (
    <Card spotlight className="space-y-4 border-default p-5 sm:p-6">
      <div className="flex items-center gap-2.5 border-b border-default/50 pb-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary">
          <FaLink className="h-4 w-4" aria-hidden="true" />
        </span>
        <Typography variant="subtitle" className="text-base font-bold text-primary sm:text-lg">
          {t('projectDetails.projectLinks')}
        </Typography>
      </div>

      <div className="space-y-3">
        {githubUrl && (
          <ProjectLinkCard
            icon={FaGithub}
            title={t('projectDetails.githubRepo')}
            href={githubUrl}
          />
        )}
        {liveUrl && (
          <ProjectLinkCard
            icon={FaExternalLinkAlt}
            title={t('projectDetails.liveWebsite')}
            href={liveUrl}
          />
        )}
      </div>
    </Card>
  );
};

export default ProjectLinks;
