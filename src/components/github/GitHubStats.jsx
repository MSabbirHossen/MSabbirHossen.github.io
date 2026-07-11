import { useEffect, useState } from 'react';
import Typography from '../common/Typography';
import Card from '../common/Card';
import { formatDistanceToNow } from 'date-fns';

import StatsCards from './StatsCards';
import LanguagesChart from './LanguagesChart';
import RecentRepos from './RecentRepos';
import { FaGithub } from 'react-icons/fa';
import Reveal from '../animations/Reveal';

export default function GitHubStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch(`${import.meta.env.BASE_URL}stats.json`);

        if (!res.ok) {
          throw new Error('Failed to load GitHub statistics.');
        }

        const data = await res.json();

        setStats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  if (loading) {
    return (
      <section id="github-stats" className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <Typography variant="h2" className="text-center">
            GitHub Analytics
          </Typography>

          <Card className="mt-8 p-8 text-center">Loading GitHub statistics...</Card>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="github-stats" className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <Typography variant="h2" className="text-center">
            GitHub Analytics
          </Typography>

          <Card className="mt-8 p-8 text-center">{error}</Card>
        </div>
      </section>
    );
  }

  function timeAgo(date) {
    const diff = Date.now() - new Date(date).getTime();

    const hours = Math.floor(diff / 3600000);

    if (hours < 1) return 'Updated just now';

    if (hours < 24) return `Updated ${hours} hour${hours > 1 ? 's' : ''} ago`;

    const days = Math.floor(hours / 24);

    return `Updated ${days} day${days > 1 ? 's' : ''} ago`;
  }
  return (
    <section id="github-stats" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-6xl px-4">
        <Typography
          variant="h2"
          className="mb-10 text-center text-primary-600 dark:text-primary-400"
        >
          GitHub Analytics
        </Typography>

        <Reveal>
          <StatsCards stats={stats} />
        </Reveal>

        <Reveal delay={0.15}>
          <LanguagesChart languages={stats.topLanguages} />
        </Reveal>

        <Reveal delay={0.3}>
          <RecentRepos repos={stats.recentRepos} />
        </Reveal>

        <Reveal delay={0.45}>
          {/* Snake */}

          {/* Contribution Snake */}

          <div className="mt-14">
            <Typography
              variant="h3"
              className="mb-6 text-center text-primary-600 dark:text-primary-400"
            >
              Contribution Activity
            </Typography>

            <Card className="p-6">
              <img
                className="mx-auto w-full max-w-5xl"
                src="https://raw.githubusercontent.com/MSabbirHossen/MSabbirHossen/output/github-contribution-grid-snake-dark.svg"
                alt="Contribution Snake"
              />
            </Card>
          </div>
        </Reveal>

        {/* Profile Views */}

        <div className="mt-10">
          <Card className="flex justify-center p-6">
            <img
              src="https://komarev.com/ghpvc/?username=MSabbirHossen&label=Profile%20Views&color=3B82F6&style=for-the-badge"
              alt="Profile Views"
            />
          </Card>
        </div>

        {/* GitHub Profile */}
        <div className="mt-10 flex justify-center">
          <a
            href="https://github.com/MSabbirHossen"
            target="_blank"
            rel="noopener noreferrer"
            className="
      inline-flex
      items-center
      gap-3
      rounded-xl
      bg-primary-600
      px-6
      py-3
      font-semibold
      text-white
      transition-all
      duration-300
      hover:scale-105
      hover:bg-primary-700
    "
          >
            <FaGithub />
            Visit GitHub Profile
          </a>
        </div>

        {/* Last Updated */}
        <Typography variant="caption" className="mt-8 text-center block">
          {timeAgo(stats.updatedAt)}
        </Typography>
      </div>
    </section>
  );
}
