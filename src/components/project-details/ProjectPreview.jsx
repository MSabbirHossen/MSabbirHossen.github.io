import Card from '../common/Card';
import Typography from '../common/Typography';

const ProjectPreview = ({ title, screenshots }) => {
  if (!screenshots?.length) return null;

  const image = screenshots[0];
  const imageSrc = image.startsWith('http')
    ? image
    : `${import.meta.env.BASE_URL}${image.replace(/^\//, '')}`;

  return (
    <Card spotlight className="space-y-4 border-default p-5">
      <Typography
        variant="subtitle"
        className="text-sm font-bold uppercase tracking-wider text-muted"
      >
        Interface Preview
      </Typography>

      <div className="group overflow-hidden rounded-xl border border-default surface">
        <img
          src={imageSrc}
          alt={`${title} interface preview`}
          loading="lazy"
          decoding="async"
          sizes="(min-width: 1024px) 28vw, 100vw"
          className="aspect-video w-full object-cover transition-all duration-500 group-hover:scale-[1.03]"
        />
      </div>
    </Card>
  );
};

export default ProjectPreview;
