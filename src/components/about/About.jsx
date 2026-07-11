import { portfolioData } from '../../data/portfolioData';
import SectionWrapper from '../common/SectionWrapper';
import AboutHeader from './AboutHeader';
import JourneyCard from './JourneyCard';
import LanguagesCard from './LanguagesCard';
import QuickFactsCard from './QuickFactsCard';
import StatsGrid from './StatsGrid';

export default function About() {
  const { personalInfo } = portfolioData;

  const stats = [
    {
      value: '4+',
      label: 'Projects',
    },
    {
      value: '5+',
      label: 'Certificates',
    },
    {
      value: '30+',
      label: 'Technologies',
    },
    {
      value: '5',
      label: 'Languages',
    },
  ];

  return (
    <SectionWrapper
      id="about"
      eyebrow="About"
      title="About Me"
      description={personalInfo.mission}
      innerClassName="space-y-10"
    >
      <AboutHeader mission={personalInfo.mission} />

      <div className="grid gap-6 lg:grid-cols-[1.5fr_0.8fr]">
        <JourneyCard journey={personalInfo.journey} />

        <QuickFactsCard
          title={personalInfo.title}
          studyingAt={personalInfo.studyingAt}
          location={personalInfo.location}
        />
      </div>

      <StatsGrid stats={stats} />

      <LanguagesCard languages={personalInfo.languages} />
    </SectionWrapper>
  );
}
