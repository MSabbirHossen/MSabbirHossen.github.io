import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  FaArrowLeft,
  FaArrowRight,
  FaAward,
  FaCertificate,
  FaCheckCircle,
  FaExternalLinkAlt,
  FaGraduationCap,
  FaLaptopCode,
} from 'react-icons/fa';

import { portfolioData } from '../data';
import Typography from '../components/common/Typography';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Reveal from '../components/animations/Reveal';

export default function CertificationsPage() {
  const { certifications, personalInfo } = portfolioData;

  const siteUrl = personalInfo.website.replace(/\/$/, '');
  const canonicalUrl = `${siteUrl}/certifications`;
  const pageTitle = `Certifications & Professional Training | ${personalInfo.name}`;
  const pageDescription =
    'Verified certifications in full-stack web development, MERN architecture, Git workflows, and front-end engineering earned by Md. Sabbir Hossen.';
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
              to="/"
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
                Certifications & Training
              </Typography>
            </Reveal>
          </div>
        </div>

        {/* Highlights Ribbon */}
        <Reveal delay={0.2}>
          <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Card className="flex items-center gap-4 py-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary">
                <FaLaptopCode className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-primary">MERN Full-Stack</p>
                <p className="text-xs text-muted">Programming Hero Certified</p>
              </div>
            </Card>

            <Card className="flex items-center gap-4 py-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-secondary/10 text-accent-secondary">
                <FaAward className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-primary">
                  {certifications.length} Credentials
                </p>
                <p className="text-xs text-muted">Web, Git, Tools & Data</p>
              </div>
            </Card>

            <Card className="flex items-center gap-4 py-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <FaCheckCircle className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-primary">100% Verifiable</p>
                <p className="text-xs text-muted">Public Credential Links</p>
              </div>
            </Card>
          </div>
        </Reveal>

        {/* Certifications Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {certifications.map((cert, index) => {
            const isFeatured = cert.title.toLowerCase().includes('complete web development');

            return (
              <Reveal
                key={cert.id || `${cert.title}-${index}`}
                y={18}
                delay={index * 0.07}
                duration={0.45}
                whileHover={{ y: -4 }}
              >
                <Card
                  className={`h-full space-y-5 border-default transition-all duration-300 ${
                    isFeatured
                      ? 'border-accent-primary/50 shadow-md shadow-accent-primary/10'
                      : 'hover:border-accent-primary/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${
                          isFeatured
                            ? 'bg-accent-primary/20 text-accent-primary border-accent-primary/30'
                            : 'bg-accent-primary/10 text-accent-secondary border-default'
                        }`}
                      >
                        <FaCertificate className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <div>
                        {isFeatured && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-accent-primary mb-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
                            Flagship Course
                          </span>
                        )}
                        <Typography variant="subtitle" className="text-primary font-bold text-base">
                          {cert.title}
                        </Typography>
                        <Typography variant="caption" className="text-muted block mt-0.5">
                          {cert.issuer}
                        </Typography>
                      </div>
                    </div>

                    <Badge variant={isFeatured ? 'primary' : 'secondary'}>{cert.date}</Badge>
                  </div>

                  {cert.id && cert.id !== 'Not-available for this course' && (
                    <div className="pt-1">
                      <span className="inline-flex items-center gap-1.5 text-xs text-muted font-mono bg-surface/80 border border-default px-2.5 py-1 rounded-md">
                        <span className="text-[10px] uppercase font-bold text-secondary">ID:</span>
                        <span className="truncate max-w-[200px]">{cert.id}</span>
                      </span>
                    </div>
                  )}

                  {cert.skills && cert.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center gap-1 rounded-lg border border-default bg-surface/80 px-2 py-0.5 text-xs font-medium text-secondary"
                        >
                          <FaCheckCircle className="h-2.5 w-2.5 text-accent-secondary" />
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-3 pt-3 border-t border-default/50">
                    <span className="text-xs text-muted">{cert.issuer}</span>
                    {cert.link && (
                      <Button
                        href={cert.link}
                        variant={isFeatured ? 'primary' : 'outline'}
                        size="sm"
                        icon={FaExternalLinkAlt}
                        iconPosition="right"
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
            <Button as={Link} to="/education" variant="outline" size="md" icon={FaGraduationCap}>
              View Academic Background
            </Button>

            <Button
              as={Link}
              to="/projects"
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
