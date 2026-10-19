import SkillCategoryCard from './SkillCategoryCard';
import SectionWrapper from '../common/SectionWrapper';
import { portfolioData } from '../../data';

export default function Skills({ limit }) {
  const { skills } = portfolioData;
  const displayedSkills = limit ? skills.slice(0, limit) : skills;

  return (
    <SectionWrapper id="skills" title="Technical Stack" className="mx-auto max-w-5xl px-4 sm:px-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {displayedSkills.map((category, idx) => (
          <SkillCategoryCard
            key={category.category}
            category={category}
            index={idx}
            isFullWidth={idx === displayedSkills.length - 1 && displayedSkills.length % 2 !== 0}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
