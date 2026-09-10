import { useMemo } from 'react';
import { projects } from '../../data/projects.js';
import { whatWeBuild, industries } from '../../data/services.js';
import RevealText from '../animation/RevealText.jsx';
import FadeUp from '../animation/FadeUp.jsx';

/**
 * Trust section — verifiable proof only.
 * Numbers come from real data (project count, service categories, industries covered).
 */
export default function Trust() {
  const stats = useMemo(() => {
    const projectCount = projects.length;
    const techCount = new Set(
      projects.flatMap((p) => [
        ...(p.technologies.frontend || []),
        ...(p.technologies.backend || []),
        ...(p.technologies.database || []),
        ...(p.technologies.mobile || []),
        ...(p.technologies.tools || []),
      ])
    ).size;
    return [
      { value: projectCount, label: 'Projects & Concepts' },
      { value: whatWeBuild.length, label: 'Capability Areas' },
      { value: techCount, label: 'Technologies' },
      { value: industries.length, label: 'Industries Covered' },
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
          No fabricated numbers. The work itself is the proof — and here's what the studio
          actually covers.
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
