import Card from '../common/Card';
import Typography from '../common/Typography';

const ProjectBulletList = ({
  title,
  items,
  bulletColor = 'bg-accent-primary',
  columns = false,
}) => {
  if (!items?.length) return null;

  return (
    <Card className="space-y-4">
      <Typography variant="subtitle">{title}</Typography>

      <ul className={columns ? 'grid gap-3 md:grid-cols-2' : 'space-y-3'} aria-label={title}>
        {items.map((item, index) => (
          <li key={`${title}-${index}`} className="flex items-start gap-3">
            <span className={`mt-2 h-2 w-2 shrink-0 rounded-full ${bulletColor}`} />
            <Typography variant="body" className="text-secondary">
              {item}
            </Typography>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default ProjectBulletList;
