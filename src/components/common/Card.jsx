import { forwardRef, useRef, useState, useCallback } from 'react';

/**
 * Reusable Card component with glassmorphism, gradient-border, hover elevation,
 * and optional interactive cursor-following spotlight effect.
 * Fully custom Tailwind & CSS variables — zero external UI library overhead.
 */
const Card = forwardRef(function Card(
  {
    children,
    className = '',
    hover = true,
    glass = false,
    gradient = false,
    spotlight = false,
    padding = 'p-6',
    as: Tag = 'div',
    onMouseMove,
    onMouseEnter,
    onMouseLeave,
    ...props
  },
  forwardedRef
) {
  const localRef = useRef(null);
  const cardRef = forwardedRef || localRef;
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e) => {
      if (spotlight && cardRef && cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        cardRef.current.style.setProperty('--mouse-x', `${x}px`);
        cardRef.current.style.setProperty('--mouse-y', `${y}px`);
      }
      if (onMouseMove) onMouseMove(e);
    },
    [spotlight, cardRef, onMouseMove]
  );

  const handleMouseEnter = useCallback(
    (e) => {
      if (spotlight) setIsHovered(true);
      if (onMouseEnter) onMouseEnter(e);
    },
    [spotlight, onMouseEnter]
  );

  const handleMouseLeave = useCallback(
    (e) => {
      if (spotlight) setIsHovered(false);
      if (onMouseLeave) onMouseLeave(e);
    },
    [spotlight, onMouseLeave]
  );

  const hasPositionClass = /\b(?:[a-z]+:)?(static|fixed|absolute|relative|sticky)\b/.test(
    className
  );
  const hasOverflowClass = /\b(?:[a-z]+:)?overflow-(auto|hidden|clip|visible|scroll)\b/.test(
    className
  );
  const positionBase = hasPositionClass ? '' : 'relative';
  const overflowBase = hasOverflowClass ? '' : 'overflow-hidden';
  const base = `${positionBase} rounded-2xl transition-all duration-300 ${overflowBase}`.trim();
  const surface = glass ? 'glass' : 'surface border-default';
  const hoverStyle = hover ? 'surface-hover' : '';
  const gradientBorder = gradient ? 'gradient-border' : '';
  const spotlightClass = spotlight ? 'card-spotlight' : '';

  return (
    <Tag
      ref={cardRef}
      className={`${base} ${surface} ${hoverStyle} ${gradientBorder} ${spotlightClass} ${padding} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {spotlight && (
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 rounded-2xl"
          style={{
            opacity: isHovered ? 1 : 0,
            background:
              'radial-gradient(450px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(99, 102, 241, 0.12), transparent 75%)',
          }}
          aria-hidden="true"
        />
      )}
      <div className={spotlight ? 'relative z-10' : undefined}>{children}</div>
    </Tag>
  );
});

export default Card;
