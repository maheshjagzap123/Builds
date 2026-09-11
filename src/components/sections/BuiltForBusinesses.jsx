import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { businessStages } from '../../data/services.js';
import RevealText from '../animation/RevealText.jsx';
import FadeUp from '../animation/FadeUp.jsx';

gsap.registerPlugin(ScrollTrigger);

/**
 * BUILT FOR BUSINESSES THAT ARE READY TO MOVE.
 * Business *stage* (where a business is), distinct from Industries (who it is).
 * Editorial rows, not a card grid — matches the site's list-led language.
 */
export default function BuiltForBusinesses() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.bfb-row').forEach((row) => {
        gsap.from(row.querySelectorAll('.bfb-num, .bfb-title, .bfb-q, .bfb-text'), {
          y: 36,
          opacity: 0,
          duration: 0.8,
          ease: 'expo.out',
          stagger: 0.06,
          scrollTrigger: { trigger: row, start: 'top 90%', once: true },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section container bfb-section" id="built-for-businesses" ref={ref}>
      <div className="section-head">
        <div>
          <span className="eyebrow">04 — Who we build for</span>
          <h2 className="h-section">
            <RevealText>Built for businesses</RevealText>{' '}
            <em className="serif"><RevealText delay={0.1}>that are ready to move.</RevealText></em>
          </h2>
        </div>
        <FadeUp className="meta">
          Wherever your business is right now, there's a next step. We build the digital
          products and systems that get you there.
        </FadeUp>
      </div>

      <div className="bfb-list">
        {businessStages.map((s) => (
          <div key={s.num} className="bfb-row">
            <span className="bfb-num">{s.num}</span>
            <div className="bfb-main">
              <h3 className="bfb-title">{s.title}</h3>
              <p className="bfb-q">{s.question}</p>
            </div>
            <p className="bfb-text">{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
