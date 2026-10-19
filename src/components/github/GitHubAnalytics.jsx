import { useState } from 'react';
import Reveal from '../animations/Reveal';
import Card from '../common/Card';
import Typography from '../common/Typography';

const PRIMARY_GRAPH_URL =
  'https://activity-graph.vercel.app/graph?username=MSabbirHossen&theme=github-compact&hide_border=true';
const FALLBACK_GRAPH_URL = 'https://ghchart.rshah.org/6366f1/MSabbirHossen';

const GitHubAnalytics = () => {
  const [graphSrc, setGraphSrc] = useState(PRIMARY_GRAPH_URL);

  return (
    <Reveal delay={0.45}>
      <div className="mt-12">
        <Typography variant="h3" className="mb-6 text-center text-primary">
          📈 GitHub Analytics
        </Typography>

        {/* Streak Stats */}
        <Card className="mt-8 p-6">
          <img
            src="https://streak-stats.demolab.com?user=MSabbirHossen&theme=github-dark&hide_border=true"
            className="mx-auto w-full max-w-5xl"
            alt="GitHub Streak Stats"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
          />
        </Card>

        {/* Contribution Graph */}
        <Card className="mt-8 p-6">
          <img
            src={graphSrc}
            onError={() => {
              if (graphSrc !== FALLBACK_GRAPH_URL) {
                setGraphSrc(FALLBACK_GRAPH_URL);
              }
            }}
            className="mx-auto w-full max-w-5xl"
            alt="GitHub Activity Graph"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
          />
        </Card>
      </div>
    </Reveal>
  );
};

export default GitHubAnalytics;
