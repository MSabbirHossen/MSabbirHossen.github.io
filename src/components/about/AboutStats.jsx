import Card from '../common/Card';
import Typography from '../common/Typography';

export default function AboutStats({ stats }) {
  return (
    <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="text-center">
          <Typography variant="h3" className="text-primary-600 dark:text-primary-400">
            {stat.value}
          </Typography>

          <Typography variant="body" className="mt-2">
            {stat.label}
          </Typography>
        </Card>
      ))}
    </div>
  );
}
