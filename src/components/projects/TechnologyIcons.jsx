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
            className="group flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 
            hover:border-accent-primary
            hover:text-accent-secondary
            dark:border-slate-700 dark:bg-slate-800"
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
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-sm font-semibold text-slate-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300"
        >
          +{remaining}
        </div>
      )}
    </div>
  );
}
