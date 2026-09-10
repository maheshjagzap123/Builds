import MagneticButton from '../animation/MagneticButton.jsx';
import RevealText from '../animation/RevealText.jsx';

export default function CTA() {
  return (
    <section className="cta">
      <div className="container cta-inner">
        <h2>
          <RevealText>Have a project</RevealText>
          <br />
          <em className="serif"><RevealText delay={0.15}>in mind?</RevealText></em>
        </h2>
        <div className="cta-ctas">
          <MagneticButton href="#contact" className="btn" data-cursor-label="Start">
            Start a Project <span className="arrow">↗</span>
          </MagneticButton>
          <MagneticButton href="#/work" className="btn btn-ghost">
            View Our Work
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
