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
              <li><a href="#/work" data-cursor="hover">Work</a></li>
              <li><a href="#industries" data-cursor="hover">Industries</a></li>
              <li><a href="#what-we-build" data-cursor="hover">Services</a></li>
              <li><a href="#process" data-cursor="hover">Process</a></li>
              <li><a href="#technology" data-cursor="hover">Technology</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Contact</h5>
            <ul>
              <li><a href="mailto:hello@maheshbuilds.com" data-cursor="hover">hello@maheshbuilds.com</a></li>
              <li><a href="#contact" data-cursor="hover">Start a Project ↗</a></li>
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
