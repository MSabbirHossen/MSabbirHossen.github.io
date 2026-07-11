import Typography from '../common/Typography';
import Card from '../common/Card';
import TechnologyIcons from './TechnologyIcons';
import ProjectLinks from './ProjectLinks';
import ProjectMeta from './ProjectMeta';
import ProjectStatusBadge from './ProjectStatusBadge';
import ProjectHeader from './ProjectHeader';
import ProjectImage from './ProjectImage';

export default function ProjectCard({ project }) {
  return (
    <Card
      className="flex h-full flex-col justify-between space-y-5 group
transition-all
duration-300
hover:shadow-2xl
hover:shadow-accent-primary/10"
      whileHover={{
        y: -8,
        transition: {
          duration: 0.25,
          ease: 'easeOut',
        },
      }}
    >
      <ProjectImage project={project} />

      <ProjectHeader project={project} />

      <Typography variant="body" className="text-justify text-sm">
        {project.overview.length > 120
          ? `${project.overview.substring(0, 120)}...`
          : project.overview}
      </Typography>
      {/* <ProjectMeta project={project} /> */}

      <TechnologyIcons project={project} />

      <ProjectLinks project={project} />
    </Card>
  );
}
