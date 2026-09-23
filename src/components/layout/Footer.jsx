import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from './Link.jsx';
import { sectionHref } from '../../lib/router.js';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const ref = useRef(null);
  const wordmarkRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordmarkRef.current,
        { yPercent: 20, opacity: 0.4 },
        {
          yPercent: 0,
          opacity: 1,
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
            <h3>Mahesh Builds</h3>
            <p>Digital Product &amp; Software Studio.</p>
            <p className="footer-sub">
              We design, build, launch and maintain websites, mobile apps and custom
              business software for growing businesses.
            </p>
          </div>
          <div className="footer-col">
            <h5>Explore</h5>
            <ul>
              <li><Link to="/work" data-cursor="hover">Work</Link></li>
              <li><Link to={sectionHref('industries')} data-cursor="hover">Industries</Link></li>
              <li><Link to="/services/website-development" data-cursor="hover">Website Development</Link></li>
              <li><Link to="/services/web-application-development" data-cursor="hover">Web Applications</Link></li>
              <li><Link to="/services/business-software-development" data-cursor="hover">Business Software</Link></li>
              <li><Link to="/services/mobile-app-development" data-cursor="hover">Mobile Apps</Link></li>
              <li><Link to="/website-development-pune" data-cursor="hover">Website Development in Pune</Link></li>
              <li><Link to={sectionHref('process')} data-cursor="hover">Process</Link></li>
              <li><Link to={sectionHref('technology')} data-cursor="hover">Technology</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Contact</h5>
            <ul>
              <li><a href="mailto:maheshjagzap03@gmail.com" data-cursor="hover">maheshjagzap03@gmail.com</a></li>
              <li><a href="tel:+917588174528" data-cursor="hover">+91 7588174528</a></li>
              <li><Link to={sectionHref('contact')} data-cursor="hover">Start a Project ↗</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-wordmark" ref={wordmarkRef}>
          MAHESH BUILDS<em>.</em>
        </div>

        <div className="footer-bottom">
          <span>© {year} Mahesh Builds. All rights reserved.</span>
          <span>Digital Product &amp; Software Studio</span>
        </div>
      </div>
    </footer>
  );
}
