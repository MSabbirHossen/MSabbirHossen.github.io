import Typography from '../common/Typography';
import ProjectStatusBadge from './ProjectStatusBadge';

export default function ProjectHeader({ project }) {
  const { title, featured, status } = project;

  return (
    <div className="space-y-3">
      <div className="flex min-h-[1.75rem] flex-wrap items-center gap-2">
        {featured && (
          <span className="rounded-full border border-accent-warning/35 bg-accent-warning/10 px-3 py-1 text-xs font-semibold text-accent-warning light:shadow-sm light:shadow-accent-warning/10">
            ⭐ Featured
          </span>
        )}

        <ProjectStatusBadge
          whileHover={{
            scale: 1.05,
          }}
          status={status}
        />
      </div>

      <div className="flex min-h-[3rem] items-center">
        <Typography
          variant="subtitle"
          className="project-title line-clamp-2 leading-tight text-primary transition-colors duration-300 group-hover:text-accent-primary"
        >
          {title}
        </Typography>
      </div>
    </div>
  );
}
