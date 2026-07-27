import React from 'react';
import Reveal from '../animations/Reveal';
import Card from '../common/Card';
import Typography from '../common/Typography';
const Snake = () => {
  return (
    <Reveal delay={0.45}>
      {/* Snake */}

      {/* Contribution Snake */}

      <div className="mt-14">
        <Typography variant="h3" className="mb-6 text-center text-primary">
          Contribution Activity
        </Typography>

        <Card className="p-6">
          <img
            className="mx-auto w-full max-w-5xl"
            src="https://raw.githubusercontent.com/MSabbirHossen/MSabbirHossen/output/github-contribution-grid-snake-dark.svg"
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

export default Snake;
