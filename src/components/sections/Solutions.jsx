import { Building2, GraduationCap, Home, Factory, Hotel, Briefcase } from 'lucide-react';
import RevealText from '../animation/RevealText.jsx';
import FadeUp from '../animation/FadeUp.jsx';
import { solutions } from '../../data/services.js';

const ICONS = [Building2, GraduationCap, Home, Factory, Hotel, Briefcase];

export default function Solutions() {
  return (
    <section className="sols" id="solutions">
      <div className="container">
        <div className="section-head">
          <h2 className="h-section">
            <RevealText>Built around</RevealText>{' '}
            <em className="serif"><RevealText delay={0.1}>business needs.</RevealText></em>
          </h2>
          <FadeUp className="meta">
            Every industry has its own operational grammar. The stack stays consistent — the systems
            are shaped to the domain.
          </FadeUp>
        </div>

        <div className="sols-grid">
          {solutions.map((s, i) => {
            const Icon = ICONS[i] || Building2;
            return (
              <div key={s.num} className="sol-card" data-cursor="hover">
                <div>
                  <div className="sol-icon"><Icon size={20} /></div>
                  <div className="sol-num">{s.num}</div>
                  <h3 className="sol-title">{s.title}</h3>
                </div>
                <p className="sol-desc">{s.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
