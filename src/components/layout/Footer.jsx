import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const ref = useRef(null);
  const wordmarkRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordmarkRef.current,
        { yPercent: 30, letterSpacing: '-0.02em' },
        {
          yPercent: 0,
          letterSpacing: '-0.05em',
          duration: 1.4,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 80%',
            end: 'bottom bottom',
            scrub: 1,
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  const year = new Date().getFullYear();

  return (
    <footer className="footer" ref={ref}>
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <h3>Mahesh<br />Builds<em style={{ fontFamily: 'var(--font-serif)', color: 'var(--accent)' }}>.</em></h3>
            <p>
              A digital studio building websites, business software, dashboards and automation for growing businesses.
            </p>
          </div>
          <div className="footer-col">
            <h5>Studio</h5>
            <ul>
              <li><a href="#about" data-cursor="hover">About</a></li>
              <li><a href="#process" data-cursor="hover">Process</a></li>
              <li><a href="#/work" data-cursor="hover">Work</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Services</h5>
            <ul>
              <li><a href="#services" data-cursor="hover">Web Development</a></li>
              <li><a href="#services" data-cursor="hover">Business Software</a></li>
              <li><a href="#services" data-cursor="hover">Dashboards</a></li>
              <li><a href="#services" data-cursor="hover">Automation</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Contact</h5>
            <ul>
              <li><a href="mailto:hello@maheshbuilds.com" data-cursor="hover">hello@maheshbuilds.com</a></li>
              <li><a href="#contact" data-cursor="hover">Start a Project</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-wordmark" ref={wordmarkRef}>
          MAHESH BUILDS<em>.</em>
        </div>

        <div className="footer-bottom">
          <span>© {year} Mahesh Builds — All rights reserved</span>
          <span>Digital Systems Studio</span>
        </div>
      </div>
    </footer>
  );
}
