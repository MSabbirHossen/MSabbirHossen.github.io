import { Link } from 'react-router-dom';
import { FaGraduationCap, FaArrowRight, FaUniversity, FaCheckCircle } from 'react-icons/fa';
import { portfolioData } from '../../data';
import Typography from '../common/Typography';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import Reveal from '../animations/Reveal';

export default function Education() {
  const { education } = portfolioData;
  const currentStudy =
    education.find((edu) => edu.period?.toLowerCase().includes('present')) || education[0];

  return (
    <section id="education" className="section-shell">
      <div className="mx-auto max-w-5xl px-4">
        <Typography variant="h2" className="mb-8 text-center text-primary">
          Academic Background
        </Typography>

        {/* Current Study Spotlight Card */}
        <div className="mx-auto max-w-3xl">
          <Reveal y={18} duration={0.45} amount={0.2}>
            <Card className="relative overflow-hidden border-default p-6 sm:p-8 hover:border-accent-primary/40 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent-primary/10 text-accent-primary border border-accent-primary/20">
                    <FaGraduationCap className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Current Study
                      </span>
                      <Badge variant="secondary">{currentStudy.period}</Badge>
                    </div>
                    <Typography
                      variant="h3"
                      className="mt-1 text-primary font-bold text-lg sm:text-xl"
                    >
                      {currentStudy.degree}
                    </Typography>
                  </div>
                </div>
              </div>

              <div className="space-y-3.5">
                <Typography
                  variant="subtitle"
                  className="text-secondary font-medium flex items-center gap-2"
                >
                  <FaUniversity className="h-4 w-4 text-accent-secondary" />
                  {currentStudy.institution}
                </Typography>

                {currentStudy.desc && (
                  <Typography variant="body" className="text-muted leading-relaxed">
                    {currentStudy.desc}
                  </Typography>
                )}

                <div className="flex flex-wrap gap-2 pt-2 border-t border-default/50">
                  {['Computer Science', 'Software Development', 'Cybersecurity', 'IT Systems'].map(
                    (item) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-1 rounded-lg border border-default bg-surface/80 px-2.5 py-1 text-xs text-secondary font-medium"
                      >
                        <FaCheckCircle className="h-3 w-3 text-accent-secondary" />
                        {item}
                      </span>
                    )
                  )}
                </div>
              </div>
            </Card>
          </Reveal>

          {/* Full Academic Timeline CTA Button */}
          {education.length > 1 && (
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
      </div>
    </section>
  );
}
