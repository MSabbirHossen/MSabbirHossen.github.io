import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  FaArrowLeft,
  FaDownload,
  FaEnvelope,
  FaExternalLinkAlt,
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
  FaWhatsapp,
} from 'react-icons/fa';

import { portfolioData } from '../data';
import Typography from '../components/common/Typography';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Reveal from '../components/animations/Reveal';

export default function Recruiter() {
  const { personalInfo, projects, experience, education, certifications } = portfolioData;

  const siteUrl = personalInfo.website.replace(/\/$/, '');
  const canonicalUrl = `${siteUrl}/recruiter`;
  const pageTitle = `Recruiter Quick Scan & Hiring Overview | ${personalInfo.name} - Junior MERN Stack Developer`;
  const pageDescription =
    'Concise, high-signal recruiter evaluation overview for Md. Sabbir Hossen: verified top MERN projects, demonstrated skills, computer science education, and direct CV download.';
  const socialImage = `${siteUrl}/og-image.svg`;

  // Top 3 Flagship Projects in approved ranking
  const topProjects = ['report-bd', 'eta-digital-education-platform', 'life-os']
    .map((id) => projects.find((p) => p.id === id))
    .filter(Boolean);

  // Key Demonstrated Tech Stack
  const demonstratedStack = [
    { name: 'React 19', category: 'Frontend', note: 'Primary frontend library across all 8 apps' },
    {
      name: 'TypeScript',
      category: 'Language',
      note: 'Strict end-to-end type safety in Report BD & ETA',
    },
    {
      name: 'JavaScript (ES6+)',
      category: 'Language',
      note: 'Modern ESNext, asynchronous patterns',
    },
    {
      name: 'Node.js & Express',
      category: 'Backend',
      note: 'RESTful APIs, MVC architecture, middleware',
    },
    {
      name: 'MongoDB Atlas',
      category: 'Database',
      note: 'Aggregation pipelines, indexing, Mongoose ODM',
    },
    {
      name: 'Firebase Auth',
      category: 'Authentication',
      note: 'JWT tokens, OAuth providers, secure sessions',
    },
    {
      name: 'Tailwind CSS v4',
      category: 'Styling',
      note: 'Semantic design tokens, glassmorphism, responsive',
    },
    {
      name: 'Turborepo & Vite',
      category: 'Tooling',
      note: 'Monorepo workspace packages, fast HMR builds',
    },
  ];

  const primaryCert = certifications.find(
    (c) => c.issuer === 'Programming Hero' || c.type?.includes('Professional')
  );

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

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* Navigation & Header Bar */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-default/40 pb-6">
          <Button
            as={Link}
            to="/"
            variant="ghost"
            size="sm"
            icon={FaArrowLeft}
            className="px-0 hover:text-accent-primary"
          >
            Back to Full Portfolio
          </Button>

          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-xs text-muted hidden sm:inline">
              Time-Constrained Recruiter Scan
            </span>
            <Button
              href={personalInfo.resumeUrl}
              variant="primary"
              size="sm"
              icon={FaDownload}
              className="text-xs shadow-sm"
            >
              Download CV (PDF)
            </Button>
          </div>
        </div>

        {/* 1. Candidate Identity & Immediate Value Block */}
        <Reveal>
          <Card
            spotlight
            hover
            className="border-accent-primary/40 p-6 sm:p-8 bg-surface/90 shadow-xl shadow-accent-primary/5"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="space-y-3 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    Available for Full-time Roles
                  </span>
                  <Badge variant="neutral" className="text-xs">
                    Target: Junior MERN Stack Developer
                  </Badge>
                </div>

                <div>
                  <Typography
                    variant="h1"
                    className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight"
                  >
                    {personalInfo.name}
                  </Typography>
                  <p className="mt-1 text-base sm:text-lg font-semibold text-accent-primary">
                    Junior MERN Stack Developer · Full-Stack & Frontend Engineering
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-secondary pt-1">
                  <span className="flex items-center gap-1.5">
                    <FaMapMarkerAlt className="text-accent-secondary" />
                    <span>{personalInfo.location}</span>
                  </span>
                  <span>•</span>
                  <span>Remote Worldwide & On-site Relocation Ready</span>
                </div>

                <Typography
                  variant="body"
                  className="text-sm sm:text-base leading-relaxed text-secondary pt-2"
                >
                  Computer Science undergraduate at the Islamic University of Madinah with practical
                  experience engineering full-stack MERN and TypeScript applications. Demonstrated
                  record of delivering multi-tenant monorepos, optimistic revision locking, atomic
                  transactions, and clean RESTful APIs.
                </Typography>
              </div>

              {/* Direct Fast Actions */}
              <div className="flex flex-col gap-2.5 shrink-0 min-w-[200px] border-t border-default/40 pt-4 md:border-t-0 md:pt-0">
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted">
                  Direct Contact & Files
                </p>

                <Button
                  href={personalInfo.resumeUrl}
                  variant="primary"
                  size="sm"
                  icon={FaDownload}
                  className="w-full justify-center"
                >
                  Download CV (PDF)
                </Button>

                <Button
                  href={`mailto:${personalInfo.email}`}
                  variant="outline"
                  size="sm"
                  icon={FaEnvelope}
                  className="w-full justify-center"
                >
                  Email Sabbir
                </Button>

                {personalInfo.whatsappUrl && (
                  <Button
                    href={personalInfo.whatsappUrl}
                    variant="ghost"
                    size="sm"
                    icon={FaWhatsapp}
                    className="w-full justify-center text-emerald-400 hover:text-emerald-300"
                  >
                    WhatsApp Chat
                  </Button>
                )}

                <div className="flex items-center justify-center gap-2 pt-1 border-t border-default/30">
                  {personalInfo.github && (
                    <a
                      href={personalInfo.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-secondary hover:text-primary transition-colors"
                      aria-label="GitHub Profile"
                    >
                      <FaGithub className="h-5 w-5" />
                    </a>
                  )}
                  {personalInfo.linkedin && (
                    <a
                      href={personalInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-secondary hover:text-accent-primary transition-colors"
                      aria-label="LinkedIn Profile"
                    >
                      <FaLinkedin className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </Reveal>

        {/* 2. Executive Recruiter Proof Points */}
        <Reveal delay={0.1}>
          <div className="mt-8 grid grid-cols-2 gap-3.5 sm:grid-cols-4">
            <Card spotlight hover className="p-4 text-center border-default">
              <p className="text-2xl sm:text-3xl font-extrabold text-primary">8+</p>
              <p className="text-xs text-muted mt-0.5">Shipped Full-Stack Apps</p>
            </Card>
            <Card spotlight hover className="p-4 text-center border-default">
              <p className="text-2xl sm:text-3xl font-extrabold text-primary">BS CS</p>
              <p className="text-xs text-muted mt-0.5">Islamic Univ. of Madinah</p>
            </Card>
            <Card spotlight hover className="p-4 text-center border-default">
              <p className="text-2xl sm:text-3xl font-extrabold text-primary">8,000+</p>
              <p className="text-xs text-muted mt-0.5">Community Members</p>
            </Card>
            <Card spotlight hover className="p-4 text-center border-default">
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400">100%</p>
              <p className="text-xs text-muted mt-0.5">Verified Public Proof</p>
            </Card>
          </div>
        </Reveal>

        {/* 3. Top 3 Flagship Projects (Primary Engineering Evidence) */}
        <div className="mt-12 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-default/40 pb-4">
            <div>
              <Typography variant="h2" className="text-2xl font-bold text-primary">
                Top 3 Flagship Projects
              </Typography>
              <p className="text-xs sm:text-sm text-secondary mt-0.5">
                Evaluated by architectural complexity, codebase maturity, and verified business
                problem solutions.
              </p>
            </div>

            <Button as={Link} to="/projects" variant="outline" size="sm" className="text-xs">
              Browse All Projects (8)
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {topProjects.map((project, idx) => {
              const image = project.screenshots?.[0];
              const imageSrc = image
                ? image.startsWith('http')
                  ? image
                  : `${import.meta.env.BASE_URL}${image.replace(/^\//, '')}`
                : null;

              return (
                <Reveal key={project.id} delay={idx * 0.08}>
                  <Card
                    spotlight
                    hover
                    className="border-default p-6 sm:p-7 transition-all duration-300 hover:border-accent-primary/40 hover:shadow-xl hover:shadow-accent-primary/5"
                  >
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
                      {/* Project Image */}
                      {imageSrc && (
                        <div className="lg:col-span-5 overflow-hidden rounded-xl border border-default surface">
                          <img
                            src={imageSrc}
                            alt=""
                            aria-hidden="true"
                            className="aspect-video w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
                          />
                        </div>
                      )}

                      {/* Project Details */}
                      <div
                        className={`space-y-3.5 ${imageSrc ? 'lg:col-span-7' : 'lg:col-span-12'}`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-primary/10 text-xs font-bold text-accent-primary">
                              #{idx + 1}
                            </span>
                            <Badge variant="primary" className="text-xs">
                              {project.category}
                            </Badge>
                          </div>

                          {project.status && (
                            <span className="text-xs font-medium text-emerald-400 flex items-center gap-1">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                              {project.status}
                            </span>
                          )}
                        </div>

                        <div>
                          <Link
                            to={`/projects/${project.id}`}
                            className="text-xl font-bold text-primary hover:text-accent-primary transition-colors"
                          >
                            {project.title}
                          </Link>
                          <p className="mt-1 text-xs sm:text-sm leading-relaxed text-secondary">
                            {project.overview}
                          </p>
                        </div>

                        {/* Engineering Highlights */}
                        {project.highlights && project.highlights.length > 0 && (
                          <div className="space-y-1.5 border-t border-default/40 pt-2.5">
                            <p className="text-[11px] font-bold uppercase tracking-wider text-accent-secondary">
                              Key Architectural Contribution
                            </p>
                            <ul className="space-y-1 text-xs text-secondary">
                              {project.highlights.slice(0, 2).map((item, hIdx) => (
                                <li key={hIdx} className="flex items-start gap-2">
                                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-secondary" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Tech Pills & Actions */}
                        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-default/40 pt-3">
                          <div className="flex flex-wrap gap-1.5">
                            {(project.technologies || []).slice(0, 5).map((tech) => (
                              <span
                                key={tech.name || tech}
                                className="rounded-md border border-default/70 bg-surface/70 px-2 py-0.5 text-[11px] font-medium text-secondary"
                              >
                                {tech.name || tech}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center gap-2">
                            {project.liveUrl && (
                              <Button
                                href={project.liveUrl}
                                variant="outline"
                                size="sm"
                                icon={FaExternalLinkAlt}
                                iconPosition="right"
                                className="text-xs py-1 px-2.5"
                              >
                                Demo
                              </Button>
                            )}
                            {project.githubUrl && (
                              <Button
                                href={project.githubUrl}
                                variant="ghost"
                                size="sm"
                                icon={FaGithub}
                                className="text-xs py-1 px-2.5"
                              >
                                Code
                              </Button>
                            )}
                            <Button
                              as={Link}
                              to={`/projects/${project.id}`}
                              variant="primary"
                              size="sm"
                              className="text-xs py-1 px-3"
                            >
                              Case Study
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* 4. Core Demonstrated Skills Matrix */}
        <div className="mt-12 space-y-4">
          <div className="border-b border-default/40 pb-3">
            <Typography variant="h2" className="text-2xl font-bold text-primary">
              Demonstrated Technical Stack
            </Typography>
            <p className="text-xs sm:text-sm text-secondary mt-0.5">
              Verified technologies actively implemented in deployed production systems and case
              studies.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {demonstratedStack.map((item) => (
              <Card spotlight hover key={item.name} className="p-4 border-default">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-primary">{item.name}</span>
                  <Badge variant="neutral" className="text-[10px]">
                    {item.category}
                  </Badge>
                </div>
                <p className="mt-2 text-xs text-muted leading-relaxed">{item.note}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* 5. Selected Experience & Leadership */}
        <div className="mt-12 space-y-4">
          <div className="border-b border-default/40 pb-3">
            <Typography variant="h2" className="text-2xl font-bold text-primary">
              Practical Experience & Leadership
            </Typography>
            <p className="text-xs sm:text-sm text-secondary mt-0.5">
              Software delivery track record and verified voluntary community management.
            </p>
          </div>

          <div className="space-y-4">
            {experience.slice(0, 4).map((role) => (
              <Card
                spotlight
                hover
                key={role.id || role.company}
                className="p-5 sm:p-6 border-default"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-default/30 pb-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-primary">{role.role}</h3>
                    <p className="text-xs text-secondary font-medium">{role.company}</p>
                  </div>
                  <Badge variant="primary" className="text-xs">
                    {role.period}
                  </Badge>
                </div>

                <p className="mt-3 text-xs sm:text-sm text-secondary leading-relaxed">
                  {role.desc}
                </p>

                {role.outcomes && role.outcomes.length > 0 && (
                  <ul className="mt-3 space-y-1.5 text-xs text-muted">
                    {role.outcomes.slice(0, 2).map((outcome, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-secondary" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* 6. Academic Background & Primary Credential */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Education */}
          <div className="space-y-4">
            <div className="border-b border-default/40 pb-3">
              <Typography variant="h3" className="text-xl font-bold text-primary">
                Academic Foundations
              </Typography>
              <p className="text-xs text-muted mt-0.5">
                University degree & formal language studies
              </p>
            </div>

            <div className="space-y-3">
              {education.slice(0, 2).map((edu) => (
                <Card spotlight hover key={edu.degree} className="p-4 border-default">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-bold text-primary">{edu.degree}</span>
                    <Badge
                      variant={edu.status?.includes('Progress') ? 'secondary' : 'neutral'}
                      className="text-[10px]"
                    >
                      {edu.status || edu.period}
                    </Badge>
                  </div>
                  <p className="text-xs text-accent-secondary font-medium mt-1">
                    {edu.institution}
                  </p>
                  <p className="text-xs text-muted mt-1 line-clamp-2">{edu.desc}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Primary Certification */}
          <div className="space-y-4">
            <div className="border-b border-default/40 pb-3">
              <Typography variant="h3" className="text-xl font-bold text-primary">
                Verified Full-Stack Credential
              </Typography>
              <p className="text-xs text-muted mt-0.5">Comprehensive development training</p>
            </div>

            {primaryCert && (
              <Card spotlight hover className="p-5 border-default space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-bold text-primary">{primaryCert.title}</h4>
                    <p className="text-xs text-accent-secondary font-medium mt-0.5">
                      Issued by {primaryCert.issuer} ({primaryCert.date})
                    </p>
                  </div>
                  <Badge variant="primary" className="text-[10px]">
                    Certified
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {primaryCert.skills?.map((s) => (
                    <span
                      key={s}
                      className="rounded border border-default bg-surface/70 px-2 py-0.5 text-[10px] text-secondary"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {primaryCert.link && (
                  <div className="pt-2 border-t border-default/30">
                    <Button
                      href={primaryCert.link}
                      variant="outline"
                      size="sm"
                      icon={FaExternalLinkAlt}
                      iconPosition="right"
                      className="text-xs py-1 px-2.5"
                    >
                      Verify Certificate PDF
                    </Button>
                  </div>
                )}
              </Card>
            )}
          </div>
        </div>

        {/* 7. Fast-Action Recruiter Footer */}
        <Reveal delay={0.2}>
          <div className="mt-14 rounded-2xl border border-accent-primary/40 bg-surface/90 p-6 sm:p-8 text-center space-y-4 shadow-xl shadow-accent-primary/5">
            <Typography variant="h2" className="text-xl sm:text-2xl font-bold text-primary">
              Ready to Discuss Junior Full-Stack Roles?
            </Typography>

            <p className="mx-auto max-w-xl text-xs sm:text-sm text-secondary leading-relaxed">
              I am actively interviewing for Junior MERN Stack Developer, Frontend Engineer, and
              Full-Stack JavaScript opportunities. Reach out directly or download my CV.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Button href={personalInfo.resumeUrl} variant="primary" size="md" icon={FaDownload}>
                Download CV (PDF)
              </Button>

              <Button
                href={`mailto:${personalInfo.email}`}
                variant="outline"
                size="md"
                icon={FaEnvelope}
              >
                Send Email
              </Button>

              <Button as={Link} to="/" variant="ghost" size="md" icon={FaArrowLeft}>
                Explore Full Interactive Portfolio
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </>
  );
}
