import { useEffect } from 'react';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import { getProjectBySlug } from '../data/projects.js';
import RevealText from '../components/animation/RevealText.jsx';
import FadeUp from '../components/animation/FadeUp.jsx';
import MagneticButton from '../components/animation/MagneticButton.jsx';
import { pickHeroImage } from '../lib/projectMedia.js';
import { useDocumentMeta } from '../lib/useDocumentMeta.js';
import { navigate } from '../lib/router.js';

const TBD = 'To Be Provided';

function TechBlock({ label, items }) {
  if (!items || !items.length) return null;
  return (
    <div className="pd-tech-block">
      <span className="pd-tech-label">{label}</span>
      <div className="pd-tech-items">
        {items.map((it) => <span key={it} className="pd-tech-item">{it}</span>)}
      </div>
    </div>
  );
}

function Section({ title, children }) {
  if (children == null || children === '' || children === TBD) return null;
  return (
    <section className="pd-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export default function ProjectDetail({ slug }) {
  const project = getProjectBySlug(slug);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  // Meta must be called unconditionally (hook rules); use safe fallbacks.
  useDocumentMeta({
    title: project ? (project.seo?.title || `${project.name} | Mahesh Builds`) : 'Project not found | Mahesh Builds',
    description: project ? (project.seo?.description || project.shortDescription) : 'The project you are looking for is not available.',
    path: `/work/${slug}`,
    ogType: 'article',
    ogImage: project?.seo?.ogImage,
    robots: project ? 'index, follow' : 'noindex, follow',
    schema: project ? {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: project.name,
      description: project.shortDescription,
      applicationCategory: project.type,
      creator: { '@type': 'Organization', name: 'Mahesh Builds', url: 'https://maheshbuilds.com/' },
      url: `https://maheshbuilds.com/work/${project.slug}`,
      operatingSystem: project.type.includes('Mobile') ? 'Android, iOS' : 'Web',
    } : undefined,
  });

  if (!project) {
    return (
      <section className="section container" style={{ paddingTop: 160, minHeight: '60vh' }}>
        <span className="eyebrow">Project not found</span>
        <h1 className="h-section" style={{ marginTop: 20 }}>
          That project doesn't exist or isn't available.
        </h1>
        <p className="body-lg" style={{ marginTop: 20 }}>
          It may have moved, or the link may be out of date.
        </p>
        <div style={{ marginTop: 30, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <MagneticButton href="/work" className="btn">← Back to Work</MagneticButton>
          <MagneticButton href="/" className="btn btn-ghost">Home</MagneticButton>
        </div>
      </section>
    );
  }

  const t = project.technologies || {};
  const hasTech = ['frontend', 'backend', 'database', 'mobile', 'integrations', 'tools']
    .some((k) => (t[k] || []).length);
  const hero = pickHeroImage(project.images);
  const gallery = (project.images || []).filter((i) => i.type === 'gallery');
  const links = project.links || {};

  return (
    <div className="project-detail">
      {/* Hero */}
      <section className="pd-hero container">
        <div className="pd-tag-row">
          <span className="pd-badge">{project.label}</span>
          <span className="pd-badge pd-badge-ghost">{project.type}</span>
          {project.status && project.status !== TBD && (
            <span className="pd-badge pd-badge-ghost">{project.status}</span>
          )}
        </div>
        <h1 className="pd-title">
          <RevealText>{project.name}</RevealText>
        </h1>
        <FadeUp className="pd-tagline" delay={0.1}>{project.shortDescription}</FadeUp>

        <div className="pd-meta">
          <div>
            <span>Category</span>
            <p>{project.category === 'personal' ? 'Personal Project' : 'Client Project'}</p>
          </div>
          <div>
            <span>Type</span>
            <p>{project.type}</p>
          </div>
          {project.status && project.status !== TBD && <div>
            <span>Status</span>
            <p>{project.status}</p>
          </div>}
          <div>
            <span>Role</span>
            <p>{project.role || TBD}</p>
          </div>
        </div>
      </section>

      {/* Hero visual */}
      <section className="pd-cover container">
        {hero ? (
          <figure className="pd-cover-fig">
            <img src={hero.src} alt={hero.alt} loading="eager" decoding="async" />
            {['supporting', 'brand-visual'].includes(hero.source) && (
              <figcaption className="pd-supporting-caption">
                {hero.source === 'brand-visual' ? 'Branded project cover — not an application screenshot.' : 'Supporting visual — contextual image, not a screenshot of the application.'}
              </figcaption>
            )}
          </figure>
        ) : (
          <div className="pd-cover-placeholder" aria-hidden="true">
            <span className="pd-placeholder-mark">MB</span>
            <span>{project.name}</span>
            <small>Independent product · Visuals are not public yet</small>
          </div>
        )}
      </section>

      {/* Body */}
      <div className="pd-body container">
        <Section title="Overview"><p>{project.overview}</p></Section>
        <Section title="Purpose"><p>{project.purpose}</p></Section>
        <Section title="The Problem"><p>{project.problem}</p></Section>
        <Section title="Solution"><p>{project.solution}</p></Section>

        {project.targetUsers?.length > 0 && (
          <Section title="Who it's for">
            <ul className="pd-list">
              {project.targetUsers.map((u) => <li key={u}>{u}</li>)}
            </ul>
          </Section>
        )}

        {project.features?.length > 0 && (
          <Section title="Key Features">
            <ul className="pd-features">
              {project.features.map((f) => <li key={f}>{f}</li>)}
            </ul>
          </Section>
        )}

        {project.modules?.length > 0 && (
          <Section title="Modules / Roles">
            <ul className="pd-features">
              {project.modules.map((m) => <li key={m}>{m}</li>)}
            </ul>
          </Section>
        )}

        {hasTech && (
          <Section title="Technology">
            <div className="pd-tech">
              <TechBlock label="Frontend" items={t.frontend} />
              <TechBlock label="Backend" items={t.backend} />
              <TechBlock label="Database" items={t.database} />
              <TechBlock label="Mobile" items={t.mobile} />
              <TechBlock label="Integrations" items={t.integrations} />
              <TechBlock label="Tools" items={t.tools} />
            </div>
          </Section>
        )}
      </div>

      {/* Gallery — only real galleries; supporting images clearly labelled */}
      {gallery.length > 0 && (
        <section className="pd-gallery container">
          {gallery.map((img, i) => (
            <figure key={i} className="pd-gallery-fig">
              <img src={img.src} alt={img.alt} loading="lazy" decoding="async" />
              {img.source === 'supporting' && (
                <figcaption className="pd-supporting-caption">Supporting visual</figcaption>
              )}
            </figure>
          ))}
        </section>
      )}

      {/* Links — only render provided links */}
      {(links.live || links.app || links.demo || links.github) && (
        <section className="pd-links container">
          {links.live && (
            <a href={links.live} className="pd-link" target="_blank" rel="noopener noreferrer" data-cursor="hover">
              <ExternalLink size={16} /> Live Website
            </a>
          )}
          {links.app && (
            <a href={links.app} className="pd-link" target="_blank" rel="noopener noreferrer" data-cursor="hover">
              <ExternalLink size={16} /> App
            </a>
          )}
          {links.demo && (
            <a href={links.demo} className="pd-link" target="_blank" rel="noopener noreferrer" data-cursor="hover">
              <ExternalLink size={16} /> Demo
            </a>
          )}
          {links.github && (
            <a href={links.github} className="pd-link" target="_blank" rel="noopener noreferrer" data-cursor="hover">
              <Github size={16} /> GitHub
            </a>
          )}
        </section>
      )}

      {/* Footer nav + CTA (internal links for SEO + conversion) */}
      <section className="pd-footer container">
        <div className="pd-footer-nav">
          <MagneticButton href="/work" className="btn btn-ghost">← All Work</MagneticButton>
          <a href="/#what-we-build" onClick={(e) => { e.preventDefault(); navigate('/#what-we-build'); }} className="pd-inline-link" data-cursor="hover">
            See our services <ArrowUpRight size={15} />
          </a>
        </div>
        <div className="pd-footer-cta">
          <h2>
            <RevealText>Want something like this</RevealText>{' '}
            <em className="serif"><RevealText delay={0.1}>built for you?</RevealText></em>
          </h2>
          <MagneticButton href="/#contact" className="btn" data-cursor-label="Start">
            Start a Project <span className="arrow">↗</span>
          </MagneticButton>
        </div>
      </section>
    </div>
  );
}
