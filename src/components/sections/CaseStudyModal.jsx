import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { X } from 'lucide-react';

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
      el.querySelectorAll('.case-hero > *, .case-body > *, .case-gallery img'),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', stagger: 0.06, delay: 0.3 }
    );
    return () => { document.body.style.overflow = ''; };
  }, [project]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose?.(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="case-overlay" ref={ref} role="dialog" aria-modal="true" aria-label={project.title}>
      <button className="case-close" onClick={onClose} aria-label="Close case study" data-cursor="hover">
        <X size={18} />
      </button>

      <div className="case-hero">
        <div className="eyebrow">{project.number} — {project.category}</div>
        <h1>{project.title}</h1>
        <p className="case-sub">{project.tagline}</p>

        <div className="case-meta">
          <div>
            <span>Status</span>
            <p>{project.label}</p>
          </div>
          <div>
            <span>Services</span>
            <p>{project.services.join(' · ')}</p>
          </div>
          <div>
            <span>Stack</span>
            <p>{project.technologies.join(' · ')}</p>
          </div>
          <div>
            <span>Year</span>
            <p>{new Date().getFullYear()}</p>
          </div>
        </div>
      </div>

      <div className="case-body">
        <div>
          <h3>Overview</h3>
        </div>
        <div>
          <div className="case-section">
            <p>{project.description}</p>
          </div>
          <div className="case-section">
            <h3 style={{ marginBottom: 12 }}>The Challenge</h3>
            <p>{project.challenge}</p>
          </div>
          <div className="case-section">
            <h3 style={{ marginBottom: 12 }}>The Solution</h3>
            <p>{project.solution}</p>
          </div>
          <div className="case-section">
            <h3 style={{ marginBottom: 12 }}>Key Features</h3>
            <ul style={{ paddingLeft: 20, color: 'var(--fg-dim)', lineHeight: 1.9 }}>
              {project.features.map((f) => <li key={f}>{f}</li>)}
            </ul>
          </div>
        </div>
      </div>

      <div className="case-gallery">
        {project.gallery.map((src, i) => (
          <img key={i} src={src} alt={`${project.title} ${i + 1}`} loading="lazy" />
        ))}
      </div>

      <div style={{ maxWidth: 'var(--container)', margin: '60px auto 100px', textAlign: 'center' }}>
        <button className="btn" onClick={onClose} data-cursor="hover">
          Close <span className="arrow">↘</span>
        </button>
      </div>
    </div>
  );
}
