import { motion, useReducedMotion } from 'framer-motion';
import Typography from '../common/Typography';

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export default function AboutHeader({ title, mission, tagline }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={shouldReduceMotion ? undefined : itemVariants}
      className="mx-auto mb-14 max-w-3xl text-center"
    >
      <Typography variant="h2" className="mb-5 text-primary">
        {title}
      </Typography>

      <Typography variant="body" className="text-lg leading-relaxed text-secondary">
        {mission}
        <br />
        {tagline}
      </Typography>
    </motion.div>
  );
}
