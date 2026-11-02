import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

import Card from '../common/Card';
import Typography from '../common/Typography';
import ProjectImage from './ProjectImage';
import ProjectStatusBadge from './ProjectStatusBadge';
import ProjectLinks from './ProjectLinks';

export default function ProjectCard({ project }) {
  const shouldReduceMotion = useReducedMotion();
  const { id, title, category, overview, role, status, keyFeatures, technologies } = project;

  const topTech = technologies?.slice(0, 6) ?? [];
  const highlights = keyFeatures?.slice(0, 2) ?? [];

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      variants={{ rest: { y: 0 }, hover: { y: shouldReduceMotion ? 0 : -5 } }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: 'easeOut' }}
      className="h-full flex flex-col"
    >
      <Card
        spotlight
        hover
        className="group flex h-full flex-col justify-between overflow-hidden border-default p-5 sm:p-6 transition-all duration-300 hover:border-accent-primary/45 shadow-lg shadow-black/5"
      >
        <div className="flex flex-col space-y-4">
          {/* Project Screenshot with smooth zoom */}
          <Link
            to={`/projects/${id}`}
            tabIndex={-1}
            aria-hidden="true"
            className="block focus:outline-none"
          >
            <ProjectImage project={project} />
          </Link>

          {/* Badges: Category + Status + Role */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-accent-secondary/30 bg-accent-secondary/10 px-2.5 py-0.5 text-xs font-semibold text-accent-secondary">
              {category}
            </span>

            <ProjectStatusBadge status={status} />

            {role && (
              <span className="inline-flex items-center rounded-full border border-default bg-surface/80 px-2 py-0.5 text-[11px] font-medium text-muted">
                {role}
              </span>
            )}
          </div>

          {/* Title */}
          <div>
            <Link
              to={`/projects/${id}`}
              className="group-hover:text-accent-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary rounded"
            >
              <Typography
                variant="h3"
                className="text-xl font-bold text-primary sm:text-2xl line-clamp-1"
              >
                {title}
              </Typography>
            </Link>
          </div>

          {/* Problem & Overview */}
          <Typography
            variant="body"
            className="line-clamp-3 min-h-[3.75rem] text-xs sm:text-sm leading-relaxed text-secondary"
          >
            {overview}
          </Typography>

          {/* Verified Engineering Highlights */}
          {highlights.length > 0 && (
            <div className="space-y-1.5 border-t border-default/40 pt-3">
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted">
                Key Engineering Highlights:
              </p>
              <ul className="space-y-1 text-xs text-secondary">
                {highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-1.5">
                    <FaCheckCircle
                      className="mt-0.5 h-3 w-3 shrink-0 text-accent-secondary"
                      aria-hidden="true"
                    />
                    <span className="line-clamp-1">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technology Badges */}
          {topTech.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
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

        {/* Action Links */}
        <ProjectLinks project={project} className="mt-5" />
      </Card>
    </motion.div>
  );
}
