import SkillCategoryCard from './SkillCategoryCard';
import SectionWrapper from '../common/SectionWrapper';
import { portfolioData } from '../../data/portfolioData';

export default function Skills() {
  const { skills } = portfolioData;

  return (
    <SectionWrapper
      id="skills"
      title="Technical Stack"
      description="My core stack is grouped by how I build, ship, and keep learning so the strongest capabilities are easy to scan."
      className="glass"
    >
      <div className="mx-auto grid max-w-5xl gap-6 px-4 md:grid-cols-2 xl:grid-cols-3">
        {skills.map((category) => (
          <SkillCategoryCard key={category.category} category={category} />
        ))}
      </div>
    </SectionWrapper>
  );
}
