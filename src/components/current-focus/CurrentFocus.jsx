import { portfolioData } from '../../data/portfolioData';

import SectionWrapper from '../common/SectionWrapper';
import FocusCard from '../current-focus/FocusCard';

export default function CurrentFocus() {
  const { currentFocus } = portfolioData;

  return (
    <SectionWrapper
      id="current-focus"
      eyebrow="Currently"
      title="Current Focus"
      description="The areas I'm actively studying, building, and improving every day."
      innerClassName="grid gap-6 md:grid-cols-2"
      className="mx-auto max-w-6xl px-6"
    >
      {currentFocus.map((item, index) => (
        <FocusCard key={item.title} item={item} index={index} />
      ))}
    </SectionWrapper>
  );
}
