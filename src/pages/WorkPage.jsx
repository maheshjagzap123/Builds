import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/projects.js';
import RevealText from '../components/animation/RevealText.jsx';
import FadeUp from '../components/animation/FadeUp.jsx';
import MagneticButton from '../components/animation/MagneticButton.jsx';
import CaseStudyModal from '../components/sections/CaseStudyModal.jsx';

gsap.registerPlugin(ScrollTrigger);

export default function WorkPage() {
  const rootRef = useRef(null);
  const [active, setActive] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.work-card').forEach((card) => {
        const img = card.querySelector('img');
        gsap.fromTo(
          img,
          { scale: 1.2 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: { trigger: card, start: 'top 90%', end: 'bottom 20%', scrub: 1 },
          }
        );
        gsap.from(card.querySelectorAll('.work-card-text > *'), {
          y: 30,
          opacity: 0,
          duration: 0.9,
          ease: 'expo.out',
          stagger: 0.06,
          scrollTrigger: { trigger: card, start: 'top 85%', once: true },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, [filter]);

  const categories = ['all', ...new Set(projects.map((p) => p.category.split(' /')[0].trim()))];
  const visible = filter === 'all' ? projects : projects.filter((p) => p.category.startsWith(filter));

  return (
    <div className="work-page" ref={rootRef}>
      <section className="work-hero container">
        <span className="eyebrow">Selected Work</span>
        <h1 className="work-hero-title">
          <RevealText>Digital products,</RevealText>
          <br />
          <em className="serif"><RevealText delay={0.1}>built end-to-end.</RevealText></em>
        </h1>
        <FadeUp className="body-lg" delay={0.15}>
          A mix of live client builds and concept projects — each shaped around a real business problem.
        </FadeUp>

        <div className="work-filters">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`work-filter ${filter === c ? 'active' : ''}`}
              data-cursor="hover"
            >
              {c === 'all' ? 'All Projects' : c}
            </button>
          ))}
        </div>
      </section>

      <section className="work-grid container">
        {visible.map((p) => (
          <article key={p.id} className="work-card" onClick={() => setActive(p)} data-cursor="view" data-cursor-label="View">
            <div className="work-card-media">
              <img src={p.cover} alt={p.title} loading="lazy" />
              <span className="work-card-tag">{p.label}</span>
            </div>
            <div className="work-card-text">
              <div className="work-card-meta">
                <span>{p.number}</span>
                <span>{p.category}</span>
              </div>
              <h3>{p.title}</h3>
              <p>{p.tagline}</p>
              <div className="work-card-tech">
                {p.technologies.slice(0, 4).map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <span className="work-card-cta">View Case Study <span className="arrow">↗</span></span>
            </div>
          </article>
        ))}
      </section>

      <section className="work-cta container">
        <h2 className="h-section">
          <RevealText>Have something</RevealText>{' '}
          <em className="serif"><RevealText delay={0.1}>to build?</RevealText></em>
        </h2>
        <div style={{ marginTop: 30, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <MagneticButton href="#contact" className="btn">
            Start a Project <span className="arrow">↗</span>
          </MagneticButton>
          <MagneticButton href="#/" className="btn btn-ghost">
            Back to Home
          </MagneticButton>
        </div>
      </section>

      <CaseStudyModal project={active} onClose={() => setActive(null)} />
    </div>
  );
}
