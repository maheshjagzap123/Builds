import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../../data/projects.js';
import RevealText from '../animation/RevealText.jsx';
import FadeUp from '../animation/FadeUp.jsx';
import CaseStudyModal from './CaseStudyModal.jsx';

gsap.registerPlugin(ScrollTrigger);

export default function SelectedWork() {
  const rootRef = useRef(null);
  const [active, setActive] = useState(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.work-item').forEach((item) => {
        const img = item.querySelector('.work-media img');
        const text = item.querySelectorAll('.work-text > *');

        gsap.fromTo(
          img,
          { scale: 1.25, yPercent: 8 },
          {
            scale: 1.05,
            yPercent: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              end: 'bottom 15%',
              scrub: 1,
            },
          }
        );

        gsap.from(text, {
          y: 60,
          opacity: 0,
          duration: 0.9,
          ease: 'expo.out',
          stagger: 0.07,
          scrollTrigger: { trigger: item, start: 'top 75%', once: true },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section" id="work" ref={rootRef}>
      <div className="container">
        <div className="section-head">
          <h2 className="h-section">
            <RevealText>Selected work.</RevealText>
          </h2>
          <FadeUp className="meta">
            Digital products, websites and systems built to solve real business problems.
          </FadeUp>
        </div>
      </div>

      {projects.map((p, i) => (
        <article key={p.id} className="work-item">
          <div className="container">
            <div className={`work-inner ${i % 2 === 1 ? 'reverse' : ''}`}>
              <div className="work-text">
                <div className="work-num">{p.number} — {p.category}</div>
                <h3 className="work-title">{p.title}</h3>
                <p className="work-desc">{p.description}</p>
                <div className="work-meta">
                  <div>
                    <span>Services</span>
                    <p>{p.services.join(' · ')}</p>
                  </div>
                  <div>
                    <span>Stack</span>
                    <p>{p.technologies.join(' · ')}</p>
                  </div>
                </div>
                <button
                  className="work-cta"
                  onClick={() => setActive(p)}
                  data-cursor="hover"
                  data-cursor-label="Open"
                >
                  View Case Study <span>↗</span>
                </button>
              </div>
              <div
                className="work-media"
                data-label={p.label}
                data-cursor="hover"
                data-cursor-label="View"
                onClick={() => setActive(p)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') setActive(p); }}
              >
                <img src={p.cover} alt={p.title} loading="lazy" />
              </div>
            </div>
          </div>
        </article>
      ))}

      <CaseStudyModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
