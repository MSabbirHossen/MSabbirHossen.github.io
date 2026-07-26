import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowDown, FaDownload } from 'react-icons/fa';

import Typography from '../common/Typography';
import Button from '../common/Button';
import HeroActions from './HeroActions';
import { heroContentVariants } from './heroVariants';

const HeroContent = ({ personalInfo, onContact }) => {
  const { name, title, secondaryTitle, github, linkedin, facebook, resumeUrl } = personalInfo;

  return (
    <motion.div
      className="space-y-7 text-center lg:text-left"
      variants={heroContentVariants}
      initial="hidden"
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
        {/* <Typography variant="body" className="max-w-2xl text-slate-400">
              {tagline}
            </Typography> */}
      </div>

      <HeroActions
        github={github}
        linkedin={linkedin}
        facebook={facebook}
        resumeUrl={resumeUrl}
        onContact={onContact}
      />
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
        <Button variant="outline" size="lg" href={resumeUrl} icon={FaDownload}>
          Download Resume
        </Button>
        <Button variant="primary" size="lg" onClick={onContact} icon={FaArrowDown}>
          Get in Touch
        </Button>
      </div>
    </motion.div>
  );
};

export default HeroContent;
