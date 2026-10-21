import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { portfolioData } from '../../data';
import SectionWrapper from '../common/SectionWrapper';
import Button from '../common/Button';
import ProjectFilters from '../projects/ProjectFilters';
import ProjectGrid from '../projects/ProjectGrid';

export default function Projects({ limit = 4 }) {
  const { projects } = portfolioData;
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(
    () => ['All', ...new Set(projects.map((project) => project.category))],
    [projects]
  );

  const displayedProjects = useMemo(() => {
    const ordered = [...projects].sort(
      (a, b) => (a.featuredOrder ?? 999) - (b.featuredOrder ?? 999)
    );

    if (limit) {
      return ordered.slice(0, limit);
    }

    return activeCategory === 'All'
      ? ordered
      : ordered.filter((project) => project.category === activeCategory);
  }, [projects, limit, activeCategory]);

  return (
    <SectionWrapper id="projects" title="Featured Projects" innerClassName="space-y-10">
      <div className="mx-auto max-w-5xl px-4">
        {!limit && (
          <ProjectFilters
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        )}

        <ProjectGrid
          projects={displayedProjects}
          activeCategory={limit ? 'featured' : activeCategory}
          columns={2}
        />

        {limit && projects.length > limit && (
          <div className="mt-8 flex justify-center">
            <Button
              as={Link}
              to="/projects"
              variant="outline"
              size="md"
              icon={FaArrowRight}
              iconPosition="right"
              className="group border-default shadow-sm hover:border-accent-primary hover:text-accent-primary"
            >
              View All Projects ({projects.length})
            </Button>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
