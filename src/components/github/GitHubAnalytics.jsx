import React from 'react';
import Reveal from '../animations/Reveal';
import Card from '../common/Card';
import Typography from '../common/Typography';

const GitHubAnalytics = () => {
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
            alt="Contribution Snake"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
          />
        </Card>

        {/* Contribution Graph */}
        <Card className="mt-8 p-6">
          <img
            src="https://github-readme-activity-graph.vercel.app/graph?username=MSabbirHossen&theme=github-compact&hide_border=true"
            className="mx-auto w-full max-w-5xl"
            alt="Contribution Snake"
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
