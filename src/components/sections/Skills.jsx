import { motion } from 'framer-motion';
import { FaCode, FaDatabase, FaRobot, FaShieldAlt, FaTools } from 'react-icons/fa';
import { portfolioData } from '../../data/portfolioData';
import Typography from '../common/Typography';
import Badge from '../common/Badge';
import Card from '../common/Card';
import Reveal from '../animations/Reveal';

export default function Skills() {
  const { skills } = portfolioData;

  const categoryIcons = {
    Frontend: FaCode,
    'Backend & Database': FaDatabase,
    'AI & Data Science': FaRobot,
    'Cybersecurity & OSINT': FaShieldAlt,
    'Tools & Workflows': FaTools,
  };

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900 glass">
      <div className="mx-auto max-w-5xl px-4">
        <Typography
          variant="h2"
          className="mb-8 text-center text-primary-600 dark:text-primary-400"
        >
          Skills
        </Typography>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {skills.map((cat) => (
            <Reveal key={cat.category} y={18} duration={0.45} amount={0.2} whileHover={{ y: -4 }}>
              <Card className="h-full space-y-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-primary/10 text-accent-secondary">
                    {(() => {
                      const Icon = categoryIcons[cat.category] || FaCode;
                      return <Icon className="h-5 w-5" aria-hidden="true" />;
                    })()}
                  </span>
                  <Typography variant="subtitle" className="text-slate-100">
                    {cat.category}
                  </Typography>
                </div>

                <div className="flex flex-wrap gap-2">
                  {cat.items.map(({ name, icon: Icon }) => (
                    <Badge
                      key={name}
                      variant="primary"
                      className="flex items-center gap-2 px-3 py-2"
                    >
                      {Icon && <Icon className="h-4 w-4 shrink-0" />}
                      <span>{name}</span>
                    </Badge>
                  ))}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
