import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import MagneticButton from '../animation/MagneticButton.jsx';

const HeroScene = lazy(() => import('../three/HeroScene.jsx'));

export default function Hero() {
  const rootRef = useRef(null);
  const [webglReady, setWebglReady] = useState(false);

  useEffect(() => {
    // Only load WebGL on desktop and after preloader
    const isSmall = window.matchMedia('(max-width: 768px)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isSmall && !reduced) {
      const t = setTimeout(() => setWebglReady(true), 400);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
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
          delay: 0.2,
        }
      );
      gsap.fromTo(
        '.hero-top, .hero-bottom, .hero-scroll',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out', stagger: 0.1, delay: 0.9 }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

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
          <span className="eyebrow">Digital Systems Studio</span>
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
            Websites, mobile apps, business software, automation and digital experiences — designed,
            built and maintained for growing businesses.
          </p>
          <div className="hero-ctas">
            <MagneticButton href="#contact" className="btn" data-cursor-label="Start">
              Start a Project <span className="arrow">↗</span>
            </MagneticButton>
            <MagneticButton href="#what-we-build" className="btn btn-ghost">
              Explore What We Build ↓
            </MagneticButton>
          </div>
        </div>
      </div>

      <div className="hero-scroll">Scroll</div>
    </section>
  );
}
