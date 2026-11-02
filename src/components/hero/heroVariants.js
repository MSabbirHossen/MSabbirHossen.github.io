import { EASINGS, SPRINGS } from '../../lib/motion';

export const heroContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const heroItemVariants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: EASINGS.smooth,
    },
  },
};

export const heroImageVariants = {
  hidden: {
    opacity: 0,
    scale: 0.94,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: EASINGS.smooth,
      ...SPRINGS.gentle,
    },
  },
};

export const floatingAnimation = {
  animate: {
    y: [0, -6, 0],
  },
  transition: {
    duration: 5.5,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};
