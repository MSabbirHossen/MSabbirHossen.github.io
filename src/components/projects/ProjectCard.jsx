import Typography from '../common/Typography';
import Card from '../common/Card';
import TechnologyIcons from './TechnologyIcons';
import ProjectLinks from './ProjectLinks';

import ProjectHeader from './ProjectHeader';
import ProjectImage from './ProjectImage';

export default function ProjectCard({ project }) {
  return (
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

      <ProjectLinks project={project} />
    </Card>
  );
}
