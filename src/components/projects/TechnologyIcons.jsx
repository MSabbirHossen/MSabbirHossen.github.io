import { FaCode } from 'react-icons/fa';

export default function TechnologyIcons({ project }) {
  const { technologies } = project;
  const visibleTech = technologies.slice(0, 4);
  const remaining = technologies.length - visibleTech.length;

  return (
    <div className="flex flex-wrap items-center gap-3">
      {visibleTech.map((tech, index) => {
        const Icon = tech.icon ?? FaCode;

        return (
          <div
            key={`${tech.name}-${index}`}
            title={tech.name}
            className="group flex h-11 w-11 items-center justify-center rounded-xl border border-default bg-surface/80 text-secondary shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent-primary hover:text-accent-secondary light:hover:shadow-md light:hover:shadow-slate-900/10"
          >
            <Icon
              className="text-xl transition-transform duration-300 group-hover:scale-110"
              transition={{
                delay: index * 0.05,
              }}
            />
          </div>
        );
      })}

      {remaining > 0 && (
        <div
          title={`${remaining} more technologies`}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-dashed border-default bg-surface/70 text-sm font-semibold text-secondary"
        >
          +{remaining}
        </div>
      )}
    </div>
  );
}
