import { motion, useReducedMotion } from 'framer-motion';
import { FaArrowDown, FaDownload, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

import Typography from '../common/Typography';
import Button from '../common/Button';
import Badge from '../common/Badge';
import HeroActions from './HeroActions';
import { heroContainerVariants, heroItemVariants } from './heroVariants';
import { useTranslation } from '../../i18n';

const HeroContent = ({ personalInfo, onContact, onProjects }) => {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const { name, title, secondaryTitle, mission, github, linkedin, resumeUrl, shortLocation } =
    personalInfo;

  const resumeHref = `${import.meta.env.BASE_URL}${resumeUrl.replace(/^\//, '')}`;

  return (
    <motion.div
      className="space-y-6 text-center lg:text-left rtl:lg:text-right"
      variants={heroContainerVariants}
      initial={shouldReduceMotion ? false : 'hidden'}
      animate="visible"
    >
      {/* Top Badges: Availability Status & Location */}
      <motion.div
        variants={heroItemVariants}
        className="flex flex-wrap items-center justify-center gap-2.5 lg:justify-start"
      >
        <Badge variant="success" presentation="dot" className="px-3.5 py-1 text-xs">
          {t('hero.availability', {}, 'Available for new opportunities')}
        </Badge>

        <span className="inline-flex items-center gap-1.5 rounded-full border border-default bg-surface/70 px-3 py-1 text-xs font-medium text-secondary">
          <FaMapMarkerAlt className="h-3 w-3 text-accent-secondary" aria-hidden="true" />
          <span>{t('hero.location', {}, shortLocation)}</span>
        </span>
      </motion.div>

      {/* Name and Professional Title */}
      <motion.div variants={heroItemVariants} className="space-y-2">
        <Typography variant="h1" gradient className="max-w-3xl text-balance">
          {name}
        </Typography>

        <div className="space-y-1">
          <Typography
            variant="h2"
            className="text-2xl font-bold tracking-tight text-primary sm:text-3xl"
          >
            {t('hero.title', {}, title)}
          </Typography>
          <Typography
            variant="subtitle"
            className="text-sm font-medium uppercase tracking-wider text-accent-secondary sm:text-base"
          >
            {t('hero.secondaryTitle', {}, secondaryTitle)}
          </Typography>
        </div>
      </motion.div>

      {/* Concise Recruiter-Focused Introduction */}
      <motion.div variants={heroItemVariants}>
        <Typography
          variant="body"
          className="max-w-2xl text-base leading-relaxed text-secondary sm:text-lg"
        >
          {t('hero.mission', {}, mission)}
        </Typography>
      </motion.div>

      {/* Core Technology Pills */}
      <motion.div
        variants={heroItemVariants}
        className="flex flex-wrap items-center justify-center gap-2 lg:justify-start"
      >
        <span className="text-xs font-semibold uppercase tracking-wider text-muted me-1">
          {t('hero.stackLabel', {}, 'Stack:')}
        </span>
        {['React 19', 'TypeScript', 'Node.js', 'Express', 'MongoDB Atlas', 'Tailwind CSS'].map(
          (tech) => (
            <span
              key={tech}
              className="inline-flex items-center rounded-lg border border-default bg-surface/80 px-2.5 py-1 text-xs font-medium text-secondary transition-colors hover:border-accent-primary/40 hover:text-primary"
            >
              {tech}
            </span>
          )
        )}
      </motion.div>

      {/* Recruiter CTA Hierarchy: View Projects (Primary) -> Download CV (Secondary) -> Contact Me (Tertiary) */}
      <motion.div
        variants={heroItemVariants}
        className="flex flex-wrap items-center justify-center gap-3 pt-2 lg:justify-start"
      >
        {/* Primary CTA */}
        <Button
          variant="primary"
          size="md"
          onClick={onProjects}
          icon={FaArrowDown}
          className="shadow-lg shadow-accent-primary/25"
        >
          {t('hero.viewProjects', {}, 'View Projects')}
        </Button>

        {/* Secondary CTA */}
        <Button
          variant="outline"
          size="md"
          href={resumeHref}
          download="Md_Sabbir_Hossen_Resume.pdf"
          icon={FaDownload}
          className="border-default hover:border-accent-primary/50"
        >
          {t('hero.downloadCv', {}, 'Download CV')}
        </Button>

        {/* Tertiary CTA */}
        <Button
          variant="outline"
          size="md"
          onClick={onContact}
          icon={FaEnvelope}
          className="border-default hover:border-accent-secondary/50 text-secondary hover:text-accent-secondary"
        >
          {t('hero.contactMe', {}, 'Contact Me')}
        </Button>

        {/* Social Quick Links */}
        <HeroActions github={github} linkedin={linkedin} />
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
