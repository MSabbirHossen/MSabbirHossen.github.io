import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../../data/portfolioData';
import Typography from '../common/Typography';
import Badge from '../common/Badge';
import Card from '../common/Card';
import Button from '../common/Button';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaCode, FaGithub, FaGlobe } from 'react-icons/fa';
import Reveal from '../animations/Reveal';
import TechnologyIcons from './TechnologyIcons';
import ProjectLinks from './ProjectLinks';

export default function ProjectCard({ project }) {
  const { title, overview, technologies, githubUrl, liveUrl } = project;

  return (
    <Card className="flex h-full flex-col justify-between space-y-5 bg-white p-6 shadow-md dark:bg-gray-800">
      <div className="space-y-3">
        <Typography variant="subtitle" className="text-slate-900 dark:text-slate-100">
          {project.title}
        </Typography>
        <Typography variant="body" className="text-slate-700 dark:text-slate-300">
          {project.overview.length > 120
            ? `${project.overview.substring(0, 120)}...`
            : project.overview}
        </Typography>
      </div>

      <TechnologyIcons technologies={project.technologies} />

      {/* <div className="mt-auto flex flex-wrap gap-3 justify-between items-center text-slate-700 dark:text-slate-300">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm flex items-center gap-2 font-medium text-accent-primary hover:underline"
          >
            <FaGithub></FaGithub>
            GitHub
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm flex items-center gap-2 font-medium text-accent-primary hover:underline"
          >
            <FaGlobe></FaGlobe>
            Live Demo
          </a>
        )}
        <Link
          to={`/projects/${project.id}`}
          className="text-sm flex items-center gap-2 font-medium text-accent-primary hover:underline"
        >
          Details
          <FaArrowRight></FaArrowRight>
        </Link>
      </div> */}
      <ProjectLinks project={project} />
    </Card>
  );
}
