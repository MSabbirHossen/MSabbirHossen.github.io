import React from 'react';
import Card from '../common/Card';
import Typography from '../common/Typography';

const ProjectPreview = ({ title, screenshots }) => {
  return (
    <>
      {screenshots?.length > 0 && (
        <Card>
          <Typography variant="subtitle" className="mb-5">
            Preview
          </Typography>

          <img
            src={screenshots[0]}
            alt={`${title} preview`}
            loading="lazy"
            className="w-full rounded-xl border object-cover"
          />
        </Card>
      )}
    </>
  );
};

export default ProjectPreview;
