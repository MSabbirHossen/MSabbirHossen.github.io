import { useState } from 'react';
import Reveal from '../animations/Reveal';
import Card from '../common/Card';
import Typography from '../common/Typography';

const Snake = () => {
  const [hasError, setHasError] = useState(false);

  if (hasError) return null;

  return (
    <Reveal delay={0.4}>
      <div className="mt-12">
        <Typography variant="h3" className="mb-6 text-center text-primary">
          Contribution Activity Stream
        </Typography>

        <Card
          spotlight
          hover
          className="p-5 sm:p-6 border-default transition-all duration-300 hover:border-accent-primary/40 hover:shadow-lg hover:shadow-accent-primary/5"
        >
          <img
            className="mx-auto w-full max-w-5xl h-auto"
            src="https://raw.githubusercontent.com/MSabbirHossen/MSabbirHossen/output/github-contribution-grid-snake-dark.svg"
            onError={() => setHasError(true)}
            alt="GitHub Contribution Activity Stream"
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
