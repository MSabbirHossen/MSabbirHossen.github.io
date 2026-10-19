import { FaGithub } from 'react-icons/fa';

const GitHubProfile = () => {
  return (
    <a
      href="https://github.com/MSabbirHossen"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-[44px] items-center gap-2.5 rounded-xl bg-accent-primary px-6 font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-primary-dark"
    >
      <FaGithub className="h-5 w-5" />
      <span>Visit GitHub Profile</span>
    </a>
  );
};

export default GitHubProfile;
