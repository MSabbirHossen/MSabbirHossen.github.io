import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { FaArrowLeft, FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

import { portfolioData } from '../data/portfolioData';

import Card from '../components/common/Card';
import Typography from '../components/common/Typography';
import ProjectNotFound from '../components/project-details/ProjectNotFound';
import ProjectHero from '../components/project-details/ProjectHero';
import ProjectTechStack from '../components/project-details/ProjectTechStack';
import ProjectPreview from '../ProjectPreview';
import ProjectLinkCard from '../components/project-details/ProjectLinkCard';
import ProjectLinks from '../components/project-details/ProjectLinks';
import ProjectBulletList from '../components/project-details/ProjectBulletList';

export default function ProjectDetails() {
  const { slug } = useParams();

  const project = portfolioData.projects.find((item) => item.id === slug);
  // console.log('portfolioData.projects', portfolioData.projects.screenshots);
  // console.log('Selected Project:', project.screenshots); // Debugging line to check the project object

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
          {/* LEFT */}

          <div className="space-y-8">
            {/* Technologies */}
            <ProjectTechStack technologies={project.technologies} />

            {/* Architecture */}

            <ProjectBulletList title="Architecture" items={project.architecture} />

            {/* Challenges */}
            <ProjectBulletList title="Challenges" items={project.challenges} />

            {/* Lessons */}

            <Card>
              <Typography variant="subtitle" className="mb-4">
                Lessons Learned
              </Typography>

              <Typography variant="body">{project.lessonsLearned}</Typography>
            </Card>

            {/* Features */}

            {project.features && (
              <ProjectBulletList
                title="Key Features"
                items={project.features}
                columns
                bulletColor="bg-emerald-500"
              />
            )}

            {/* API */}

            {project.apiEndpoints && (
              <Card>
                <Typography variant="subtitle" className="mb-5">
                  API Endpoints
                </Typography>

                <div className="space-y-3">
                  {project.apiEndpoints.map((endpoint) => (
                    <code
                      key={endpoint}
                      className="block rounded-lg bg-slate-100 p-3 text-sm dark:bg-slate-800"
                    >
                      {endpoint}
                    </code>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* RIGHT */}

          <div className="space-y-8">
            {/* Links */}

            <ProjectLinks githubUrl={project.githubUrl} liveUrl={project.liveUrl} />

            {/* Future */}

            <Card>
              <Typography variant="subtitle" className="mb-4">
                Future Improvements
              </Typography>

              <Typography variant="body">{project.futureImprovements}</Typography>
            </Card>

            {/* Screenshot */}

            <ProjectPreview title={project.title} screenshots={project.screenshots} />
          </div>
        </div>
      </div>
    </>
  );
}
