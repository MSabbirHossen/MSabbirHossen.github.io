import heroImage from '../../assets/hero.png';
import { portfolioData } from '../../data/portfolioData';

import HeroImage from '../hero/HeroImage';
import HeroContent from '../hero/HeroContent';

export default function Hero() {
  const { personalInfo } = portfolioData;
  const { name, title, secondaryTitle, tagline, github, linkedin, facebook, resumeUrl } =
    personalInfo;

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden min-h-[calc(100vh-6rem)] flex items-center py-16"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.12),transparent_28%)]" />
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.2fr_0.8fr]">
        <HeroContent personalInfo={personalInfo} onContact={scrollToContact} />

        <HeroImage
          image={heroImage}
          focusTitle={personalInfo.hero.focusTitle}
          focusItems={personalInfo.hero.focusItems}
        />
      </div>
    </section>
  );
}
