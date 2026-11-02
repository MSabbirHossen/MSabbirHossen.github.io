import { motion, useReducedMotion } from 'framer-motion';
import Typography from '../common/Typography';
import Card from '../common/Card';

export default function LanguagesChart({ languages }) {
  const shouldReduceMotion = useReducedMotion();

  if (!languages?.length) return null;

  const total = languages.reduce((sum, lang) => sum + lang.count, 0);

  const colors = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    HTML: '#e34c26',
    CSS: '#663399',
    Python: '#3572A5',
    Java: '#b07219',
    C: '#555555',
    'C++': '#f34b7d',
    CSharp: '#178600',
    Go: '#00ADD8',
    Rust: '#dea584',
  };

  return (
    <div className="mt-12">
      <Typography variant="h3" className="mb-6 text-center text-primary">
        Top Languages
      </Typography>

      <Card
        spotlight
        hover
        className="space-y-5 border-default p-6 sm:p-7 transition-all duration-300 hover:border-accent-primary/40 hover:shadow-lg hover:shadow-accent-primary/5"
      >
        <div className="mb-4 border-b border-default/40 pb-3.5">
          <Typography variant="subtitle" className="font-semibold text-primary">
            Language Distribution
          </Typography>

          <Typography variant="caption" className="text-xs text-muted">
            Derived from public GitHub repositories
          </Typography>
        </div>

        {languages.map((lang, index) => {
          const percent = (lang.count / total) * 100;

          return (
            <div key={lang.name}>
              <div className="mb-2 flex justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{
                      backgroundColor: colors[lang.name] || '#3B82F6',
                    }}
                  />

                  <div>
                    <Typography
                      variant="body"
                      className="text-xs sm:text-sm font-semibold text-primary"
                    >
                      {lang.name}
                    </Typography>

                    <Typography variant="caption" className="text-[11px] text-muted">
                      {lang.count} repositories
                    </Typography>
                  </div>
                </div>
                <span className="text-xs sm:text-sm font-semibold text-secondary">
                  {percent.toFixed(0)}%
                </span>
              </div>

              <div className="h-2.5 overflow-hidden rounded-full bg-surface/80 border border-default/30">
                <motion.div
                  initial={shouldReduceMotion ? false : { width: 0 }}
                  whileInView={{ width: `${percent}%` }}
                  viewport={{ once: true }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.8,
                    delay: shouldReduceMotion ? 0 : index * 0.1,
                    ease: 'easeOut',
                  }}
                  style={{
                    backgroundColor: colors[lang.name] || '#3B82F6',
                  }}
                  className="h-full rounded-full"
                />
              </div>
            </div>
          );
        })}
      </Card>
    </div>
  );
}
