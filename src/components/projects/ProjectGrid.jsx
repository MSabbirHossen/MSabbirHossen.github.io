import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Reveal from '../animations/Reveal';
import ProjectCard from './ProjectCard';
import FlagshipProjectCard from './FlagshipProjectCard';

export default function ProjectGrid({ projects, activeCategory, columns = 2, isFeatured = false }) {
  const shouldReduceMotion = useReducedMotion();

  // On the homepage with the top 3 featured projects:
  // Project 1 gets flagship treatment, Projects 2 & 3 sit side-by-side
  if (isFeatured && projects.length === 3) {
    const [flagship, ...supporting] = projects;

    return (
      <div className="space-y-6 mt-6">
        {/* Flagship #1 Project */}
        <Reveal y={18} duration={0.5} amount={0.15}>
          <FlagshipProjectCard project={flagship} />
        </Reveal>

        {/* Supporting #2 and #3 Projects */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {supporting.map((project, idx) => (
            <Reveal
              key={project.id}
              y={18}
              duration={0.45}
              delay={0.1 + idx * 0.08}
              amount={0.15}
              className="h-full"
            >
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    );
  }

  // Standard grid for /projects page or other filters
  const gridClassName =
    columns === 2
      ? 'grid gap-6 grid-cols-1 md:grid-cols-2 mt-6'
      : 'grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6';

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={activeCategory}
        className={gridClassName}
        initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={shouldReduceMotion ? undefined : { opacity: 0, y: -10 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
      >
        {projects.map((project, index) => (
          <Reveal
            key={project.id}
            y={18}
            duration={0.45}
            delay={index * 0.06}
            amount={0.15}
            className="h-full"
          >
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
