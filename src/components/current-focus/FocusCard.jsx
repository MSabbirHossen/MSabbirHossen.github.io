import { FaCode, FaRobot, FaShieldAlt, FaGithub } from 'react-icons/fa';

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

  return (
    <Reveal y={18} duration={0.45} delay={index * 0.08} amount={0.2} whileHover={{ y: -4 }}>
      <Card className="h-full space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-primary/10 text-accent-secondary">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>

          <Badge variant="secondary">{item.period}</Badge>
        </div>

        <div className="space-y-2">
          <Typography variant="subtitle">{item.title}</Typography>

          <Typography variant="caption" className="text-primary-400">
            {item.organization}
          </Typography>
        </div>

        <Typography variant="body" className="leading-7">
          {item.description}
        </Typography>
      </Card>
    </Reveal>
  );
}
