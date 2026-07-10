import { motion } from 'framer-motion';

export default function Reveal({
  children,
  delay = 0,
  y = 30,
  duration = 0.6,
  once = true,
  amount,
  className = '',
  ...motionProps
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, ...(amount !== undefined && { amount }) }}
      transition={{
        duration,
        delay,
        ease: 'easeOut',
      }}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}
