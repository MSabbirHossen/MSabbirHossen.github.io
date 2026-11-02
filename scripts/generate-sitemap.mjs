import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { portfolioData } from '../src/data/index.js';

const siteUrl = 'https://msabbirhossen.github.io';
const today = new Date().toISOString().split('T')[0];

const staticPages = [
  { url: `${siteUrl}/`, priority: '1.0', changefreq: 'weekly' },
  { url: `${siteUrl}/recruiter`, priority: '0.95', changefreq: 'weekly' },
  { url: `${siteUrl}/projects`, priority: '0.9', changefreq: 'weekly' },
  { url: `${siteUrl}/experience`, priority: '0.85', changefreq: 'monthly' },
  { url: `${siteUrl}/education`, priority: '0.8', changefreq: 'monthly' },
  { url: `${siteUrl}/certifications`, priority: '0.8', changefreq: 'monthly' },
  { url: `${siteUrl}/developer`, priority: '0.7', changefreq: 'monthly' },
  { url: `${siteUrl}/guide`, priority: '0.7', changefreq: 'monthly' },
];

const flagshipProjectIds = ['report-bd', 'eta-digital-education-platform', 'life-os'];

const projectPages = portfolioData.projects.map((project) => {
  const isFlagship = flagshipProjectIds.includes(project.id);
  return {
    url: `${siteUrl}/projects/${project.id}`,
    priority: isFlagship ? '0.85' : '0.75',
    changefreq: 'monthly',
  };
});

const allPages = [...staticPages, ...projectPages];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

await writeFile(resolve('public/sitemap.xml'), sitemapXml, 'utf-8');
console.log(`Generated public/sitemap.xml with ${allPages.length} URLs`);

await writeFile(resolve('public/robots.txt'), robotsTxt, 'utf-8');
console.log('Generated public/robots.txt');
