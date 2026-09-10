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
    const ctx = gsap.context(() => {
      gsap.from('.process-step', {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.1,
        scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="process container" id="process" ref={ref}>
      <div className="section-head">
        <h2 className="h-section">
          <RevealText>From idea</RevealText>{' '}
          <em className="serif"><RevealText delay={0.1}>to launch.</RevealText></em>
        </h2>
        <FadeUp className="meta">
          A clear process — from the first conversation to production, and everything after.
        </FadeUp>
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
    </section>
  );
}
