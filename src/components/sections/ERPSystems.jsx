import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { erpDefinition, erpBenefits, erpBySector } from '../../data/erp.js';
import RevealText from '../animation/RevealText.jsx';
import FadeUp from '../animation/FadeUp.jsx';
import MagneticButton from '../animation/MagneticButton.jsx';

gsap.registerPlugin(ScrollTrigger);

export default function ERPSystems() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.erp-benefit').forEach((el, i) => {
        gsap.from(el, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: 'expo.out',
          delay: (i % 3) * 0.06,
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        });
      });
      gsap.utils.toArray('.erp-sector').forEach((el) => {
        gsap.from(el, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section container erp-section" id="erp" ref={ref}>
      <div className="section-head">
        <div>
          <span className="eyebrow">05 — ERP systems</span>
          <h2 className="h-section" style={{ marginTop: 24 }}>
            <RevealText>One system for</RevealText>
            <br />
            <em className="serif"><RevealText delay={0.1}>how your business runs.</RevealText></em>
          </h2>
        </div>
        <FadeUp className="meta">
          A custom ERP replaces spreadsheets, disconnected tools and manual hand-offs with one
          platform shaped around your actual operation.
        </FadeUp>
      </div>

      {/* What is ERP */}
      <div className="erp-intro">
        <div className="erp-intro-block">
          <span className="erp-intro-label">What is an ERP?</span>
          <p className="body-lg">{erpDefinition.what}</p>
        </div>
        <div className="erp-intro-block">
          <span className="erp-intro-label">Who it's for</span>
          <p className="body-lg">{erpDefinition.who}</p>
        </div>
      </div>

      {/* Benefits */}
      <div className="erp-benefits-head">
        <span className="eyebrow">What an ERP unlocks</span>
        <h3 className="h-3" style={{ marginTop: 12 }}>Six shifts businesses feel first.</h3>
      </div>
      <div className="erp-benefits">
        {erpBenefits.map((b) => (
          <div key={b.num} className="erp-benefit">
            <span className="erp-benefit-num">{b.num}</span>
            <h4>{b.title}</h4>
            <p>{b.text}</p>
          </div>
        ))}
      </div>

      {/* Sector-by-sector applications */}
      <div className="erp-sectors-head">
        <span className="eyebrow">ERP across sectors</span>
        <h3 className="h-3" style={{ marginTop: 12 }}>Same platform. Shaped to your industry.</h3>
        <p className="body-lg" style={{ marginTop: 16 }}>
          The same ERP foundation adapts to each sector — modules are added and removed based on
          how the business actually operates. A few examples:
        </p>
      </div>

      <div className="erp-sectors">
        {erpBySector.map((s) => (
          <a key={s.slug} href={`#/industries/${s.slug}`} className="erp-sector" data-cursor="hover">
            <div className="erp-sector-head">
              <h4>{s.industry}</h4>
              <ArrowUpRight size={16} className="erp-sector-arrow" />
            </div>
            <p>{s.modules}</p>
          </a>
        ))}
      </div>

      {/* CTA */}
      <div className="erp-cta">
        <MagneticButton href="#contact" className="btn" data-cursor-label="Start">
          Build an ERP for my Business <span className="arrow">↗</span>
        </MagneticButton>
      </div>
    </section>
  );
}
