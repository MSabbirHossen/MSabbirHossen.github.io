import { portfolioData } from '../../data';

/**
 * Premium developer brand logo featuring a stylized geometric code monogram and typography.
 * Supports configurable size, text display, and responsive layouts.
 */
export default function Logo({ size = 'md', showText = true, showTitle = false, className = '' }) {
  const { name, role } = portfolioData.personalInfo;

  const sizeClasses = {
    sm: {
      box: 'h-8 w-8 rounded-lg',
      svg: 'w-5 h-5',
      name: 'text-base font-semibold',
    },
    md: {
      box: 'h-10 w-10 rounded-xl',
      svg: 'w-6 h-6',
      name: 'text-lg sm:text-xl font-bold',
    },
    lg: {
      box: 'h-12 w-12 rounded-2xl',
      svg: 'w-7 h-7',
      name: 'text-xl sm:text-2xl font-bold',
    },
  }[size] || {
    box: 'h-10 w-10 rounded-xl',
    svg: 'w-6 h-6',
    name: 'text-lg sm:text-xl font-bold',
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none group ${className}`}>
      {/* Visual Logo Emblem */}
      <div
        className={`relative ${sizeClasses.box} flex items-center justify-center shrink-0 overflow-hidden border border-accent-primary/25 bg-linear-to-br from-accent-primary/15 via-surface to-accent-secondary/15 shadow-sm shadow-accent-primary/10 transition-all duration-300 group-hover:border-accent-primary/50 group-hover:shadow-[0_0_22px_rgba(99,102,241,0.35)] group-hover:scale-105`}
        aria-hidden="true"
      >
        {/* Subtle background ambient mesh glow */}
        <div className="absolute inset-0 bg-radial from-accent-primary/20 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

        {/* Custom SVG Monogram */}
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${sizeClasses.svg} relative z-10 transition-transform duration-300 group-hover:scale-110`}
        >
          <defs>
            <linearGradient id="logoGradPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="50%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <linearGradient id="logoGradAccent" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
          </defs>

          {/* Left code bracket '<' */}
          <path
            d="M11 11L5 18L11 25"
            stroke="url(#logoGradAccent)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-80 group-hover:opacity-100 transition-opacity"
          />

          {/* Right code bracket '>' */}
          <path
            d="M25 11L31 18L25 25"
            stroke="url(#logoGradAccent)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-80 group-hover:opacity-100 transition-opacity"
          />

          {/* Center Monogram: Modern Tech 'S' */}
          <path
            d="M21.5 13.5C21.5 13.5 20.8 12 18 12C15.2 12 14 13.6 14 15.2C14 18.2 22 17.8 22 21C22 23 20.2 24 18 24C15 24 14.2 22.2 14.2 22.2"
            stroke="url(#logoGradPrimary)"
            strokeWidth="2.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Center Code Dot / Pulse */}
          <circle cx="18" cy="18" r="1" fill="#67e8f9" className="animate-pulse" />
        </svg>
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col text-left">
          <span
            className={`${sizeClasses.name} text-primary tracking-tight transition-colors group-hover:text-accent-primary`}
          >
            {name}
          </span>

          {showTitle && role && (
            <span className="text-xs text-muted font-medium tracking-normal -mt-0.5">{role}</span>
          )}
        </div>
      )}
    </div>
  );
}
