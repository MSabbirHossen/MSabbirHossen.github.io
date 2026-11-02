import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  FaArrowLeft,
  FaArrowRight,
  FaAward,
  FaBriefcase,
  FaCertificate,
  FaCheckCircle,
  FaCode,
  FaExternalLinkAlt,
  FaGitAlt,
  FaGraduationCap,
  FaLaptopCode,
  FaTable,
} from 'react-icons/fa';

import { portfolioData } from '../data';
import Typography from '../components/common/Typography';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Reveal from '../components/animations/Reveal';

const CATEGORIES = [
  { id: 'all', label: 'All Credentials' },
  { id: 'fullstack', label: 'Full-Stack & MERN' },
  { id: 'frontend', label: 'Frontend & UI' },
  { id: 'tooling', label: 'Tooling & Workflow' },
  { id: 'productivity', label: 'Productivity & Data' },
];

const getCertCategory = (cert) => {
  if (
    cert.skills?.some((s) => ['React', 'Node.js', 'MongoDB', 'Full-Stack', 'REST APIs'].includes(s))
  ) {
    return 'fullstack';
  }
  if (cert.skills?.some((s) => ['HTML5', 'CSS3', 'Responsive Design', 'UI Layouts'].includes(s))) {
    return 'frontend';
  }
  if (
    cert.skills?.some((s) =>
      ['Git', 'GitHub', 'VS Code', 'Version Control', 'Developer Tooling'].includes(s)
    )
  ) {
    return 'tooling';
  }
  if (
    cert.skills?.some((s) => ['Google Sheets', 'Productivity', 'Data Organization'].includes(s))
  ) {
    return 'productivity';
  }
  return 'all';
};

const renderCertIcon = (category) => {
  const iconClass = 'h-6 w-6';
  switch (category) {
    case 'fullstack':
      return <FaLaptopCode className={iconClass} aria-hidden="true" />;
    case 'frontend':
      return <FaCode className={iconClass} aria-hidden="true" />;
    case 'tooling':
      return <FaGitAlt className={iconClass} aria-hidden="true" />;
    case 'productivity':
      return <FaTable className={iconClass} aria-hidden="true" />;
    default:
      return <FaCertificate className={iconClass} aria-hidden="true" />;
  }
};

const getCategoryBadgeLabel = (category) => {
  switch (category) {
    case 'fullstack':
      return 'Full-Stack MERN';
    case 'frontend':
      return 'Frontend & UI';
    case 'tooling':
      return 'Tooling & Git';
    case 'productivity':
      return 'Productivity';
    default:
      return 'Certification';
  }
};

export default function CertificationsPage() {
  const { certifications, personalInfo } = portfolioData;
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredCertifications = useMemo(() => {
    if (selectedCategory === 'all') return certifications;
    return certifications.filter((cert) => getCertCategory(cert) === selectedCategory);
  }, [certifications, selectedCategory]);

  const siteUrl = personalInfo.website.replace(/\/$/, '');
  const canonicalUrl = `${siteUrl}/certifications`;
  const pageTitle = `Certifications & Professional Training | ${personalInfo.name}`;
  const pageDescription =
    'Verified certifications in full-stack web development, MERN architecture, Git workflows, and front-end engineering earned by Md. Sabbir Hossen.';
  const socialImage = `${siteUrl}/og-image.svg`;

  const certificationsSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    name: pageTitle,
    description: pageDescription,
    url: canonicalUrl,
  };

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
        <script type="application/ld+json">{JSON.stringify(certificationsSchema)}</script>
      </Helmet>

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        {/* Navigation & Header */}
        <div className="mb-10 sm:mb-12">
          <Reveal>
            <Button
              as={Link}
              to="/#certifications"
              state={{ scrollToSection: 'certifications' }}
              variant="ghost"
              size="sm"
              icon={FaArrowLeft}
              className="mb-6 px-0 text-secondary hover:text-accent-primary"
            >
              Back to Certifications Section
            </Button>
          </Reveal>

          <div className="space-y-3">
            <Reveal delay={0.05}>
              <Badge variant="primary" className="text-xs">
                Verified Credentials
              </Badge>
            </Reveal>

            <Reveal delay={0.1}>
              <Typography
                variant="h1"
                className="text-balance text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary"
              >
                Certifications & Training
              </Typography>
            </Reveal>

            <Reveal delay={0.15}>
              <Typography
                variant="body"
                className="max-w-3xl text-sm sm:text-base leading-relaxed text-secondary"
              >
                Structured professional certifications reinforcing modern full-stack development,
                component engineering, collaborative Git workflows, and engineering tooling.
              </Typography>
            </Reveal>
          </div>
        </div>

        {/* Highlights Ribbon */}
        <Reveal delay={0.2}>
          <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Card spotlight hover className="flex items-center gap-4 border-default p-4 sm:p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent-primary/10 text-accent-primary">
                <FaLaptopCode className="h-6 w-6" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-primary truncate">MERN Full-Stack</p>
                <p className="text-xs text-muted truncate">Programming Hero Certified</p>
              </div>
            </Card>

            <Card spotlight hover className="flex items-center gap-4 border-default p-4 sm:p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent-secondary/10 text-accent-secondary">
                <FaAward className="h-6 w-6" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-primary truncate">
                  {certifications.length} Credentials
                </p>
                <p className="text-xs text-muted truncate">MERN, Git, UI & Tooling</p>
              </div>
            </Card>

            <Card spotlight hover className="flex items-center gap-4 border-default p-4 sm:p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                <FaCheckCircle className="h-6 w-6" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-primary truncate">100% Verifiable</p>
                <p className="text-xs text-muted truncate">Authentic Public Links</p>
              </div>
            </Card>
          </div>
        </Reveal>

        {/* Category Filters */}
        <Reveal delay={0.22}>
          <div className="mb-8 flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const count =
                cat.id === 'all'
                  ? certifications.length
                  : certifications.filter((c) => getCertCategory(c) === cat.id).length;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary ${
                    isActive
                      ? 'bg-accent-primary text-white shadow-md shadow-accent-primary/25'
                      : 'border border-default bg-surface/70 text-secondary hover:border-accent-primary/40 hover:bg-surface hover:text-primary'
                  }`}
                  aria-pressed={isActive}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-surface-hover text-muted'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredCertifications.map((cert, index) => {
            const category = getCertCategory(cert);
            const badgeLabel = getCategoryBadgeLabel(category);

            return (
              <Reveal
                key={cert.id || `${cert.title}-${index}`}
                y={18}
                delay={index * 0.06}
                duration={0.4}
                className="h-full"
              >
                <Card
                  spotlight
                  hover
                  className="flex h-full flex-col justify-between overflow-hidden border-default p-6 sm:p-7 transition-all duration-300 hover:border-accent-primary/40 hover:shadow-lg hover:shadow-accent-primary/5"
                >
                  <div>
                    {/* Header Row */}
                    <div className="mb-4 flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-accent-primary/20 bg-accent-primary/10 text-accent-primary">
                          {renderCertIcon(category)}
                        </div>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <Badge variant="primary" className="text-[11px] font-semibold">
                              {badgeLabel}
                            </Badge>
                            <span className="text-xs text-muted font-medium">{cert.date}</span>
                          </div>
                          <Typography
                            variant="h3"
                            className="text-base sm:text-lg font-bold text-primary line-clamp-2"
                          >
                            {cert.title}
                          </Typography>
                        </div>
                      </div>
                    </div>

                    {cert.id && (
                      <div className="mb-4 flex items-center gap-1.5 text-xs text-muted">
                        <span className="font-semibold text-secondary">ID:</span>
                        <code
                          className="max-w-[240px] truncate font-mono text-[11px] rounded bg-surface/80 px-2 py-0.5 border border-default/60"
                          title={cert.id}
                        >
                          {cert.id}
                        </code>
                      </div>
                    )}

                    {cert.skills && cert.skills.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5 border-t border-default/40 pt-4">
                        {cert.skills.map((skill) => (
                          <span
                            key={skill}
                            className="inline-flex items-center gap-1 rounded-lg border border-default bg-surface/80 px-2.5 py-1 text-xs font-medium text-secondary"
                          >
                            <FaCheckCircle className="h-3 w-3 text-accent-secondary" />
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-default/40 pt-4">
                    <Typography
                      variant="body"
                      className="text-xs font-medium text-secondary sm:text-sm"
                    >
                      Issued by <span className="font-semibold text-primary">{cert.issuer}</span>
                    </Typography>

                    {cert.link && (
                      <Button
                        href={cert.link}
                        variant="primary"
                        size="sm"
                        icon={FaExternalLinkAlt}
                        iconPosition="right"
                        className="shadow-sm shadow-accent-primary/20"
                      >
                        Verify Credential
                      </Button>
                    )}
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>

        {/* Cross-Link Navigation */}
        <Reveal delay={0.25}>
          <div className="mt-12 pt-8 border-t border-default/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <Button
                as={Link}
                to="/education"
                variant="outline"
                size="md"
                icon={FaGraduationCap}
                className="w-full sm:w-auto"
              >
                Academic Background
              </Button>
              <Button
                as={Link}
                to="/experience"
                variant="outline"
                size="md"
                icon={FaBriefcase}
                className="w-full sm:w-auto"
              >
                Engineering Journey
              </Button>
            </div>

            <Button
              as={Link}
              to="/#projects"
              state={{ scrollToSection: 'projects' }}
              variant="primary"
              size="md"
              icon={FaArrowRight}
              iconPosition="right"
              className="w-full sm:w-auto shadow-md shadow-accent-primary/20"
            >
              Explore Featured Projects
            </Button>
          </div>
        </Reveal>
      </div>
    </>
  );
}
