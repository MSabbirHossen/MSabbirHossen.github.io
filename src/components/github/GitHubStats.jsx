import { useEffect, useState } from 'react';
import Typography from '../common/Typography';
import Card from '../common/Card';
import GitHubProfile from './GitHubProfile';

import StatsCards from './StatsCards';
import LanguagesChart from './LanguagesChart';
import RecentRepos from './RecentRepos';
import Reveal from '../animations/Reveal';
import Snake from './Snake';
import ProfileViews from './ProfileViews';
import GitHubAnalytics from './GitHubAnalytics';

const REFERENCE_NOW = Date.now();

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
      <section id="github-stats" className="section-shell">
        <div className="mx-auto max-w-6xl px-4">
          <Typography variant="h2" className="text-center text-primary">
            GitHub Activity Snapshot
          </Typography>

          <Card className="mt-8 p-8 text-center text-secondary">Loading GitHub statistics...</Card>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="github-stats" className="section-shell">
        <div className="mx-auto max-w-6xl px-4">
          <Typography variant="h2" className="text-center text-primary">
            GitHub Activity Snapshot
          </Typography>

          <Card className="mt-8 p-8 text-center text-secondary">{error}</Card>
        </div>
      </section>
    );
  }

  function timeAgo(date) {
    const diff = REFERENCE_NOW - new Date(date).getTime();

    const hours = Math.floor(diff / 3600000);

    if (hours < 1) return 'Updated just now';

    if (hours < 24) return `Updated ${hours} hour${hours > 1 ? 's' : ''} ago`;

    const days = Math.floor(hours / 24);

    return `Updated ${days} day${days > 1 ? 's' : ''} ago`;
  }
  return (
    <section id="github-stats" className="section-shell">
      <div className="mx-auto max-w-6xl px-4">
        <Typography variant="h2" className="text-center text-primary mb-8">
          GitHub Activity Snapshot
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

        <GitHubAnalytics />
        <Snake />

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <ProfileViews />
          <GitHubProfile />
          <Typography variant="caption" className="text-muted text-xs font-medium">
            {timeAgo(stats.updatedAt)}
          </Typography>
        </div>
      </div>
    </section>
  );
}
