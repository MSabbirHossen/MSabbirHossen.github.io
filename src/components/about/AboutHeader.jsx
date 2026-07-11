import { motion } from 'framer-motion';
import Typography from '../common/Typography';

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export default function AboutHeader({ title, mission, tagline }) {
  return (
    <motion.div variants={itemVariants} className="mx-auto mb-14 max-w-3xl text-center">
      <Typography variant="h2" className="mb-5 text-primary-600 dark:text-primary-400">
        {title}
      </Typography>

      <Typography variant="body" className="text-lg leading-relaxed text-slate-300">
        {mission}
        <br />
        {tagline}
      </Typography>
    </motion.div>
  );
}
