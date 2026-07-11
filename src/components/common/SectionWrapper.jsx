import { motion } from 'framer-motion';
import Typography from './Typography';

export default function SectionWrapper({
  id,
  eyebrow,
  title,
  description,
  tagline,
  children,
  className = '',
  innerClassName = '',
  headerClassName = '',
}) {
  return (
    <motion.section
      id={id}
      className={`section-shell ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {(eyebrow || title || description || tagline) && (
        <div className={`section-heading mb-12 ${headerClassName}`}>
          {eyebrow && (
            <Typography variant="eyebrow" as="p">
              {eyebrow}
            </Typography>
          )}
          {title && (
            <Typography variant="h2" as="h2" className="section-title text-balance">
              {title}
            </Typography>
          )}
          {description && (
            <Typography variant="lead" as="p" className="section-copy">
              {description}
            </Typography>
          )}
          {tagline && (
            <Typography variant="body" as="p" className="section-tagline">
              {tagline}
            </Typography>
          )}
        </div>
      )}

      <div className={innerClassName}>{children}</div>
    </motion.section>
  );
}
