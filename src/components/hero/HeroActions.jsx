import Button from '../common/Button';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const HeroActions = ({ github, linkedin }) => {
  return (
    <>
      <Button variant="outline" size="md" href={github} icon={FaGithub}>
        GitHub
      </Button>
      <Button variant="outline" size="md" href={linkedin} icon={FaLinkedin}>
        LinkedIn
      </Button>
    </>
  );
};

export default HeroActions;
