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
            className="flex items-center gap-2 text-sm text-accent-primary hover:underline"
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
            className="flex items-center gap-2 text-sm text-accent-primary hover:underline"
          >
            <FaGlobe />
            Live Demo
          </a>
        )}
      </div>

      <Button as={Link} to={`/projects/${project.id}`} size="sm" className="w-full">
        View Details
        <FaArrowRight />
      </Button>
    </div>
  );
}
