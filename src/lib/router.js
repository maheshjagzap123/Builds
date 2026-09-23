import { useEffect, useState, useCallback } from 'react';

/**
 * Minimal History-API router (real crawlable paths, no framework).
 *
 * Public routes are real paths served by the SPA fallback in public/_redirects:
 *   /                         → { path: '/', params: {} }
 *   /work                     → { path: '/work', params: {} }
 *   /work/tripwise            → { path: '/work/:slug', params: { slug: 'tripwise' } }
 *   /industries/healthcare    → { path: '/industries/:slug', params: { slug: 'healthcare' } }
 *
 * On-page section links stay as URL hashes (e.g. /#contact) so in-page
 * smooth-scrolling keeps working exactly as before.
 *
 * Backwards compatibility: old hash routes (#/work, #/industries/x) are
 * transparently upgraded to real paths on first load so shared/bookmarked
 * links don't break.
 */

function parsePath(pathname) {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return { path: '/', params: {} };
  if (segments[0] === 'work' && segments[1]) {
    return { path: '/work/:slug', params: { slug: segments[1] } };
  }
  if (segments[0] === 'work') return { path: '/work', params: {} };
  if (segments[0] === 'industries' && segments[1]) {
    return { path: '/industries/:slug', params: { slug: segments[1] } };
  }
  if (segments[0] === 'services' && segments[1]) {
    return { path: '/services/:slug', params: { slug: segments[1] } };
  }
  if (segments[0] === 'website-development-pune' && segments.length === 1) {
    return { path: '/website-development-pune', params: {} };
  }
  return { path: '/404', params: { requestedPath: pathname } };
}

/** Upgrade a legacy `#/route` hash URL to a real path. Returns true if it did. */
function upgradeLegacyHash() {
  const hash = window.location.hash || '';
  if (hash.startsWith('#/')) {
    const realPath = hash.slice(1); // "#/work" -> "/work"
    window.history.replaceState({}, '', realPath);
    return true;
  }
  return false;
}

export function getRoute() {
  const anchor = (window.location.hash || '').replace(/^#/, '');
  const parsed = parsePath(window.location.pathname);
  // A hash that isn't a legacy route is treated as an on-page anchor.
  return { ...parsed, anchor: anchor.startsWith('/') ? '' : anchor };
}

/** Programmatic navigation to a real path (optionally with an #anchor). */
export function navigate(to, { replace = false } = {}) {
  const method = replace ? 'replaceState' : 'pushState';
  window.history[method]({}, '', to);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

/**
 * Build an href for an on-page section. On the home page it's a bare hash
 * (`#contact`); elsewhere it routes home first (`/#contact`).
 */
export function sectionHref(id) {
  if (typeof window === 'undefined') return `/#${id}`;
  return window.location.pathname === '/' ? `#${id}` : `/#${id}`;
}

export function useRoute() {
  const [route, setRoute] = useState(() => {
    if (typeof window !== 'undefined') upgradeLegacyHash();
    return getRoute();
  });

  useEffect(() => {
    if (upgradeLegacyHash()) setRoute(getRoute());
    const onChange = () => setRoute(getRoute());
    window.addEventListener('popstate', onChange);
    window.addEventListener('hashchange', onChange);
    return () => {
      window.removeEventListener('popstate', onChange);
      window.removeEventListener('hashchange', onChange);
    };
  }, []);

  return route;
}

/**
 * Hook returning a click handler for internal <a> links that should use the
 * History API instead of a full page reload. Falls through for modified
 * clicks, hash-only anchors and external links.
 */
export function useNavClick() {
  return useCallback((e) => {
    const a = e.currentTarget;
    const href = a.getAttribute('href') || '';
    // Let the browser handle: new-tab modifiers, hash-only anchors, external.
    if (e.defaultPrevented) return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (a.target && a.target !== '_self') return;
    if (!href.startsWith('/')) return; // hash anchors + external handled natively
    e.preventDefault();
    navigate(href);
  }, []);
}
