import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalProjects, clientProjects } from '../data/projects.js';
import RevealText from '../components/animation/RevealText.jsx';
import FadeUp from '../components/animation/FadeUp.jsx';
import MagneticButton from '../components/animation/MagneticButton.jsx';
import ProjectCard from '../components/work/ProjectCard.jsx';
import ClientProjectsEmptyState from '../components/work/ClientProjectsEmptyState.jsx';
import { useDocumentMeta } from '../lib/useDocumentMeta.js';

gsap.registerPlugin(ScrollTrigger);

export default function WorkPage() {
  const rootRef = useRef(null);

  useDocumentMeta({
    title: 'Web & Software Development Work | Mahesh Builds',
    description:
      'A look at the digital products Mahesh Builds has built — personal projects like TripWise, Paithani Marketplace and a Milk Management System — plus client work as it launches.',
    path: '/work',
    ogType: 'website',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Mahesh Builds — Work',
      description: 'Personal digital products designed and built by Mahesh Builds.',
      url: 'https://maheshbuilds.com/work',
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: personalProjects.map((project, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `https://maheshbuilds.com/work/${project.slug}`,
          name: project.name,
        })),
      },
    },
  });

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.pc-card').forEach((card) => {
        gsap.from(card, {
          y: 30, opacity: 0, duration: 0.8, ease: 'expo.out',
          scrollTrigger: { trigger: card, start: 'top 88%', once: true },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="work-page" ref={rootRef}>
      <section className="work-hero container">
        <span className="eyebrow">Work</span>
        <h1 className="work-hero-title">
          <RevealText>What we've built.</RevealText>
        </h1>
        <FadeUp className="body-lg" delay={0.15}>
          Digital products designed and developed by Mahesh Builds. Public client work is only shown with permission, so the projects below focus on verified independent builds.
        </FadeUp>
      </section>

      {/* -- Personal Projects -------------------------------------------------- */}
      <section className="work-category container" aria-labelledby="personal-projects-heading">
        <div className="work-category-head">
          <h2 id="personal-projects-heading" className="work-category-title">
            <RevealText>Personal Projects</RevealText>
          </h2>
          <FadeUp className="work-category-note">
            Products designed and built independently by Mahesh Builds.
          </FadeUp>
        </div>

        {personalProjects.length > 0 ? (
          <div className="work-grid">
            {personalProjects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        ) : (
          <p className="body-lg">Projects coming soon.</p>
        )}
      </section>

      {/* -- Client Projects ---------------------------------------------------- */}
      <section className="work-category container work-category-client" aria-labelledby="client-projects-heading">
        <div className="work-category-head">
          <h2 id="client-projects-heading" className="work-category-title">
            <RevealText>Client Projects</RevealText>
          </h2>
        </div>

        {clientProjects.length > 0 ? (
          <div className="work-grid">
            {clientProjects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        ) : (
          <ClientProjectsEmptyState />
        )}
      </section>

      {/* -- CTA ---------------------------------------------------------------- */}
      <section className="work-cta container">
        <h2 className="h-section">
          <RevealText>Have something</RevealText>{' '}
          <em className="serif"><RevealText delay={0.1}>to build?</RevealText></em>
        </h2>
        <div style={{ marginTop: 30, display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
          <MagneticButton href="/#contact" className="btn">
            Start a Project <span className="arrow">↗</span>
          </MagneticButton>
          <MagneticButton href="/" className="btn btn-ghost">
            Back to Home
          </MagneticButton>
        </div>
      </section>
    </div>
  );
}
