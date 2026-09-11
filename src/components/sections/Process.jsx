import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { processSteps } from '../../data/services.js';
import RevealText from '../animation/RevealText.jsx';
import FadeUp from '../animation/FadeUp.jsx';

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
  const ref = useRef(null);
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const isMobile = window.matchMedia('(max-width: 1024px)').matches;

    const ctx = gsap.context(() => {
      const line = ref.current.querySelector('.process-line-fill');
      const steps = gsap.utils.toArray('.process-step');

      if (!isMobile) {
        ScrollTrigger.create({
          trigger: ref.current,
          start: 'top 70%',
          end: 'bottom 60%',
          scrub: 0.6,
          onUpdate: (self) => {
            if (line) line.style.transform = `scaleX(${self.progress})`;
            steps.forEach((s, i) => {
              const step = (i + 1) / steps.length;
              if (self.progress >= step - 0.08) s.classList.add('is-active');
              else s.classList.remove('is-active');
            });
          },
        });
      } else {
        steps.forEach((s) => s.classList.add('is-active'));
      }

      // Per-step reveal so it always fires, even far below the fold.
      steps.forEach((s) => {
        gsap.from(s, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: 'expo.out',
          scrollTrigger: { trigger: s, start: 'top 92%', once: true },
        });
      });

      ScrollTrigger.refresh();
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section process container" id="process" ref={ref}>
      <div className="section-head">
        <div>
          <span className="eyebrow">10 — How we build</span>
          <h2 className="h-section" style={{ marginTop: 24 }}>
            <RevealText>How we</RevealText>{' '}
            <em className="serif"><RevealText delay={0.1}>work.</RevealText></em>
          </h2>
        </div>
        <FadeUp className="meta">
          A clear lifecycle — from the first conversation to production, and everything after.
        </FadeUp>
      </div>

      <div className="process-timeline">
        <div className="process-line" aria-hidden="true">
          <div className="process-line-fill" />
        </div>
        <div className="process-grid">
          {processSteps.map((s) => (
            <div key={s.n} className="process-step">
              <span className="p-num">{s.n}</span>
              <h4>{s.title}</h4>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
