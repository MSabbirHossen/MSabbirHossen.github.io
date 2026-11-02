import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  FaArrowLeft,
  FaArrowRight,
  FaAward,
  FaBookOpen,
  FaBriefcase,
  FaCertificate,
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

  const educationSchema = {
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
        <script type="application/ld+json">{JSON.stringify(educationSchema)}</script>
      </Helmet>

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        {/* Navigation & Header */}
        <div className="mb-10 sm:mb-12">
          <Reveal>
            <Button
              as={Link}
              to="/#education"
              state={{ scrollToSection: 'education' }}
              variant="ghost"
              size="sm"
              icon={FaArrowLeft}
              className="mb-6 px-0 text-secondary hover:text-accent-primary"
            >
              Back to Education Section
            </Button>
          </Reveal>

          <div className="space-y-3">
            <Reveal delay={0.05}>
              <Badge variant="primary" className="text-xs">
                Academic Foundations
              </Badge>
            </Reveal>

            <Reveal delay={0.1}>
              <Typography
                variant="h1"
                className="text-balance text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary"
              >
                Academic Background & Qualifications
              </Typography>
            </Reveal>

            <Reveal delay={0.15}>
              <Typography
                variant="body"
                className="max-w-3xl text-sm sm:text-base leading-relaxed text-secondary"
              >
                Formal education in Computer Science, scientific rigor, and academic language
                studies providing the theoretical foundation and analytical discipline for
                full-stack software engineering.
              </Typography>
            </Reveal>
          </div>
        </div>

        {/* Academic Highlights Ribbon */}
        <Reveal delay={0.2}>
          <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Card spotlight hover className="flex items-center gap-4 border-default p-4 sm:p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent-primary/10 text-accent-primary">
                <FaGraduationCap className="h-6 w-6" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-primary truncate">Bachelor of Science</p>
                <p className="text-xs text-muted truncate">Islamic University of Madinah</p>
              </div>
            </Card>

            <Card spotlight hover className="flex items-center gap-4 border-default p-4 sm:p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                <FaAward className="h-6 w-6" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-primary truncate">GPA 5.00 / 5.00</p>
                <p className="text-xs text-muted truncate">Science & Secondary Excellence</p>
              </div>
            </Card>

            <Card spotlight hover className="flex items-center gap-4 border-default p-4 sm:p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent-secondary/10 text-accent-secondary">
                <FaBookOpen className="h-6 w-6" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-primary truncate">Arabic & Linguistics</p>
                <p className="text-xs text-muted truncate">Academic Fluency & Translation</p>
              </div>
            </Card>
          </div>
        </Reveal>

        {/* Complete Academic Timeline */}
        <div className="relative">
          {education.map((item, index) => {
            const isCurrent =
              item.status?.toLowerCase().includes('progress') ||
              item.period?.toLowerCase().includes('present');
            const hasGpa = item.desc?.includes('GPA 5.00');
            const isArabic = item.degree?.toLowerCase().includes('arabic');

            return (
              <div
                key={`${item.institution}-${index}`}
                className="relative grid grid-cols-[2.25rem_1fr] sm:grid-cols-[2.5rem_1fr] gap-4 sm:gap-6 mb-8 sm:mb-10 last:mb-4"
              >
                {/* Column 1: Centered Marker Node & Connecting Line */}
                <div className="flex flex-col items-center">
                  <div
                    className={`z-10 flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full border-2 bg-surface shadow-md ${
                      isCurrent
                        ? 'border-emerald-400 text-emerald-400 shadow-emerald-400/20'
                        : 'border-accent-primary text-accent-primary shadow-accent-primary/20'
                    }`}
                  >
                    {isArabic ? (
                      <FaBookOpen className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <FaGraduationCap
                        className={`h-4 w-4 ${isCurrent ? 'animate-pulse text-emerald-400' : ''}`}
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  {index < education.length - 1 && (
                    <div
                      className="w-0.5 grow bg-linear-to-b from-accent-primary via-accent-secondary to-accent-primary/20 my-2"
                      aria-hidden="true"
                    />
                  )}
                </div>

                {/* Column 2: Milestone Card */}
                <Reveal
                  className="min-w-0 pb-2"
                  y={18}
                  duration={0.45}
                  delay={index * 0.08}
                  amount={0.15}
                >
                  <Card
                    spotlight
                    hover
                    className="group space-y-4 border-default p-5 sm:p-7 transition-all duration-300 hover:border-accent-primary/40 hover:shadow-lg hover:shadow-accent-primary/5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-default/40 pb-3">
                      <div className="flex flex-wrap items-center gap-2">
                        {isCurrent ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                            In Progress · Undergraduate
                          </span>
                        ) : (
                          <Badge variant="primary" className="text-xs">
                            {item.period}
                          </Badge>
                        )}
                        {hasGpa && (
                          <span className="inline-flex items-center gap-1 rounded-full border border-accent-secondary/25 bg-accent-secondary/10 px-2.5 py-0.5 text-xs font-semibold text-accent-secondary">
                            <FaAward className="h-3 w-3" />
                            GPA 5.00 / 5.00
                          </span>
                        )}
                      </div>

                      <span className="flex items-center gap-1.5 text-xs text-muted">
                        <FaUniversity className="h-3.5 w-3.5 text-accent-secondary" />
                        {item.institution}
                      </span>
                    </div>

                    <div>
                      <Typography
                        variant="h3"
                        className="text-base sm:text-lg md:text-xl font-bold text-primary"
                      >
                        {item.degree}
                      </Typography>
                      <Typography
                        variant="body"
                        className="mt-1 text-xs sm:text-sm text-secondary font-medium"
                      >
                        {item.institution}
                      </Typography>
                    </div>

                    {item.desc && (
                      <Typography
                        variant="body"
                        className="text-xs sm:text-sm md:text-base leading-relaxed text-secondary"
                      >
                        {item.desc}
                      </Typography>
                    )}

                    {/* Contextual Badges */}
                    {item.topics && item.topics.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-default/40">
                        {item.topics.map((topic) => (
                          <span
                            key={topic}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-default bg-surface/80 px-2.5 py-1 text-xs font-medium text-secondary"
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
                </Reveal>
              </div>
            );
          })}
        </div>

        {/* Cross-Link Navigation */}
        <Reveal delay={0.25}>
          <div className="mt-10 sm:mt-12 pt-8 border-t border-default/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <Button
                as={Link}
                to="/experience"
                variant="outline"
                size="md"
                icon={FaBriefcase}
                className="w-full sm:w-auto"
              >
                Engineering Experience
              </Button>
              <Button
                as={Link}
                to="/certifications"
                variant="outline"
                size="md"
                icon={FaCertificate}
                className="w-full sm:w-auto"
              >
                Certifications
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
