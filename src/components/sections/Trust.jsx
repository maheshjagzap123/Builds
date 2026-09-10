import { useMemo } from 'react';
import { activeProjects } from '../../data/projects.js';
import { whatWeBuild, technologies } from '../../data/services.js';
import { industries } from '../../data/industries.js';
import RevealText from '../animation/RevealText.jsx';
import FadeUp from '../animation/FadeUp.jsx';

export default function Trust() {
  const stats = useMemo(() => {
    const techCount = Object.values(technologies).reduce((sum, arr) => sum + arr.length, 0);
    return [
      { value: `${activeProjects.length}+`, label: 'Live Projects' },
      { value: whatWeBuild.length, label: 'Capability Areas' },
      { value: `${techCount}+`, label: 'Technologies' },
      { value: `${industries.length}+`, label: 'Industries Served' },
    ];
  }, []);

  return (
    <section className="section container trust-section" id="trust">
      <div className="section-head">
        <h2 className="h-section">
          <RevealText>Built to</RevealText>{' '}
          <em className="serif"><RevealText delay={0.1}>earn trust.</RevealText></em>
        </h2>
        <FadeUp className="meta">
          No fabricated numbers. Real capabilities, honest scope, and work we can point to.
        </FadeUp>
      </div>

      <div className="trust-grid">
        {stats.map((s) => (
          <div key={s.label} className="trust-stat">
            <span className="trust-value">{s.value}</span>
            <span className="trust-label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
