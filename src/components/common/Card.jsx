/**
 * Reusable Card component with glassmorphism, gradient-border, and hover effects.
 * Fully custom Tailwind — no external UI library.
 */
export default function Card({
  children,
  className = '',
  hover = true,
  glass = false,
  gradient = false,
  padding = 'p-6',
  as: Tag = 'div',
  ...props
}) {
  const base = 'rounded-2xl transition-all duration-300 overflow-hidden';

  const surface = glass ? 'glass' : 'surface border-default';

  const hoverStyle = hover ? 'surface-hover' : '';

  const gradientBorder = gradient ? 'gradient-border' : '';

  return (
    <Tag
      className={`${base} ${surface} ${hoverStyle} ${gradientBorder} ${padding} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
