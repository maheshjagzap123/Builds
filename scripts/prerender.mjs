import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { projects } from '../src/data/projects.js';
import { industries } from '../src/data/industries.js';
import { servicePages, localPage } from '../src/data/seoPages.js';
import { faq } from '../src/data/services.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const DIST = resolve(ROOT, 'dist');
const ORIGIN = 'https://maheshbuilds.com';
const OG_IMAGE = `${ORIGIN}/assets/img/og-default.png`;

if (!existsSync(resolve(DIST, 'index.html'))) {
  console.warn('[prerender] dist/index.html not found — skipping.');
  process.exit(0);
}

const template = readFileSync(resolve(DIST, 'index.html'), 'utf8');
const activeProjects = projects.filter((project) => project.active);

const routes = [
  {
    path: '/',
    title: 'Mahesh Builds — Website & Software Development Studio in India',
    description: 'Websites, web apps, mobile apps and custom business software for Indian businesses and institutes — designed, built and maintained end-to-end.',
    eyebrow: 'Digital Product & Software Studio · India',
    heading: 'We build digital products that move business forward.',
    paragraphs: ['Websites, web applications, mobile apps and custom business software designed to help businesses attract customers, simplify operations and grow.'],
    links: servicePages.map((page) => ({ href: `/services/${page.slug}`, label: page.title })),
    schema: {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: faq.map((item) => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })),
    },
  },
  {
    path: '/work',
    title: 'Web & Software Development Work | Mahesh Builds',
    description: 'Explore personal digital products designed and built by Mahesh Builds, including TripWise, Paithani Marketplace and a Milk Management System.',
    eyebrow: 'Work', heading: "Digital products we've built.",
    paragraphs: ['Personal products designed and developed independently by Mahesh Builds. Public client work will only be added with permission.'],
    links: activeProjects.map((project) => ({ href: `/work/${project.slug}`, label: project.name })),
    schema: { '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: activeProjects.map((project, index) => ({ '@type': 'ListItem', position: index + 1, url: `${ORIGIN}/work/${project.slug}`, name: project.name })) },
  },
  ...activeProjects.map((project) => ({
    path: `/work/${project.slug}`,
    title: project.seo?.title || `${project.name} | Mahesh Builds`,
    description: project.seo?.description || project.shortDescription,
    eyebrow: project.label, heading: project.name,
    paragraphs: [project.overview, project.problem, project.solution].filter(Boolean),
    lists: [{ title: 'Key features', items: project.features }].filter((list) => list.items?.length),
    links: [{ href: '/work', label: 'View all work' }, { href: '/#contact', label: 'Discuss a project' }],
    schema: { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: project.name, description: project.shortDescription, applicationCategory: project.type, creator: { '@type': 'Organization', name: 'Mahesh Builds', url: `${ORIGIN}/` }, url: `${ORIGIN}/work/${project.slug}` },
  })),
  ...industries.map((industry) => ({
    path: `/industries/${industry.slug}`,
    title: `${industry.title} Website & Software Development | Mahesh Builds`,
    description: `${industry.tagline} Explore practical website, application and management-system options for ${industry.title.toLowerCase()} organisations.`,
    eyebrow: 'Industry', heading: `Digital systems for ${industry.title.toLowerCase()}.`,
    paragraphs: [industry.tagline],
    lists: [
      { title: 'Problems we see', items: industry.problems },
      { title: 'What we can build', items: industry.packages.map((item) => `${item.title}: ${item.pitch}`) },
    ],
    links: [{ href: '/#contact', label: 'Discuss an industry project' }, { href: '/work', label: 'View work' }],
    schema: { '@context': 'https://schema.org', '@type': 'Service', name: `${industry.title} digital systems development`, description: industry.tagline, provider: { '@type': 'Organization', name: 'Mahesh Builds', url: `${ORIGIN}/` }, areaServed: { '@type': 'Country', name: 'India' }, url: `${ORIGIN}/industries/${industry.slug}` },
  })),
  ...servicePages.map((page) => serviceRoute(page, `/services/${page.slug}`)),
  serviceRoute(localPage, `/${localPage.slug}`, true),
];

function serviceRoute(page, path, local = false) {
  return {
    path, title: page.seoTitle, description: page.description,
    eyebrow: page.eyebrow, heading: page.headline, paragraphs: [page.intro],
    lists: [{ title: 'What the build should achieve', items: page.outcomes }, { title: 'What we can build', items: page.includes }],
    links: [{ href: '/work', label: 'View work' }, { href: '/#contact', label: 'Discuss a project' }],
    schema: [
      { '@context': 'https://schema.org', '@type': 'Service', name: page.title, description: page.description, provider: { '@type': 'Organization', name: 'Mahesh Builds', url: `${ORIGIN}/` }, areaServed: local ? [{ '@type': 'City', name: 'Pune' }, { '@type': 'Country', name: 'India' }] : { '@type': 'Country', name: 'India' }, url: `${ORIGIN}${path}` },
      { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: page.faq.map((item) => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })) },
    ],
  };
}

function esc(value = '') {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function renderContent(route) {
  const paragraphs = (route.paragraphs || []).map((text) => `<p>${esc(text)}</p>`).join('');
  const lists = (route.lists || []).map((list) => `<section><h2>${esc(list.title)}</h2><ul>${list.items.map((item) => `<li>${esc(item)}</li>`).join('')}</ul></section>`).join('');
  const links = (route.links || []).map((link) => `<a href="${esc(link.href)}">${esc(link.label)}</a>`).join(' · ');
  return `<main id="main-content" data-prerendered="true"><p>${esc(route.eyebrow)}</p><h1>${esc(route.heading)}</h1>${paragraphs}${lists}<nav aria-label="Related pages">${links}</nav></main>`;
}

function render(route) {
  const canonical = `${ORIGIN}${route.path === '/' ? '/' : route.path}`;
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(route.title)}</title>`)
    .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${esc(route.description)}" />`)
    .replace(/<meta name="robots"[^>]*>/, '<meta name="robots" content="index, follow" />')
    .replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${esc(route.title)}" />`)
    .replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${esc(route.description)}" />`)
    .replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta property="og:image"[^>]*>/, `<meta property="og:image" content="${OG_IMAGE}" />`)
    .replace(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${esc(route.title)}" />`)
    .replace(/<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${esc(route.description)}" />`)
    .replace(/<meta name="twitter:image"[^>]*>/, `<meta name="twitter:image" content="${OG_IMAGE}" />`)
    .replace(/<div id="root"><\/div>/, `<div id="root">${renderContent(route)}</div>`);

  if (route.schema) html = html.replace('</head>', `<script id="mb-route-schema" type="application/ld+json">${JSON.stringify(route.schema).replace(/</g, '\\u003c')}</script>\n  </head>`);
  return html;
}

for (const route of routes) {
  const outDir = route.path === '/' ? DIST : resolve(DIST, route.path.replace(/^\//, ''));
  if (route.path !== '/') mkdirSync(outDir, { recursive: true });
  writeFileSync(resolve(outDir, 'index.html'), render(route));
}

console.log(`[prerender] wrote ${routes.length} crawlable route snapshots.`);
