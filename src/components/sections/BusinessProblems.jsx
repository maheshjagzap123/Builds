import RevealText from '../animation/RevealText.jsx';
import FadeUp from '../animation/FadeUp.jsx';
import { businessProblems } from '../../data/services.js';

export default function BusinessProblems() {
  return (
    <section className="section container" id="solutions">
      <div className="section-head">
        <h2 className="h-section">
          <RevealText>Solutions for</RevealText>{' '}
          <em className="serif"><RevealText delay={0.1}>real business problems.</RevealText></em>
        </h2>
        <FadeUp className="meta">
          Start with the problem, not the technology. Here are the ones we see most often —
          and how we solve them.
        </FadeUp>
      </div>

      <div className="problems-grid">
        {businessProblems.map((p) => (
          <div key={p.num} className="problem-card" data-cursor="hover">
            <span className="problem-num">{p.num}</span>
            <h3 className="problem-q">{p.problem}</h3>
            <p className="problem-a">{p.solution}</p>
            <div className="problem-tags">
              {p.services.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
