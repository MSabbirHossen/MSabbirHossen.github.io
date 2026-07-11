import { Link } from 'react-router-dom';
import { FaArrowRight, FaGithub, FaGlobe } from 'react-icons/fa';

export default function ProjectLinks({ project }) {
  return (
    <div className="mt-auto flex flex-wrap items-center justify-between gap-3 text-slate-700 dark:text-slate-300">
      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm font-medium text-accent-primary transition hover:underline"
          aria-label={`View ${project.title} source code on GitHub`}
        >
          <FaGithub aria-hidden="true" />
          GitHub
        </a>
      )}

      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm font-medium text-accent-primary transition hover:underline"
          aria-label={`Open ${project.title} live demo`}
        >
          <FaGlobe aria-hidden="true" />
          Live Demo
        </a>
      )}

      <Link
        to={`/projects/${project.id}`}
        className="flex items-center gap-2 text-sm font-medium text-accent-primary transition hover:underline"
        aria-label={`View details for ${project.title}`}
      >
        Details
        <FaArrowRight aria-hidden="true" />
      </Link>
    </div>
  );
}
