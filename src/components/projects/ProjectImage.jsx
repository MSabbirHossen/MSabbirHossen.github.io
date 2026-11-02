export default function ProjectImage({ project, priority = false }) {
  const { screenshots, title, category } = project;
  const image = screenshots && screenshots.length > 0 ? screenshots[0] : null;

  if (!image) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-default/60 surface flex items-center justify-center text-muted text-sm">
        <span>{title} preview</span>
      </div>
    );
  }

  const imageSrc = image.startsWith('http')
    ? image
    : `${import.meta.env.BASE_URL}${image.replace(/^\//, '')}`;

  return (
    <div className="group/img relative overflow-hidden rounded-xl border border-default/60 surface">
      <img
        src={imageSrc}
        alt={`${title} - ${category} application preview`}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
        className="aspect-video w-full object-cover transition-transform duration-500 ease-out group-hover/img:scale-[1.03]"
      />

      {/* Subtle bottom gradient for contrast */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-dark-bg/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/img:opacity-100"
        aria-hidden="true"
      />
    </div>
  );
}
