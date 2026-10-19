export function scrollToSection(sectionId, behavior = 'smooth', retries = 10) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior, block: 'start' });
    return;
  }

  if (retries > 0) {
    setTimeout(() => {
      scrollToSection(sectionId, behavior, retries - 1);
    }, 50);
  }
}

export function navigateToSection({ event, sectionId, location, navigate }) {
  event?.preventDefault();

  if (location.pathname !== '/') {
    navigate('/', { state: { scrollToSection: sectionId } });
    return;
  }

  scrollToSection(sectionId);
}
