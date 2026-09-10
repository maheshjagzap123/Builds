export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer id="footer">
      <div className="container">
        <div className="footer-layout">
          <div className="footer-brand-col">
            <a href="#hero" className="footer-logo" aria-label="Home">
              MAHESH BUILDS<span className="footer-apple"> </span>
            </a>
            <p className="footer-tagline">Build. Create. Improve.</p>
          </div>

          <div className="footer-links-col">
            <h4>Services</h4>
            <ul>
              <li><a href="#services">Full Website + Backend</a></li>
              <li><a href="#services">Mobile App Development</a></li>
              <li><a href="#services">Website Design</a></li>
              <li><a href="#services">Landing Pages</a></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4>Connect</h4>
            <ul>
              <li><a href="#contact">Start a Project</a></li>
              <li><a href="#about">About</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {year} MAHESH BUILDS. All Rights Reserved.</p>
          <p>Websites · Mobile Apps · Backend Development</p>
        </div>
      </div>
    </footer>
  )
}
