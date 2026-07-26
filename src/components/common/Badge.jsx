export default function Badge({
  children,
  variant = 'neutral',
  presentation = 'pill',
  icon: Icon,
  className = '',
  ...props
}) {
  const baseStyle =
    'inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.02em] transition-colors';

  const variants = {
    primary: 'border border-accent-primary/25 bg-accent-primary/10 text-accent-primary',
    secondary: 'border border-accent-secondary/25 bg-accent-secondary/10 text-accent-secondary',
    neutral: 'border border-default bg-surface/70 text-secondary',
  };

  const presentations = {
    pill: 'rounded-full px-2.5 py-0.5',
    dot: 'rounded-full px-2.5 py-0.5',
  };

  return (
    <span
      className={`${baseStyle} ${presentations[presentation]} ${variants[variant]} ${className}`}
      {...props}
    >
      {presentation === 'dot' && (
        <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      )}
      {Icon && <Icon className="h-3.5 w-3.5" aria-hidden="true" />}
      {children}
    </span>
  );
}
