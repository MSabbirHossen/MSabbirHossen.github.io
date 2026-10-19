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
      <Card className="group flex h-full flex-col justify-between space-y-4 border-default overflow-visible light:hover:border-accent-primary/35 light:hover:shadow-xl light:hover:shadow-slate-900/10">
        <div className="space-y-4">
          <ProjectImage project={project} />

          <ProjectHeader project={project} />

          <Typography variant="body" className="text-justify text-sm text-muted">
            {project.overview.length > 160
              ? `${project.overview.substring(0, 160)}...`
              : project.overview}
          </Typography>
          {/* <ProjectMeta project={project} /> */}

          <TechnologyIcons project={project} />

          <ProjectLinks project={project} />
        </div>
      </Card>
    </motion.div>
  );
}
