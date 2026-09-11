import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle.jsx';

const LINKS = [
  { href: '#/work', label: 'Work' },
  { href: '#industries', label: 'Industries' },
  { href: '#what-we-build', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#technology', label: 'Technology' },
  { href: '#contact', label: 'Contact' },
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
          <a href="#/" className="nav-logo" data-cursor="hover" onClick={close}>
            <span className="dot" />
            MAHESH BUILDS
          </a>
          <ul className="nav-links">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} data-cursor="hover">{l.label}</a>
              </li>
            ))}
          </ul>
          <div className="nav-actions">
            <ThemeToggle className="nav-theme" />
            <a href="#contact" className="nav-cta" data-cursor="hover">
              Start a Project ↗
            </a>
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
              <a href={l.href} onClick={close} tabIndex={open ? 0 : -1}>{l.label}</a>
            </li>
          ))}
        </ul>
        <a href="#contact" className="mobile-menu-cta" onClick={close} tabIndex={open ? 0 : -1}>
          Start a Project ↗
        </a>
        <div className="mobile-menu-footer">
          <span>Mahesh Builds</span>
          <ThemeToggle className="mobile-theme" />
        </div>
      </div>
    </>
  );
}
