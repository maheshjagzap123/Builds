import { useState } from 'react';
import { faq } from '../../data/services.js';
import RevealText from '../animation/RevealText.jsx';
import FadeUp from '../animation/FadeUp.jsx';

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="section container faq-section" id="faq">
      <div className="section-head">
        <h2 className="h-section">
          <RevealText>Common</RevealText>{' '}
          <em className="serif"><RevealText delay={0.1}>questions.</RevealText></em>
        </h2>
        <FadeUp className="meta">
          Quick answers to what most businesses ask before starting a project.
        </FadeUp>
      </div>

      <div className="faq-list">
        {faq.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q} className={`faq-row ${isOpen ? 'is-open' : ''}`}>
              <button
                type="button"
                className="faq-q"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                data-cursor="hover"
              >
                <span className="faq-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="faq-text">{item.q}</span>
                <span className="faq-plus" aria-hidden="true"><span /><span /></span>
              </button>
              <div className="faq-a">
                <div className="faq-a-inner">{item.a}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
