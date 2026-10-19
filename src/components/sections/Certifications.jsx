import { Link } from 'react-router-dom';
import { FaCertificate, FaExternalLinkAlt, FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import { portfolioData } from '../../data';
import Typography from '../common/Typography';
import Card from '../common/Card';
import Button from '../common/Button';
import Reveal from '../animations/Reveal';

export default function Certifications({ limit = 2 }) {
  const { certifications } = portfolioData;
  const displayedCertifications = limit ? certifications.slice(0, limit) : certifications;

  return (
    <section id="certifications" className="section-shell">
      <div className="mx-auto max-w-5xl px-4">
        <Typography variant="h2" className="mb-8 text-center text-primary">
          Certifications & Training
        </Typography>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {displayedCertifications.map((cert, index) => (
            <Reveal
              key={cert.id || `${cert.title}-${index}`}
              y={18}
              duration={0.45}
              delay={index * 0.1}
              amount={0.2}
              className="h-full"
            >
              <Card className="flex h-full flex-col justify-between overflow-hidden border-default p-6 sm:p-8 transition-all duration-300 hover:border-accent-primary/40">
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

        {/* All Certifications CTA Button */}
        {certifications.length > displayedCertifications.length && (
          <div className="mt-8 flex justify-center">
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
      </div>
    </section>
  );
}
