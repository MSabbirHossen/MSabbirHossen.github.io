import { portfolioData } from '../../data/portfolioData';

import SectionWrapper from '../common/SectionWrapper';

import AboutHeader from './AboutHeader';
import JourneyCard from './JourneyCard';
import LanguagesCard from './LanguagesCard';
import QuickFactsCard from './QuickFactsCard';
import AboutStats from './AboutStats';

export default function About() {
  const { personalInfo } = portfolioData;
  const { mission, tagline, title, journey, values, vision, languages, studyingAt, location } =
    personalInfo;

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
      tagline={tagline}
      description={mission}
      innerClassName="space-y-10"
      className="mx-auto max-w-6xl px-6"
    >
      <div className="grid gap-6 lg:grid-cols-[1.5fr_0.8fr]">
        <JourneyCard journey={journey} />
        <QuickFactsCard title={title} studyingAt={studyingAt} location={location} />
      </div>

      <AboutStats stats={stats} />

      <LanguagesCard languages={languages} />
    </SectionWrapper>
  );
}
