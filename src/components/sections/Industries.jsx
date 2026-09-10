import RevealText from '../animation/RevealText.jsx';
import FadeUp from '../animation/FadeUp.jsx';
import { industries } from '../../data/services.js';

export default function Industries() {
  return (
    <section className="section container industries-section">
      <div className="section-head">
        <h2 className="h-section">
          <RevealText>Built for</RevealText>{' '}
          <em className="serif"><RevealText delay={0.1}>different industries.</RevealText></em>
        </h2>
        <FadeUp className="meta">
          The stack stays consistent — the systems are shaped to how each industry actually works.
        </FadeUp>
      </div>

      <ul className="industries-list">
        {industries.map((i) => (
          <li key={i} className="industry-pill" data-cursor="hover">{i}</li>
        ))}
      </ul>
    </section>
  );
}
