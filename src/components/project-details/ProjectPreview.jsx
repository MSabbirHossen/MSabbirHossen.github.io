import Card from '../common/Card';
import Typography from '../common/Typography';

const ProjectPreview = ({ title, screenshots }) => {
  if (!screenshots?.length) return null;

  return (
    <Card className="space-y-5">
      <Typography variant="subtitle">Preview</Typography>

      <div className="group overflow-hidden rounded-xl border-default">
        <img
          src={screenshots[0]}
          alt={`${title} preview`}
          loading="lazy"
          decoding="async"
          sizes="(min-width: 1024px) 28vw, 100vw"
          className="aspect-video w-full object-cover transition-all duration-500 group-hover:scale-[1.02] group-hover:brightness-105"
        />
      </div>
    </Card>
  );
};

export default ProjectPreview;
