import { Check, ArrowUpRight } from 'lucide-react';
import { getServicePageBySlug, localPage } from '../data/seoPages.js';
import { industries } from '../data/industries.js';
import Link from '../components/layout/Link.jsx';
import MagneticButton from '../components/animation/MagneticButton.jsx';
import RevealText from '../components/animation/RevealText.jsx';
import FadeUp from '../components/animation/FadeUp.jsx';
import { useDocumentMeta } from '../lib/useDocumentMeta.js';

export default function ServicePage({ slug, local = false }) {
  const page = local ? localPage : getServicePageBySlug(slug);
  const path = local ? `/${localPage.slug}` : `/services/${slug}`;

  useDocumentMeta({
    title: page?.seoTitle || 'Service not found | Mahesh Builds',
    description: page?.description || 'The requested service page is not available.',
    path,
    robots: page ? 'index, follow' : 'noindex, follow',
    schema: page ? [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: page.title,
        description: page.description,
        provider: { '@type': 'Organization', name: 'Mahesh Builds', url: 'https://maheshbuilds.com/' },
        areaServed: local ? [
          { '@type': 'City', name: 'Pune' },
          { '@type': 'AdministrativeArea', name: 'Maharashtra' },
          { '@type': 'Country', name: 'India' },
        ] : { '@type': 'Country', name: 'India' },
        url: `https://maheshbuilds.com${path}`,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: page.faq.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
    ] : undefined,
  });

  if (!page) {
    return (
      <section className="not-found container">
        <span className="eyebrow">Service not found</span>
        <h1>That service page doesn’t exist.</h1>
        <p className="body-lg">Explore the website, web application, mobile app and business software services from the homepage.</p>
        <div className="not-found-actions"><MagneticButton href="/" className="btn">Go to Homepage</MagneticButton></div>
      </section>
    );
  }

  const related = industries.filter((industry) =>
    page.industries.some((name) => name.toLowerCase().includes(industry.title.toLowerCase()))
  ).slice(0, 4);

  return (
    <div className="service-page">
      <section className="service-hero container">
        <span className="eyebrow">{page.eyebrow}</span>
        <h1 className="service-title"><RevealText>{page.headline}</RevealText></h1>
        <FadeUp className="body-lg" delay={0.1}>{page.intro}</FadeUp>
        <div className="service-actions">
          <MagneticButton href="/#contact" className="btn" data-cursor-label="Start">Discuss a Project <span className="arrow">↗</span></MagneticButton>
          <MagneticButton href="/work" className="btn btn-ghost">View Work</MagneticButton>
        </div>
      </section>

      <section className="service-section container" aria-labelledby="outcomes-heading">
        <div className="section-head">
          <h2 id="outcomes-heading" className="h-section"><RevealText>What the build should achieve.</RevealText></h2>
          <p className="meta">Business outcomes first. Technology follows the requirements.</p>
        </div>
        <div className="service-card-grid">
          {page.outcomes.map((item) => <div className="service-point" key={item}><Check size={18} aria-hidden="true" /><span>{item}</span></div>)}
        </div>
      </section>

      <section className="service-section container" aria-labelledby="included-heading">
        <div className="section-head">
          <h2 id="included-heading" className="h-section"><RevealText>What we can build.</RevealText></h2>
        </div>
        <ul className="service-list">{page.includes.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong></li>)}</ul>
      </section>

      <section className="service-section container" aria-labelledby="process-heading">
        <div className="section-head"><h2 id="process-heading" className="h-section"><RevealText>A practical delivery process.</RevealText></h2></div>
        <ol className="service-process">{page.process.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, '0')}</span><p>{item}</p></li>)}</ol>
      </section>

      {related.length > 0 && <section className="service-section container" aria-labelledby="related-heading">
        <div className="section-head"><h2 id="related-heading" className="h-section"><RevealText>Related industries.</RevealText></h2></div>
        <div className="related-grid">{related.map((industry) => <Link key={industry.slug} to={`/industries/${industry.slug}`} className="related-card"><h3>{industry.title}</h3><p>{industry.tagline}</p><ArrowUpRight size={18} aria-hidden="true" /></Link>)}</div>
      </section>}

      <section className="service-section container" aria-labelledby="service-faq-heading">
        <div className="section-head"><h2 id="service-faq-heading" className="h-section"><RevealText>Questions before starting.</RevealText></h2></div>
        <div className="service-faq">{page.faq.map((item) => <details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}</div>
      </section>

      <section className="service-final-cta container">
        <h2>Have a real business problem to solve?</h2>
        <p>Share the goal, current workflow or website. The first conversation is free and focused on fit.</p>
        <MagneticButton href="/#contact" className="btn">Start a Project <span className="arrow">↗</span></MagneticButton>
      </section>
    </div>
  );
}
