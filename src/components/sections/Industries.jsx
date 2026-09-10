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
        <h2 className="h-section">
          <RevealText>Built for</RevealText>{' '}
          <em className="serif"><RevealText delay={0.1}>different industries.</RevealText></em>
        </h2>
        <FadeUp className="meta">
          Different businesses have different workflows. We build digital systems around
          the way each business actually operates.
        </FadeUp>
      </div>

      {/* Desktop split explorer */}
      <div className="ind-explorer">
        <ul className="ind-list" role="tablist">
          {industries.map((ind, i) => (
            <li key={ind.id}>
              <button
                type="button"
                role="tab"
                aria-selected={active === i}
                className={`ind-btn ${active === i ? 'is-active' : ''}`}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                data-cursor="hover"
              >
                <span className="ind-btn-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="ind-btn-title">{ind.title}</span>
                <span className="ind-btn-arrow" aria-hidden="true">↗</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="ind-panel" key={current.id}>
          <div className="ind-panel-head">
            <span className="eyebrow">{String(active + 1).padStart(2, '0')} · {current.title}</span>
            <h3 className="ind-panel-title">{current.tagline}</h3>
          </div>

          <div className="ind-panel-problems">
            <div className="ind-subheading">Common problems</div>
            <ul>
              {current.problems.map((p) => (<li key={p}>{p}</li>))}
            </ul>
          </div>

          <div className="ind-panel-packages">
            <div className="ind-subheading">Solution packages</div>
            <ol>
              {current.packages.map((p) => (
                <li key={p.num}>
                  <span className="ip-num">{p.num}</span>
                  <span className="ip-title">{p.title}</span>
                  <span className="ip-pitch">{p.pitch}</span>
                </li>
              ))}
            </ol>
          </div>

          <a href={`#/industries/${current.slug}`} className="ind-cta" data-cursor="hover">
            Explore {current.title}
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>

      {/* Mobile accordion */}
      <div className="ind-accordion">
        {industries.map((ind, i) => {
          const isOpen = active === i;
          return (
            <div key={ind.id} className={`ind-acc-row ${isOpen ? 'is-open' : ''}`}>
              <button
                type="button"
                className="ind-acc-head"
                onClick={() => setActive(isOpen ? -1 : i)}
                aria-expanded={isOpen}
              >
                <span className="ind-btn-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="ind-btn-title">{ind.title}</span>
                <span className="ind-plus" aria-hidden="true"><span /><span /></span>
              </button>
              <div className="ind-acc-body">
                <div className="ind-acc-body-inner">
                  <p className="ind-acc-tagline">{ind.tagline}</p>
                  <ul className="ind-acc-list">
                    {ind.packages.map((p) => (
                      <li key={p.num}>
                        <span className="ip-num">{p.num}</span>
                        <div>
                          <div className="ip-title">{p.title}</div>
                          <div className="ip-pitch">{p.pitch}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <a href={`#/industries/${ind.slug}`} className="ind-cta" data-cursor="hover">
                    Explore {ind.title} <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
