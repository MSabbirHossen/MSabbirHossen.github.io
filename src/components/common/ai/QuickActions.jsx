export default function QuickActions({ actions, onAction, label = 'Suggested actions' }) {
  return (
    <section aria-label={label}>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">{label}</p>
      <div className="flex flex-wrap gap-2">
        {actions.map((action) => (
          <button
            key={action.id}
            type="button"
            onClick={() => onAction(action)}
            className="rounded-full border border-default px-3 py-1.5 text-xs font-medium text-secondary transition-colors hover:border-accent-primary/40 hover:text-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-light-bg dark:focus-visible:ring-offset-dark-bg"
            aria-label={`Run action: ${action.label}`}
          >
            {action.label}
          </button>
        ))}
      </div>
    </section>
  );
}
