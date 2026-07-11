import React from 'react';
import { motion } from 'framer-motion';

import Typography from '../common/Typography';
import Card from '../common/Card';

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const LanguagesCard = ({ languages }) => {
  return (
    <div>
      {/* Languages */}
      <motion.div variants={itemVariants} className="mt-10">
        <Typography variant="subtitle" className="mb-5 text-slate-100">
          🌍 Languages
        </Typography>

        <Card>
          <div className="space-y-5">
            {languages.map((lang) => (
              <div key={lang.name}>
                <div className="mb-2 flex justify-between">
                  <span className="font-medium text-slate-200">{lang.name}</span>

                  <span className="text-sm text-primary-400">{lang.level}</span>
                </div>

                <div className="h-2 rounded-full bg-slate-700">
                  <div
                    className="h-2 rounded-full bg-cyan-500 transition-all duration-700"
                    style={{ width: `${lang.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
      ;
    </div>
  );
};

export default LanguagesCard;
