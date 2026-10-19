import { motion, useReducedMotion } from 'framer-motion';
import Typography from '../common/Typography';
import Card from '../common/Card';
import TechnologyIcons from './TechnologyIcons';
import ProjectLinks from './ProjectLinks';
import ProjectHeader from './ProjectHeader';
import ProjectImage from './ProjectImage';

export default function ProjectCard({ project }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      variants={{ rest: { y: 0 }, hover: { y: shouldReduceMotion ? 0 : -6 } }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: 'easeOut' }}
      className="h-full"
    >
      <Card className="group flex h-full flex-col justify-between overflow-hidden border-default p-6 transition-all duration-300 hover:border-accent-primary/40 light:hover:border-accent-primary/35 light:hover:shadow-xl light:hover:shadow-slate-900/10">
        <div className="flex flex-col space-y-4">
          <ProjectImage project={project} />

          <ProjectHeader project={project} />

          <Typography
            variant="body"
            className="line-clamp-3 min-h-[4.25rem] text-sm leading-relaxed text-muted"
          >
            {project.overview}
          </Typography>

          <TechnologyIcons project={project} maxIcons={8} />
        </div>

        <div className="mt-5 border-t border-default/50 pt-4">
          <ProjectLinks project={project} />
        </div>
      </Card>
    </motion.div>
  );
}
