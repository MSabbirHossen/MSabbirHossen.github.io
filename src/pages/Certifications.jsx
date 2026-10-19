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
              to="/#certifications"
              state={{ scrollToSection: 'certifications' }}
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
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {certifications.map((cert, index) => (
            <Reveal
              key={cert.id || `${cert.title}-${index}`}
              y={18}
              delay={index * 0.07}
              duration={0.45}
              whileHover={{ y: -4 }}
              className="h-full"
            >
              <Card className="flex h-full flex-col justify-between overflow-hidden border-default p-6 transition-all duration-300 hover:border-accent-primary/40 sm:p-8">
                <div>
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-accent-primary/20 bg-accent-primary/10 text-accent-primary">
                        <FaCertificate className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <div>
                        <Typography
                          variant="h3"
                          className="text-lg font-bold text-primary sm:text-xl"
                        >
                          {cert.title}
                        </Typography>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs font-medium text-muted">
                          <span>{cert.date}</span>
                          {cert.id && cert.id !== 'Not-available for this course' && (
                            <>
                              <span>•</span>
                              <span
                                className="inline-block max-w-[220px] truncate align-bottom font-mono text-muted sm:max-w-[300px]"
                                title={cert.id}
                              >
                                ID: {cert.id}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {cert.skills && cert.skills.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2 border-t border-default/50 pt-4">
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

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-default/50 pt-4">
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
                    >
                      Verify Credential
                    </Button>
                  )}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>

        {/* Cross-Link Navigation */}
        <Reveal delay={0.25}>
          <div className="mt-12 pt-8 border-t border-default/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Button as={Link} to="/education" variant="outline" size="md" icon={FaGraduationCap}>
              View Academic Background
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
