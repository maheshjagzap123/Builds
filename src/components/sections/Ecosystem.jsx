import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ecosystem } from '../../data/services.js';
import RevealText from '../animation/RevealText.jsx';
import FadeUp from '../animation/FadeUp.jsx';

gsap.registerPlugin(ScrollTrigger);

export default function Ecosystem() {
  const rootRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      // Just show them all
      rootRef.current?.querySelectorAll('.eco-node').forEach((n) => n.classList.add('is-active'));
      return;
    }

    const ctx = gsap.context(() => {
      const nodes = gsap.utils.toArray('.eco-node');
      const line = rootRef.current.querySelector('.eco-line-fill');

      // Progressive activation as user scrolls through the section.
      ScrollTrigger.create({
        trigger: rootRef.current,
        start: 'top 65%',
        end: 'bottom 55%',
        scrub: 0.6,
        onUpdate: (self) => {
          const p = self.progress;
          if (line) line.style.transform = `scaleY(${p})`;
          nodes.forEach((n, i) => {
            const step = (i + 1) / nodes.length;
            if (p >= step - 0.08) n.classList.add('is-active');
            else n.classList.remove('is-active');
          });
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section eco-section" id="ecosystem" ref={rootRef}>
      <div className="container">
        <div className="section-head">
          <h2 className="h-section">
            <RevealText>From idea</RevealText>{' '}
            <em className="serif"><RevealText delay={0.1}>to growth.</RevealText></em>
          </h2>
          <FadeUp className="meta">
            A business idea becomes a website, an application, a connected system, a mobile
            experience and an automated workflow — all working together.
          </FadeUp>
        </div>

        <div className="eco-diagram">
          <div className="eco-line" aria-hidden="true">
            <div className="eco-line-fill" />
          </div>
          <ul className="eco-nodes">
            {ecosystem.map((n, i) => (
              <li key={n.id} className="eco-node">
                <span className="eco-node-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="eco-node-label">{n.label}</span>
                <span className="eco-node-hint">{n.hint}</span>
                <span className="eco-node-dot" aria-hidden="true" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
