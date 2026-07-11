import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../../data/portfolioData';
import Typography from '../common/Typography';
import Badge from '../common/Badge';
import Card from '../common/Card';
import Button from '../common/Button';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaCode, FaGithub, FaGlobe } from 'react-icons/fa';
import Reveal from '../animations/Reveal';
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
      description="A selection of full-stack, AI-powered, and frontend applications showcasing my development journey."
      className="glass"
      innerClassName="space-y-10"
    >
      <div className="mx-auto max-w-5xl px-4">
        <Typography
          variant="h2"
          className="mb-8 text-center text-primary-600 dark:text-primary-400"
        >
          Featured Projects
        </Typography>

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
