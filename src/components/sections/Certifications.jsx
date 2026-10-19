import { Link } from 'react-router-dom';
import { FaCertificate, FaExternalLinkAlt, FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import { portfolioData } from '../../data';
import Typography from '../common/Typography';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import Reveal from '../animations/Reveal';

export default function Certifications() {
  const { certifications } = portfolioData;
  const featuredCert =
    certifications.find((c) => c.title.toLowerCase().includes('complete web development')) ||
    certifications[0];

  return (
    <section id="certifications" className="section-shell">
      <div className="mx-auto max-w-5xl px-4">
        <Typography variant="h2" className="mb-8 text-center text-primary">
          Certifications & Training
        </Typography>

        <div className="mx-auto max-w-3xl">
          <Reveal y={18} duration={0.45} amount={0.2}>
            <Card className="relative overflow-hidden border-default p-6 sm:p-8 hover:border-accent-primary/40 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent-primary/10 text-accent-primary border border-accent-primary/20">
                    <FaCertificate className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-accent-primary/10 text-accent-primary border border-accent-primary/25">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
                        Featured Credential
                      </span>
                      <Badge variant="secondary">{featuredCert.date}</Badge>
                    </div>
                    <Typography
                      variant="h3"
                      className="mt-1 text-primary font-bold text-lg sm:text-xl"
                    >
                      {featuredCert.title}
                    </Typography>
                  </div>
                </div>
              </div>

              <div className="space-y-3.5">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <Typography variant="subtitle" className="text-secondary font-medium">
                    Issued by{' '}
                    <span className="text-primary font-semibold">{featuredCert.issuer}</span>
                  </Typography>

                  {featuredCert.id && (
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted font-mono bg-surface/80 border border-default px-2.5 py-1 rounded-md">
                      <span className="text-[10px] uppercase font-bold text-secondary">ID:</span>
                      {featuredCert.id}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 pt-2 border-t border-default/50">
                  {[
                    'React',
                    'Node.js',
                    'Express.js',
                    'MongoDB',
                    'Full-Stack Architecture',
                    'REST APIs',
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1 rounded-lg border border-default bg-surface/80 px-2.5 py-1 text-xs text-secondary font-medium"
                    >
                      <FaCheckCircle className="h-3 w-3 text-accent-secondary" />
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-end pt-3">
                  {featuredCert.link && (
                    <Button
                      href={featuredCert.link}
                      variant="primary"
                      size="sm"
                      icon={FaExternalLinkAlt}
                      iconPosition="right"
                    >
                      Verify Credential
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </Reveal>

          {/* All Certifications CTA Button */}
          {certifications.length > 1 && (
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
      </div>
    </section>
  );
}
