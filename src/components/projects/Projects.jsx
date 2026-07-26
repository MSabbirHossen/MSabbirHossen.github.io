import { useMemo, useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import SectionWrapper from '../common/SectionWrapper';
import ProjectFilters from '../projects/ProjectFilters';
import ProjectGrid from '../projects/ProjectGrid';

export default function Projects() {
  const { projects } = portfolioData;
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(
    () => ['All', ...new Set(projects.map((project) => project.category))],
    [projects]
  );

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <SectionWrapper
      id="projects"
      eyebrow="Portfolio"
      title="Featured Projects"
      description="Selected work that shows how I solve problems, choose a stack, implement the solution, and deliver something usable."
      className="glass"
      innerClassName="space-y-10"
    >
      <div className="mx-auto max-w-5xl px-4">
        <ProjectFilters
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        <ProjectGrid projects={filteredProjects} activeCategory={activeCategory} />
      </div>
    </SectionWrapper>
  );
}
