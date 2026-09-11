import Marquee from '../animation/Marquee.jsx';
import RevealText from '../animation/RevealText.jsx';
import FadeUp from '../animation/FadeUp.jsx';
import { technologies } from '../../data/services.js';

export default function Technology() {
  const marqueeItems = Object.values(technologies).flat();
  return (
    <section className="tech" id="technology">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">11 — Technology</span>
            <h2 className="h-section">
              <RevealText>The technology</RevealText>{' '}
              <em className="serif"><RevealText delay={0.1}>behind the build.</RevealText></em>
            </h2>
          </div>
          <FadeUp className="meta">
            We choose technology around the product, the business requirements and the
            long-term need — not the other way around.
          </FadeUp>
        </div>

        <div className="tech-columns">
          {Object.entries(technologies).map(([group, items]) => (
            <div key={group} className="tech-col">
              <h5>{group}</h5>
              <ul>
                {items.map((it) => <li key={it}>{it}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 80 }}>
        <Marquee items={marqueeItems} />
      </div>
    </section>
  );
}
