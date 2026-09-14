import { FaBriefcase } from 'react-icons/fa';
import { portfolioData } from '../../data';
import SectionWrapper from '../common/SectionWrapper';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Typography from '../common/Typography';
import Reveal from '../animations/Reveal';

export default function Experience() {
  const { experience } = portfolioData;

  return (
    <SectionWrapper
      id="experience"
      eyebrow="Experience"
      title="Where I've Applied My Skills"
      description="Real-world and open-source work that shows how I build, ship, and improve software."
      className="mx-auto max-w-5xl px-6"
    >
      <div className="relative">
        <div className="absolute left-4 top-0 h-full w-px bg-linear-to-b from-accent-primary/60 via-accent-secondary/40 to-transparent md:left-6" />

        {experience.map((role, idx) => (
          <Reveal
            key={`${role.company}-${idx}`}
            className="relative mb-8 flex items-start gap-6 last:mb-0"
            y={18}
            duration={0.45}
            delay={idx * 0.08}
            amount={0.2}
          >
            <div className="absolute left-0 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-default bg-surface text-accent-primary md:left-2 md:-translate-x-1/2">
              <FaBriefcase className="h-4 w-4" aria-hidden="true" />
            </div>

            <div className="ml-12 w-full md:ml-14">
              <Card className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="primary">{role.period}</Badge>
                  <Typography variant="subtitle" className="text-primary">
                    {role.role}
                  </Typography>
                </div>
                <Typography variant="body" className="text-secondary">
                  {role.company}
                </Typography>
                <Typography variant="body" className="text-muted">
                  {role.desc}
                </Typography>
                {role.outcomes && (
                  <ul className="space-y-2">
                    {role.outcomes.map((outcome) => (
                      <li key={outcome} className="flex gap-2 text-sm text-muted">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-secondary" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </Card>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
