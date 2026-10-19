import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  FaArrowLeft,
  FaArrowRight,
  FaAward,
  FaBookOpen,
  FaBriefcase,
  FaCheckCircle,
  FaGraduationCap,
  FaUniversity,
} from 'react-icons/fa';

import { portfolioData } from '../data';
import Typography from '../components/common/Typography';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Reveal from '../components/animations/Reveal';

export default function EducationPage() {
  const { education, personalInfo } = portfolioData;

  const siteUrl = personalInfo.website.replace(/\/$/, '');
  const canonicalUrl = `${siteUrl}/education`;
  const pageTitle = `Academic Background & Education Timeline | ${personalInfo.name}`;
  const pageDescription =
    'Explore the complete academic timeline, computer science degree, language studies, and foundational science qualifications of Md. Sabbir Hossen.';
  const socialImage = `${siteUrl}/og-image.svg`;

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
              to="/#education"
              state={{ scrollToSection: 'education' }}
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
                Academic Background & Qualifications
              </Typography>
            </Reveal>
          </div>
        </div>

        {/* Academic Highlights Ribbon */}
        <Reveal delay={0.2}>
          <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Card className="flex items-center gap-4 py-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary">
                <FaGraduationCap className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-primary">Bachelor in CS</p>
                <p className="text-xs text-muted">Islamic University of Madinah</p>
              </div>
            </Card>

            <Card className="flex items-center gap-4 py-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <FaAward className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-primary">GPA 5.00 / 5.00</p>
                <p className="text-xs text-muted">Science & Secondary Excellence</p>
              </div>
            </Card>

            <Card className="flex items-center gap-4 py-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-secondary/10 text-accent-secondary">
                <FaBookOpen className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-primary">Arabic & Languages</p>
                <p className="text-xs text-muted">Advanced Grammar & Literature</p>
              </div>
            </Card>
          </div>
        </Reveal>

        {/* Complete Academic Timeline */}
        <div className="relative">
          {/* Continuous Vertical Glowing Line */}
          <div className="absolute left-4 top-0 h-full w-0.5 bg-linear-to-b from-accent-primary via-accent-secondary to-accent-primary/20 md:left-6" />

          {education.map((item, index) => {
            const isCurrent = item.period?.toLowerCase().includes('present');
            const hasGpa = item.desc?.includes('GPA 5.00');

            return (
              <Reveal
                key={`${item.institution}-${index}`}
                className="relative mb-12 flex items-start gap-6 last:mb-12"
                y={20}
                duration={0.45}
                delay={index * 0.07}
                amount={0.15}
              >
                {/* Timeline Chain Node */}
                <div
                  className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 bg-surface shadow-md md:left-2 md:-translate-x-1/2 ${
                    isCurrent
                      ? 'border-emerald-400 text-emerald-400 shadow-emerald-400/20'
                      : 'border-accent-primary text-accent-secondary shadow-accent-primary/20'
                  }`}
                >
                  <FaGraduationCap
                    className={`h-4 w-4 ${isCurrent ? 'animate-pulse text-emerald-400' : ''}`}
                  />
                </div>

                {/* Milestone Card */}
                <div className="w-full">
                  <Card className="group space-y-4 border-default transition-all duration-300 hover:border-accent-primary/40 hover:shadow-lg hover:shadow-accent-primary/5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        {isCurrent ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Current Study
                          </span>
                        ) : (
                          <Badge variant="primary">{item.period}</Badge>
                        )}
                        {hasGpa && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-accent-secondary/10 text-accent-secondary border border-accent-secondary/25">
                            <FaAward className="h-3 w-3" />
                            GPA 5.00/5.00
                          </span>
                        )}
                      </div>

                      <span className="text-xs text-muted flex items-center gap-1.5">
                        <FaUniversity className="h-3.5 w-3.5 text-accent-secondary" />
                        {item.institution}
                      </span>
                    </div>

                    <div>
                      <Typography
                        variant="h3"
                        className="text-primary font-bold text-lg sm:text-xl"
                      >
                        {item.degree}
                      </Typography>
                      <Typography variant="body" className="text-secondary font-medium mt-1">
                        {item.institution}
                      </Typography>
                    </div>

                    {item.desc && (
                      <Typography
                        variant="body"
                        className="text-muted text-sm sm:text-base leading-relaxed"
                      >
                        {item.desc}
                      </Typography>
                    )}

                    {/* Contextual Badges */}
                    {item.topics && item.topics.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2 border-t border-default/50">
                        {item.topics.map((topic) => (
                          <span
                            key={topic}
                            className="inline-flex items-center gap-1 rounded-lg border border-default bg-surface/80 px-2.5 py-1 text-xs text-secondary font-medium"
                          >
                            <FaCheckCircle
                              className={`h-3 w-3 ${isCurrent ? 'text-emerald-400' : 'text-accent-secondary'}`}
                            />
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}
                  </Card>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Cross-Link Navigation */}
        <Reveal delay={0.25}>
          <div className="mt-12 pt-8 border-t border-default/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Button as={Link} to="/experience" variant="outline" size="md" icon={FaBriefcase}>
              View Engineering Experience
            </Button>

            <Button
              as={Link}
              to="/#projects"
              state={{ scrollToSection: 'projects' }}
              variant="primary"
              size="md"
              icon={FaArrowRight}
              iconPosition="right"
            >
              Explore Featured Projects
            </Button>
          </div>
        </Reveal>
      </div>
    </>
  );
}
