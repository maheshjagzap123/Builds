import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import MagneticButton from '../animation/MagneticButton.jsx';

export default function Hero({ loaded = true }) {
  const rootRef = useRef(null);

  useEffect(() => {
    if (!loaded || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-headline .word > span', { yPercent: 110 }, { yPercent: 0, duration: 0.9, ease: 'expo.out', stagger: 0.045 });
      gsap.fromTo('.hero-top, .hero-bottom, .hero-scroll', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.65, ease: 'expo.out', stagger: 0.08, delay: 0.35 });
    }, rootRef);
    return () => ctx.revert();
  }, [loaded]);

  return (
    <section ref={rootRef} className="hero" id="top" aria-labelledby="hero-heading">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-atmosphere" aria-hidden="true">
        <span className="hero-orbit hero-orbit-one" />
        <span className="hero-orbit hero-orbit-two" />
        <span className="hero-star hero-star-one" />
        <span className="hero-star hero-star-two" />
        <span className="hero-star hero-star-three" />
      </div>

      <div className="container hero-content">
        <div className="hero-top">
          <span className="eyebrow">Website &amp; Software Development Studio</span>
          <span className="location">Pune · India · Available Worldwide</span>
        </div>

        <h1 className="hero-headline" id="hero-heading">
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
          <p className="hero-sub">Websites, web applications, mobile apps and custom business software — designed to help businesses attract customers, simplify operations and grow.</p>
          <div className="hero-ctas">
            <MagneticButton href="#contact" className="btn" data-cursor-label="Start">Start a Project <span className="arrow">↗</span></MagneticButton>
            <MagneticButton href="/work" className="btn btn-ghost">View Our Work</MagneticButton>
          </div>
        </div>
      </div>

      <div className="hero-scroll" aria-hidden="true">Scroll</div>
    </section>
  );
}
