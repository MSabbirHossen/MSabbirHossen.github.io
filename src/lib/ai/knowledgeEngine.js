function normalize(value) {
  return value.toLowerCase();
}

function includesQuery(text, query) {
  return normalize(text).includes(normalize(query));
}

function pickBackendTechnologies(project) {
  const backendTerms = ['node', 'express', 'mongo', 'firebase admin', 'jwt', 'rest'];

  return (project.technologies ?? [])
    .map((tech) => tech.name)
    .filter((name) => backendTerms.some((term) => includesQuery(name, term)));
}

export function createKnowledgeEngine(portfolio) {
  const projectsById = new Map(portfolio.projects.map((project) => [project.id, project]));

  function findProjectByQuery(query) {
    const normalizedQuery = normalize(query);

    return (
      portfolio.projects.find((project) => {
        const searchable = [project.title, project.id, project.category, project.overview]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();

        return searchable.includes(normalizedQuery);
      }) ?? null
    );
  }

  function getProjectsByTopic(topic) {
    const normalizedTopic = normalize(topic);

    return portfolio.projects.filter((project) => {
      const searchable = [
        project.title,
        project.category,
        project.overview,
        ...(project.technologies ?? []).map((tech) => tech.name),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return searchable.includes(normalizedTopic);
    });
  }

  function getFeaturedProjects(limit = 3) {
    return portfolio.featuredProjects.slice(0, limit);
  }

  function getSkillSummary() {
    return portfolio.skills.map((category) => ({
      category: category.category,
      tools: category.items.slice(0, 5).map((item) => item.name),
      proficiency:
        category.category === 'Learning / Exploring' ? 'Actively improving' : 'Production-ready',
      years: 'Built through ongoing project work',
    }));
  }

  function getCertifications(limit = 4) {
    return portfolio.certifications.slice(0, limit);
  }

  function getProjectById(projectId) {
    return projectsById.get(projectId) ?? null;
  }

  function getBackendDetails(projectId) {
    const project = getProjectById(projectId);

    if (!project) {
      return null;
    }

    return {
      title: project.title,
      backendTech: pickBackendTechnologies(project),
      apiPreview: (project.apiEndpoints ?? []).slice(0, 3),
    };
  }

  return {
    findProjectByQuery,
    getProjectsByTopic,
    getFeaturedProjects,
    getSkillSummary,
    getCertifications,
    getProjectById,
    getBackendDetails,
  };
}
