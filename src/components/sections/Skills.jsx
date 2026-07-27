// import { motion } from 'framer-motion';
// import { FaCode, FaDatabase, FaRobot, FaShieldAlt, FaTools } from 'react-icons/fa';
// import { portfolioData } from '../../data';
// import Typography from '../common/Typography';
// import Badge from '../common/Badge';
// import Card from '../common/Card';
// import Reveal from '../animations/Reveal';
import SectionWrapper from '../common/SectionWrapper';

import { portfolioData } from '../../data';
import SkillCategoryCard from '../skills/SkillCategoryCard';

export default function Skills() {
  const { skills } = portfolioData;

  return (
    <SectionWrapper
      id="skills"
      eyebrow="Skills"
      title="Technical Stack"
      description="My core stack is grouped by how I build, ship, and keep learning so the strongest capabilities are easy to scan."
      className="py-20 bg-gray-50 dark:bg-gray-900 glass"
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {skills.map((category) => (
          <SkillCategoryCard key={category.category} category={category} />
        ))}
      </div>
    </SectionWrapper>
  );
}
