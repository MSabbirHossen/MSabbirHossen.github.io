import {
  FaCode,
  FaDatabase,
  FaTools,
  FaRobot,
  FaUsers,
  FaLaptopCode,
  FaServer,
  FaTerminal,
  FaShieldAlt,
  FaCheckCircle,
} from 'react-icons/fa';

import Reveal from '../animations/Reveal';
import Card from '../common/Card';
import Typography from '../common/Typography';

const categoryMeta = {
  Frontend: {
    icon: FaCode,
    subIcon: FaLaptopCode,
    subtitle: 'React & Modern Web Ecosystem',
  },
  Backend: {
    icon: FaDatabase,
    subIcon: FaServer,
    subtitle: 'Server Logic, REST APIs & Databases',
  },
  Tools: {
    icon: FaTools,
    subIcon: FaTerminal,
    subtitle: 'Development Environment & Workflow',
  },
  'Learning / Exploring': {
    icon: FaRobot,
    subIcon: FaShieldAlt,
    subtitle: 'AI Engineering & Defensive Security',
  },
  'Soft Skills': {
    icon: FaUsers,
    subIcon: FaUsers,
    subtitle: 'Collaboration & Continuous Learning',
  },
};

export default function SkillCategoryCard({ category, index = 0, isFullWidth = false }) {
  const meta = categoryMeta[category.category] || {
    icon: FaCode,
    subIcon: FaCode,
    subtitle: 'Core Competency',
  };

  const Icon = meta.icon;
  const SubIcon = meta.subIcon;

  return (
    <Reveal
      y={18}
      duration={0.45}
      delay={index * 0.08}
      amount={0.2}
      className={`h-full ${isFullWidth ? 'md:col-span-2' : ''}`}
    >
      <Card className="flex h-full flex-col overflow-hidden border-default p-6 sm:p-7 transition-all duration-300 hover:border-accent-primary/40">
        <div>
          <div className="mb-4 flex items-center gap-3.5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-accent-primary/20 bg-accent-primary/10 text-accent-primary">
              <Icon className="h-6 w-6" aria-hidden="true" />
            </div>
            <Typography variant="h3" className="text-lg font-bold text-primary sm:text-xl">
              {category.category}
            </Typography>
          </div>

          <Typography
            variant="subtitle"
            className="flex items-center gap-2 font-medium text-secondary"
          >
            <SubIcon className="h-4 w-4 shrink-0 text-accent-secondary" />
            {meta.subtitle}
          </Typography>
        </div>

        {category.items && category.items.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2 border-t border-default/50 pt-4">
            {category.items.map(({ name, icon: SkillIcon }) => (
              <span
                key={name}
                className="inline-flex items-center gap-2 rounded-lg border border-default bg-surface/80 px-2.5 py-1.5 text-xs font-medium text-secondary transition-all hover:border-accent-primary/40 hover:text-primary"
              >
                {SkillIcon ? (
                  <SkillIcon className="h-3.5 w-3.5 shrink-0 text-accent-secondary" />
                ) : (
                  <FaCheckCircle className="h-3 w-3 text-accent-secondary" />
                )}
                <span>{name}</span>
              </span>
            ))}
          </div>
        )}
      </Card>
    </Reveal>
  );
}
