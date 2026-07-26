import Card from '../common/Card';
import Typography from '../common/Typography';

export default function JourneyCard({ journey }) {
  return (
    <Card className="h-full space-y-5">
      <Typography variant="subtitle" className="text-primary">
        🚀 My Journey
      </Typography>

      <Typography variant="body" className="leading-8 text-secondary md:text-justify">
        {journey}
      </Typography>
    </Card>
  );
}
