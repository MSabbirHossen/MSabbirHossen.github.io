import { motion, useReducedMotion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import heroWebp from '../../assets/hero.webp';
import heroImage from '../../assets/hero.png';
import { portfolioData } from '../../data';
import Card from '../common/Card';
import Typography from '../common/Typography';
import { floatingAnimation, heroImageVariants } from './heroVariants';

const HeroImage = () => {
  const shouldReduceMotion = useReducedMotion();
  const { focusTitle, focusItems } = portfolioData.personalInfo.hero;

  return (
    <motion.div
      className="relative mx-auto w-full max-w-md"
      variants={heroImageVariants}
      initial={shouldReduceMotion ? false : 'hidden'}
      animate="visible"
    >
      <div className="absolute -inset-4 rounded-3xl dark:bg-linear-to-br dark:from-accent-primary/25 dark:via-accent-secondary/15 bg-linear-to-br from-accent-primary/10 via-accent-secondary/10 to-transparent blur-2xl" />

      <motion.div
        animate={shouldReduceMotion ? undefined : floatingAnimation.animate}
        transition={shouldReduceMotion ? undefined : floatingAnimation.transition}
      >
        <Card className="relative overflow-hidden border-default p-5 transition-all duration-300 hover:border-accent-primary/40 sm:p-6 shadow-xl shadow-black/10">
          <div className="overflow-hidden rounded-xl border border-default surface">
            <picture>
              <source srcSet={heroWebp} type="image/webp" />
              <img
                src={heroImage}
                alt="Md. Sabbir Hossen portrait"
                decoding="async"
                fetchPriority="high"
                width="448"
                height="412"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
              />
            </picture>
          </div>

          <div className="mt-5 border-t border-default/50 pt-4">
            <Typography
              variant="eyebrow"
              className="text-xs uppercase tracking-wider text-accent-secondary"
            >
              {focusTitle}
            </Typography>

            <div className="mt-3 flex flex-wrap gap-2">
              {focusItems.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1 rounded-lg border border-default bg-surface/80 px-2.5 py-1 text-xs font-medium text-secondary"
                >
                  <FaCheckCircle className="h-3 w-3 text-accent-secondary" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default HeroImage;
