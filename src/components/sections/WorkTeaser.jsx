import { activeProjects } from '../../data/projects.js';
import RevealText from '../animation/RevealText.jsx';
import FadeUp from '../animation/FadeUp.jsx';
import MagneticButton from '../animation/MagneticButton.jsx';
import { ArrowUpRight } from 'lucide-react';

export default function WorkTeaser() {
  const solo = activeProjects.length === 1 ? activeProjects[0] : null;
  const list = activeProjects.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="section container work-teaser" id="work-teaser">
      <div className="section-head">
        <div>
          <span className="eyebrow">05 — Work</span>
          <h2 className="h-section" style={{ marginTop: 24 }}>
            <RevealText>What we've built.</RevealText>
          </h2>
        </div>
        <FadeUp className="meta">
          Real digital products, websites and business systems we've designed and developed.
        </FadeUp>
      </div>

      {solo ? (
        <a href="#/work" className="solo-card" data-cursor="view" data-cursor-label="View">
          <div className="solo-media">
            <img src={solo.cover} alt={solo.title} loading="lazy" />
            <span className="solo-tag">{solo.label}</span>
          </div>
          <div className="solo-body">
            <div className="solo-meta">
              <span>{solo.number}</span>
              <span>{solo.categories?.join(' · ')}</span>
              {solo.industry && <span>{solo.industry}</span>}
            </div>
            <h3 className="solo-title">{solo.title}</h3>
            <p className="solo-desc">{solo.shortDescription}</p>
            <span className="solo-cta">
              View Case Study
              <ArrowUpRight size={18} />
            </span>
          </div>
        </a>
      ) : list.length === 0 ? (
        <FadeUp className="body-lg" style={{ textAlign: 'center', padding: '40px 0' }}>
          Case studies coming soon.
        </FadeUp>
      ) : (
        <div className="teaser-grid">
          {list.map((p) => (
            <a
              key={p.id}
              href="#/work"
              className="teaser-card"
              data-cursor="view"
              data-cursor-label="View"
            >
              <div className="teaser-media">
                <img src={p.cover} alt={p.title} loading="lazy" />
                <span className="teaser-tag">{p.label}</span>
              </div>
              <div className="teaser-body">
                <div className="teaser-meta">
                  <span>{p.number}</span>
                  <span>{p.categories?.[0] || p.industry}</span>
                </div>
                <h3>{p.title}</h3>
              </div>
            </a>
          ))}
        </div>
      )}

      <div className="teaser-cta">
        <MagneticButton href="#/work" className="btn btn-ghost" data-cursor-label="View">
          View All Work <span className="arrow">↗</span>
        </MagneticButton>
      </div>
    </section>
  );
}
