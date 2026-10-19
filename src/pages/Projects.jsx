import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaSearch, FaTimes } from 'react-icons/fa';

import { portfolioData } from '../data';
import Typography from '../components/common/Typography';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Reveal from '../components/animations/Reveal';
import ProjectFilters from '../components/projects/ProjectFilters';
import ProjectGrid from '../components/projects/ProjectGrid';

export default function ProjectsPage() {
  const { projects, personalInfo } = portfolioData;
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const siteUrl = personalInfo.website.replace(/\/$/, '');
  const canonicalUrl = `${siteUrl}/projects`;
  const pageTitle = `All Projects | ${personalInfo.name} - MERN Stack Developer`;
  const pageDescription =
    'Browse all full-stack web applications, MERN platforms, and software engineering projects by Md. Sabbir Hossen.';
  const socialImage = `${siteUrl}/og-image.svg`;

  const categories = useMemo(
    () => ['All', ...new Set(projects.map((project) => project.category))],
    [projects]
  );

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = activeCategory === 'All' || project.category === activeCategory;

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const query = searchQuery.toLowerCase().trim();
      const searchableText = [
        project.title,
        project.category,
        project.overview,
        ...(project.technologies ?? []).map((t) => (t.name ?? t).toString()),
      ]
        .join(' ')
        .toLowerCase();

      return searchableText.includes(query);
    });
  }, [projects, activeCategory, searchQuery]);

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={socialImage} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={socialImage} />
      </Helmet>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-10">
          <Reveal>
            <Button
              as={Link}
              to="/#projects"
              state={{ scrollToSection: 'projects' }}
              variant="ghost"
              size="sm"
              icon={FaArrowLeft}
              className="mb-8 px-0"
            >
              Back to Home
            </Button>
          </Reveal>

          <div className="space-y-2">
            <Reveal delay={0.05}>
              <Typography variant="h1" className="text-balance text-3xl sm:text-4xl md:text-5xl">
                All Projects
              </Typography>
            </Reveal>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <Reveal delay={0.2}>
          <div className="mb-8 space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Search input */}
              <div className="relative w-full sm:max-w-xs">
                <FaSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted text-sm" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search projects or stack..."
                  className="w-full rounded-xl border border-default bg-surface/70 py-2.5 pl-9 pr-8 text-sm text-primary placeholder:text-muted focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-muted hover:text-primary transition-colors"
                    aria-label="Clear search"
                  >
                    <FaTimes className="h-3 w-3" />
                  </button>
                )}
              </div>

              {/* Project count indicator */}
              <div className="text-xs font-medium text-muted">
                Showing{' '}
                <span className="font-semibold text-primary">{filteredProjects.length}</span> of{' '}
                <span className="font-semibold text-primary">{projects.length}</span> projects
              </div>
            </div>

            {/* Category pills */}
            <ProjectFilters
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          </div>
        </Reveal>

        {/* Grid or Empty State */}
        {filteredProjects.length > 0 ? (
          <ProjectGrid
            projects={filteredProjects}
            activeCategory={`${activeCategory}-${searchQuery}`}
          />
        ) : (
          <Reveal delay={0.1}>
            <Card className="py-16 text-center space-y-4 border-dashed">
              <Typography variant="h3">No projects found</Typography>
              <Typography variant="body" className="text-muted max-w-md mx-auto">
                No projects matched your search criteria &quot;{searchQuery}&quot; in{' '}
                {activeCategory === 'All' ? 'any category' : `the ${activeCategory} category`}.
              </Typography>
              <div className="pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('All');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </Card>
          </Reveal>
        )}
      </div>
    </>
  );
}
