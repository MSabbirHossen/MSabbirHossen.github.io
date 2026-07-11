export default function ProjectImage({ project }) {
  const { screenshots, title } = project;
  const image = screenshots && screenshots.length > 0 ? screenshots[0] : null;

  if (!image) return null;

  return (
    <div className="group relative overflow-hidden rounded-2xl">
      <img
        src={`${import.meta.env.BASE_URL}${image}`}
        alt={title}
        loading="lazy"
        className="aspect-video w-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-90"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </div>
  );
}
