import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { FaArrowRight, FaCheckCircle, FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

import Card from '../common/Card';
import Typography from '../common/Typography';
import Badge from '../common/Badge';
import Button from '../common/Button';
import ProjectStatusBadge from './ProjectStatusBadge';
import { useTranslation } from '../../i18n';

export default function FlagshipProjectCard({ project }) {
  const { t, isRTL } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const {
    id,
    title,
    category,
    overview,
    screenshots,
    role,
    status,
    keyFeatures,
    technologies,
    liveUrl,
    githubUrl,
  } = project;

  const image = screenshots && screenshots.length > 0 ? screenshots[0] : null;
  const imageSrc = image
    ? image.startsWith('http')
      ? image
      : `${import.meta.env.BASE_URL}${image.replace(/^\//, '')}`
    : null;

  const topTech = technologies?.slice(0, 8) ?? [];
  const highlights = keyFeatures?.slice(0, 3) ?? [];

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      variants={{ rest: { y: 0 }, hover: { y: shouldReduceMotion ? 0 : -5 } }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: 'easeOut' }}
      className="w-full"
    >
      <Card
        spotlight
        hover
        className="group relative overflow-hidden border-default p-6 sm:p-8 transition-all duration-300 hover:border-accent-primary/50 shadow-xl shadow-black/10"
      >
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Flagship Screenshot (7 cols on lg) */}
          <div className="lg:col-span-7">
            <Link
              to={`/projects/${id}`}
              className="group/img relative block overflow-hidden rounded-xl border border-default surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
              aria-label={t('projects.viewCaseStudyAria', { title }, `View ${title} case study`)}
            >
              {imageSrc ? (
                <img
                  src={imageSrc}
                  alt={`${title} - ${category} screenshot`}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="aspect-[16/10] w-full object-cover transition-transform duration-500 ease-out group-hover/img:scale-[1.03]"
                />
              ) : (
                <div className="aspect-[16/10] w-full flex items-center justify-center bg-surface text-muted">
                  <span>{title} preview</span>
                </div>
              )}

              {/* Gradient Overlay & Hover Hint */}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-dark-bg/75 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/img:opacity-100 flex items-end p-5"
                aria-hidden="true"
              >
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white drop-shadow-md">
                  <span>{t('projects.inspectCaseStudy', {}, 'Inspect Case Study')}</span>
                  <FaArrowRight className={`h-3 w-3 ${isRTL ? 'rotate-180' : ''}`} />
                </span>
              </div>
            </Link>
          </div>

          {/* Right Column: Flagship Metadata & Engineering Highlights (5 cols on lg) */}
          <div className="flex flex-col justify-between space-y-5 lg:col-span-5">
            <div>
              {/* Badges Row: Flagship + Status + Role */}
              <div className="flex flex-wrap items-center gap-2 pb-1">
                <Badge variant="primary" className="text-xs font-bold px-3 py-1">
                  {t('projects.flagshipBadge', {}, '⭐ Flagship Monorepo')}
                </Badge>

                <ProjectStatusBadge status={status} />

                {role && (
                  <span className="inline-flex items-center rounded-full border border-default bg-surface/80 px-2.5 py-0.5 text-xs font-medium text-secondary">
                    {role}
                  </span>
                )}
              </div>

              {/* Project Title & Category */}
              <div>
                <Link
                  to={`/projects/${id}`}
                  className="group-hover:text-accent-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary rounded"
                >
                  <Typography
                    variant="h3"
                    className="text-2xl font-extrabold text-primary sm:text-3xl"
                  >
                    {title}
                  </Typography>
                </Link>
                <p className="text-xs font-semibold uppercase tracking-wider text-accent-secondary">
                  {category}
                </p>
              </div>

              {/* Problem & Overview Description */}
              <Typography
                variant="body"
                className="mt-3 text-sm leading-relaxed text-secondary line-clamp-3"
              >
                {overview}
              </Typography>

              {/* Verified Key Engineering Highlights */}
              {highlights.length > 0 && (
                <div className="mt-4 space-y-2 border-t border-default/40 pt-3">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted">
                    {t('projects.keyHighlights', {}, 'Key Engineering Highlights:')}
                  </p>
                  <ul className="space-y-1.5 text-xs text-secondary">
                    {highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2">
                        <FaCheckCircle
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-secondary"
                          aria-hidden="true"
                        />
                        <span className="leading-snug">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Verified Technology Stack Pills */}
              {topTech.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {topTech.map((tech) => (
                    <span
                      key={tech.name}
                      className="inline-flex items-center gap-1 rounded-md border border-default bg-surface/70 px-2 py-0.5 text-[11px] font-medium text-secondary"
                    >
                      {tech.icon && (
                        <tech.icon className="h-3 w-3 text-accent-secondary" aria-hidden="true" />
                      )}
                      <span>{tech.name}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Verified Project Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-default/50">
              <Button
                as={Link}
                to={`/projects/${id}`}
                variant="primary"
                size="sm"
                icon={FaArrowRight}
                iconPosition={isRTL ? 'left' : 'right'}
                className="shadow-md shadow-accent-primary/25"
              >
                {t('common.caseStudy', {}, 'Case Study')}
              </Button>

              {liveUrl && (
                <Button
                  href={liveUrl}
                  variant="outline"
                  size="sm"
                  icon={FaExternalLinkAlt}
                  iconPosition={isRTL ? 'left' : 'right'}
                  className="text-accent-secondary hover:text-cyan-400 hover:border-accent-secondary/50"
                >
                  {t('common.liveDemo', {}, 'Live Demo')}
                </Button>
              )}

              {githubUrl && (
                <Button
                  href={githubUrl}
                  variant="outline"
                  size="sm"
                  icon={FaGithub}
                  className="text-secondary hover:text-accent-primary hover:border-accent-primary/50"
                >
                  {t('common.sourceCode', {}, 'GitHub')}
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
