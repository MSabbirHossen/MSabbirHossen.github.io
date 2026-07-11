import Typography from '../common/Typography';
import Card from '../common/Card';
import TechnologyIcons from './TechnologyIcons';
import ProjectLinks from './ProjectLinks';

export default function ProjectCard({ project }) {
  const { title, overview, technologies, githubUrl, liveUrl } = project;

  return (
    <Card className="flex h-full flex-col justify-between space-y-5 bg-white p-6 shadow-md dark:bg-gray-800">
      <div className="overflow-hidden rounded-xl">
        <img
          src={`${import.meta.env.BASE_URL}${project.screenshots[0]}`}
          alt={project.title}
          className="h-52 w-full object-cover transition duration-500 hover:scale-105"
        />
      </div>
      <div className="space-y-3">
        <Typography variant="subtitle" className="text-slate-900 dark:text-slate-100">
          {title}
        </Typography>
        <Typography variant="body" className="text-slate-700 dark:text-slate-300">
          {overview.length > 120 ? `${overview.substring(0, 120)}...` : overview}
        </Typography>
      </div>

      <TechnologyIcons technologies={technologies} />
      <ProjectLinks project={project} />
    </Card>
  );
}
