import { portfolioData } from '../../data';
import SectionWrapper from '../common/SectionWrapper';
import FocusCard from './FocusCard';

export default function CurrentFocus({ limit = 4 }) {
  const { currentFocus } = portfolioData;
  const displayedFocus = limit ? currentFocus.slice(0, limit) : currentFocus;

  return (
    <SectionWrapper
      id="current-focus"
      title="Current Focus"
      className="mx-auto max-w-5xl px-4 sm:px-6"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {displayedFocus.map((item, index) => (
          <FocusCard key={item.title} item={item} index={index} />
        ))}
      </div>
    </SectionWrapper>
  );
}
