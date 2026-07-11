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
    <Card className="flex h-full flex-col justify-between space-y-5">
      <ProjectImage project={project} />

      <ProjectHeader project={project} />

      <Typography variant="body">
        {project.overview.length > 100
          ? `${project.overview.substring(0, 90)}...`
          : project.overview}
      </Typography>

      <TechnologyIcons project={project} />
      <ProjectMeta project={project} />

      <ProjectLinks project={project} />
    </Card>
  );
}
