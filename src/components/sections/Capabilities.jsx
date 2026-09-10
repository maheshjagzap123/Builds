import RevealText from '../animation/RevealText.jsx';
import FadeUp from '../animation/FadeUp.jsx';
import { capabilities } from '../../data/services.js';

export default function Capabilities() {
  return (
    <section className="section container" id="services">
      <div className="section-head">
        <h2 className="h-section">
          <RevealText>Capabilities.</RevealText>
        </h2>
        <FadeUp className="meta">
          A tight set of services covering the surface, the systems and the space between —
          delivered end-to-end without hand-offs between teams.
        </FadeUp>
      </div>

      <div className="caps-list">
        {capabilities.map((c) => (
          <a key={c.num} href="#contact" className="cap-row" data-cursor="hover">
            <span className="cap-num">{c.num}</span>
            <span className="cap-title">{c.title}</span>
            <span className="cap-tags">
              {c.tags.map((t) => (
                <span key={t} className="cap-tag">{t}</span>
              ))}
            </span>
            <span className="cap-arrow">↗</span>
          </a>
        ))}
      </div>
    </section>
  );
}
