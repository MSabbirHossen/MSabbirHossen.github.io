import { FaCode, FaRobot, FaShieldAlt, FaGithub, FaCheckCircle, FaCompass } from 'react-icons/fa';
import Reveal from '../animations/Reveal';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Typography from '../common/Typography';

const iconMap = {
  code: FaCode,
  ai: FaRobot,
  security: FaShieldAlt,
  github: FaGithub,
};

export default function FocusCard({ item, index }) {
  const Icon = iconMap[item.icon] || FaCode;
  const isOngoing =
    item.period?.toLowerCase().includes('ongoing') ||
    item.period?.toLowerCase().includes('present');

  return (
    <Reveal y={18} duration={0.45} delay={index * 0.08} amount={0.2}>
      <Card className="flex h-full flex-col justify-between overflow-hidden border-default p-6 sm:p-8 transition-all duration-300 hover:border-accent-primary/40">
        <div>
          <div className="mb-4 flex items-start justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-accent-primary/20 bg-accent-primary/10 text-accent-primary">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                    {isOngoing ? 'Active Focus' : 'Target Area'}
                  </span>
                  <Badge variant="secondary">{item.period}</Badge>
                </div>
                <Typography variant="h3" className="mt-1 text-lg font-bold text-primary sm:text-xl">
                  {item.title}
                </Typography>
              </div>
            </div>
          </div>

          <div className="space-y-3.5">
            <Typography
              variant="subtitle"
              className="flex items-center gap-2 font-medium text-secondary"
            >
              <FaCompass className="h-4 w-4 shrink-0 text-accent-secondary" />
              {item.organization}
            </Typography>

            <Typography variant="body" className="text-sm leading-relaxed text-muted text-justify">
              {item.description}
            </Typography>
          </div>
        </div>

        {item.topics && item.topics.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2 border-t border-default/50 pt-4">
            {item.topics.map((topic) => (
              <span
                key={topic}
                className="inline-flex items-center gap-1 rounded-lg border border-default bg-surface/80 px-2.5 py-1 text-xs font-medium text-secondary"
              >
                <FaCheckCircle className="h-3 w-3 text-accent-secondary" />
                {topic}
              </span>
            ))}
          </div>
        )}
      </Card>
    </Reveal>
  );
}
