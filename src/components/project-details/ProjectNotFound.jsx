import Typography from '../common/Typography';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaExclamationTriangle } from 'react-icons/fa';
import Card from '../common/Card';
import Button from '../common/Button';

const ProjectNotFound = () => {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6 sm:py-28">
      <Card spotlight className="space-y-6 text-center border-default p-8 sm:p-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500">
          <FaExclamationTriangle className="h-7 w-7" aria-hidden="true" />
        </div>

        <Typography variant="h2" className="text-2xl sm:text-3xl font-bold text-primary">
          Project Not Found
        </Typography>

        <Typography variant="body" className="text-sm sm:text-base text-secondary max-w-md mx-auto">
          The project case study you requested could not be located, or the URL may have changed.
        </Typography>

        <div className="flex justify-center pt-2">
          <Button
            as={Link}
            to="/#projects"
            state={{ scrollToSection: 'projects' }}
            variant="primary"
            size="md"
            icon={FaArrowLeft}
          >
            Back to Featured Projects
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ProjectNotFound;
