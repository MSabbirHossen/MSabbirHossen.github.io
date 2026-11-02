import Button from '../common/Button';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const HeroActions = ({ github, linkedin }) => {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="md"
        href={github}
        icon={FaGithub}
        ariaLabel="Open GitHub Profile"
        className="px-3 text-secondary hover:text-accent-primary hover:border-accent-primary/40"
      >
        <span className="hidden sm:inline">GitHub</span>
      </Button>
      <Button
        variant="outline"
        size="md"
        href={linkedin}
        icon={FaLinkedin}
        ariaLabel="Open LinkedIn Profile"
        className="px-3 text-secondary hover:text-accent-secondary hover:border-accent-secondary/40"
      >
        <span className="hidden sm:inline">LinkedIn</span>
      </Button>
    </div>
  );
};

export default HeroActions;
