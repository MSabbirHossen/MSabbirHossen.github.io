import { motion } from 'framer-motion';
import { FaCertificate, FaExternalLinkAlt } from 'react-icons/fa';
import { portfolioData } from '../../data/portfolioData';
import Typography from '../common/Typography';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Reveal from '../animations/Reveal';

export default function Certifications() {
  const { certifications } = portfolioData;
  return (
    <section id="certifications" className="py-20 bg-gray-50 dark:bg-gray-900 glass">
      <div className="mx-auto max-w-5xl px-4">
        <Typography
          variant="h2"
          className="mb-8 text-center text-primary-600 dark:text-primary-400"
        >
          Certifications
        </Typography>

        <div className="grid gap-6 md:grid-cols-2">
          {certifications.map((cert, idx) => (
            <Reveal key={cert.id} y={18} delay={idx * 0.08} duration={0.45} whileHover={{ y: -4 }}>
              <Card className="h-full space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-primary/10 text-accent-secondary">
                      <FaCertificate className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <Typography variant="subtitle" className="text-slate-100">
                        {cert.title}
                      </Typography>
                      <Typography variant="caption" className="text-slate-400">
                        {cert.issuer}
                      </Typography>
                    </div>
                  </div>

                  <Badge variant="secondary">{cert.date}</Badge>
                </div>

                <div className="text-right">
                  {/* <Typography variant="body" className="text-slate-400">
                    Credential ID: {cert.id}
                  </Typography> */}
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-end gap-2 text-sm font-medium text-accent-secondary hover:underline"
                  >
                    Verify
                    <FaExternalLinkAlt className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
