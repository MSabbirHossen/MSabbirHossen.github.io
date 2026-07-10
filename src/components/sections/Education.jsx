import { motion } from 'framer-motion';
import { FaGraduationCap } from 'react-icons/fa';
import { portfolioData } from '../../data/portfolioData';
import Typography from '../common/Typography';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Reveal from '../animations/Reveal';

export default function Education() {
  const { education } = portfolioData;
  return (
    <section id="education" className="py-20 bg-gray-50 dark:bg-gray-900 glass">
      <div className="mx-auto max-w-5xl px-4">
        <Typography
          variant="h2"
          className="mb-8 text-center text-primary-600 dark:text-primary-400"
        >
          Education
        </Typography>

        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-accent-primary/60 via-accent-secondary/40 to-transparent md:left-1/2" />

          {education.map((edu, idx) => (
            <Reveal
              key={`${edu.institution}-${idx}`}
              className={`relative mb-10 flex items-start gap-6 md:mb-12 ${
                idx % 2 === 0 ? 'md:justify-start' : 'md:justify-end'
              }`}
              y={18}
              duration={0.45}
              delay={idx * 0.08}
              amount={0.2}
            >
              <div className="absolute left-0 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-dark-surface text-accent-secondary md:left-1/2 md:-translate-x-1/2">
                <FaGraduationCap className="h-4 w-4" aria-hidden="true" />
              </div>

              <div className="ml-12 w-full md:ml-0 md:w-[calc(50%-2rem)]">
                <Card className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge variant="secondary">{edu.period}</Badge>
                    <Typography variant="subtitle" className="text-slate-100">
                      {edu.institution}
                    </Typography>
                  </div>
                  <Typography variant="body" className="text-slate-300">
                    {edu.degree}
                  </Typography>
                  {edu.desc && (
                    <Typography variant="body" className="text-slate-400">
                      {edu.desc}
                    </Typography>
                  )}
                </Card>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
