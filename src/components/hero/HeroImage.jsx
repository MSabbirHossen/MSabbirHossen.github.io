import { motion, useReducedMotion } from 'framer-motion';
import heroWebp from '../../assets/hero.webp';
import heroImage from '../../assets/hero.png';
import { portfolioData } from '../../data';

import { floatingAnimation, heroImageVariants } from './heroVariants';

const HeroImage = () => {
  const shouldReduceMotion = useReducedMotion();
  const { focusTitle, focusItems } = portfolioData.personalInfo.hero;

  return (
    <motion.div
      className="relative mx-auto w-full max-w-md"
      variants={heroImageVariants}
      initial={shouldReduceMotion ? false : 'hidden'}
      animate="visible"
    >
      <div className="absolute -inset-4 rounded-[2rem] dark:bg-linear-to-br dark:from-accent-primary/30 dark:via-accent-secondary/20 bg-linear-to-br from-accent-primary/10 via-accent-secondary/10 to-transparent blur-2xl" />
      <motion.div
        className="relative glass rounded-[2rem] border border-default p-5 dark:shadow-2xl dark:shadow-black/20 shadow-lg shadow-slate-300/30"
        animate={shouldReduceMotion ? undefined : floatingAnimation.animate}
        transition={shouldReduceMotion ? undefined : floatingAnimation.transition}
      >
        <div className="overflow-hidden rounded-[1.5rem] border border-default surface">
          <picture>
            <source srcSet={heroWebp} type="image/webp" />
            <img
              src={heroImage}
              alt="Md. Sabbir Hossen portrait illustration"
              decoding="async"
              fetchPriority="high"
              width="448"
              height="412"
              className="h-full w-full object-cover"
            />
          </picture>
        </div>
        <div className="mt-5 rounded-2xl border border-default bg-accent-primary/5 p-4 text-left">
          <p className="text-sm uppercase tracking-[0.25em] text-accent-secondary">{focusTitle}</p>
          <p className="mt-2 text-lg font-semibold text-primary">{focusItems.join(', ')}.</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HeroImage;
