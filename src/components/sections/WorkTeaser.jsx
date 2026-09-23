import { personalProjects } from '../../data/projects.js';
import RevealText from '../animation/RevealText.jsx';
import FadeUp from '../animation/FadeUp.jsx';
import MagneticButton from '../animation/MagneticButton.jsx';
import ProjectCard from '../work/ProjectCard.jsx';

export default function WorkTeaser() {
  const list = personalProjects.slice(0, 3);

  return (
    <section className="section container work-teaser" id="work-teaser">
      <div className="section-head">
        <div>
          <span className="eyebrow">06 — Work</span>
          <h2 className="h-section">
            <RevealText>What we've built.</RevealText>
          </h2>
        </div>
        <FadeUp className="meta">
          Products designed and built by Mahesh Builds. Client work appears on the Work page as it launches.
        </FadeUp>
      </div>

      {list.length === 0 ? (
        <FadeUp className="body-lg" style={{ textAlign: 'center', padding: '40px 0' }}>
          Projects coming soon.
        </FadeUp>
      ) : (
        <div className="work-grid teaser-grid">
          {list.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      )}

      <div className="teaser-cta">
        <MagneticButton href="/work" className="btn btn-ghost" data-cursor-label="View">
          View All Work <span className="arrow">↗</span>
        </MagneticButton>
      </div>
    </section>
  );
}
