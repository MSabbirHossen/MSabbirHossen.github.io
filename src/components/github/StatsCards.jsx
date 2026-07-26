import AnimatedNumber from './AnimatedNumber';
import Reveal from '../animations/Reveal';
import { FaCodeBranch, FaGithub, FaStar, FaBook, FaUsers } from 'react-icons/fa';
import Card from '../common/Card';
import Typography from '../common/Typography';

const iconMap = {
  repos: FaBook,
  stars: FaStar,
  forks: FaCodeBranch,
  followers: FaUsers,
  following: FaGithub,
};

export default function StatsCards({ stats }) {
  const cards = [
    {
      key: 'repos',
      label: 'Repositories',
      value: stats.publicRepos,
    },
    {
      key: 'stars',
      label: 'Stars',
      value: stats.totalStars,
    },
    {
      key: 'forks',
      label: 'Forks',
      value: stats.totalForks,
    },
    {
      key: 'followers',
      label: 'Followers',
      value: stats.followers,
    },
    {
      key: 'following',
      label: 'Following',
      value: stats.following,
    },
  ];

  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
      {cards.map((card, index) => {
        const Icon = iconMap[card.key];

        return (
          <Reveal key={card.key} y={20} delay={index * 0.08} duration={0.4}>
            <Card className="group h-full border border-default p-8 text-center transition-all duration-300 hover:shadow-xl hover:shadow-accent-primary/10">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-primary/10 text-accent-primary transition-transform duration-300 group-hover:scale-110">
                <Icon className="text-xl" />
              </div>

              <Typography variant="body" className="mt-4 font-medium text-secondary">
                {card.label}
              </Typography>

              <Typography variant="h2" className="mt-2 font-extrabold text-primary">
                <AnimatedNumber value={card.value} />
              </Typography>
              <div className="mx-auto mt-4 w-10 border-t border-default"></div>
            </Card>
          </Reveal>
        );
      })}
    </div>
  );
}
