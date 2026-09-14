import { motion, useReducedMotion } from 'framer-motion';
import { FaArrowDown, FaDownload } from 'react-icons/fa';
import { portfolioData } from '../../data';

import Typography from '../common/Typography';
import Button from '../common/Button';
import HeroActions from './HeroActions';
import { heroContentVariants } from './heroVariants';

const HeroContent = ({ personalInfo, onContact }) => {
  const shouldReduceMotion = useReducedMotion();
  const { name, title, secondaryTitle, github, linkedin, resumeUrl, availability } = personalInfo;
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
        <Typography
          variant="body"
          className="font-semibold uppercase tracking-[0.3em] text-accent-secondary"
        >
          {secondaryTitle}
        </Typography>
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
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent-secondary lg:justify-start">
          <span>Open to:</span>
          {availability.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>

      <HeroActions github={github} linkedin={linkedin} />
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
        <Button variant="outline" size="lg" href={resumeUrl} icon={FaDownload}>
          View Resume
        </Button>
        <Button variant="primary" size="lg" onClick={onContact} icon={FaArrowDown}>
          Let&apos;s Talk
        </Button>
      </div>
    </motion.div>
  );
};

export default HeroContent;
