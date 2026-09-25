import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle.jsx';
import Link from './Link.jsx';
import { sectionHref } from '../../lib/router.js';

// `page: true` = real route (History API); otherwise an on-page section anchor.
const LINKS = [
  { href: '/work', label: 'Work', page: true },
  { href: 'industries', label: 'Industries' },
  { href: '/services/website-development', label: 'Services', page: true },
  { href: 'process', label: 'Process' },
  { href: 'technology', label: 'Technology' },
  { href: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close the mobile menu on Escape for keyboard accessibility.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <nav className={`nav ${scrolled ? 'scrolled' : ''} ${open ? 'menu-open' : ''}`}>
        <div className="nav-inner">
          <Link to="/" className="nav-logo" data-cursor="hover" onClick={close} aria-label="Mahesh Builds home">
            <img className="nav-logo-image" src="/assets/img/mahesh-builds-logo.png" alt="" width="512" height="384" decoding="async" />
            <span className="nav-logo-text">MAHESH BUILDS</span>
          </Link>
          <ul className="nav-links">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link to={l.page ? l.href : sectionHref(l.href)} data-cursor="hover">{l.label}</Link>
              </li>
            ))}
          </ul>
          <div className="nav-actions">
            <ThemeToggle className="nav-theme" />
            <Link to={sectionHref('contact')} className="nav-cta" data-cursor="hover">
              Start a Project ↗
            </Link>
          </div>
          <ThemeToggle className="nav-theme-mobile" />
          <button
            className={`nav-burger ${open ? 'open' : ''}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${open ? 'open' : ''}`} aria-hidden={!open}>
        <ul>
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link to={l.page ? l.href : sectionHref(l.href)} onClick={close} tabIndex={open ? 0 : -1}>{l.label}</Link>
            </li>
          ))}
        </ul>
        <Link to={sectionHref('contact')} className="mobile-menu-cta" onClick={close} tabIndex={open ? 0 : -1}>
          Start a Project ↗
        </Link>
        <div className="mobile-menu-footer">
          <span>Mahesh Builds</span>
          <ThemeToggle className="mobile-theme" />
        </div>
      </div>
    </>
  );
}
