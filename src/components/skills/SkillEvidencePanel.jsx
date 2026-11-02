import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  FaArrowRight,
  FaCheckCircle,
  FaExternalLinkAlt,
  FaGithub,
  FaInfoCircle,
  FaTimes,
} from 'react-icons/fa';

import Card from '../common/Card';
import Typography from '../common/Typography';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { portfolioData } from '../../data';
import { EASINGS } from '../../lib/motion';

export default function SkillEvidencePanel({ selectedSkill, onClear }) {
  const panelRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { projects } = portfolioData;

  // Escape key closes selection
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClear]);

  if (!selectedSkill) return null;

  const associatedProjects = projects.filter((project) =>
    selectedSkill.projectSlugs?.includes(project.id)
  );

  const Icon = selectedSkill.icon;
  const brandColor = selectedSkill.color || '#6366F1';
  const isDemonstrated = selectedSkill.type === 'demonstrated' && associatedProjects.length > 0;

  return (
    <motion.div
      ref={panelRef}
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: EASINGS.smooth }}
      className="mt-8"
      role="region"
      aria-label={`Evidence and project applications for ${selectedSkill.name}`}
    >
      <Card
        spotlight
        className="relative overflow-hidden border-accent-primary/40 bg-surface/95 p-6 sm:p-8 shadow-2xl shadow-accent-primary/10"
      >
        {/* Top Header of Evidence Panel */}
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-default/50 pb-5">
          <div className="flex items-center gap-3.5 min-w-0">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border shadow-inner"
              style={{
                backgroundColor: `${brandColor}15`,
                borderColor: `${brandColor}40`,
                color: brandColor,
              }}
            >
              {Icon && <Icon className="h-6 w-6" aria-hidden="true" />}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Typography variant="h3" className="text-xl font-bold text-primary sm:text-2xl">
                  {selectedSkill.name}
                </Typography>

                <Badge
                  variant={isDemonstrated ? 'success' : 'info'}
                  className="text-xs font-semibold"
                >
                  {isDemonstrated
                    ? `${associatedProjects.length} Verified Project${associatedProjects.length > 1 ? 's' : ''}`
                    : 'Active Study Topic'}
                </Badge>
              </div>

              <Typography variant="body" className="mt-1 text-xs text-secondary sm:text-sm">
                {selectedSkill.description}
              </Typography>
            </div>
          </div>

          <button
            type="button"
            onClick={onClear}
            className="rounded-lg p-2 text-muted hover:bg-surface-hover hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary transition-colors cursor-pointer"
            aria-label="Clear selected skill filter"
          >
            <span className="flex items-center gap-1.5 text-xs font-medium">
              <span className="hidden sm:inline">Close</span>
              <FaTimes className="h-4 w-4" />
            </span>
          </button>
        </div>

        {/* Associated Projects Section */}
        {isDemonstrated ? (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-wider text-muted">
                Demonstrated In Real Applications ({associatedProjects.length})
              </p>
              <span className="text-xs text-secondary hidden sm:inline">
                Click any project to inspect its case study
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {associatedProjects.map((project) => {
                const image = project.screenshots?.[0];
                const imageSrc = image
                  ? image.startsWith('http')
                    ? image
                    : `${import.meta.env.BASE_URL}${image.replace(/^\//, '')}`
                  : null;

                return (
                  <div
                    key={project.id}
                    className="group flex flex-col justify-between rounded-xl border border-default bg-surface/80 p-4 transition-all duration-300 hover:border-accent-primary/40 hover:bg-surface"
                  >
                    <div className="flex items-start gap-4">
                      {imageSrc && (
                        <div className="hidden h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-default surface sm:block">
                          <img
                            src={imageSrc}
                            alt=""
                            aria-hidden="true"
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      )}

                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/projects/${project.id}`}
                            className="font-bold text-primary group-hover:text-accent-primary transition-colors text-sm sm:text-base truncate"
                          >
                            {project.title}
                          </Link>
                          {project.featured && (
                            <span className="shrink-0 text-[10px] font-semibold text-accent-warning">
                              ⭐
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-accent-secondary font-medium truncate">
                          {project.category}
                        </p>

                        <p className="text-xs text-secondary line-clamp-2">{project.overview}</p>
                      </div>
                    </div>

                    {/* Action buttons inside evidence item */}
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-default/40 pt-3">
                      <div className="flex items-center gap-2">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-medium text-accent-secondary hover:underline"
                          >
                            <span>Live Demo</span>
                            <FaExternalLinkAlt className="h-2.5 w-2.5" />
                          </a>
                        )}

                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-medium text-secondary hover:text-primary hover:underline ml-2"
                          >
                            <FaGithub className="h-3 w-3" />
                            <span>GitHub</span>
                          </a>
                        )}
                      </div>

                      <Button
                        as={Link}
                        to={`/projects/${project.id}`}
                        variant="primary"
                        size="sm"
                        className="text-xs py-1 px-3"
                      >
                        <span>Case Study</span>
                        <FaArrowRight className="h-2.5 w-2.5" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Honest Empty State for Learning Topics */
          <div className="mt-6 flex flex-col items-center justify-center rounded-xl border border-dashed border-default/80 bg-surface/50 p-6 text-center space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-secondary/10 text-accent-secondary">
              <FaInfoCircle className="h-5 w-5" aria-hidden="true" />
            </div>

            <Typography variant="h4" className="text-base font-bold text-primary">
              Active Learning & Exploration Topic
            </Typography>

            <Typography variant="body" className="max-w-md text-xs leading-relaxed text-secondary">
              {selectedSkill.name} is an active focus area in my continuous learning roadmap. In
              accordance with strict portfolio integrity, it is not artificially associated with
              unverified production code.
            </Typography>

            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold pt-1">
              <FaCheckCircle className="h-3.5 w-3.5" />
              <span>Evidence-based portfolio standard</span>
            </div>
          </div>
        )}
      </Card>
    </motion.div>
  );
}
