/**
 * Unified Motion Architecture & Animation Tokens
 * Sourced for Framer Motion v12
 * Respects prefers-reduced-motion and provides GPU-optimized transforms
 */

// ─── Easing Curves ────────────────────────────────────────────────────────────
export const EASINGS = {
  smooth: [0.16, 1, 0.3, 1], // Custom snappy-smooth ease
  easeOutBack: [0.34, 1.56, 0.64, 1],
  natural: [0.25, 0.1, 0.25, 1],
  standard: [0.4, 0.0, 0.2, 1],
};

// ─── Spring Transitions ───────────────────────────────────────────────────────
export const SPRINGS = {
  gentle: { type: 'spring', stiffness: 280, damping: 28 },
  snappy: { type: 'spring', stiffness: 420, damping: 32 },
  bouncy: { type: 'spring', stiffness: 400, damping: 20 },
  subtle: { type: 'spring', stiffness: 350, damping: 35 },
};

// ─── Standard Transitions ─────────────────────────────────────────────────────
export const TRANSITIONS = {
  fast: { duration: 0.2, ease: EASINGS.smooth },
  normal: { duration: 0.35, ease: EASINGS.smooth },
  medium: { duration: 0.5, ease: EASINGS.smooth },
  slow: { duration: 0.7, ease: EASINGS.smooth },
};

// ─── Container Variants (Staggered Children) ──────────────────────────────────
export const staggerContainer = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const containerVariants = staggerContainer(0.1, 0.05);

// ─── Item Variants ────────────────────────────────────────────────────────────
export const fadeUp = (distance = 20, duration = 0.5) => ({
  hidden: { opacity: 0, y: distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration,
      ease: EASINGS.smooth,
    },
  },
});

export const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASINGS.smooth },
  },
};

export const fadeIn = (duration = 0.4) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration, ease: EASINGS.smooth },
  },
});

export const scaleUp = (startScale = 0.95, duration = 0.45) => ({
  hidden: { opacity: 0, scale: startScale },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration, ease: EASINGS.smooth },
  },
});

// ─── Interactive Card Motion Variants ─────────────────────────────────────────
export const cardHoverMotion = {
  rest: { y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
  hover: { y: -5, transition: { duration: 0.25, ease: 'easeOut' } },
};

export const actionIconMotion = {
  rest: { x: 0, transition: { duration: 0.2, ease: 'easeOut' } },
  hover: { x: 3, transition: { duration: 0.2, ease: 'easeOut' } },
};

// ─── Route & Timeline Motion Variants ─────────────────────────────────────────
export const pageVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.22, ease: EASINGS.smooth },
  },
};

export const timelineNodeMotion = {
  hidden: { scale: 0.7, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.35, ease: EASINGS.smooth },
  },
};

// ─── Reduced-Motion Sanitizer ─────────────────────────────────────────────────
/**
 * Returns clean fallback variants if the user prefers reduced motion
 * @param {object} standardVariants
 * @param {boolean} shouldReduceMotion
 */
export const getAccessibleVariants = (standardVariants, shouldReduceMotion) => {
  if (!shouldReduceMotion) return standardVariants;

  return {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.01 } },
  };
};
