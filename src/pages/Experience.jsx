import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  FaArrowLeft,
  FaBriefcase,
  FaExternalLinkAlt,
  FaGithub,
  FaGraduationCap,
  FaLayerGroup,
  FaRocket,
} from 'react-icons/fa';

import { portfolioData } from '../data';
import Typography from '../components/common/Typography';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Reveal from '../components/animations/Reveal';

export default function ExperiencePage() {
  const { experience, education, personalInfo } = portfolioData;
  const [activeFilter, setActiveFilter] = useState('All');

  const siteUrl = personalInfo.website.replace(/\/$/, '');
  const canonicalUrl = `${siteUrl}/experience`;
  const pageTitle = `Experience & Project Timeline | ${personalInfo.name}`;
  const pageDescription =
    'Explore the complete chronological engineering timeline and project milestones of Md. Sabbir Hossen.';
  const socialImage = `${siteUrl}/og-image.svg`;

  const filterOptions = useMemo(() => {
    const categories = Array.from(new Set(experience.map((item) => item.category).filter(Boolean)));
    return ['All', ...categories];
  }, [experience]);

  const filteredTimeline = useMemo(() => {
    if (activeFilter === 'All') return experience;
    return experience.filter((item) => item.category === activeFilter);
  }, [experience, activeFilter]);

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

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Navigation & Header */}
        <div className="mb-10">
          <Reveal>
            <Button
              as={Link}
              to="/#experience"
              state={{ scrollToSection: 'experience' }}
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
                Engineering Journey & Timeline
              </Typography>
            </Reveal>
          </div>
        </div>

        {/* Timeline Metrics Ribbon */}
        <Reveal delay={0.2}>
          <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Card className="flex items-center gap-4 py-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary">
                <FaRocket className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{experience.length}+</p>
                <p className="text-xs text-muted">Shipped Product Milestones</p>
              </div>
            </Card>

            <Card className="flex items-center gap-4 py-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-secondary/10 text-accent-secondary">
                <FaLayerGroup className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-primary">TypeScript & MERN</p>
                <p className="text-xs text-muted">PostgreSQL · Docker · Cloud</p>
              </div>
            </Card>

            <Card className="flex items-center gap-4 py-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <FaBriefcase className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-primary">100% Deployed</p>
                <p className="text-xs text-muted">Live Demonstrable Systems</p>
              </div>
            </Card>
          </div>
        </Reveal>

        {/* Category Filter Pills */}
        <Reveal delay={0.25}>
          <div className="mb-10 flex flex-wrap gap-2.5">
            {filterOptions.map((option) => (
              <Button
                key={option}
                variant={activeFilter === option ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setActiveFilter(option)}
                aria-pressed={activeFilter === option}
              >
                {option}
              </Button>
            ))}
          </div>
        </Reveal>

        {/* The Chain of Time Timeline */}
        <div className="relative">
          {/* Continuous Vertical Glowing Line */}
          <div className="absolute left-4 top-0 h-full w-0.5 bg-linear-to-b from-accent-primary via-accent-secondary to-accent-primary/20 md:left-6" />

          {/* Project & Experience Nodes */}
          {filteredTimeline.map((item, index) => (
            <Reveal
              key={`${item.id || item.company}-${index}`}
              className="relative mb-12 flex items-start gap-6 last:mb-12"
              y={20}
              duration={0.45}
              delay={index * 0.06}
              amount={0.15}
            >
              {/* Timeline Chain Node */}
              <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-accent-primary bg-surface shadow-md shadow-accent-primary/20 md:left-2 md:-translate-x-1/2">
                {index === 0 ? (
                  <FaRocket className="h-4 w-4 text-accent-primary animate-pulse" />
                ) : (
                  <FaBriefcase className="h-3.5 w-3.5 text-accent-secondary" />
                )}
              </div>

              {/* Milestone Card */}
              <div className="w-full">
                <Card className="group space-y-5 border-default transition-all duration-300 hover:border-accent-primary/40 hover:shadow-lg hover:shadow-accent-primary/5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="primary">{item.period}</Badge>
                      {item.category && <Badge variant="neutral">{item.category}</Badge>}
                    </div>

                    {item.projectSlug && (
                      <Link
                        to={`/projects/${item.projectSlug}`}
                        className="text-xs font-semibold text-accent-primary hover:underline"
                      >
                        Explore Case Study &rarr;
                      </Link>
                    )}
                  </div>

                  <div>
                    <Typography variant="h3" className="text-primary font-bold">
                      {item.role}
                    </Typography>
                    <Typography variant="body" className="text-secondary font-medium mt-1">
                      {item.company}
                    </Typography>
                  </div>

                  <Typography
                    variant="body"
                    className="text-muted text-sm sm:text-base leading-relaxed"
                  >
                    {item.desc}
                  </Typography>

                  {/* Measurable Outcomes */}
                  {item.outcomes && (
                    <div className="space-y-2 pt-1">
                      <p className="text-xs font-semibold uppercase tracking-wider text-accent-secondary">
                        Key Engineering Outcomes
                      </p>
                      <ul className="space-y-2">
                        {item.outcomes.map((outcome) => (
                          <li key={outcome} className="flex gap-2.5 text-sm text-muted">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-secondary" />
                            <span>{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technology Tags */}
                  {item.technologies?.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-2">
                      {item.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-lg border border-default bg-surface/80 px-2.5 py-1 text-xs text-secondary font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action Link Row */}
                  <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-default/50">
                    {item.projectSlug && (
                      <Button
                        as={Link}
                        to={`/projects/${item.projectSlug}`}
                        variant="primary"
                        size="sm"
                      >
                        Case Study
                      </Button>
                    )}

                    {item.liveUrl && (
                      <Button
                        href={item.liveUrl}
                        variant="outline"
                        size="sm"
                        icon={FaExternalLinkAlt}
                        iconPosition="right"
                      >
                        Live Demo
                      </Button>
                    )}

                    {item.githubUrl && (
                      <Button href={item.githubUrl} variant="ghost" size="sm" icon={FaGithub}>
                        Source Code
                      </Button>
                    )}
                  </div>
                </Card>
              </div>
            </Reveal>
          ))}

          {/* Foundational Milestone Node (Origin of the Chain) */}
          <Reveal
            className="relative flex items-start gap-6"
            y={20}
            duration={0.45}
            delay={0.2}
            amount={0.15}
          >
            <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-emerald-400 bg-surface shadow-md shadow-emerald-400/20 md:left-2 md:-translate-x-1/2">
              <FaGraduationCap className="h-4 w-4 text-emerald-400" />
            </div>

            <div className="w-full">
              <Card className="space-y-4 border-dashed border-accent-secondary/30 bg-surface/50">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="neutral">Foundations</Badge>
                  <span className="text-xs text-muted">Continuous Learning & CS Academics</span>
                </div>

                <Typography variant="h3" className="text-primary font-bold">
                  Computer Science Studies & Core Foundations
                </Typography>

                <Typography variant="body" className="text-secondary font-medium">
                  {education[0]?.institution || 'Islamic University of Madinah'} ·{' '}
                  {education[0]?.degree || 'Bachelor in Computer Science'}
                </Typography>

                <Typography variant="body" className="text-muted text-sm leading-relaxed">
                  Established core computer science fundamentals, data structures, algorithms, and
                  continuous self-driven practice that paved the path for full-stack MERN,
                  TypeScript, and modern system development.
                </Typography>
              </Card>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
