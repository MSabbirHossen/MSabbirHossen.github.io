import {
  FaCheckCircle,
  FaCodeBranch,
  FaLayerGroup,
  FaLightbulb,
  FaRocket,
  FaShieldAlt,
  FaTools,
} from 'react-icons/fa';
import Card from '../common/Card';
import Typography from '../common/Typography';
import Badge from '../common/Badge';
import { useTranslation } from '../../i18n';

const renderSectionIcon = (title) => {
  const lower = title.toLowerCase();
  const iconClass = 'h-4 w-4';
  if (lower.includes('feature')) return <FaCheckCircle className={iconClass} aria-hidden="true" />;
  if (lower.includes('architecture'))
    return <FaLayerGroup className={iconClass} aria-hidden="true" />;
  if (lower.includes('challenge')) return <FaShieldAlt className={iconClass} aria-hidden="true" />;
  if (lower.includes('process')) return <FaCodeBranch className={iconClass} aria-hidden="true" />;
  if (lower.includes('lesson')) return <FaLightbulb className={iconClass} aria-hidden="true" />;
  if (lower.includes('future') || lower.includes('improvement'))
    return <FaRocket className={iconClass} aria-hidden="true" />;
  return <FaTools className={iconClass} aria-hidden="true" />;
};

const ProjectBulletList = ({ title, items, columns = false }) => {
  const { t } = useTranslation();
  if (!items?.length) return null;

  const pointsLabel =
    items.length === 1
      ? t('projectDetails.pointCount', { count: items.length })
      : t('projectDetails.pointsCount', { count: items.length });

  return (
    <Card spotlight hover className="space-y-4 border-default p-5 sm:p-6">
      <div className="flex items-center justify-between border-b border-default/50 pb-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary">
            {renderSectionIcon(title)}
          </span>
          <Typography variant="subtitle" className="text-base font-bold text-primary sm:text-lg">
            {title}
          </Typography>
        </div>
        <Badge variant="neutral" className="text-xs">
          {pointsLabel}
        </Badge>
      </div>

      <ul className={columns ? 'grid gap-3 sm:grid-cols-2' : 'space-y-2.5'} aria-label={title}>
        {items.map((item, index) => (
          <li
            key={`${title}-${index}`}
            className="flex items-start gap-3 rounded-xl border border-default/40 bg-surface/40 p-3 transition-all duration-200 hover:border-accent-primary/30 hover:bg-surface/80"
          >
            <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent-primary/10 text-accent-primary">
              <FaCheckCircle className="h-2.5 w-2.5" />
            </span>
            <Typography
              variant="body"
              className="text-xs sm:text-sm font-medium leading-relaxed text-secondary"
            >
              {item}
            </Typography>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default ProjectBulletList;
