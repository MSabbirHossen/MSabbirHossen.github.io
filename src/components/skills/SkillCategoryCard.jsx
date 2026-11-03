import { FaCheckCircle } from 'react-icons/fa';
import Reveal from '../animations/Reveal';
import Card from '../common/Card';
import Typography from '../common/Typography';
import { categoryMeta } from './categoryIcons';
import { useTranslation } from '../../i18n';

export default function SkillCategoryCard({
  category,
  index = 0,
  isFullWidth = false,
  selectedSkill,
  onSelectSkill,
}) {
  const { t } = useTranslation();
  const meta = categoryMeta[category.category] || {
    icon: null,
    subIcon: null,
    subtitle: category.description || t('skills.coreCompetency', {}, 'Core Competency'),
  };

  const Icon = meta.icon;
  const SubIcon = meta.subIcon;

  return (
    <Reveal
      y={18}
      duration={0.45}
      delay={index * 0.07}
      amount={0.15}
      className={`h-full ${isFullWidth ? 'md:col-span-2' : ''}`}
    >
      <Card
        spotlight
        hover
        className="flex h-full flex-col justify-between overflow-hidden border-default p-6 sm:p-7 transition-all duration-300 hover:border-accent-primary/40"
      >
        <div>
          {/* Header of Category */}
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3.5 min-w-0">
              {Icon && (
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent-primary/20 bg-accent-primary/10 text-accent-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
              )}

              <div className="min-w-0">
                <Typography
                  variant="h3"
                  className="text-lg font-bold text-primary sm:text-xl truncate"
                >
                  {category.category}
                </Typography>
                {meta.subtitle && (
                  <Typography
                    variant="subtitle"
                    className="flex items-center gap-1.5 text-xs text-muted truncate mt-0.5"
                  >
                    {SubIcon && <SubIcon className="h-3 w-3 shrink-0 text-accent-secondary" />}
                    <span>{meta.subtitle}</span>
                  </Typography>
                )}
              </div>
            </div>

            {meta.badge && (
              <span className="shrink-0 rounded-full border border-default bg-surface/80 px-2.5 py-0.5 text-[11px] font-medium text-muted">
                {meta.badge}
              </span>
            )}
          </div>

          {/* Interactive Skill Chips */}
          {category.items && category.items.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2 border-t border-default/50 pt-4">
              {category.items.map((item) => {
                const SkillIcon = item.icon;
                const isSelected = selectedSkill?.name === item.name;
                const hasSelectedOther = selectedSkill && !isSelected;
                const projectCount = item.projectSlugs?.length ?? 0;
                const brandColor = item.color || '#6366F1';

                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => onSelectSkill(item)}
                    aria-pressed={isSelected}
                    title={`${item.name} — ${
                      projectCount > 0
                        ? `used in ${projectCount} project${projectCount > 1 ? 's' : ''}`
                        : 'click to view details'
                    }`}
                    className={`group/chip relative inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary ${
                      isSelected
                        ? 'border-accent-primary bg-accent-primary/20 text-accent-primary ring-2 ring-accent-primary/40 font-bold shadow-sm'
                        : hasSelectedOther
                          ? 'border-default/60 bg-surface/50 text-muted hover:border-accent-primary/40 hover:text-primary'
                          : 'border-default bg-surface/80 text-secondary hover:border-accent-primary/40 hover:text-primary hover:bg-surface'
                    }`}
                  >
                    {SkillIcon ? (
                      <SkillIcon
                        className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover/chip:scale-115"
                        style={{ color: isSelected ? 'inherit' : brandColor }}
                        aria-hidden="true"
                      />
                    ) : (
                      <FaCheckCircle className="h-3 w-3 text-accent-secondary" />
                    )}

                    <span>{item.name}</span>

                    {/* Small count pill for demonstrated skills */}
                    {projectCount > 0 && (
                      <span
                        className={`ml-0.5 rounded-full px-1.5 py-0.2 text-[10px] font-semibold ${
                          isSelected
                            ? 'bg-accent-primary text-white'
                            : 'bg-surface text-muted group-hover/chip:text-primary'
                        }`}
                      >
                        {projectCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Hint */}
        <div className="mt-4 pt-3 border-t border-default/30 flex items-center justify-between text-[11px] text-muted">
          <span>
            {t('skills.clickSkillHint', {}, 'Click any skill to reveal verified project evidence')}
          </span>
          <span className="text-accent-secondary font-medium">
            {t('common.interactive', {}, 'Interactive')}
          </span>
        </div>
      </Card>
    </Reveal>
  );
}
