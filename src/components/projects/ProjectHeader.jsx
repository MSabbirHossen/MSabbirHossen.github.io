import Typography from '../common/Typography';
import ProjectStatusBadge from './ProjectStatusBadge';

export default function ProjectHeader({ title, featured, status }) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        {featured && (
          <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-semibold text-yellow-400 border border-yellow-500/20">
            ⭐ Featured
          </span>
        )}

        <ProjectStatusBadge status={status} />
      </div>

      <Typography variant="subtitle" className="text-slate-900 dark:text-slate-100">
        {title}
      </Typography>
    </div>
  );
}
