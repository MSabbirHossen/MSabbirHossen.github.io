import { motion } from 'framer-motion';
import Card from '../common/Card';
import Typography from '../common/Typography';

export default function LanguageProgress({ languages }) {
  return (
    <div className="mt-10">
      <Typography variant="subtitle" className="mb-5 text-slate-100">
        🌍 Languages
      </Typography>

      <Card>
        <div className="space-y-5">
          {languages.map((lang) => (
            <div key={lang.name}>
              <div className="mb-2 flex justify-between">
                <span className="font-medium text-slate-200">{lang.name}</span>

                <span className="text-sm text-primary-400">{lang.level}</span>
              </div>

              <div className="h-2 rounded-full bg-slate-700 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${lang.percentage}%` }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1,
                    ease: 'easeOut',
                  }}
                  className="h-full rounded-full bg-cyan-500"
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
