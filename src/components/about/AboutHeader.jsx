import React from 'react';
import { motion } from 'framer-motion';

import Typography from '../common/Typography';

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const AboutHeader = ({ mission }) => {
  return (
    <div>
      {/* Heading */}
      <motion.div variants={itemVariants} className="mx-auto mb-14 max-w-3xl text-center">
        <Typography variant="h2" className="mb-5 text-primary-600 dark:text-primary-400">
          About Me
        </Typography>

        <Typography variant="body" className="text-lg leading-relaxed text-slate-300">
          {mission} <br /> Building a future where faith, knowledge, and technology empower the
          Ummah.
        </Typography>
      </motion.div>
      ;
    </div>
  );
};

export default AboutHeader;
