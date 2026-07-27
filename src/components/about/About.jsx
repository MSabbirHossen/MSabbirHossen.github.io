import { portfolioData } from '../../data';

import SectionWrapper from '../common/SectionWrapper';

import JourneyCard from './JourneyCard';
import LanguagesCard from './LanguagesCard';
import QuickFactsCard from './QuickFactsCard';
import AboutStats from './AboutStats';

export default function About() {
  const { personalInfo, projects, certifications, skills } = portfolioData;
  const { mission, tagline, title, journey, languages, studyingAt, location } = personalInfo;

  const technologyCount = skills.reduce((total, category) => total + category.items.length, 0);

  const stats = [
    {
      value: String(projects.length),
      label: 'Projects built',
    },
    {
      value: String(certifications.length),
      label: 'Certifications',
    },
    {
      value: String(technologyCount),
      label: 'Stack skills',
    },
    {
      value: String(languages.length),
      label: 'Languages',
    },
  ];

  return (
    <SectionWrapper
      id="about"
      eyebrow="About"
      title="Developer Profile"
      tagline={tagline}
      // description={mission}
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
