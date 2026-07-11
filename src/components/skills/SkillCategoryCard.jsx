import { FaCode } from 'react-icons/fa';

import Reveal from '../animations/Reveal';
import Badge from '../common/Badge';
import Card from '../common/Card';
import Typography from '../common/Typography';

import { categoryIcons } from './categoryIcons';

export default function SkillCategoryCard({ category }) {
  const Icon = categoryIcons[category.category] ?? FaCode;

  return (
    <Reveal y={18} duration={0.45} amount={0.2} whileHover={{ y: -4 }}>
      <Card className="h-full space-y-5">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-primary/10 text-accent-secondary">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>

          <Typography variant="subtitle" className="text-slate-100">
            {category.category}
          </Typography>
        </div>

        <div className="flex flex-wrap gap-2">
          {category.items.map(({ name, icon: SkillIcon }) => (
            <Badge
              as="span"
              key={name}
              variant="primary"
              className="flex items-center gap-2 px-3 py-2"
            >
              {SkillIcon && <SkillIcon className="h-4 w-4 shrink-0" />}
              <span>{name}</span>
            </Badge>
          ))}
        </div>
      </Card>
    </Reveal>
  );
}
