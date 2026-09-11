import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Marquee from '../animation/Marquee.jsx';
import RevealText from '../animation/RevealText.jsx';
import FadeUp from '../animation/FadeUp.jsx';

gsap.registerPlugin(ScrollTrigger);

const LADDER = [
  {
    n: '01',
    label: 'Presence',
    text: 'Websites that give your business a professional digital surface — modern, mobile-first and SEO-ready.',
  },
  {
    n: '02',
    label: 'Engagement',
    text: 'Enquiries, appointments, leads and callbacks — capture and manage them in one place.',
  },
  {
    n: '03',
    label: 'Operations',
    text: 'CRMs, dashboards and management systems built around how your team actually works.',
  },
  {
    n: '04',
    label: 'Automation',
    text: 'APIs, notifications and workflows that remove the repetitive manual work.',
  },
  {
    n: '05',
    label: 'Growth',
    text: 'A better digital experience — measurable, maintainable and ready to scale.',
  },
];

export default function AgencyIntro() {
  const ref = useRef(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.nj-row').forEach((row, i) => {
        gsap.from(row.querySelectorAll('.nj-n, .nj-label, .nj-text'), {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'expo.out',
          stagger: 0.06,
          scrollTrigger: { trigger: row, start: 'top 88%', once: true },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Marquee items={['Website', 'Web App', 'Mobile App', 'Business Software', 'Automation', 'Maintenance']} />

      <section className="section not-just container" id="about" ref={ref}>
        <div className="section-head">
          <div>
            <span className="eyebrow">01 — Not just websites</span>
            <h2 className="h-section">
              <RevealText>Not just websites.</RevealText>
            </h2>
          </div>
          <FadeUp className="meta">
            A website gives your business a digital presence. A digital system can change how your
            business actually operates.
          </FadeUp>
        </div>

        <div className="nj-ladder">
          {LADDER.map((step, i) => (
            <div key={step.n} className="nj-row">
              <span className="nj-n">{step.n}</span>
              <span className="nj-label">{step.label}</span>
              <span className="nj-text">{step.text}</span>
              {i < LADDER.length - 1 && <span className="nj-arrow" aria-hidden="true">↓</span>}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
