import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

import { FaGithub, FaUsers, FaCodeBranch, FaStar } from 'react-icons/fa';
import { portfolioData } from '../../data/portfolioData';
import Typography from '../common/Typography';
import Card from '../common/Card';

export default function GitHubStats() {
  const { github } = portfolioData.personalInfo;
  const hasGitHubUsername = Boolean(github?.match(/github\.com\/([^/]+)/)?.[1]);
  const [stats, setStats] = useState({ publicRepos: 0, followers: 0, following: 0 });
  const [displayStats, setDisplayStats] = useState({
    publicRepos: 0,
    followers: 0,
    following: 0,
    totalStars: 0,
    totalForks: 0,
  });
  const [loading, setLoading] = useState(hasGitHubUsername);
  const [fetchError, setFetchError] = useState(null);
  const animationFrameIdRef = useRef(null);

  const username = 'MSabbirHossen';

  const error = !hasGitHubUsername
    ? 'Add a GitHub username in portfolioData to show live stats.'
    : fetchError;

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/Portfolio/stats.json');

        if (!res.ok) {
          throw new Error('Unable to load GitHub stats');
        }

        const data = await res.json();

        setStats(data);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    if (loading || error) return undefined;

    const target = stats;
    const duration = 900;
    const startTime = window.performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOut = 1 - (1 - progress) ** 3;

      setDisplayStats({
        publicRepos: Math.round(target.publicRepos * easeOut),
        followers: Math.round(target.followers * easeOut),
        following: Math.round(target.following * easeOut),
        totalStars: Math.round(target.totalStars * easeOut),
        totalForks: Math.round(target.totalForks * easeOut),
      });

      if (progress < 1) {
        animationFrameIdRef.current = window.requestAnimationFrame(tick);
      }
    };

    animationFrameIdRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (animationFrameIdRef.current) {
        window.cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [loading, error, stats]);

  const cards = [
    {
      label: 'Repositories',
      icon: FaCodeBranch,
      value: displayStats.publicRepos,
    },
    {
      label: 'Followers',
      icon: FaUsers,
      value: displayStats.followers,
    },
    {
      label: 'Following',
      icon: FaGithub,
      value: displayStats.following,
    },
    {
      label: 'Stars',
      icon: FaStar,
      value: displayStats.totalStars,
    },
    {
      label: 'Forks',
      icon: FaCodeBranch,
      value: displayStats.totalForks,
    },
  ];

  return (
    <section id="github-stats" className="py-20 bg-gray-50 dark:bg-gray-900 glass">
      <div className="mx-auto max-w-5xl px-4">
        <Typography
          variant="h2"
          className="mb-8 text-center text-primary-600 dark:text-primary-400"
        >
          GitHub Stats
        </Typography>
        {loading ? (
          <div className="grid gap-4 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="space-y-3 p-6">
                <div className="h-5 w-24 rounded-full shimmer" />
                <div className="h-10 w-16 rounded-full shimmer" />
              </Card>
            ))}
          </div>
        ) : error ? (
          <Card className="mx-auto max-w-2xl space-y-3 text-center">
            <Typography variant="subtitle" className="text-slate-100">
              GitHub data unavailable
            </Typography>
            <Typography variant="body" className="text-slate-400">
              {error}
            </Typography>
          </Card>
        ) : (
          <div>
            <div className="grid gap-4 md:grid-cols-3">
              {cards.map((card) => {
                const Icon = card.icon;

                return (
                  <motion.div
                    key={card.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45 }}
                    whileHover={{ y: -4 }}
                  >
                    <Card className="space-y-4 p-6 text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-primary/10 text-accent-secondary">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <Typography variant="subtitle" className="text-slate-100">
                        {card.label}
                      </Typography>
                      <Typography variant="h3" className="text-primary-600 dark:text-primary-400">
                        {card.value}
                      </Typography>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* GitHub Analytics */}
            <div>
              <Typography
                variant="h2"
                className="m-8 text-center text-primary-600 dark:text-primary-400"
              >
                GitHub Analytics
              </Typography>{' '}
              <p className="flex justify-center text-center">
                {' '}
                <img src="https://streak-stats.demolab.com?user=MSabbirHossen&theme=github-dark&hide_border=true" />{' '}
              </p>
              <p className="text-center">
                {' '}
                <img src="https://github-readme-stats-git-masterrstaa-rickstaa.vercel.app/api?username=MSabbirHossen&show_icons=true&theme=github_dark" />{' '}
              </p>
              <p className="text-center">
                {' '}
                <img src="https://github-readme-stats-git-masterrstaa-rickstaa.vercel.app/api/top-langs/?username=MSabbirHossen&layout=compact&theme=github_dark" />{' '}
              </p>
            </div>

            {/* Contribution Snake */}
            {/* <div>
              <Typography
                variant="h2"
                className="m-8 text-center text-primary-600 dark:text-primary-400"
              >
                🐍 Contribution Snake
              </Typography>

              <p align="center">
                <img
                  src="https://raw.githubusercontent.com/MSabbirHossen/MSabbirHossen/output/github-contribution-grid-snake-dark.svg"
                  alt="Contribution Snake"
                />
              </p>

              <p align="center">
                <img src="https://komarev.com/ghpvc/?username=MSabbirHossen&label=Profile%20Views&color=3B82F6&style=for-the-badge" />
              </p>
            </div> */}
          </div>
        )}
      </div>
    </section>
  );
}
