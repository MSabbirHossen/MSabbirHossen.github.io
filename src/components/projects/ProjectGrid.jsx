import { AnimatePresence, motion } from 'framer-motion';

import Reveal from '../animations/Reveal';
import ProjectCard from './ProjectCard';

export default function ProjectGrid({ projects, activeCategory }) {
  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={activeCategory}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {projects.map((project, index) => (
          <Reveal
            key={project.id}
            y={18}
            duration={0.45}
            delay={index * 0.06}
            amount={0.2}
            whileHover={{ y: -4 }}
          >
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
