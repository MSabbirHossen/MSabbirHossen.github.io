import { Link } from 'react-router-dom';
import { FaArrowRight, FaGithub, FaGlobe } from 'react-icons/fa';
import Button from '../common/Button';

export default function ProjectLinks({ project }) {
  const { githubUrl, liveUrl } = project;

  return (
    <div className="mt-auto space-y-4">
      <div className="flex items-center justify-around gap-5">
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-medium text-accent-primary underline-offset-4 transition-all duration-300 hover:text-accent-secondary hover:underline focus-visible:ring-2 focus-visible:ring-accent-primary/30"
          >
            <FaGithub />
            GitHub
          </a>
        )}

        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-medium text-accent-primary underline-offset-4 transition-all duration-300 hover:text-accent-secondary hover:underline focus-visible:ring-2 focus-visible:ring-accent-primary/30"
          >
            <FaGlobe />
            Live Demo
          </a>
        )}
      </div>

      <Button
        as={Link}
        to={`/projects/${project.id}`}
        size="sm"
        className="w-full light:shadow-md light:shadow-accent-primary/20 light:hover:shadow-lg light:hover:shadow-accent-primary/25"
      >
        View Details
        <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
      </Button>
    </div>
  );
}
