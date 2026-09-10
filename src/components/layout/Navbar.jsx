import { useEffect, useState } from 'react';

const LINKS = [
  { href: '#what-we-build', label: 'What We Build' },
  { href: '#solutions', label: 'Solutions' },
  { href: '#/work', label: 'Projects' },
  { href: '#process', label: 'Process' },
  { href: '#faq', label: 'FAQ' },
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

  const close = () => setOpen(false);

  return (
    <>
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <a href="#/" className="nav-logo" data-cursor="hover">
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
          <div className="nav-cta-group">
            <a href="#/work" className="nav-cta nav-cta-secondary" data-cursor="hover">
              View Work ↗
            </a>
            <a href="#contact" className="nav-cta" data-cursor="hover">
              Start a Project ↗
            </a>
          </div>
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
              <a href={l.href} onClick={close}>{l.label}</a>
            </li>
          ))}
        </ul>
        <div className="mobile-menu-footer">
          <span>Mahesh Builds</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </>
  );
}
