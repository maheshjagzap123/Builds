import { useEffect } from 'react';

const SITE = {
  name: 'Mahesh Builds',
  origin: 'https://maheshbuilds.com',
  defaultTitle: 'Mahesh Builds — Website & Software Development Studio in India',
  defaultDescription: 'Websites, web apps, mobile apps and custom business software for Indian businesses and institutes — designed, built and maintained end-to-end.',
  defaultOgImage: '/assets/img/og-default.png',
};

function setMeta(selector, attr, value) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    const [, key, name] = selector.match(/\[(name|property)="(.+)"\]/) || [];
    if (key && name) el.setAttribute(key, name);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function useDocumentMeta(meta = {}) {
  const title = meta.title || SITE.defaultTitle;
  const description = meta.description || SITE.defaultDescription;
  const path = meta.path || (typeof window !== 'undefined' ? window.location.pathname : '/');
  const canonical = meta.canonical || `${SITE.origin}${path === '/' ? '/' : path}`;
  const image = meta.ogImage || SITE.defaultOgImage;
  const absoluteImage = image.startsWith('http') ? image : `${SITE.origin}${image}`;
  const robots = meta.robots || 'index, follow';
  const schemaKey = JSON.stringify(meta.schema || []);

  useEffect(() => {
    document.title = title;
    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[name="robots"]', 'content', robots);
    setLink('canonical', canonical);

    setMeta('meta[property="og:title"]', 'content', meta.ogTitle || title);
    setMeta('meta[property="og:description"]', 'content', meta.ogDescription || description);
    setMeta('meta[property="og:url"]', 'content', canonical);
    setMeta('meta[property="og:image"]', 'content', absoluteImage);
    setMeta('meta[property="og:image:width"]', 'content', '1200');
    setMeta('meta[property="og:image:height"]', 'content', '630');
    setMeta('meta[property="og:type"]', 'content', meta.ogType || 'website');

    setMeta('meta[name="twitter:title"]', 'content', meta.ogTitle || title);
    setMeta('meta[name="twitter:description"]', 'content', meta.ogDescription || description);
    setMeta('meta[name="twitter:image"]', 'content', absoluteImage);

    let schemaNode = document.getElementById('mb-route-schema');
    const parsedSchema = JSON.parse(schemaKey);
    const schemas = Array.isArray(parsedSchema) ? parsedSchema : [parsedSchema];
    if (schemas.length) {
      if (!schemaNode) {
        schemaNode = document.createElement('script');
        schemaNode.id = 'mb-route-schema';
        schemaNode.type = 'application/ld+json';
        document.head.appendChild(schemaNode);
      }
      schemaNode.textContent = JSON.stringify(schemas.length === 1 ? schemas[0] : schemas);
    } else {
      schemaNode?.remove();
    }
  }, [title, description, canonical, absoluteImage, robots, schemaKey, meta.ogTitle, meta.ogDescription, meta.ogType]);
}

export { SITE };
