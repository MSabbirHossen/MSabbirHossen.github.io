import Card from '../common/Card';
import Typography from '../common/Typography';

export default function QuickFactsCard({ title, studyingAt, location }) {
  return (
    <Card className="space-y-5">
      <Typography variant="subtitle" className="text-primary">
        👨 Quick Facts
      </Typography>

      <div className="space-y-4 text-secondary">
        <div>
          <p className="text-sm text-muted">Role</p>
          <p className="mt-1">{title}</p>
        </div>

        <div>
          <p className="text-sm text-muted">Studying At</p>
          <p className="mt-1">{studyingAt}</p>
        </div>

        <div>
          <p className="text-sm text-muted">Location</p>
          <p className="mt-1">{location}</p>
        </div>
      </div>
    </Card>
  );
}
