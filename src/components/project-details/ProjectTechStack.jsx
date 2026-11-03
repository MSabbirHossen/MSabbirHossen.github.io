import Card from '../common/Card';
import Typography from '../common/Typography';
import Badge from '../common/Badge';
import { useTranslation } from '../../i18n';

const ProjectTechStack = ({ technologies }) => {
  const { t } = useTranslation();
  if (!technologies?.length) return null;

  return (
    <Card spotlight hover className="space-y-5 border-default p-5 sm:p-6">
      <div className="flex items-center justify-between border-b border-default/50 pb-3">
        <Typography variant="subtitle" className="text-base font-bold text-primary sm:text-lg">
          {t('projectDetails.technologiesUsed')}
        </Typography>
        <Badge variant="neutral" className="text-xs">
          {t('projectDetails.technologiesCount', { count: technologies.length })}
        </Badge>
      </div>

      <ul
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
        aria-label={t('projects.coreStack', {}, 'Technology stack')}
      >
        {technologies.map((tech) => {
          const Icon = tech.icon;

          return (
            <li
              key={tech.name}
              className="group flex flex-col items-center justify-center gap-2.5 rounded-xl border border-default bg-surface/60 p-3.5 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-primary/40 hover:bg-surface hover:shadow-md"
            >
              {Icon && (
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary transition-transform duration-200 group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </span>
              )}

              <Typography
                variant="caption"
                className="font-semibold text-secondary group-hover:text-primary"
              >
                {tech.name}
              </Typography>
            </li>
          );
        })}
      </ul>
    </Card>
  );
};

export default ProjectTechStack;
