import { motion, useReducedMotion } from 'framer-motion';
import Card from '../common/Card';
import Typography from '../common/Typography';
import { useTranslation } from '../../i18n';

export default function LanguageProgress({ languages }) {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  const getLocalizedLevel = (level) => {
    const l = level.toLowerCase();
    if (l.includes('native')) return t('about.nativeLevel', {}, level);
    if (l.includes('professional') || l.includes('working'))
      return t('about.professionalLevel', {}, level);
    if (l.includes('elementary') || l.includes('basic'))
      return t('about.elementaryLevel', {}, level);
    return level;
  };

  const getLocalizedLangName = (name) => {
    const n = name.toLowerCase();
    if (n.includes('bengali') || n.includes('bangla')) return 'বাংলা (Bengali)';
    if (n.includes('arabic')) return 'العربية (Arabic)';
    if (n.includes('english')) return 'English';
    return name;
  };

  return (
    <div className="mt-10">
      <Typography variant="subtitle" className="mb-5 text-primary">
        {t('about.languagesTitle', {}, '🌍 Languages')}
      </Typography>

      <Card>
        <div className="space-y-5">
          {languages.map((lang) => (
            <div key={lang.name}>
              <div className="mb-2 flex justify-between">
                <span className="font-medium text-primary">{getLocalizedLangName(lang.name)}</span>

                <span className="text-sm text-accent-secondary">
                  {getLocalizedLevel(lang.level)}
                </span>
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
