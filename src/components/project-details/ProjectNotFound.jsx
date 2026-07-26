import Typography from '../common/Typography';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Card from '../common/Card';
import Button from '../common/Button';

const ProjectNotFound = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24">
      <Card className="space-y-6 text-center">
        <Typography variant="h2" className="text-balance">
          Project not found
        </Typography>

        <Typography variant="body" className="text-muted">
          The project you requested does not exist or the link is outdated.
        </Typography>

        <div className="flex justify-center">
          <Button as={Link} to="/projects" variant="outline" size="md" icon={FaArrowLeft}>
            Back to Projects
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ProjectNotFound;
