import { motion } from 'framer-motion';
import { FaArrowDown, FaDownload } from 'react-icons/fa';
import heroImage from '../../assets/hero.png';
import { portfolioData } from '../../data/portfolioData';
import Typography from '../common/Typography';
import Button from '../common/Button';

import HeroActions from '../hero/HeroActions';

export default function Hero() {
  const { personalInfo } = portfolioData;
  const { name, title, secondaryTitle, tagline, github, linkedin, facebook, resumeUrl } =
    personalInfo;

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden min-h-[calc(100vh-6rem)] flex items-center py-16"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.12),transparent_28%)]" />
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.2fr_0.8fr]">
        <motion.div
          className="space-y-7 text-center lg:text-left"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
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
            <Typography variant="subtitle" className="max-w-2xl text-slate-300">
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
            onContact={scrollToContact}
          />
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Button variant="outline" size="lg" href={resumeUrl} icon={FaDownload}>
              Download Resume
            </Button>
            <Button variant="primary" size="lg" onClick={scrollToContact} icon={FaArrowDown}>
              Get in Touch
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-md"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, ease: 'easeOut', delay: 0.12 }}
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-accent-primary/30 via-accent-secondary/20 to-transparent blur-2xl" />
          <motion.div
            className="relative glass rounded-[2rem] border border-white/10 p-5 shadow-2xl shadow-black/20"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-dark-surface">
              <img
                src={heroImage}
                alt="Md. Sabbir Hossen portrait illustration"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4 text-left">
              <p className="text-sm uppercase tracking-[0.25em] text-accent-secondary">
                Currently focused on
              </p>
              <p className="mt-2 text-lg font-semibold text-white">
                React, MERN, AI tools and Secure Development.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
