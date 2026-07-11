const statusStyles = {
  Completed: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  'In Progress': 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  Planned: 'bg-sky-500/10 text-sky-400 border border-sky-500/20',
  Archived: 'bg-slate-500/10 text-slate-400 border border-slate-500/20',
};

export default function ProjectStatusBadge({ status }) {
  if (!status) return null;

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        statusStyles[status] ?? 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
      }`}
    >
      {status}
    </span>
  );
}
