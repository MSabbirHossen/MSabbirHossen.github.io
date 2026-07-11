import React from 'react';
import { motion } from 'framer-motion';

import Typography from '../common/Typography';
import Card from '../common/Card';

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const JourneyCard = ({ journey, title, studyingAt, location }) => {
  return (
    <div>
      {/* Journey + Profile */}
      <div className="grid gap-6 lg:grid-cols-[1.5fr_0.8fr]">
        {/* Journey */}

        <motion.div variants={itemVariants}>
          <Card className="h-full space-y-5">
            <Typography variant="subtitle" className="text-slate-100">
              🚀 My Journey
            </Typography>

            <Typography variant="body" className="leading-8 text-slate-400 md:text-justify">
              {journey}
            </Typography>
          </Card>
        </motion.div>

        {/* Quick Facts */}

        <motion.div variants={itemVariants}>
          <Card className="space-y-5">
            <Typography variant="subtitle" className="text-slate-100">
              👨 Quick Facts
            </Typography>

            <div className="space-y-4 text-slate-300">
              <div>
                <p className="text-sm text-slate-500">Role</p>
                <p>{title}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Studying At</p>
                <p>{studyingAt}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Location</p>
                <p>{location}</p>
              </div>

              {/* <div>
                  <p className="text-sm text-slate-500">Languages</p>
                  <p>{languages.length} Languages</p>
                </div> */}
            </div>
          </Card>
        </motion.div>
      </div>
      ;
    </div>
  );
};

export default JourneyCard;
