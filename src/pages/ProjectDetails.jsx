import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { portfolioData } from '../data/portfolioData';

import ProjectHero from '../components/project-details/ProjectHero';
import ProjectLinks from '../components/project-details/ProjectLinks';
import ProjectPreview from '../components/project-details/ProjectPreview';
import ProjectNotFound from '../components/project-details/ProjectNotFound';
import ProjectTechStack from '../components/project-details/ProjectTechStack';
import ProjectBulletList from '../components/project-details/ProjectBulletList';
import ProjectApiEndpoints from '../components/project-details/ProjectApiEndpoints';

export default function ProjectDetails() {
  const { slug } = useParams();

  const project = portfolioData.projects.find((item) => item.id === slug);

  if (!project) {
    return <ProjectNotFound />;
  }

  return (
    <>
      <Helmet>
        <title>{project.title} | Md. Sabbir Hossen</title>
        <meta name="description" content={project.overview} />
      </Helmet>

      <div className="mx-auto max-w-7xl px-6 py-16">
        <ProjectHero project={project} />

        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-8">
            <ProjectTechStack technologies={project.technologies} />

            <ProjectBulletList title="Architecture" items={project.architecture} />

            <ProjectBulletList title="Challenges" items={project.challenges} />

            <ProjectBulletList title="Lessons Learned" items={project.lessonsLearned} />

            {project.features && (
              <ProjectBulletList
                title="Key Features"
                items={project.features}
                columns
                bulletColor="bg-emerald-500"
              />
            )}

            <ProjectApiEndpoints endpoints={project.apiEndpoints} />
          </div>

          <div className="space-y-8">
            <ProjectLinks githubUrl={project.githubUrl} liveUrl={project.liveUrl} />

            <ProjectBulletList title="Future Improvements" items={project.futureImprovements} />

            <ProjectPreview title={project.title} screenshots={project.screenshots} />
          </div>
        </div>
      </div>
    </>
  );
}
