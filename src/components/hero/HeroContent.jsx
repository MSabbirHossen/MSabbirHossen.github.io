import { motion, useReducedMotion } from 'framer-motion';
import { FaArrowDown, FaDownload } from 'react-icons/fa';
import { portfolioData } from '../../data';

import Typography from '../common/Typography';
import Button from '../common/Button';
import HeroActions from './HeroActions';
import { heroContentVariants } from './heroVariants';

const HeroContent = ({ personalInfo, onContact }) => {
  const shouldReduceMotion = useReducedMotion();
  const { name, title, github, linkedin, resumeUrl, availability } = personalInfo;
  const completedProjects = portfolioData.projects.filter(
    (project) => project.status === 'Completed'
  ).length;

  return (
    <motion.div
      className="space-y-7 text-center lg:text-left"
      variants={heroContentVariants}
      initial={shouldReduceMotion ? false : 'hidden'}
      animate="visible"
    >
      <div className="space-y-4">
        {/* Availability status badge */}
        <div className="flex items-center justify-center lg:justify-start">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-400 shadow-sm shadow-emerald-500/10">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Available for new opportunities
          </span>
        </div>

        <Typography variant="h1" gradient className="max-w-3xl text-balance">
          {name}
        </Typography>
        <Typography variant="subtitle" className="max-w-2xl text-secondary">
          {title}
        </Typography>
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-secondary lg:justify-start">
          <span>{completedProjects} shipped full-stack applications</span>
          <span aria-hidden="true" className="text-accent-secondary">
            ·
          </span>
          <span>React · Node.js · MongoDB</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-muted lg:justify-start">
          <span className="text-secondary font-medium">Open to:</span>
          {availability.map((item) => (
            <span
              key={item}
              className="inline-flex items-center rounded-lg border border-default bg-surface/80 px-2.5 py-0.5 text-xs text-secondary"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2 lg:justify-start">
        <Button variant="primary" size="md" onClick={onContact} icon={FaArrowDown}>
          Let&apos;s Talk
        </Button>
        <Button variant="outline" size="md" href={resumeUrl} icon={FaDownload}>
          View Resume
        </Button>
        <HeroActions github={github} linkedin={linkedin} />
      </div>
    </motion.div>
  );
};

export default HeroContent;
