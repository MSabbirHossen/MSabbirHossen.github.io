import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  FaArrowRight,
  FaBriefcase,
  FaBuilding,
  FaExternalLinkAlt,
  FaGithub,
  FaGraduationCap,
  FaRocket,
} from 'react-icons/fa';

import { portfolioData } from '../../data';
import SectionWrapper from '../common/SectionWrapper';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';
import Typography from '../common/Typography';
import Reveal from '../animations/Reveal';
import { EASINGS } from '../../lib/motion';
import { useTranslation } from '../../i18n';

export default function Experience({ limit = 3 }) {
  const { t, isRTL } = useTranslation();
  const { experience, education } = portfolioData;
  const displayedExperience = limit ? experience.slice(0, limit) : experience;
  const shouldReduceMotion = useReducedMotion();

  return (
    <SectionWrapper
      id="experience"
      eyebrow={t('experience.eyebrow')}
      title={t('experience.title')}
      description={t('experience.description')}
      className="mx-auto max-w-5xl px-4 sm:px-6"
    >
      {/* Timeline Container with Spine */}
      <div className={`relative ${isRTL ? 'pr-6 sm:pr-10 md:pr-14' : 'pl-6 sm:pl-10 md:pl-14'}`}>
        {/* Continuous Vertical Glowing Line */}
        <div
          className={`absolute top-3 bottom-6 w-0.5 bg-linear-to-b from-accent-primary via-accent-secondary to-accent-primary/20 ${
            isRTL ? 'right-2.5 sm:right-4 md:right-6' : 'left-2.5 sm:left-4 md:left-6'
          }`}
          aria-hidden="true"
        />

        {/* Milestone Nodes & Cards */}
        {displayedExperience.map((role, idx) => {
          const isLatest = idx === 0;

          return (
            <div
              key={`${role.id || role.company}-${idx}`}
              className="relative mb-8 sm:mb-10 last:mb-8"
            >
              {/* Animated Timeline Marker Node */}
              <motion.div
                className={`absolute top-1.5 z-10 flex h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 items-center justify-center rounded-full border-2 bg-surface shadow-md ${
                  isRTL ? '-right-6 sm:-right-10 md:-right-14' : '-left-6 sm:-left-10 md:-left-14'
                } ${
                  isLatest
                    ? 'border-accent-primary text-accent-primary shadow-accent-primary/30'
                    : 'border-accent-secondary/70 text-accent-secondary shadow-accent-secondary/20'
                }`}
                initial={shouldReduceMotion ? false : { scale: 0.7, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: EASINGS.smooth }}
                aria-hidden="true"
              >
                {isLatest ? (
                  <FaRocket className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-pulse" />
                ) : (
                  <FaBriefcase className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                )}
              </motion.div>

              {/* Milestone Card */}
              <Reveal y={18} duration={0.45} delay={idx * 0.08} amount={0.15} className="w-full">
                <Card
                  spotlight
                  hover
                  className="space-y-4 border-default p-5 sm:p-7 transition-all duration-300 hover:border-accent-primary/40 hover:shadow-lg hover:shadow-accent-primary/5"
                >
                  {/* Period & Category Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-default/40 pb-3.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="primary" className="text-xs font-semibold">
                        {role.period}
                      </Badge>
                      {role.category && (
                        <Badge
                          variant="neutral"
                          className="text-[11px] font-medium hidden sm:inline-flex"
                        >
                          {role.category}
                        </Badge>
                      )}
                    </div>

                    {role.projectSlug && (
                      <Link
                        to={`/projects/${role.projectSlug}`}
                        className="text-xs font-semibold text-accent-primary hover:underline inline-flex items-center gap-1"
                      >
                        <span>{t('common.caseStudy')}</span>
                        <span aria-hidden="true">{isRTL ? '←' : '→'}</span>
                      </Link>
                    )}
                  </div>

                  {/* Role Title & Organization */}
                  <div>
                    <Typography variant="h3" className="text-lg sm:text-xl font-bold text-primary">
                      {role.role}
                    </Typography>

                    <Typography
                      variant="subtitle"
                      className="mt-1 flex items-center gap-2 text-xs sm:text-sm font-medium text-secondary"
                    >
                      <FaBuilding className="h-3.5 w-3.5 shrink-0 text-accent-secondary" />
                      <span>{role.company}</span>
                    </Typography>
                  </div>

                  {/* Summary Description */}
                  {role.desc && (
                    <Typography
                      variant="body"
                      className="text-xs sm:text-sm leading-relaxed text-secondary"
                    >
                      {role.desc}
                    </Typography>
                  )}

                  {/* Key Engineering Outcomes */}
                  {role.outcomes && role.outcomes.length > 0 && (
                    <div className="space-y-2 pt-1">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-accent-secondary">
                        {t('experience.keyOutcomes')}
                      </p>
                      <ul className="space-y-1.5">
                        {role.outcomes.map((outcome, oIdx) => (
                          <li
                            key={oIdx}
                            className="flex items-start gap-2 text-xs sm:text-sm text-secondary"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-secondary" />
                            <span>{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technologies Used */}
                  {role.technologies && role.technologies.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-2">
                      {role.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-lg border border-default/70 bg-surface/70 px-2.5 py-0.8 text-xs font-medium text-secondary"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action Link Row */}
                  <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-default/40">
                    {role.projectSlug && (
                      <Button
                        as={Link}
                        to={`/projects/${role.projectSlug}`}
                        variant="primary"
                        size="sm"
                      >
                        {t('common.caseStudy')}
                      </Button>
                    )}

                    {role.liveUrl && (
                      <Button
                        href={role.liveUrl}
                        variant="outline"
                        size="sm"
                        icon={FaExternalLinkAlt}
                        iconPosition="right"
                      >
                        {t('common.liveDemo')}
                      </Button>
                    )}

                    {role.githubUrl && (
                      <Button href={role.githubUrl} variant="ghost" size="sm" icon={FaGithub}>
                        {t('common.sourceCode')}
                      </Button>
                    )}
                  </div>
                </Card>
              </Reveal>
            </div>
          );
        })}

        {/* Foundational Milestone (Academic Origin) */}
        <div className="relative">
          <motion.div
            className={`absolute top-1.5 z-10 flex h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 items-center justify-center rounded-full border-2 border-emerald-400 bg-surface shadow-md shadow-emerald-400/20 text-emerald-400 ${
              isRTL ? '-right-6 sm:-right-10 md:-right-14' : '-left-6 sm:-left-10 md:-left-14'
            }`}
            initial={shouldReduceMotion ? false : { scale: 0.7, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: EASINGS.smooth }}
            aria-hidden="true"
          >
            <FaGraduationCap className="h-3.5 w-3.5" />
          </motion.div>

          <Reveal y={18} duration={0.45} delay={0.25} amount={0.15}>
            <Card
              spotlight
              hover
              className="space-y-3 border-dashed border-accent-secondary/40 bg-surface/60 p-5 sm:p-6"
            >
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="neutral" className="text-xs">
                  {t('experience.academicOriginBadge')}
                </Badge>
                <span className="text-xs text-muted">{t('experience.academicOriginSubtitle')}</span>
              </div>

              <div>
                <Typography variant="h3" className="text-base sm:text-lg font-bold text-primary">
                  {t('experience.csStudiesTitle')}
                </Typography>
                <Typography
                  variant="body"
                  className="text-xs sm:text-sm font-medium text-secondary mt-0.5"
                >
                  {education?.[0]?.institution || 'Islamic University of Madinah'} ·{' '}
                  {education?.[0]?.degree || 'Bachelor in Computer Science'}
                </Typography>
              </div>

              <Typography
                variant="body"
                className="text-xs sm:text-sm leading-relaxed text-secondary"
              >
                {t('experience.csStudiesDesc')}
              </Typography>
            </Card>
          </Reveal>
        </div>
      </div>

      {/* Button to Full Timeline */}
      {experience.length > displayedExperience.length && (
        <div className="mt-10 flex justify-center">
          <Button
            as={Link}
            to="/experience"
            variant="outline"
            size="md"
            icon={FaArrowRight}
            iconPosition="right"
            className={`group border-default shadow-sm hover:border-accent-primary hover:text-accent-primary ${
              isRTL ? '[&>svg]:rotate-180' : ''
            }`}
          >
            {t('experience.exploreCompleteTimeline', { count: experience.length })}
          </Button>
        </div>
      )}
    </SectionWrapper>
  );
}
