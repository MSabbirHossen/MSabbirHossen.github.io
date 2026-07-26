const statusStyles = {
  Completed: 'border border-accent-success/30 bg-accent-success/10 text-accent-success',
  'In Progress': 'border border-accent-warning/30 bg-accent-warning/10 text-accent-warning',
  Planned: 'border border-accent-secondary/30 bg-accent-secondary/10 text-accent-secondary',
  Archived: 'border border-default bg-surface/70 text-muted',
};

export default function ProjectStatusBadge({ status }) {
  if (!status) return null;

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
        statusStyles[status] ?? 'border border-default bg-surface/70 text-muted'
      }`}
    >
      {status}
    </span>
  );
}
