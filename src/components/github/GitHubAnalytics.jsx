import { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import Reveal from '../animations/Reveal';
import Card from '../common/Card';
import Typography from '../common/Typography';
import Button from '../common/Button';

const PRIMARY_GRAPH_URL =
  'https://activity-graph.vercel.app/graph?username=MSabbirHossen&theme=github-compact&hide_border=true';
const FALLBACK_GRAPH_URL = 'https://ghchart.rshah.org/6366f1/MSabbirHossen';

const GitHubAnalytics = () => {
  const [graphSrc, setGraphSrc] = useState(PRIMARY_GRAPH_URL);
  const [graphFailed, setGraphFailed] = useState(false);
  const [streakFailed, setStreakFailed] = useState(false);

  return (
    <Reveal delay={0.35}>
      <div className="mt-12 space-y-6">
        <Typography variant="h3" className="text-center text-primary">
          Commit & Contribution Trends
        </Typography>

        {/* Streak Stats (with graceful error handling) */}
        {!streakFailed && (
          <Card
            spotlight
            hover
            className="mx-auto max-w-2xl p-4 sm:p-5 border-default transition-all duration-300 hover:border-accent-primary/40 hover:shadow-lg hover:shadow-accent-primary/5"
          >
            <img
              src="https://streak-stats.demolab.com?user=MSabbirHossen&theme=github-dark&hide_border=true"
              onError={() => setStreakFailed(true)}
              className="mx-auto h-auto max-h-[200px] w-full object-contain"
              alt="GitHub Streak Statistics"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
            />
          </Card>
        )}

        {/* Contribution Graph (with multi-tier fallback) */}
        <Card
          spotlight
          hover
          className="mx-auto max-w-4xl p-4 sm:p-5 border-default transition-all duration-300 hover:border-accent-primary/40 hover:shadow-lg hover:shadow-accent-primary/5"
        >
          {!graphFailed ? (
            <img
              src={graphSrc}
              onError={() => {
                if (graphSrc !== FALLBACK_GRAPH_URL) {
                  setGraphSrc(FALLBACK_GRAPH_URL);
                } else {
                  setGraphFailed(true);
                }
              }}
              className="mx-auto h-auto max-h-[260px] w-full object-contain"
              alt="GitHub Contribution Calendar Graph"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="p-6 text-center space-y-3">
              <Typography variant="body" className="text-xs sm:text-sm text-secondary">
                Contribution analytics visualization is temporarily unavailable from external
                servers.
              </Typography>
              <Button
                href="https://github.com/MSabbirHossen"
                variant="outline"
                size="sm"
                icon={FaGithub}
                className="text-xs"
              >
                Inspect Live Commit Graph on GitHub
              </Button>
            </div>
          )}
        </Card>
      </div>
    </Reveal>
  );
};

export default GitHubAnalytics;
