import RevealText from '../animation/RevealText.jsx';
import FadeUp from '../animation/FadeUp.jsx';
import MagneticButton from '../animation/MagneticButton.jsx';

const PLATFORMS = [
  { name: 'Android', hint: 'Native and cross-platform Android apps.' },
  { name: 'iOS', hint: 'Native and cross-platform iOS apps.' },
  { name: 'Cross-platform', hint: 'One codebase, both stores.' },
];

const APP_TYPES = [
  'Customer applications',
  'Booking apps',
  'Service apps',
  'Business apps',
  'Internal workforce apps',
  'Dashboards',
  'Notification systems',
  'API-connected applications',
];

export default function MobileCapability() {
  return (
    <section className="section container mobile-cap-section" id="mobile">
      <div className="section-head">
        <h2 className="h-section">
          <RevealText>Your business.</RevealText>
          <br />
          <em className="serif"><RevealText delay={0.1}>In your customer's pocket.</RevealText></em>
        </h2>
        <FadeUp className="meta">
          Android, iOS and cross-platform mobile experiences — for customers, for teams,
          and for the operations that connect them.
        </FadeUp>
      </div>

      <div className="mobile-grid">
        <div className="mobile-platforms">
          {PLATFORMS.map((p) => (
            <div key={p.name} className="mobile-platform" data-cursor="hover">
              <span className="mp-tag">Platform</span>
              <h3>{p.name}</h3>
              <p>{p.hint}</p>
            </div>
          ))}
        </div>
        <div className="mobile-types">
          <div className="eyebrow">What we build</div>
          <ul>
            {APP_TYPES.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <div style={{ marginTop: 30 }}>
            <MagneticButton href="#contact" className="btn btn-ghost">
              Build a Mobile App <span className="arrow">↗</span>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
