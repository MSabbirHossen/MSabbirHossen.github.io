import { Link } from 'react-router-dom';
import { FaArrowRight, FaBriefcase, FaBuilding, FaExternalLinkAlt } from 'react-icons/fa';
import { portfolioData } from '../../data';
import SectionWrapper from '../common/SectionWrapper';
import Card from '../common/Card';
import Button from '../common/Button';
import Typography from '../common/Typography';
import Reveal from '../animations/Reveal';

export default function Experience({ limit = 4 }) {
  const { experience } = portfolioData;
  const displayedExperience = limit ? experience.slice(0, limit) : experience;

  return (
    <SectionWrapper id="experience" title="Experience" className="mx-auto max-w-5xl px-4 sm:px-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {displayedExperience.map((role, idx) => (
          <Reveal
            key={`${role.id || role.company}-${idx}`}
            y={18}
            duration={0.45}
            delay={idx * 0.08}
            amount={0.2}
          >
            <Card className="flex h-full flex-col justify-between overflow-hidden border-default p-6 sm:p-8 transition-all duration-300 hover:border-accent-primary/40">
              <div>
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-accent-primary/20 bg-accent-primary/10 text-accent-primary">
                      <FaBriefcase className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div>
                      <Typography
                        variant="h3"
                        className="text-lg font-bold text-primary sm:text-xl"
                      >
                        {role.role}
                      </Typography>
                      <p className="text-xs font-medium text-muted">{role.period}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3.5">
                  <Typography
                    variant="subtitle"
                    className="flex items-center gap-2 font-medium text-secondary"
                  >
                    <FaBuilding className="h-4 w-4 shrink-0 text-accent-secondary" />
                    {role.company}
                  </Typography>

                  {role.desc && (
                    <Typography variant="body" className="text-sm leading-relaxed text-muted">
                      {role.desc}
                    </Typography>
                  )}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-end gap-3 border-t border-default/50 pt-4">
                {role.projectSlug && (
                  <Button
                    as={Link}
                    to={`/projects/${role.projectSlug}`}
                    variant="primary"
                    size="sm"
                  >
                    Case Study
                  </Button>
                )}
                {role.liveUrl && (
                  <Button
                    href={role.liveUrl}
                    variant="outline"
                    size="sm"
                    icon={FaExternalLinkAlt}
                    iconPosition="right"
                  >
                    Live Demo
                  </Button>
                )}
              </div>
            </Card>
          </Reveal>
        ))}
      </div>

      {limit && experience.length > limit && (
        <div className="mt-8 flex justify-center">
          <Button
            as={Link}
            to="/experience"
            variant="outline"
            size="md"
            icon={FaArrowRight}
            iconPosition="right"
            className="group border-default shadow-sm hover:border-accent-primary hover:text-accent-primary"
          >
            Explore Full Timeline ({experience.length})
          </Button>
        </div>
      )}
    </SectionWrapper>
  );
}
