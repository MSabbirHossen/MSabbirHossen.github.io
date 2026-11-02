import { Link } from 'react-router-dom';
import { FaCertificate, FaExternalLinkAlt, FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import { portfolioData } from '../../data';
import Typography from '../common/Typography';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import SectionWrapper from '../common/SectionWrapper';
import Reveal from '../animations/Reveal';

export default function Certifications({ limit = 2 }) {
  const { certifications } = portfolioData;
  const displayedCertifications = limit ? certifications.slice(0, limit) : certifications;

  return (
    <SectionWrapper
      id="certifications"
      eyebrow="Continuous Learning & Credentials"
      title="Certifications & Training"
      description="Verified professional credentials in MERN full-stack development, modern web architecture, and developer workflows."
      className="mx-auto max-w-5xl px-4 sm:px-6"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {displayedCertifications.map((cert, index) => {
          const isFullStack = cert.type?.toLowerCase().includes('professional');

          return (
            <Reveal
              key={cert.id || `${cert.title}-${index}`}
              y={18}
              duration={0.45}
              delay={index * 0.1}
              amount={0.2}
              className="h-full"
            >
              <Card
                spotlight
                hover
                className="flex h-full flex-col justify-between overflow-hidden border-default p-6 sm:p-7 transition-all duration-300 hover:border-accent-primary/40 hover:shadow-lg hover:shadow-accent-primary/5"
              >
                <div>
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${
                          isFullStack
                            ? 'border-accent-primary/30 bg-accent-primary/15 text-accent-primary'
                            : 'border-accent-secondary/25 bg-accent-secondary/10 text-accent-secondary'
                        }`}
                      >
                        <FaCertificate className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <Typography
                          variant="h3"
                          className="text-base font-bold text-primary sm:text-lg leading-snug"
                        >
                          {cert.title}
                        </Typography>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs font-medium text-muted">
                          <span>{cert.date}</span>
                          {cert.id && (
                            <>
                              <span>•</span>
                              <span
                                className="inline-block max-w-[200px] truncate align-bottom font-mono text-[11px] text-muted sm:max-w-[260px]"
                                title={cert.id}
                              >
                                ID: {cert.id}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {cert.type && (
                      <Badge
                        variant={isFullStack ? 'primary' : 'neutral'}
                        className="text-[10px] sm:text-[11px] shrink-0 font-medium"
                      >
                        {isFullStack ? 'Full-Stack' : 'Course'}
                      </Badge>
                    )}
                  </div>

                  {cert.skills && cert.skills.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5 border-t border-default/40 pt-3.5">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center gap-1 rounded-lg border border-default/70 bg-surface/70 px-2.5 py-0.8 text-xs font-medium text-secondary"
                        >
                          <FaCheckCircle className="h-3 w-3 text-accent-secondary" />
                          <span>{skill}</span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-default/40 pt-3.5">
                  <Typography variant="body" className="text-xs font-medium text-secondary">
                    Issued by <span className="font-semibold text-primary">{cert.issuer}</span>
                  </Typography>

                  {cert.link && (
                    <Button
                      href={cert.link}
                      variant="primary"
                      size="sm"
                      icon={FaExternalLinkAlt}
                      iconPosition="right"
                      className="text-xs py-1.5 px-3"
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

      {/* All Certifications CTA Button */}
      {certifications.length > displayedCertifications.length && (
        <div className="mt-10 flex justify-center">
          <Button
            as={Link}
            to="/certifications"
            variant="outline"
            size="md"
            icon={FaArrowRight}
            iconPosition="right"
            className="group border-default shadow-sm hover:border-accent-primary hover:text-accent-primary"
          >
            Explore All Certifications ({certifications.length})
          </Button>
        </div>
      )}
    </SectionWrapper>
  );
}
