import { motion, useReducedMotion } from 'framer-motion';
import Card from '../common/Card';
import Typography from '../common/Typography';

export default function LanguageProgress({ languages }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="mt-10">
      <Typography variant="subtitle" className="mb-5 text-primary">
        🌍 Languages
      </Typography>

      <Card>
        <div className="space-y-5">
          {languages.map((lang) => (
            <div key={lang.name}>
              <div className="mb-2 flex justify-between">
                <span className="font-medium text-primary">{lang.name}</span>

                <span className="text-sm text-accent-secondary">{lang.level}</span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-surface/70">
                <motion.div
                  initial={shouldReduceMotion ? false : { width: 0 }}
                  whileInView={{ width: `${lang.percentage}%` }}
                  viewport={{ once: true }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 1,
                    ease: 'easeOut',
                  }}
                  className="h-full rounded-full bg-accent-secondary"
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
