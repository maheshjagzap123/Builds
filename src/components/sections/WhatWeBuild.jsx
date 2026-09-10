import { useState } from 'react';
import { whatWeBuild } from '../../data/services.js';
import RevealText from '../animation/RevealText.jsx';
import FadeUp from '../animation/FadeUp.jsx';

export default function WhatWeBuild() {
  const [open, setOpen] = useState(0);

  return (
    <section className="section container" id="what-we-build">
      <div className="section-head">
        <h2 className="h-section">
          <RevealText>What we build.</RevealText>
        </h2>
        <FadeUp className="meta">
          Six capability areas covering the surface, the systems and everything in between —
          delivered end-to-end without hand-offs between teams.
        </FadeUp>
      </div>

      <div className="wwb-list">
        {whatWeBuild.map((c, i) => {
          const isOpen = open === i;
          return (
            <div key={c.num} className={`wwb-row ${isOpen ? 'is-open' : ''}`}>
              <button
                type="button"
                className="wwb-head"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                data-cursor="hover"
              >
                <span className="wwb-num">{c.num}</span>
                <span className="wwb-title">{c.title}</span>
                <span className="wwb-plus" aria-hidden="true">
                  <span /><span />
                </span>
              </button>
              <div className="wwb-body">
                <div className="wwb-body-inner">
                  <p className="wwb-intro">{c.intro}</p>
                  <ul className="wwb-items">
                    {c.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
