import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { projects } from '../src/data/projects.js';
import { industries } from '../src/data/industries.js';
import { servicePages, localPage } from '../src/data/seoPages.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const ORIGIN = 'https://maheshbuilds.com';

const paths = [
  '/',
  '/work',
  ...projects.filter((project) => project.active).map((project) => `/work/${project.slug}`),
  ...industries.map((industry) => `/industries/${industry.slug}`),
  ...servicePages.map((page) => `/services/${page.slug}`),
  `/${localPage.slug}`,
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths
  .map((path) => `  <url>\n    <loc>${ORIGIN}${path}</loc>\n  </url>`)
  .join('\n')}\n</urlset>\n`;

writeFileSync(resolve(ROOT, 'public/sitemap.xml'), xml);
console.log(`[gen-seo] sitemap.xml written with ${paths.length} verified URLs.`);
