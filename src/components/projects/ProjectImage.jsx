export default function ProjectImage({ project }) {
  const { screenshots, title } = project;
  const image = screenshots && screenshots.length > 0 ? screenshots[0] : null;

  if (!image) return null;

  return (
    <div className="overflow-hidden rounded-xl">
      <img
        src={`${import.meta.env.BASE_URL}${image}`}
        alt={title}
        className="h-52 w-full object-cover transition duration-500 hover:scale-105"
        loading="lazy"
      />
    </div>
  );
}
