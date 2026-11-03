import { useEffect, useRef, useMemo } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  FaArrowLeft,
  FaArrowRight,
  FaCheck,
  FaExternalLinkAlt,
  FaRedo,
  FaTimes,
} from 'react-icons/fa';

import { usePortfolioGuide } from '../../contexts/PortfolioGuideContext';
import { getGuideSteps } from '../../data/guideData';
import { useTranslation } from '../../i18n';
import Button from '../common/Button';
import Badge from '../common/Badge';
import Typography from '../common/Typography';

const stepVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 30 : -30,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? -30 : 30,
    opacity: 0,
  }),
};

export default function PortfolioGuideModal() {
  const { t, isRTL } = useTranslation();
  const {
    isOpen,
    currentStep,
    direction,
    closeGuide,
    nextStep,
    prevStep,
    goToStep,
    restartGuide,
    finishGuide,
    navigateToDestination,
  } = usePortfolioGuide();

  const shouldReduceMotion = useReducedMotion();
  const dialogRef = useRef(null);
  const previousActiveElementRef = useRef(null);

  const steps = useMemo(() => getGuideSteps(), []);
  const step = steps[currentStep] || steps[0];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  // Body scroll lock
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // Focus trap & focus restoration
  useEffect(() => {
    if (!isOpen) {
      previousActiveElementRef.current?.focus?.();
      return;
    }

    previousActiveElementRef.current = document.activeElement;
    dialogRef.current?.focus();
  }, [isOpen]);

  // Keyboard navigation: Escape, ArrowLeft, ArrowRight
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      closeGuide();
      return;
    }

    if (e.key === 'ArrowRight' && !isLastStep) {
      e.preventDefault();
      nextStep();
      return;
    }

    if (e.key === 'ArrowLeft' && !isFirstStep) {
      e.preventDefault();
      prevStep();
      return;
    }

    // Focus trapping inside modal
    if (e.key === 'Tab' && dialogRef.current) {
      const focusable = dialogRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const focusableElements = Array.from(focusable).filter((el) => !el.hasAttribute('disabled'));

      if (focusableElements.length === 0) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  if (!isOpen) return null;

  const Icon = step.icon;
  const progressPercent = ((currentStep + 1) / steps.length) * 100;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="guide-dialog-title"
        aria-describedby="guide-dialog-desc"
        onKeyDown={handleKeyDown}
      >
        {/* Screen Reader Announcement */}
        <div className="sr-only" aria-live="polite">
          Step {currentStep + 1} of {steps.length}: {step.title}
        </div>

        {/* Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-slate-950/75 backdrop-blur-md"
          onClick={closeGuide}
          aria-hidden="true"
        />

        {/* Dialog Window */}
        <motion.div
          ref={dialogRef}
          tabIndex={-1}
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex flex-col w-full max-w-2xl max-h-[92vh] sm:max-h-[88vh] rounded-3xl border border-default bg-surface shadow-2xl shadow-black/40 overflow-hidden outline-none"
        >
          {/* Top Progress Spine */}
          <div className="h-1 w-full bg-surface-hover" aria-hidden="true">
            <motion.div
              className="h-full bg-gradient-to-r from-accent-primary via-indigo-500 to-accent-secondary transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Modal Header */}
          <div className="flex items-center justify-between border-b border-default/50 px-5 py-3.5 sm:px-7 sm:py-4 bg-surface/80">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="primary" className="text-[10px] font-semibold">
                    {step.badge}
                  </Badge>
                  <span className="text-xs font-semibold text-muted">
                    Step {currentStep + 1} of {steps.length}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={closeGuide}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-default/60 text-muted transition-all hover:border-accent-primary hover:bg-surface-hover hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
              aria-label={`${t('common.close')} (Esc)`}
              title={`${t('common.close')} (Esc)`}
            >
              <FaTimes className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Scrollable Body with Directional Transitions */}
          <div className="grow overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step.id}
                custom={direction}
                variants={shouldReduceMotion ? undefined : stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="space-y-5"
              >
                <div>
                  <Typography
                    id="guide-dialog-title"
                    variant="h2"
                    className="text-lg sm:text-2xl font-black text-primary tracking-tight"
                  >
                    {step.title}
                  </Typography>
                  <p className="mt-0.5 text-xs sm:text-sm font-semibold text-accent-primary">
                    {step.subtitle}
                  </p>
                  <p
                    id="guide-dialog-desc"
                    className="mt-2 text-xs sm:text-sm leading-relaxed text-secondary"
                  >
                    {step.description}
                  </p>
                </div>

                {/* Step 0: Welcome Screen Intent Shortcuts */}
                {step.intentShortcuts && (
                  <div className="pt-1">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-muted mb-2">
                      Choose Your Focus Track:
                    </p>
                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                      {step.intentShortcuts.map((shortcut) => {
                        const ShortcutIcon = shortcut.icon;
                        return (
                          <button
                            key={shortcut.label}
                            type="button"
                            onClick={() => goToStep(shortcut.stepIndex)}
                            className="group flex flex-col justify-between rounded-2xl border border-default bg-surface/60 p-3.5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-primary/40 hover:bg-surface hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary group-hover:bg-accent-primary group-hover:text-white transition-colors">
                                <ShortcutIcon className="h-4 w-4" />
                              </span>
                              <span className="rounded-full bg-surface-hover px-2 py-0.5 text-[10px] font-semibold text-muted">
                                {shortcut.badge}
                              </span>
                            </div>
                            <span className="text-xs font-bold text-primary group-hover:text-accent-primary transition-colors">
                              {shortcut.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Step 1: Navigation Architecture Highlights */}
                {step.highlights && step.id === 'navigation' && (
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 pt-1">
                    {step.highlights.map((h) => (
                      <div
                        key={h.route}
                        className="rounded-2xl border border-default bg-surface/60 p-3.5 space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <code className="text-xs font-mono font-bold text-accent-primary">
                            {h.route}
                          </code>
                        </div>
                        <p className="text-xs font-bold text-primary">{h.label}</p>
                        <p className="text-[11px] text-muted leading-relaxed">{h.desc}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Step 2: Featured Projects Cards */}
                {step.items && (
                  <div className="space-y-2.5 pt-1">
                    {step.items.map((proj) => (
                      <div
                        key={proj.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-default bg-surface/60 p-3.5 transition-all hover:border-accent-primary/30 hover:bg-surface"
                      >
                        <div className="min-w-0 space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs sm:text-sm font-bold text-primary">
                              {proj.title}
                            </span>
                            <Badge variant="primary" className="text-[10px]">
                              {proj.category}
                            </Badge>
                          </div>
                          <p className="text-xs text-secondary line-clamp-1">{proj.overview}</p>
                          <div className="flex flex-wrap gap-1 pt-0.5">
                            {proj.technologies.map((t) => (
                              <span
                                key={t}
                                className="rounded px-1.5 py-0.2 text-[10px] font-medium bg-surface-hover text-muted"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => navigateToDestination(proj.link)}
                          className="shrink-0 text-xs py-1 px-2.5 self-start sm:self-auto"
                        >
                          View Study
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Step 3: Skills Categories */}
                {step.skillCategories && (
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 pt-1">
                    {step.skillCategories.map((cat) => (
                      <div
                        key={cat.category}
                        className="rounded-2xl border border-default bg-surface/60 p-3.5 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-primary">{cat.category}</span>
                          <span className="text-[10px] font-semibold text-muted bg-surface-hover px-2 py-0.5 rounded-full">
                            {cat.count} Technologies
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {cat.items.map((item) => (
                            <span
                              key={item}
                              className="rounded-md border border-default/70 bg-surface/80 px-2 py-0.5 text-[11px] font-medium text-secondary"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Step 4 & 5: Highlights List */}
                {step.highlights && step.id !== 'navigation' && (
                  <div className="space-y-2.5 pt-1">
                    {step.highlights.map((h, idx) => (
                      <div
                        key={h.title || idx}
                        className="rounded-2xl border border-default bg-surface/60 p-4 space-y-1"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs sm:text-sm font-bold text-primary">
                            {h.title}
                          </span>
                          {h.status && (
                            <Badge variant="neutral" className="text-[10px]">
                              {h.status}
                            </Badge>
                          )}
                        </div>
                        {h.institution && (
                          <p className="text-xs font-semibold text-accent-primary">
                            {h.institution}
                          </p>
                        )}
                        {h.desc && (
                          <p className="text-xs text-secondary leading-relaxed">{h.desc}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Step 7: Direct Channels */}
                {step.directChannels && (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 pt-1">
                    {step.directChannels.map((c) => (
                      <a
                        key={c.label}
                        href={c.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between rounded-2xl border border-default bg-surface/60 p-4 transition-all hover:border-accent-primary/40 hover:bg-surface group"
                      >
                        <div>
                          <p className="text-xs font-bold text-primary group-hover:text-accent-primary transition-colors">
                            {c.label}
                          </p>
                          <p className="text-xs font-mono text-muted">{c.handle}</p>
                        </div>
                        <FaExternalLinkAlt className="h-3 w-3 text-muted group-hover:text-accent-primary transition-colors" />
                      </a>
                    ))}
                  </div>
                )}

                {/* Step Destination Link Pill */}
                {step.destinationLink && (
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => navigateToDestination(step.destinationLink.to)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-primary hover:underline cursor-pointer"
                    >
                      <span>{step.destinationLink.label}</span>
                      <FaArrowRight className="h-2.5 w-2.5" />
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Modal Footer Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3.5 border-t border-default/50 px-5 py-4 sm:px-7 sm:py-4 bg-surface/80">
            {/* Step Dots & Restart */}
            <div className="flex items-center gap-1.5">
              {steps.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => goToStep(idx)}
                  className={`h-2 rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary ${
                    idx === currentStep
                      ? 'w-6 bg-accent-primary'
                      : 'w-2 bg-default hover:bg-accent-primary/40'
                  }`}
                  aria-label={`Go to step ${idx + 1}: ${s.badge}`}
                />
              ))}

              {isLastStep && (
                <button
                  type="button"
                  onClick={restartGuide}
                  className="ml-2 inline-flex items-center gap-1 text-[11px] font-semibold text-muted hover:text-accent-primary transition-colors"
                  title={t('guide.restart')}
                >
                  <FaRedo className="h-2.5 w-2.5" />
                  <span>{t('guide.restart')}</span>
                </button>
              )}
            </div>

            {/* Previous & Next/Finish Buttons */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              {!isFirstStep && (
                <Button
                  variant="ghost"
                  size="sm"
                  icon={FaArrowLeft}
                  onClick={prevStep}
                  className={`text-xs px-3 ${isRTL ? '[&>svg]:rotate-180' : ''}`}
                >
                  {t('guide.back')}
                </Button>
              )}

              {isLastStep ? (
                <Button
                  variant="primary"
                  size="sm"
                  icon={FaCheck}
                  onClick={finishGuide}
                  className="text-xs px-4 shadow-md shadow-accent-primary/25"
                >
                  {t('guide.finishTour')}
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  icon={FaArrowRight}
                  iconPosition="right"
                  onClick={nextStep}
                  className={`text-xs px-4 shadow-md shadow-accent-primary/25 ${
                    isRTL ? '[&>svg]:rotate-180' : ''
                  }`}
                >
                  {isFirstStep ? t('guide.startTour') : t('guide.nextStep')}
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
