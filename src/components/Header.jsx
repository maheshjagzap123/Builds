import { useEffect, useState } from 'react'

export default function Header() {
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute('data-theme') || 'dark'
  )
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  const closeMenu = () => setMobileOpen(false)

  return (
    <header id="header" className={scrolled ? 'scrolled' : ''}>
      <div className="header-container">
        <a href="#hero" className="logo" aria-label="Home">
          <span className="logo-text">
            MAHESH BUILDS<span className="logo-apple"> </span>
          </span>
        </a>

        <nav id="navbar" className={mobileOpen ? 'open' : ''} aria-label="Main navigation">
          <ul>
            <li><a href="#hero" className="nav-link" onClick={closeMenu}>Home</a></li>
            <li><a href="#services" className="nav-link" onClick={closeMenu}>Services</a></li>
            <li><a href="#process" className="nav-link" onClick={closeMenu}>Process</a></li>
            <li><a href="#about" className="nav-link" onClick={closeMenu}>About</a></li>
            <li><a href="#contact" className="nav-link" onClick={closeMenu}>Contact</a></li>
          </ul>
        </nav>

        <div className="header-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            <span className="theme-toggle-track">
              <i className="bi bi-sun-fill theme-icon-sun" aria-hidden="true"></i>
              <i className="bi bi-moon-fill theme-icon-moon" aria-hidden="true"></i>
              <span className="theme-toggle-thumb"></span>
            </span>
          </button>
          <a href="#contact" className="btn-cta-header">Start a Project</a>
          <button
            className={`mobile-nav-toggle ${mobileOpen ? 'open' : ''}`}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
  )
}
