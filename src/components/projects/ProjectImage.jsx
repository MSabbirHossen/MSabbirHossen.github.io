export default function ProjectImage({ project }) {
  const { screenshots, title } = project;
  const image = screenshots && screenshots.length > 0 ? screenshots[0] : null;

  if (!image) return null;

  return (
    <div className="group relative overflow-hidden rounded-2xl">
      <img
        // src={`${import.meta.env.BASE_URL}${image}`}
        src={image}
        alt={title}
        loading="lazy"
        decoding="async"
        sizes="(min-width: 1280px) 24vw, (min-width: 768px) 42vw, 100vw"
        className="aspect-video w-full object-cover transition-all duration-500 group-hover:scale-[1.04] group-hover:brightness-95 group-hover:contrast-105"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </div>
  );
}
