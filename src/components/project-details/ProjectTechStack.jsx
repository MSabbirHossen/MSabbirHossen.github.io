import Card from '../common/Card';
import Typography from '../common/Typography';

const ProjectTechStack = ({ technologies }) => {
  if (!technologies?.length) return null;

  return (
    <Card className="space-y-6">
      <Typography variant="subtitle">Technologies Used</Typography>

      <ul
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
        aria-label="Technology stack"
      >
        {technologies.map((tech) => {
          const Icon = tech.icon;

          return (
            <li
              key={tech.name}
              className="group flex min-h-[6.5rem] flex-col items-center justify-center gap-3 rounded-xl border border-default bg-surface/70 p-3 text-center transition-all duration-300 hover:-translate-y-1 hover:border-accent-primary/40 hover:bg-surface"
            >
              {Icon && (
                <Icon className="text-3xl text-accent-primary transition-transform duration-300 group-hover:scale-105" />
              )}

              <Typography variant="caption" className="text-secondary">
                {tech.name}
              </Typography>
            </li>
          );
        })}
      </ul>
    </Card>
  );
};

export default ProjectTechStack;
