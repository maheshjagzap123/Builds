import MagneticButton from '../components/animation/MagneticButton.jsx';
import { useDocumentMeta } from '../lib/useDocumentMeta.js';

export default function NotFoundPage() {
  useDocumentMeta({
    title: 'Page not found | Mahesh Builds',
    description: 'The requested page could not be found. Explore Mahesh Builds services, work and contact options.',
    path: window.location.pathname,
    robots: 'noindex, follow',
  });

  return (
    <section className="not-found container">
      <span className="eyebrow">404 — Page not found</span>
      <h1>That page doesn’t exist.</h1>
      <p className="body-lg">The link may be outdated. Continue to the homepage, explore our work or discuss your project.</p>
      <div className="not-found-actions">
        <MagneticButton href="/" className="btn">Go to Homepage</MagneticButton>
        <MagneticButton href="/work" className="btn btn-ghost">View Work</MagneticButton>
      </div>
    </section>
  );
}
