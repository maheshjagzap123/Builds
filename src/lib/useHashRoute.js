import { useEffect, useState } from 'react';

/**
 * Minimal hash-based router.
 * Treats `#/work` as a page route ("/work").
 * Treats `#services` (no leading slash) as an in-page anchor and returns "/".
 */
function parse() {
  const raw = (window.location.hash || '').replace(/^#/, '');
  if (raw.startsWith('/')) return raw || '/';
  return '/';
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

export function navigate(to) {
  if (to.startsWith('/')) {
    window.location.hash = to === '/' ? '' : to;
  } else {
    window.location.hash = to;
  }
  window.scrollTo({ top: 0, behavior: 'auto' });
}
