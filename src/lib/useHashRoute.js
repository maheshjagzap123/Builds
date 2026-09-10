import { useEffect, useState } from 'react';

/**
 * Minimal hash-based router.
 *   #/work                 → { path: '/work', params: {} }
 *   #/industries/healthcare → { path: '/industries/:slug', params: { slug: 'healthcare' } }
 *   #services               → { path: '/', params: {}, anchor: 'services' }
 *   (empty)                 → { path: '/', params: {} }
 */
function parse() {
  const raw = (window.location.hash || '').replace(/^#/, '');
  if (!raw) return { path: '/', params: {}, anchor: '' };

  if (raw.startsWith('/')) {
    // Page route
    const segments = raw.split('/').filter(Boolean);
    if (segments.length === 0) return { path: '/', params: {} };
    if (segments[0] === 'industries' && segments[1]) {
      return { path: '/industries/:slug', params: { slug: segments[1] } };
    }
    if (segments[0] === 'work') {
      return { path: '/work', params: {} };
    }
    return { path: '/' + segments.join('/'), params: {} };
  }

  return { path: '/', params: {}, anchor: raw };
}

export function useHashRoute() {
  const [route, setRoute] = useState(parse());
  useEffect(() => {
    const onHash = () => setRoute(parse());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return route;
}
