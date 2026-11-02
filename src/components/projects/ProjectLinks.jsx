import { Link } from 'react-router-dom';
import { FaArrowRight, FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import Button from '../common/Button';

export default function ProjectLinks({ project, className = '' }) {
  const { githubUrl, liveUrl, id, title } = project;

  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-default/50 ${className}`}
    >
      {/* External Repository & Live Demo Actions */}
      <div className="flex items-center gap-2">
        {githubUrl && (
          <Button
            href={githubUrl}
            variant="outline"
            size="sm"
            icon={FaGithub}
            ariaLabel={`View source code for ${title} on GitHub`}
            className="text-xs text-secondary hover:text-accent-primary hover:border-accent-primary/40 px-3 py-1.5"
          >
            GitHub
          </Button>
        )}

        {liveUrl && (
          <Button
            href={liveUrl}
            variant="outline"
            size="sm"
            icon={FaExternalLinkAlt}
            ariaLabel={`Open live application for ${title}`}
            className="text-xs text-accent-secondary hover:text-cyan-400 hover:border-accent-secondary/40 px-3 py-1.5"
          >
            Live Demo
          </Button>
        )}
      </div>

      {/* Case Study Details Action */}
      <Button
        as={Link}
        to={`/projects/${id}`}
        variant="primary"
        size="sm"
        ariaLabel={`Read detailed case study for ${title}`}
        className="text-xs shadow-sm shadow-accent-primary/20 group/btn"
      >
        <span>Case Study</span>
        <FaArrowRight className="h-3 w-3 transition-transform duration-200 group-hover/btn:translate-x-1" />
      </Button>
    </div>
  );
}
