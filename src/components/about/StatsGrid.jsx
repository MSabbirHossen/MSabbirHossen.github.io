import React from 'react';

import Card from '../common/Card';

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const StatsGrid = ({ stats }) => {
  return (
    <div>
      <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border p-6 text-center">
            <h3 className="text-3xl font-bold text-primary-400">{stat.value}</h3>

            <p>{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsGrid;
