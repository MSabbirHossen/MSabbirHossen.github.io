import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Typography from '../common/Typography';

const ProjectHero = ({ project }) => {
  return (
    <div>
      {/* Back Button */}

      <Link
        to="/"
        className="mb-10 inline-flex items-center gap-2 text-indigo-500 transition hover:text-indigo-600"
      >
        <FaArrowLeft />
        Back to Portfolio
      </Link>

      {/* Header */}

      <div className="mb-12 space-y-4">
        <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
          {project.category}
        </span>

        <Typography variant="h1">{project.title}</Typography>

        <Typography variant="body" className="max-w-4xl text-slate-500 dark:text-slate-400">
          {project.overview}
        </Typography>
      </div>
    </div>
  );
};

export default ProjectHero;
