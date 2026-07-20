import React from 'react';
import Card from '../common/Card';
import Typography from '../common/Typography';

const ProjectTechStack = ({ technologies }) => {
  return (
    <>
      <Card className="space-y-6">
        <Typography variant="subtitle">Tech Stack</Typography>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {technologies.map((tech) => {
            const Icon = tech.icon;

            return (
              <div
                key={tech.name}
                className="flex w-28 flex-col items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-indigo-500 dark:border-slate-700 dark:bg-slate-900"
              >
                {Icon && <Icon className="text-3xl text-indigo-500" />}

                <p className="text-center text-xs font-medium">{tech.name}</p>
              </div>
            );
          })}
        </div>
      </Card>
    </>
  );
};

export default ProjectTechStack;
