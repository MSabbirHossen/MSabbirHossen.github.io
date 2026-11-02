import { FaBook, FaCode, FaRocket, FaStar } from 'react-icons/fa';
import AnimatedNumber from './AnimatedNumber';
import Reveal from '../animations/Reveal';
import Card from '../common/Card';
import Typography from '../common/Typography';

const iconMap = {
  repos: FaBook,
  topLang: FaCode,
  stars: FaStar,
  recent: FaRocket,
};

export default function StatsCards({ stats }) {
  if (!stats) return null;

  const topLang = stats.topLanguages?.[0]?.name || 'JavaScript';
  const topLangCount = stats.topLanguages?.[0]?.count || 35;

  const cards = [
    {
      key: 'repos',
      label: 'Public Repositories',
      value: stats.publicRepos ?? 64,
      subtext: 'Open-source codebases & tools',
    },
    {
      key: 'topLang',
      label: 'Primary Ecosystem',
      displayValue: topLang,
      subtext: `${topLangCount} repositories`,
    },
    {
      key: 'stars',
      label: 'Community Stars',
      value: stats.totalStars ?? 5,
      subtext: 'Starred open-source work',
    },
    {
      key: 'recent',
      label: 'Active Systems',
      value: stats.recentRepos?.length ?? 6,
      subtext: 'Recently updated projects',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = iconMap[card.key] || FaBook;

        return (
          <Reveal key={card.key} y={16} delay={index * 0.07} duration={0.4}>
            <Card
              spotlight
              hover
              className="group flex h-full flex-col justify-between border-default p-5 sm:p-6 text-center transition-all duration-300 hover:border-accent-primary/40 hover:shadow-lg hover:shadow-accent-primary/5"
            >
              <div>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary transition-transform duration-300 group-hover:scale-110">
                  <Icon className="text-xl" aria-hidden="true" />
                </div>

                <Typography
                  variant="body"
                  className="mt-3.5 text-xs sm:text-sm font-medium text-secondary"
                >
                  {card.label}
                </Typography>

                <div className="mt-1.5 text-2xl sm:text-3xl font-extrabold text-primary">
                  {card.displayValue ? (
                    <span>{card.displayValue}</span>
                  ) : (
                    <AnimatedNumber value={card.value} />
                  )}
                </div>
              </div>

              <div className="mt-3 border-t border-default/40 pt-2.5">
                <Typography variant="caption" className="text-xs text-muted">
                  {card.subtext}
                </Typography>
              </div>
            </Card>
          </Reveal>
        );
      })}
    </div>
  );
}
