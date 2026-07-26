export default function Typography({
  variant = 'body',
  as,
  gradient = false,
  children,
  className = '',
  ...props
}) {
  const styles = {
    h1: 'text-primary text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl',
    h2: 'text-primary text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl',
    h3: 'text-primary text-xl font-semibold sm:text-2xl',
    h4: 'text-primary text-lg font-semibold sm:text-xl',
    h5: 'text-primary text-base font-semibold sm:text-lg',
    h6: 'text-secondary text-sm font-semibold uppercase tracking-[0.2em] sm:text-base',
    body: 'text-secondary text-sm leading-relaxed sm:text-base',
    subtitle: 'text-secondary text-base font-medium sm:text-lg md:text-xl',
    caption: 'text-muted text-xs',
    eyebrow: 'text-xs font-semibold uppercase tracking-[0.35em] text-accent-secondary',
    lead: 'text-secondary text-lg leading-relaxed sm:text-xl',
  };

  const semanticTag = as || (variant in styles ? variant : 'p');
  const Tag = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(semanticTag) ? semanticTag : 'p';
  const toneClass = gradient ? 'gradient-text' : '';

  return (
    <Tag className={`${styles[variant] || styles.body} ${toneClass} ${className}`} {...props}>
      {children}
    </Tag>
  );
}
