export function pickHeroImage(images = []) {
  if (!images.length) return null;
  const priority = ['screenshot', 'project-asset', 'brand-visual', 'supporting', 'external'];
  const heroes = images.filter((image) => image.type === 'hero');
  const pool = heroes.length ? heroes : images;
  return [...pool].sort((a, b) => priority.indexOf(a.source) - priority.indexOf(b.source))[0];
}

export function getCardImages(images = []) {
  const primary = pickHeroImage(images);
  if (!primary) return [];
  return [primary, ...images.filter((image) => image !== primary)];
}

export function renderTechLine(tech = {}) {
  const all = [...(tech.frontend || []), ...(tech.backend || []), ...(tech.database || [])];
  return all.length ? all.slice(0, 4).join(' · ') : '';
}
