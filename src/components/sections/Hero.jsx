import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import MagneticButton from '../animation/MagneticButton.jsx';

const HeroScene = lazy(() => import('../three/HeroScene.jsx'));

export default function Hero({ loaded = true }) {
  const rootRef = useRef(null);
  const [webglReady, setWebglReady] = useState(false);

  // Load WebGL only on desktop, only after the preloader has handed off.
  useEffect(() => {
    if (!loaded) return;
    const isSmall = window.matchMedia('(max-width: 768px)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isSmall && !reduced) {
      const t = setTimeout(() => setWebglReady(true), 400);
      return () => clearTimeout(t);
    }
  }, [loaded]);

  // Run the entrance animation when the Hero becomes visible (post-preloader),
  // so the headline reveal isn't wasted behind the intro overlay.
  useEffect(() => {
    if (!loaded) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-headline .word > span',
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.2,
          ease: 'expo.out',
          stagger: 0.07,
          delay: 0.1,
        }
      );
      gsap.fromTo(
        '.hero-top, .hero-bottom, .hero-scroll',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out', stagger: 0.1, delay: 0.7 }
      );
    }, rootRef);
    return () => ctx.revert();
  }, [loaded]);

  return (
    <section ref={rootRef} className="hero" id="top">
      <div className="hero-grid" aria-hidden="true" />
      {webglReady && (
        <div className="hero-canvas" aria-hidden="true">
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </div>
      )}

      <div className="container hero-content">
        <div className="hero-top">
          <span className="eyebrow">Digital Product &amp; Software Studio</span>
          <span className="location">India · Available Worldwide</span>
        </div>

        <h1 className="hero-headline">
          <span className="word"><span>We&nbsp;</span></span>
          <span className="word"><span>build&nbsp;</span></span>
          <span className="word"><span><em>digital</em>&nbsp;</span></span>
          <span className="word"><span>products</span></span>
          <br />
          <span className="word"><span>that&nbsp;</span></span>
          <span className="word"><span>move&nbsp;</span></span>
          <span className="word"><span>business&nbsp;</span></span>
          <span className="word"><span><em>forward.</em></span></span>
        </h1>

        <div className="hero-bottom">
          <p className="hero-sub">
            Websites, web applications, mobile apps and custom business software — designed to help
            businesses attract customers, simplify operations and grow.
          </p>
          <div className="hero-ctas">
            <MagneticButton href="#contact" className="btn" data-cursor-label="Start">
              Start a Project <span className="arrow">↗</span>
            </MagneticButton>
            <MagneticButton href="#work-teaser" className="btn btn-ghost">
              View What We've Built ↓
            </MagneticButton>
          </div>
        </div>
      </div>

      <div className="hero-scroll">Scroll</div>
    </section>
  );
}
