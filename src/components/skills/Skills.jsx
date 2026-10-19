import SkillCategoryCard from './SkillCategoryCard';
import SectionWrapper from '../common/SectionWrapper';
import { portfolioData } from '../../data';

export default function Skills() {
  const { skills } = portfolioData;

  return (
    <SectionWrapper id="skills" title="Technical Stack">
      <div className="mx-auto grid max-w-5xl gap-6 px-4 md:grid-cols-2 xl:grid-cols-3">
        {skills.map((category) => (
          <SkillCategoryCard key={category.category} category={category} />
        ))}
      </div>
    </SectionWrapper>
  );
}
