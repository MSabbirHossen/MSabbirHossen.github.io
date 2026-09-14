import { portfolioData } from '../../data';

import HeroImage from '../hero/HeroImage';
import HeroContent from '../hero/HeroContent';
import { FaArrowDown } from 'react-icons/fa';

export default function Hero() {
  const { personalInfo } = portfolioData;

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden min-h-[calc(100vh-6rem)] flex items-center"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.12),transparent_28%)]" />
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.2fr_0.8fr]">
        <HeroContent personalInfo={personalInfo} onContact={scrollToContact} />

        <HeroImage />
      </div>
      <button
        type="button"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        className="animate-float absolute bottom-6 left-1/2 -translate-x-1/2 text-xs font-semibold uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent-primary"
        aria-label="Scroll to explore the portfolio"
      >
        <span className="flex flex-col items-center gap-2">
          <span>Scroll to explore</span>
          <FaArrowDown aria-hidden="true" />
        </span>
      </button>
    </section>
  );
}
