import MagneticButton from '../animation/MagneticButton.jsx';
import RevealText from '../animation/RevealText.jsx';

export default function CTA() {
  return (
    <section className="cta">
      <div className="container cta-inner">
        <div className="eyebrow" style={{ justifyContent: 'center', display: 'inline-flex' }}>Final step</div>
        <h2>
          <RevealText>Have an idea?</RevealText>
          <br />
          <em className="serif"><RevealText delay={0.15}>Let's build it.</RevealText></em>
        </h2>
        <p className="cta-sub">
          Tell us what you're trying to build, improve or automate — and we'll come back
          with an honest read on scope and approach.
        </p>
        <div className="cta-ctas">
          <MagneticButton href="#contact" className="btn" data-cursor-label="Start">
            Start a Project <span className="arrow">↗</span>
          </MagneticButton>
          <MagneticButton href="#/work" className="btn btn-ghost">
            View What We've Built
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
