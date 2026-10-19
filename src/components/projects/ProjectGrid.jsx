import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import Reveal from '../animations/Reveal';
import ProjectCard from './ProjectCard';

export default function ProjectGrid({ projects, activeCategory, columns = 3 }) {
  const shouldReduceMotion = useReducedMotion();

  const gridClassName =
    columns === 2
      ? 'grid gap-6 grid-cols-1 md:grid-cols-2 mt-6'
      : 'grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6';

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={activeCategory}
        className={gridClassName}
        initial={
          shouldReduceMotion
            ? false
            : {
                opacity: 0,
                y: 10,
              }
        }

        animate={{
          opacity: 1,
          y: 0,
        }}

        exit={
          shouldReduceMotion
            ? undefined
            : {
                opacity: 0,
                y: -10,
              }
        }
        transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
      >
        {projects.map((project, index) => (
          <Reveal
            key={project.id}
            y={18}
            duration={0.45}
            delay={index * 0.06}
            amount={0.2}
            whileHover={{ y: -4 }}
            className="h-full"
          >
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
