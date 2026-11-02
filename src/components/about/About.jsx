import { portfolioData } from '../../data';
import SectionWrapper from '../common/SectionWrapper';
import JourneyCard from './JourneyCard';
import LanguagesCard from './LanguagesCard';
import QuickFactsCard from './QuickFactsCard';

export default function About() {
  const { personalInfo } = portfolioData;
  const { title, journey, languages, studyingAt, location } = personalInfo;

  return (
    <SectionWrapper
      id="about"
      title="About Me"
      innerClassName="space-y-10"
      className="mx-auto max-w-6xl px-4 sm:px-6"
    >
      <div className="grid gap-6 lg:grid-cols-[1.5fr_0.8fr]">
        <JourneyCard journey={journey} />
        <QuickFactsCard title={title} studyingAt={studyingAt} location={location} />
      </div>

      <LanguagesCard languages={languages} />
    </SectionWrapper>
  );
}
