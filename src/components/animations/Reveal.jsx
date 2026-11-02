import { motion, useReducedMotion } from 'framer-motion';
import { EASINGS } from '../../lib/motion';

export default function Reveal({
  children,
  delay = 0,
  y = 24,
  duration = 0.5,
  once = true,
  amount,
  className = '',
  ...motionProps
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, ...(amount !== undefined && { amount }) }}
      transition={{
        duration: shouldReduceMotion ? 0 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: EASINGS.smooth,
      }}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}
