import { FaCalendarAlt, FaClock, FaUser } from 'react-icons/fa';

export default function ProjectMeta({ project }) {
  const { year, role, duration } = project;

  return (
    <div className="flex flex-wrap gap-4 text-sm text-muted">
      {year && (
        <span className="flex items-center gap-2 rounded-full border border-default bg-surface/70 px-3 py-1 text-secondary">
          <FaCalendarAlt aria-hidden="true" />
          {year}
        </span>
      )}

      {role && (
        <span className="flex items-center gap-2 rounded-full border border-default bg-surface/70 px-3 py-1 text-secondary">
          <FaUser aria-hidden="true" />
          {role}
        </span>
      )}

      {duration && (
        <span className="flex items-center gap-2 rounded-full border border-default bg-surface/70 px-3 py-1 text-secondary">
          <FaClock aria-hidden="true" />
          {duration}
        </span>
      )}
    </div>
  );
}
