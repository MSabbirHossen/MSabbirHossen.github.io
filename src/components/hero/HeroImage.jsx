import { motion, useReducedMotion } from 'framer-motion';
import heroImage from '../../assets/hero.png';

import { floatingAnimation, heroImageVariants } from './heroVariants';

const HeroImage = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="relative mx-auto w-full max-w-md"
      variants={heroImageVariants}
      initial={shouldReduceMotion ? false : 'hidden'}
      animate="visible"
    >
      <div className="absolute -inset-4 rounded-[2rem] bg-linear-to-br from-accent-primary/30 via-accent-secondary/20 to-transparent blur-2xl" />
      <motion.div
        className="relative glass rounded-[2rem] border border-default p-5 shadow-2xl shadow-black/20"
        animate={shouldReduceMotion ? undefined : floatingAnimation.animate}
        transition={shouldReduceMotion ? undefined : floatingAnimation.transition}
      >
        <div className="overflow-hidden rounded-[1.5rem] border border-default surface">
          <img
            src={heroImage}
            alt="Md. Sabbir Hossen portrait illustration"
            decoding="async"
            fetchPriority="high"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="mt-5 rounded-2xl border border-default bg-accent-primary/5 p-4 text-left">
          <p className="text-sm uppercase tracking-[0.25em] text-accent-secondary">
            Currently focused on
          </p>
          <p className="mt-2 text-lg font-semibold text-primary">
            React, MERN, AI tools and Secure Development.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HeroImage;
