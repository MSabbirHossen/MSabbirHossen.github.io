import React from 'react';
import ProjectLinkCard from './ProjectLinkCard';
import Typography from '../common/Typography';
import Card from '../common/Card';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

const ProjectLinks = ({ githubUrl, liveUrl }) => {
  return (
    <>
      <Card className="space-y-5">
        <Typography variant="subtitle">Project Links</Typography>

        {githubUrl && (
          <ProjectLinkCard icon={FaGithub} title="GitHub Repository" href={githubUrl} />
        )}

        {liveUrl && (
          <ProjectLinkCard icon={FaExternalLinkAlt} title="Live Website" href={liveUrl} />
        )}
      </Card>
    </>
  );
};

export default ProjectLinks;
