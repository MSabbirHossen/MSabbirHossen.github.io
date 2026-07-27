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
const SECTION_DESCRIPTION =
  'Public repository activity, language mix, and recent work that show how I build, document, and iterate in public.';

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
          <Typography variant="h2" className="text-center text-primary">
            GitHub Activity Snapshot
          </Typography>
          <Typography variant="body" className="mt-3 text-center text-secondary">
            {SECTION_DESCRIPTION}
          </Typography>

          <Card className="mt-8 p-8 text-center text-secondary">Loading GitHub statistics...</Card>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="github-stats" className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <Typography variant="h2" className="text-center text-primary">
            GitHub Activity Snapshot
          </Typography>
          <Typography variant="body" className="mt-3 text-center text-secondary">
            {SECTION_DESCRIPTION}
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
    <section id="github-stats" className="py-20 glass">
      <div className="mx-auto max-w-6xl px-4">
        <Typography variant="h2" className="text-center text-primary">
          GitHub Activity Snapshot
        </Typography>
        <Typography variant="body" className="my-3 text-center text-secondary">
          {SECTION_DESCRIPTION}
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

        <ProfileViews />

        <GitHubProfile />

        {/* Last Updated */}
        <Typography variant="caption" className="mt-8 text-center block">
          {timeAgo(stats.updatedAt)}
        </Typography>
      </div>
    </section>
  );
}
