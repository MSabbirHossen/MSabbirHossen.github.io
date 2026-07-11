import Typography from '../common/Typography';
import ProjectStatusBadge from './ProjectStatusBadge';

export default function ProjectHeader({ project }) {
  const { title, featured, status } = project;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        {featured && (
          <span className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 text-xs font-semibold text-yellow-300">
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

      <Typography
        variant="subtitle"
        className="leading-tight text-slate-900 dark:text-white group-hover:text-accent-secondary"
      >
        {title}
      </Typography>
    </div>
  );
}
