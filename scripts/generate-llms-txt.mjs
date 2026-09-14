import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { portfolioData } from '../src/data/index.js';

const { personalInfo, skills, projects, experience, education, certifications } = portfolioData;
const outputPath = resolve('public/llms.txt');

const clean = (value) =>
  String(value ?? '')
    .replace(/\s+/g, ' ')
    .trim();
const link = (label, url) => (url ? `[${label}](${url})` : `${label}: unavailable`);

const skillLines = skills.map(
  (category) =>
    `- **${clean(category.category)}:** ${category.items.map((item) => clean(item.name)).join(', ')}`
);

const projectLines = projects.flatMap((project) => [
  `### ${clean(project.title)}`,
  clean(project.overview),
  `- Tech stack: ${(project.technologies ?? []).map((technology) => clean(technology.name ?? technology)).join(', ')}`,
  `- Links: ${link('Live site', project.liveUrl)} | ${link('GitHub', project.githubUrl)} | ${link('Case study', `/projects/${project.id}`)}`,
]);

const experienceLines = experience.map(
  (item) =>
    `- **${clean(item.role)} at ${clean(item.company)} (${clean(item.period)}):** ${clean(item.desc)}`
);

const educationLines = education.map(
  (item) => `- **${clean(item.degree)}**, ${clean(item.institution)} (${clean(item.period)})`
);

const certificationLines = certifications.map(
  (item) =>
    `- **${clean(item.title)}**, ${clean(item.issuer)} (${clean(item.date)})${item.link ? ` - ${link('Verify', item.link)}` : ''}`
);

const content = `# ${clean(personalInfo.name)} - ${clean(personalInfo.title)}

${clean(personalInfo.brandTagline)}

## About

${clean(personalInfo.mission)} ${clean(personalInfo.tagline)}

## Skills

${skillLines.join('\n')}

## Projects

${projectLines.join('\n')}

## Experience

${experienceLines.join('\n')}

## Education

${educationLines.join('\n')}

## Certifications

${certificationLines.join('\n')}

## Contact

- Email: ${clean(personalInfo.email)}
- LinkedIn: ${link('Profile', personalInfo.linkedin)}
- GitHub: ${link('Profile', personalInfo.github)}
- Availability: ${personalInfo.availability.map(clean).join(', ')}

Full interactive portfolio: [https://msabbirhossen.github.io/](https://msabbirhossen.github.io/)
`;

await mkdir(resolve('public'), { recursive: true });
await writeFile(outputPath, content, 'utf8');
console.log(`Generated ${outputPath}`);
