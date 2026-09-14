import { portfolioData } from '../../data';

import SectionWrapper from '../common/SectionWrapper';
import FocusCard from '../current-focus/FocusCard';

export default function CurrentFocus({ compact = false }) {
  const { currentFocus } = portfolioData;

  if (compact) {
    return (
      <section id="current-focus" className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-secondary">
            Currently focused on
          </span>
          {currentFocus.slice(0, 3).map((item) => (
            <span
              key={item.title}
              className="rounded-full border border-default bg-surface px-4 py-2 text-sm text-secondary"
            >
              {item.title}
            </span>
          ))}
        </div>
      </section>
    );
  }

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
