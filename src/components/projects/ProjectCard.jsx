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
      <Card className="group flex h-full flex-col justify-between space-y-5 border-default light:hover:border-accent-primary/35 light:hover:shadow-xl light:hover:shadow-slate-900/10">
        <ProjectImage project={project} />

        <ProjectHeader project={project} />

        <Typography variant="body" className="text-justify text-sm text-muted">
          {project.overview.length > 160
            ? `${project.overview.substring(0, 160)}...`
            : project.overview}
        </Typography>
        {/* <ProjectMeta project={project} /> */}

        <TechnologyIcons project={project} />

        <motion.div
          variants={{
            rest: { opacity: 0, height: 0, marginTop: 0 },
            hover: { opacity: 1, height: 'auto', marginTop: 4 },
          }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
          aria-label="Project technologies"
        >
          <p className="text-xs text-muted">
            {project.technologies.map((tech) => tech.name).join(' · ')}
          </p>
        </motion.div>

        <ProjectLinks project={project} />
      </Card>
    </motion.div>
  );
}
