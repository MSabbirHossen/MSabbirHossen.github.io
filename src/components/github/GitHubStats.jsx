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
import { useTranslation } from '../../i18n';

const REFERENCE_NOW = Date.now();

export default function GitHubStats() {
  const { t } = useTranslation();
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

    if (hours < 1) return t('github.updatedRecently');
    if (hours < 24) {
      return hours === 1
        ? t('github.updatedHoursAgo', { hours })
        : t('github.updatedHoursAgoPlural', { hours });
    }

    const days = Math.floor(hours / 24);
    return days === 1
      ? t('github.updatedDaysAgo', { days })
      : t('github.updatedDaysAgoPlural', { days });
  }

  if (loading) {
    return (
      <SectionWrapper
        id="github-stats"
        eyebrow={t('github.eyebrow')}
        title={t('github.title')}
        description={t('github.description')}
        className="mx-auto max-w-6xl px-4 sm:px-6"
      >
        <Card className="p-8 text-center text-secondary border-default bg-surface/50">
          <Typography variant="body" className="text-sm">
            {t('github.loadingSnapshot')}
          </Typography>
        </Card>
      </SectionWrapper>
    );
  }

  if (error || !stats) {
    return (
      <SectionWrapper
        id="github-stats"
        eyebrow={t('github.eyebrow')}
        title={t('github.title')}
        description={t('github.description')}
        className="mx-auto max-w-6xl px-4 sm:px-6"
      >
        <Card className="p-8 text-center border-default bg-surface/50 space-y-4">
          <Typography variant="body" className="text-sm text-secondary">
            {t('github.unavailableSnapshot')}
          </Typography>
          <Button
            href="https://github.com/MSabbirHossen"
            variant="primary"
            size="sm"
            icon={FaGithub}
          >
            {t('github.visitProfile')}
          </Button>
        </Card>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper
      id="github-stats"
      eyebrow={t('github.eyebrow')}
      title={t('github.title')}
      description={t('github.description')}
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
