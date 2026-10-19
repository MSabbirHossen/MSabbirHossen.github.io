const ProfileViews = () => {
  return (
    <a
      href="https://github.com/MSabbirHossen"
      target="_blank"
      rel="noopener noreferrer"
      title="GitHub Profile Views"
      className="inline-flex h-[44px] items-center justify-center rounded-xl border border-default bg-surface/80 px-3.5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-primary/40"
    >
      <img
        src="https://komarev.com/ghpvc/?username=MSabbirHossen&label=Profile%20Views&color=3B82F6&style=for-the-badge"
        alt="Profile Views"
        className="h-7 w-auto rounded object-contain"
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
      />
    </a>
  );
};

export default ProfileViews;
