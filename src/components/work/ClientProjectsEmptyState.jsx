import MagneticButton from '../animation/MagneticButton.jsx';

/**
 * Professional empty state for the Client Projects category.
 * Shown while there are no public client projects. Intentional, not
 * unfinished — and never fake cards. See AUDIT_REPORT.md §18.5.
 */
export default function ClientProjectsEmptyState() {
  return (
    <div className="client-empty">
      <p className="client-empty-lead">
        Real-world digital products and business solutions built for our clients.
      </p>
      <p className="client-empty-note">
        Our client portfolio is growing. New client work will appear here as it launches.
      </p>
      <div className="client-empty-cta">
        <span className="client-empty-q">Have a project in mind?</span>
        <MagneticButton href="/#contact" className="btn" data-cursor-label="Start">
          Let's build it together <span className="arrow">↗</span>
        </MagneticButton>
      </div>
    </div>
  );
}
