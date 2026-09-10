import RevealText from '../animation/RevealText.jsx';
import FadeUp from '../animation/FadeUp.jsx';
import MagneticButton from '../animation/MagneticButton.jsx';
import { maintenanceItems } from '../../data/services.js';

export default function Maintenance() {
  return (
    <section className="section container maintenance-section" id="maintenance">
      <div className="maintenance-grid">
        <div>
          <div className="eyebrow">08 — Maintenance & support</div>
          <h2 className="h-section" style={{ marginTop: 20 }}>
            <RevealText>We don't</RevealText>{' '}
            <em className="serif"><RevealText delay={0.1}>disappear after launch.</RevealText></em>
          </h2>
          <FadeUp as="p" className="body-lg" delay={0.15}>
            Websites and software need ongoing care. We stay on the product after launch —
            monitoring it, fixing what breaks, and shipping improvements as the business changes.
          </FadeUp>
          <div style={{ marginTop: 40 }}>
            <MagneticButton href="#contact" className="btn" data-cursor-label="Start">
              Maintain My Product <span className="arrow">↗</span>
            </MagneticButton>
          </div>
        </div>

        <ul className="maintenance-items">
          {maintenanceItems.map((m, i) => (
            <li key={m} style={{ '--i': i }}>
              <span className="mnt-dot" aria-hidden="true" />
              {m}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
