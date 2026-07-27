import React from 'react';
import { FaGithub } from 'react-icons/fa';

const GitHubProfile = () => {
  return (
    <div className="mt-10 flex justify-center">
      <a
        href="https://github.com/MSabbirHossen"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 rounded-xl bg-accent-primary px-6 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-primary-dark"
      >
        <FaGithub />
        Visit GitHub Profile
      </a>
    </div>
  );
};

export default GitHubProfile;
