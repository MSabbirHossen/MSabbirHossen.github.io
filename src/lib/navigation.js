export function scrollToSection(sectionId, behavior = 'smooth') {
  document.getElementById(sectionId)?.scrollIntoView({ behavior, block: 'start' });
}

export function navigateToSection({ event, sectionId, location, navigate }) {
  event?.preventDefault();

  if (location.pathname !== '/') {
    navigate('/', { state: { scrollToSection: sectionId } });
    return;
  }

  scrollToSection(sectionId);
}
