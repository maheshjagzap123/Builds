import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { X } from 'lucide-react';

function TechBlock({ label, items }) {
  if (!items || !items.length) return null;
  return (
    <div className="cs-tech-block">
      <span className="cs-tech-label">{label}</span>
      <div className="cs-tech-items">
        {items.map((it) => (
          <span key={it} className="cs-tech-item">{it}</span>
        ))}
      </div>
    </div>
  );
}

export default function CaseStudyModal({ project, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = 'hidden';
    const el = ref.current;
    if (!el) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    gsap.fromTo(el, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.8, ease: 'expo.inOut' });
    gsap.fromTo(
      el.querySelectorAll('.cs-hero > *, .cs-body > *, .cs-gallery > *'),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', stagger: 0.05, delay: 0.3 }
    );
    return () => { document.body.style.overflow = ''; };
  }, [project]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose?.(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!project) return null;
  const t = project.technologies || {};

  return (
    <div className="case-overlay" ref={ref} role="dialog" aria-modal="true" aria-label={project.title}>
      <button className="case-close" onClick={onClose} aria-label="Close case study" data-cursor="hover">
        <X size={18} />
      </button>

      <div className="cs-hero container">
        <div className="cs-tag-row">
          <span className="cs-badge">{project.label}</span>
          {project.categories.map((c) => (
            <span key={c} className="cs-badge cs-badge-ghost">{c}</span>
          ))}
        </div>
        <h1>{project.title}</h1>
        <p className="cs-tagline">{project.shortDescription}</p>

        <div className="cs-meta">
          <div>
            <span>Industry</span>
            <p>{project.industry}</p>
          </div>
          <div>
            <span>Project Type</span>
            <p style={{ textTransform: 'capitalize' }}>{project.projectType}</p>
          </div>
          <div>
            <span>Services</span>
            <p>{project.services.join(' · ')}</p>
          </div>
          <div>
            <span>Year</span>
            <p>{new Date().getFullYear()}</p>
          </div>
        </div>
      </div>

      <div className="cs-cover container">
        <img src={project.cover} alt={project.title} />
      </div>

      <div className="cs-body container">
        <section className="cs-section">
          <h3>Overview</h3>
          <p>{project.overview}</p>
        </section>

        <section className="cs-section">
          <h3>The Challenge</h3>
          <p>{project.challenge}</p>
        </section>

        <section className="cs-section">
          <h3>Our Approach</h3>
          <p>{project.approach}</p>
        </section>

        <section className="cs-section">
          <h3>Solution</h3>
          <p>{project.solution}</p>
        </section>

        <section className="cs-section">
          <h3>Key Features</h3>
          <ul className="cs-features">
            {project.features.map((f) => (<li key={f}>{f}</li>))}
          </ul>
        </section>

        <section className="cs-section">
          <h3>Technology</h3>
          <div className="cs-tech">
            <TechBlock label="Frontend" items={t.frontend} />
            <TechBlock label="Backend" items={t.backend} />
            <TechBlock label="Database" items={t.database} />
            <TechBlock label="Mobile" items={t.mobile} />
            <TechBlock label="Integrations" items={t.integrations} />
            <TechBlock label="Tools" items={t.tools} />
          </div>
        </section>

        <section className="cs-section">
          <h3>Outcome</h3>
          <p>{project.outcome}</p>
        </section>
      </div>

      {project.gallery && project.gallery.length > 1 && (
        <div className="cs-gallery container">
          {project.gallery.map((src, i) => (
            <img key={i} src={src} alt={`${project.title} ${i + 1}`} loading="lazy" />
          ))}
        </div>
      )}

      <div className="cs-footer container">
        <button className="btn" onClick={onClose} data-cursor="hover">
          Close Case Study <span className="arrow">↘</span>
        </button>
      </div>
    </div>
  );
}
