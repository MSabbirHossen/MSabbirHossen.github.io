import { portfolioData } from '../../data';
import HeroImage from '../hero/HeroImage';
import HeroContent from '../hero/HeroContent';
import { FaArrowDown } from 'react-icons/fa';
import { scrollToSection } from '../../lib/navigation';
import { useTranslation } from '../../i18n';

export default function Hero() {
  const { t } = useTranslation();
  const { personalInfo } = portfolioData;

  const scrollToContact = () => {
    scrollToSection('contact');
  };

  const scrollToProjects = () => {
    scrollToSection('projects');
  };

  const scrollToHighlights = () => {
    scrollToSection('highlights');
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden min-h-[calc(100vh-5rem)] flex items-center pt-8 pb-16 lg:py-20"
    >
      {/* Subtle ambient lighting */}
      <div className="absolute inset-0 pointer-events-none dark:bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.15),transparent_45%),radial-gradient(ellipse_at_bottom_right,rgba(6,182,212,0.1),transparent_35%)] bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.05),transparent_45%),radial-gradient(ellipse_at_bottom_right,rgba(14,116,144,0.04),transparent_35%)]" />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1.2fr_0.8fr]">
        <HeroContent
          personalInfo={personalInfo}
          onContact={scrollToContact}
          onProjects={scrollToProjects}
        />

        <HeroImage />
      </div>

      <button
        type="button"
        onClick={scrollToHighlights}
        className="animate-float absolute bottom-4 left-1/2 -translate-x-1/2 text-xs font-semibold uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent-primary cursor-pointer hidden md:block"
        aria-label={t('hero.exploreAria', {}, 'Scroll to explore highlights')}
      >
        <span className="flex flex-col items-center gap-1.5">
          <span className="text-[11px]">{t('hero.exploreScroll', {}, 'Explore')}</span>
          <FaArrowDown className="h-3 w-3" aria-hidden="true" />
        </span>
      </button>
    </section>
  );
}
