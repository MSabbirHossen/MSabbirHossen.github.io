import { useEffect, useState } from 'react';
import { FaGithub } from 'react-icons/fa';

import SectionWrapper from '../common/SectionWrapper';
import Typography from '../common/Typography';
import Card from '../common/Card';
import Button from '../common/Button';
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

  function timeAgo(date) {
    if (!date) return '';
    const diff = REFERENCE_NOW - new Date(date).getTime();
    const hours = Math.floor(diff / 3600000);

    if (hours < 1) return 'Updated recently';
    if (hours < 24) return `Updated ${hours} hour${hours > 1 ? 's' : ''} ago`;

    const days = Math.floor(hours / 24);
    return `Updated ${days} day${days > 1 ? 's' : ''} ago`;
  }

  if (loading) {
    return (
      <SectionWrapper
        id="github-stats"
        eyebrow="Open-Source Engineering"
        title="GitHub Activity & Code Metrics"
        description="Transparent repository metrics, language distribution, and version-controlled software delivery."
        className="mx-auto max-w-6xl px-4 sm:px-6"
      >
        <Card className="p-8 text-center text-secondary border-default bg-surface/50">
          <Typography variant="body" className="text-sm">
            Loading verified GitHub metrics snapshot...
          </Typography>
        </Card>
      </SectionWrapper>
    );
  }

  if (error || !stats) {
    return (
      <SectionWrapper
        id="github-stats"
        eyebrow="Open-Source Engineering"
        title="GitHub Activity & Code Metrics"
        description="Transparent repository metrics, language distribution, and version-controlled software delivery."
        className="mx-auto max-w-6xl px-4 sm:px-6"
      >
        <Card className="p-8 text-center border-default bg-surface/50 space-y-4">
          <Typography variant="body" className="text-sm text-secondary">
            Cached activity snapshot is currently unavailable.
          </Typography>
          <Button
            href="https://github.com/MSabbirHossen"
            variant="primary"
            size="sm"
            icon={FaGithub}
          >
            Visit GitHub Profile
          </Button>
        </Card>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper
      id="github-stats"
      eyebrow="Open-Source Engineering"
      title="GitHub Activity & Code Metrics"
      description="Transparent repository metrics, language distribution, and version-controlled software delivery."
      className="mx-auto max-w-6xl px-4 sm:px-6"
    >
      <Reveal>
        <StatsCards stats={stats} />
      </Reveal>

      {stats.topLanguages && stats.topLanguages.length > 0 && (
        <Reveal delay={0.15}>
          <LanguagesChart languages={stats.topLanguages} />
        </Reveal>
      )}

      {stats.recentRepos && stats.recentRepos.length > 0 && (
        <Reveal delay={0.25}>
          <RecentRepos repos={stats.recentRepos} />
        </Reveal>
      )}

      <GitHubAnalytics />
      <Snake />

      {/* GitHub Footer Ribbon */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6 border-t border-default/30 pt-6">
        <ProfileViews />
        <GitHubProfile />
        {stats.updatedAt && (
          <Typography variant="caption" className="text-muted text-xs font-medium">
            {timeAgo(stats.updatedAt)}
          </Typography>
        )}
      </div>
    </SectionWrapper>
  );
}
