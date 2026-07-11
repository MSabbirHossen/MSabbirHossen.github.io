import SkillCategoryCard from './SkillCategoryCard';
import SectionWrapper from '../common/SectionWrapper';
import { portfolioData } from '../../data/portfolioData';

export default function Skills() {
  const { skills } = portfolioData;

  return (
    <SectionWrapper
      id="skills"
      title="Technical Expertise"
      description="Technologies, tools, and domains I use to build modern web applications and continuously expand my expertise."
      className="bg-gray-50 dark:bg-gray-900 glass"
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 mx-auto max-w-5xl px-4">
        {skills.map((category) => (
          <SkillCategoryCard key={category.category} category={category} />
        ))}
      </div>
    </SectionWrapper>
  );
}
