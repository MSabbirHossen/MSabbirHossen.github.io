import { useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FaLaptopCode, FaTimes } from 'react-icons/fa';

import SkillCategoryCard from './SkillCategoryCard';
import SkillEvidencePanel from './SkillEvidencePanel';
import SectionWrapper from '../common/SectionWrapper';
import { portfolioData } from '../../data';

export default function Skills({ limit }) {
  const { skills } = portfolioData;
  const displayedSkills = limit ? skills.slice(0, limit) : skills;

  const [selectedSkill, setSelectedSkill] = useState(null);
  const evidenceRef = useRef(null);

  const handleSelectSkill = (skill) => {
    if (selectedSkill?.name === skill.name) {
      setSelectedSkill(null);
    } else {
      setSelectedSkill(skill);
      setTimeout(() => {
        evidenceRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  };

  const handleClear = () => {
    setSelectedSkill(null);
  };

  return (
    <SectionWrapper
      id="skills"
      eyebrow="Core Competencies"
      title="Technical Stack & Architecture"
      description="An evidence-based directory of full-stack technologies with verified real-world project applications."
      className="mx-auto max-w-5xl px-4 sm:px-6"
    >
      {/* Recruiter Instruction & Filter Bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-default/60 bg-surface/60 px-4 py-3 backdrop-blur-sm sm:px-5">
        <div className="flex items-center gap-2.5 text-xs text-secondary sm:text-sm">
          <FaLaptopCode className="h-4 w-4 shrink-0 text-accent-primary" aria-hidden="true" />
          <span>
            {selectedSkill ? (
              <span>
                Filtering by{' '}
                <strong className="text-primary font-semibold">{selectedSkill.name}</strong> —
                inspecting real-world applications below.
              </span>
            ) : (
              <span>
                Click any technology chip to inspect verified project implementation evidence.
              </span>
            )}
          </span>
        </div>

        {selectedSkill && (
          <button
            type="button"
            onClick={handleClear}
            className="inline-flex items-center gap-1.5 rounded-lg border border-default bg-surface px-2.5 py-1 text-xs font-medium text-secondary hover:text-primary hover:border-accent-primary/50 transition-colors cursor-pointer"
            aria-label="Clear skill filter"
          >
            <span>Reset</span>
            <FaTimes className="h-3 w-3" />
          </button>
        )}
      </div>

      {/* 5-Category Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {displayedSkills.map((category, idx) => (
          <SkillCategoryCard
            key={category.category}
            category={category}
            index={idx}
            isFullWidth={idx === displayedSkills.length - 1 && displayedSkills.length % 2 !== 0}
            selectedSkill={selectedSkill}
            onSelectSkill={handleSelectSkill}
          />
        ))}
      </div>

      {/* Verified Evidence Panel Container */}
      <div ref={evidenceRef}>
        <AnimatePresence mode="wait">
          {selectedSkill && (
            <SkillEvidencePanel
              key={selectedSkill.name}
              selectedSkill={selectedSkill}
              onClear={handleClear}
            />
          )}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}
