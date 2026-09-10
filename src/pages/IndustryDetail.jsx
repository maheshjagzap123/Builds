import { useEffect } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { getIndustryBySlug, industries } from '../data/industries.js';
import RevealText from '../components/animation/RevealText.jsx';
import FadeUp from '../components/animation/FadeUp.jsx';
import MagneticButton from '../components/animation/MagneticButton.jsx';

export default function IndustryDetail({ slug }) {
  const ind = getIndustryBySlug(slug);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!ind) {
    return (
      <section className="section container" style={{ paddingTop: 160, minHeight: '60vh' }}>
        <span className="eyebrow">Industry not found</span>
        <h1 className="h-section" style={{ marginTop: 20 }}>That industry isn’t listed.</h1>
        <p className="body-lg" style={{ marginTop: 20 }}>
          Head back to explore the industries we build for.
        </p>
        <div style={{ marginTop: 30 }}>
          <a href="#/" className="btn btn-ghost" data-cursor="hover">← Back to Home</a>
        </div>
      </section>
    );
  }

  const otherIndustries = industries.filter((i) => i.slug !== ind.slug).slice(0, 4);

  return (
    <div className="industry-page">
      <section className="industry-hero container">
        <span className="eyebrow">Industry</span>
        <h1 className="industry-title">
          <RevealText>Digital systems for</RevealText>
          <br />
          <em className="serif"><RevealText delay={0.1}>{ind.title.toLowerCase()}.</RevealText></em>
        </h1>
        <FadeUp className="body-lg" delay={0.15}>{ind.tagline}</FadeUp>

        <div className="industry-hero-cta">
          <MagneticButton href="#contact" className="btn" data-cursor-label="Start">
            Build for my Business <span className="arrow">↗</span>
          </MagneticButton>
          <MagneticButton href="#/" className="btn btn-ghost">← Back to Home</MagneticButton>
        </div>
      </section>

      <section className="industry-problems container">
        <div className="section-head">
          <h2 className="h-section">
            <RevealText>Problems we see.</RevealText>
          </h2>
          <FadeUp className="meta">
            The recurring pain points {ind.title.toLowerCase()} businesses tell us about.
          </FadeUp>
        </div>
        <ul className="problems-strip">
          {ind.problems.map((p, i) => (
            <li key={p}>
              <span className="ps-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="ps-text">{p}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="industry-packages container">
        <div className="section-head">
          <h2 className="h-section">
            <RevealText>What we can</RevealText>{' '}
            <em className="serif"><RevealText delay={0.1}>build for you.</RevealText></em>
          </h2>
          <FadeUp className="meta">
            Three solution levels — pick the one that matches your stage, or combine them.
          </FadeUp>
        </div>

        <div className="pkg-grid">
          {ind.packages.map((p) => (
            <article key={p.num} className="pkg-card" data-cursor="hover">
              <div className="pkg-head">
                <span className="pkg-num">Package {p.num}</span>
                <h3 className="pkg-title">{p.title}</h3>
                <p className="pkg-pitch">{p.pitch}</p>
                {p.idealFor && <p className="pkg-ideal">Ideal for: <span>{p.idealFor}</span></p>}
              </div>
              <ul className="pkg-features">
                {p.features.map((f) => (
                  <li key={f}>
                    <Check size={14} strokeWidth={2} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a href="#contact" className="pkg-cta" data-cursor="hover">
                Start with Package {p.num}
                <ArrowUpRight size={16} />
              </a>
            </article>
          ))}
        </div>

        {ind.note && (
          <div className="industry-note">
            <span className="eyebrow">Important</span>
            <p>{ind.note}</p>
          </div>
        )}
      </section>

      <section className="industry-related container">
        <div className="section-head">
          <h2 className="h-section">
            <RevealText>Other industries</RevealText>{' '}
            <em className="serif"><RevealText delay={0.1}>we build for.</RevealText></em>
          </h2>
        </div>
        <div className="related-grid">
          {otherIndustries.map((o) => (
            <a key={o.slug} href={`#/industries/${o.slug}`} className="related-card" data-cursor="hover">
              <span className="related-num">{String(industries.findIndex((i) => i.slug === o.slug) + 1).padStart(2, '0')}</span>
              <h3>{o.title}</h3>
              <p>{o.tagline}</p>
              <span className="related-arrow">↗</span>
            </a>
          ))}
        </div>
      </section>

      <section className="industry-cta">
        <div className="container">
          <h2>
            <RevealText>Have a project</RevealText>{' '}
            <em className="serif"><RevealText delay={0.1}>in mind?</RevealText></em>
          </h2>
          <div className="cta-ctas" style={{ justifyContent: 'center', marginTop: 30 }}>
            <MagneticButton href="#contact" className="btn" data-cursor-label="Start">
              Start a Project <span className="arrow">↗</span>
            </MagneticButton>
            <MagneticButton href="#/work" className="btn btn-ghost">
              View What We've Built
            </MagneticButton>
          </div>
        </div>
      </section>
    </div>
  );
}
