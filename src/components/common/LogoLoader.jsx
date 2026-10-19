import { motion, useReducedMotion } from 'framer-motion';

/**
 * Dynamic Logo Loading Screen & Spinner component.
 * Features an animated orbital gradient ring, glowing emblem, pulsing code brackets,
 * and developer status text.
 */
export default function LogoLoader({
  fullScreen = true,
  message = 'Loading...',
  size = 'md',
  className = '',
}) {
  const shouldReduceMotion = useReducedMotion();

  const containerClasses = fullScreen
    ? 'fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-md'
    : 'flex flex-col items-center justify-center py-12';

  const emblemSize = size === 'lg' ? 'w-20 h-20' : size === 'sm' ? 'w-12 h-12' : 'w-16 h-16';

  return (
    <div
      role="status"
      aria-live="polite"
      className={`${containerClasses} select-none ${className}`}
    >
      <div className="relative flex items-center justify-center">
        {/* Ambient background glow */}
        <div
          className="absolute -inset-4 rounded-full bg-linear-to-r from-accent-primary/25 to-accent-secondary/25 blur-xl animate-pulse"
          style={{ animationDuration: '2.5s' }}
        />

        {/* Outer Orbital Rotating Ring */}
        <motion.div
          animate={shouldReduceMotion ? false : { rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className={`absolute ${size === 'lg' ? '-inset-3' : '-inset-2'} rounded-3xl border border-dashed border-accent-secondary/40 pointer-events-none`}
        />

        {/* Counter-rotating accent ring */}
        <motion.div
          animate={shouldReduceMotion ? false : { rotate: -360 }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          className={`absolute ${size === 'lg' ? '-inset-5' : '-inset-3.5'} rounded-full border border-accent-primary/20 pointer-events-none`}
        />

        {/* Central Logo Squircle with breathing scale */}
        <motion.div
          animate={shouldReduceMotion ? false : { scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className={`relative ${emblemSize} flex items-center justify-center rounded-2xl border border-accent-primary/40 bg-linear-to-br from-accent-primary/20 via-surface to-accent-secondary/20 shadow-[0_0_30px_rgba(99,102,241,0.25)]`}
        >
          <svg
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-3/5 h-3/5"
          >
            <defs>
              <linearGradient id="loaderGradPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#818cf8" />
                <stop offset="50%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
              <linearGradient id="loaderGradAccent" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>
            </defs>

            {/* Left Bracket '<' */}
            <motion.path
              d="M11 11L5 18L11 25"
              stroke="url(#loaderGradAccent)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={shouldReduceMotion ? false : { x: [0, -1.5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Right Bracket '>' */}
            <motion.path
              d="M25 11L31 18L25 25"
              stroke="url(#loaderGradAccent)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={shouldReduceMotion ? false : { x: [0, 1.5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Center Monogram: Modern Tech 'S' */}
            <path
              d="M21.5 13.5C21.5 13.5 20.8 12 18 12C15.2 12 14 13.6 14 15.2C14 18.2 22 17.8 22 21C22 23 20.2 24 18 24C15 24 14.2 22.2 14.2 22.2"
              stroke="url(#loaderGradPrimary)"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Pulsing Code Dot */}
            <circle cx="18" cy="18" r="1.3" fill="#67e8f9" className="animate-ping origin-center" />
            <circle cx="18" cy="18" r="1" fill="#67e8f9" />
          </svg>
        </motion.div>
      </div>

      {/* Dynamic Animated Status Text */}
      {message && (
        <div className="mt-5 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-primary animate-pulse" />
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-secondary">
            {message}
          </p>
          <span className="h-1.5 w-1.5 rounded-full bg-accent-secondary animate-pulse [animation-delay:300ms]" />
        </div>
      )}
    </div>
  );
}
