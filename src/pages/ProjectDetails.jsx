import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { portfolioData } from '../data/portfolioData';
import Card from '../components/common/Card';
import Typography from '../components/common/Typography';
import Reveal from '../components/animations/Reveal';

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

  const siteUrl = portfolioData.personalInfo.website.replace(/\/$/, '');
  const canonicalUrl = `${siteUrl}/projects/${project.id}`;
  const pageTitle = `${project.title} | Projects | Md. Sabbir Hossen`;
  const metaDescription =
    project.overview.length > 160 ? `${project.overview.slice(0, 157)}...` : project.overview;
  const socialImage = project.screenshots?.[0]
    ? `${siteUrl}${project.screenshots[0]}`
    : `${siteUrl}/screenshots/portfolio-preview.png`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={socialImage} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={socialImage} />
      </Helmet>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <ProjectHero project={project} />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-8">
          <article className="min-w-0 space-y-6" aria-label={`${project.title} project details`}>
            <Reveal>
              <Card className="space-y-4">
                <Typography variant="subtitle">Overview</Typography>
                <Typography variant="body" className="text-muted">
                  {project.overview}
                </Typography>
              </Card>
            </Reveal>

            <Reveal delay={0.05}>
              <ProjectTechStack technologies={project.technologies} />
            </Reveal>

            <Reveal delay={0.1}>
              <ProjectBulletList title="Key Features" items={project.features} columns />
            </Reveal>

            <Reveal delay={0.15}>
              <ProjectBulletList title="Architecture" items={project.architecture} />
            </Reveal>

            <Reveal delay={0.2}>
              <ProjectBulletList title="Challenges & Solutions" items={project.challenges} />
            </Reveal>

            {project.developmentProcess?.length > 0 && (
              <Reveal delay={0.25}>
                <ProjectBulletList title="Development Process" items={project.developmentProcess} />
              </Reveal>
            )}

            <Reveal delay={0.3}>
              <ProjectBulletList title="Lessons Learned" items={project.lessonsLearned} />
            </Reveal>

            <Reveal delay={0.35}>
              <ProjectApiEndpoints endpoints={project.apiEndpoints} />
            </Reveal>
          </article>

          <aside className="min-w-0 space-y-6" aria-label="Project links, roadmap, and preview">
            <Reveal delay={0.05}>
              <ProjectLinks githubUrl={project.githubUrl} liveUrl={project.liveUrl} />
            </Reveal>

            {project.futureImprovements?.length > 0 && (
              <Reveal delay={0.1}>
                <ProjectBulletList title="Future Improvements" items={project.futureImprovements} />
              </Reveal>
            )}

            <Reveal delay={0.15}>
              <ProjectPreview title={project.title} screenshots={project.screenshots} />
            </Reveal>
          </aside>
        </div>
      </div>
    </>
  );
}
