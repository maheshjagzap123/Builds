import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ecosystem } from '../../data/services.js';
import RevealText from '../animation/RevealText.jsx';
import FadeUp from '../animation/FadeUp.jsx';

gsap.registerPlugin(ScrollTrigger);

export default function Ecosystem() {
  const rootRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      rootRef.current?.querySelectorAll('.eco-node').forEach((n) => n.classList.add('is-active'));
      return;
    }

    const ctx = gsap.context(() => {
      const nodes = gsap.utils.toArray('.eco-node');
      const line = rootRef.current.querySelector('.eco-line-fill');

      ScrollTrigger.create({
        trigger: rootRef.current,
        start: 'top 55%',
        end: 'bottom 65%',
        scrub: 0.6,
        onUpdate: (self) => {
          const p = self.progress;
          if (line) line.style.transform = `scaleY(${p})`;

          let latest = 0;
          nodes.forEach((n, i) => {
            const step = (i + 1) / nodes.length;
            if (p >= step - 0.08) {
              n.classList.add('is-active');
              latest = i;
            } else {
              n.classList.remove('is-active');
            }
          });
          setActive(latest);
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const current = ecosystem[active];

  return (
    <section className="section eco-section" id="ecosystem" ref={rootRef}>
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">07 — From idea to growth</span>
            <h2 className="h-section" style={{ marginTop: 24 }}>
              <RevealText>From idea</RevealText>{' '}
              <em className="serif"><RevealText delay={0.1}>to growth.</RevealText></em>
            </h2>
          </div>
          <FadeUp className="meta">
            A business idea becomes a website, an application, a connected system, a mobile experience
            and an automated workflow — all working together.
          </FadeUp>
        </div>

        <div className="eco-layout">
          <div className="eco-diagram">
            <div className="eco-line" aria-hidden="true">
              <div className="eco-line-fill" />
            </div>
            <ul className="eco-nodes">
              {ecosystem.map((n, i) => (
                <li
                  key={n.id}
                  className={`eco-node ${i === active ? 'is-focus' : ''}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  tabIndex={0}
                >
                  <span className="eco-node-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="eco-node-label">{n.label}</span>
                  <span className="eco-node-dot" aria-hidden="true" />
                </li>
              ))}
            </ul>
          </div>

          <aside className="eco-panel" key={current.id}>
            <span className="eyebrow">Step {String(active + 1).padStart(2, '0')} · {current.label}</span>
            <p className="eco-panel-text">{current.hint}</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
