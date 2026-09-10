import { principles } from '../../data/services.js';
import RevealText from '../animation/RevealText.jsx';
import FadeUp from '../animation/FadeUp.jsx';

export default function WhyUs() {
  return (
    <section className="section container" id="why-us">
      <div className="section-head">
        <div>
          <span className="eyebrow">07 — Why us</span>
          <h2 className="h-section" style={{ marginTop: 24 }}>
            <RevealText>More than</RevealText>{' '}
            <em className="serif"><RevealText delay={0.1}>a development team.</RevealText></em>
          </h2>
        </div>
        <FadeUp className="meta">
          Five principles that shape how the studio builds — and why the work outlasts the launch.
        </FadeUp>
      </div>

      <div className="why-grid">
        {principles.map((p) => (
          <div key={p.num} className="why-card" data-cursor="hover">
            <span className="why-num">{p.num}</span>
            <h3 className="why-title">{p.title}</h3>
            <p className="why-text">{p.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
