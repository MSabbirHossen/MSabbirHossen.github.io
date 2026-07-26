import React from 'react';
import Typography from '../common/Typography';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const ProjectNotFound = () => {
  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <Typography variant="h2">Project not found</Typography>

      <Typography variant="body" className="mt-4 text-slate-500">
        The project you requested does not exist.
      </Typography>

      <Link to="/" className="mt-8 inline-flex items-center gap-2 text-indigo-600 hover:underline">
        <FaArrowLeft />
        Back Home
      </Link>
    </div>
  );
};

export default ProjectNotFound;
