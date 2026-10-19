import { Link } from 'react-router-dom';
import {
  FaGraduationCap,
  FaArrowRight,
  FaUniversity,
  FaCheckCircle,
  FaBookOpen,
} from 'react-icons/fa';
import { portfolioData } from '../../data';
import Typography from '../common/Typography';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import Reveal from '../animations/Reveal';

export default function Education({ limit = 2 }) {
  const { education } = portfolioData;
  const displayedEducation = limit ? education.slice(0, limit) : education;

  return (
    <section id="education" className="section-shell">
      <div className="mx-auto max-w-5xl px-4">
        <Typography variant="h2" className="mb-8 text-center text-primary">
          Academic Background
        </Typography>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {displayedEducation.map((edu, index) => {
            const isCurrent = edu.period?.toLowerCase().includes('present');
            const isArabic = edu.degree?.toLowerCase().includes('arabic');
            const Icon = isArabic ? FaBookOpen : FaGraduationCap;

            return (
              <Reveal
                key={`${edu.degree}-${index}`}
                y={18}
                duration={0.45}
                delay={index * 0.1}
                amount={0.2}
              >
                <Card className="flex h-full flex-col justify-between overflow-hidden border-default p-6 sm:p-8 transition-all duration-300 hover:border-accent-primary/40">
                  <div>
                    <div className="mb-4 flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${
                            isCurrent
                              ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
                              : 'border-accent-primary/20 bg-accent-primary/10 text-accent-primary'
                          }`}
                        >
                          <Icon className="h-6 w-6" aria-hidden="true" />
                        </div>
                        <Typography
                          variant="h3"
                          className="text-lg font-bold text-primary sm:text-xl"
                        >
                          {edu.degree}
                        </Typography>
                      </div>
                    </div>

                    <div className="space-y-3.5">
                      <Typography
                        variant="subtitle"
                        className="flex items-center gap-2 font-medium text-secondary"
                      >
                        <FaUniversity className="h-4 w-4 shrink-0 text-accent-secondary" />
                        {edu.institution}
                      </Typography>

                      {edu.desc && (
                        <Typography variant="body" className="text-sm leading-relaxed text-muted">
                          {edu.desc}
                        </Typography>
                      )}
                    </div>
                  </div>

                  <div>
                    {edu.topics && edu.topics.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-2 border-t border-default/50 pt-4">
                        {edu.topics.map((item) => (
                          <span
                            key={item}
                            className="inline-flex items-center gap-1 rounded-lg border border-default bg-surface/80 px-2.5 py-1 text-xs font-medium text-secondary"
                          >
                            <FaCheckCircle className="h-3 w-3 text-accent-secondary" />
                            {item}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-default/50 pt-3.5">
                      <div className="flex items-center gap-2">
                        {isCurrent ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                            Current Study
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-secondary/25 bg-accent-secondary/10 px-2.5 py-0.5 text-xs font-semibold text-accent-secondary">
                            <FaCheckCircle className="h-3 w-3" />
                            Completed
                          </span>
                        )}
                      </div>
                      {edu.period && edu.period.toLowerCase() !== 'completed' && (
                        <Badge variant={isCurrent ? 'secondary' : 'primary'}>{edu.period}</Badge>
                      )}
                    </div>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>

        {/* Full Academic Timeline CTA Button */}
        {education.length > displayedEducation.length && (
          <div className="mt-8 flex justify-center">
            <Button
              as={Link}
              to="/education"
              variant="outline"
              size="md"
              icon={FaArrowRight}
              iconPosition="right"
              className="group border-default shadow-sm hover:border-accent-primary hover:text-accent-primary"
            >
              Explore Full Academic Timeline ({education.length})
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
