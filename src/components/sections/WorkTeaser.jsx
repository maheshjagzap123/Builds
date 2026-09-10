import { activeProjects } from '../../data/projects.js';
import RevealText from '../animation/RevealText.jsx';
import FadeUp from '../animation/FadeUp.jsx';
import MagneticButton from '../animation/MagneticButton.jsx';

export default function WorkTeaser() {
  const featured = activeProjects.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="section container" id="work-teaser">
      <div className="section-head">
        <h2 className="h-section">
          <RevealText>What we've built.</RevealText>
        </h2>
        <FadeUp className="meta">
          A look at the digital products, websites and business systems we've designed and developed.
          The full catalog lives on the projects page.
        </FadeUp>
      </div>

      {featured.length === 0 ? (
        <FadeUp className="body-lg" style={{ textAlign: 'center', padding: '40px 0' }}>
          Case studies coming soon.
        </FadeUp>
      ) : (
        <div className="teaser-grid">
          {featured.map((p) => (
            <a
              key={p.id}
              href="#/work"
              className="teaser-card"
              data-cursor="view"
              data-cursor-label="View"
            >
              <div className="teaser-media">
                <img src={p.cover} alt={p.title} loading="lazy" />
                <span className="teaser-tag">{p.label}</span>
              </div>
              <div className="teaser-body">
                <div className="teaser-meta">
                  <span>{p.number}</span>
                  <span>{p.categories?.[0] || p.industry}</span>
                </div>
                <h3>{p.title}</h3>
              </div>
            </a>
          ))}
        </div>
      )}

      <div className="teaser-cta">
        <MagneticButton href="#/work" className="btn" data-cursor-label="View">
          View All Work <span className="arrow">↗</span>
        </MagneticButton>
      </div>
    </section>
  );
}
