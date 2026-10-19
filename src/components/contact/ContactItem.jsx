import Typography from '../common/Typography';

export default function ContactItem({
  icon: Icon,
  title,
  children,
  href,
  badge,
  badgeClass,
  actionLabel,
  iconColor,
  subHandle,
}) {
  const renderIcon = () => {
    if (!Icon) return null;
    if (typeof Icon === 'function') {
      return (
        <Icon
          className={`h-4 w-4 transition-transform duration-300 group-hover:scale-110 ${iconColor ? '' : 'text-accent-secondary'}`}
          style={iconColor ? { color: iconColor } : undefined}
          aria-hidden="true"
        />
      );
    }
    return (
      <span
        className="block transition-transform duration-300 group-hover:scale-110"
        style={iconColor ? { color: iconColor } : undefined}
        aria-hidden="true"
      >
        {Icon}
      </span>
    );
  };

  return (
    <div className="group flex items-center gap-3.5 rounded-xl px-3.5 py-2.5 transition-all duration-300 hover:bg-accent-primary/10 border border-transparent hover:border-default/60">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface border border-default text-accent-secondary">
        {renderIcon()}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <Typography
            variant="subtitle"
            className="text-primary font-semibold text-xs uppercase tracking-wider"
          >
            {title}
          </Typography>
          {badge && (
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badgeClass || 'bg-accent-primary/10 text-accent-primary border-accent-primary/20'}`}
            >
              {badge}
            </span>
          )}
          {actionLabel && href && (
            <a
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="shrink-0 text-xs font-semibold hover:underline"
              style={iconColor ? { color: iconColor } : undefined}
            >
              {actionLabel} &rarr;
            </a>
          )}
        </div>

        {subHandle && <p className="text-[11px] text-muted">{subHandle}</p>}

        <div className="mt-0.5">
          {href ? (
            <a
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="block truncate text-secondary transition-colors hover:text-accent-primary text-xs sm:text-sm font-medium"
            >
              {children}
            </a>
          ) : (
            <p className="truncate text-secondary text-xs sm:text-sm">{children}</p>
          )}
        </div>
      </div>
    </div>
  );
}
