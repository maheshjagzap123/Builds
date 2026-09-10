import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { industries } from '../../data/industries.js';
import RevealText from '../animation/RevealText.jsx';
import FadeUp from '../animation/FadeUp.jsx';

export default function Industries() {
  const [active, setActive] = useState(0);
  const current = industries[active];

  return (
    <section className="section container industries-section" id="industries">
      <div className="section-head">
        <div>
          <span className="eyebrow">04 — Industries</span>
          <h2 className="h-section" style={{ marginTop: 24 }}>
            <RevealText>Built for</RevealText>{' '}
            <em className="serif"><RevealText delay={0.1}>different industries.</RevealText></em>
          </h2>
        </div>
        <FadeUp className="meta">
          Digital systems designed around the way your business actually works.
        </FadeUp>
      </div>

      {/* Desktop — preview: left list + right short summary + Explore CTA */}
      <div className="ind-preview">
        <ul className="ind-list" role="tablist">
          {industries.map((ind, i) => (
            <li key={ind.id}>
              <button
                type="button"
                role="tab"
                aria-selected={active === i}
                className={`ind-btn ${active === i ? 'is-active' : ''}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => { window.location.hash = `/industries/${ind.slug}`; }}
                data-cursor="hover"
              >
                <span className="ind-btn-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="ind-btn-title">{ind.title}</span>
                <span className="ind-btn-arrow" aria-hidden="true">↗</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="ind-preview-panel" key={current.id}>
          <span className="eyebrow">{String(active + 1).padStart(2, '0')} · {current.title}</span>
          <h3 className="ind-preview-title">{current.tagline}</h3>

          <div className="ind-preview-packages">
            {current.packages.map((p) => (
              <div key={p.num} className="ipp-row">
                <span className="ipp-num">{p.num}</span>
                <span className="ipp-title">{p.title}</span>
              </div>
            ))}
          </div>

          <a href={`#/industries/${current.slug}`} className="ind-cta" data-cursor="hover">
            Explore {current.title}
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>

      {/* Mobile — simple list of preview cards */}
      <ul className="ind-mobile">
        {industries.map((ind, i) => (
          <li key={ind.id}>
            <a href={`#/industries/${ind.slug}`} className="ind-mobile-card" data-cursor="hover">
              <span className="ind-mobile-num">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3>{ind.title}</h3>
                <p>{ind.tagline}</p>
              </div>
              <ArrowUpRight size={18} />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
