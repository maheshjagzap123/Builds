import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Marquee from '../animation/Marquee.jsx';
import RevealText from '../animation/RevealText.jsx';

gsap.registerPlugin(ScrollTrigger);

const STATEMENTS = [
  { num: '01', label: 'Digital Experiences', desc: 'Websites and product surfaces engineered for clarity and conversion.' },
  { num: '02', label: 'Business Software', desc: 'Internal tools that replace spreadsheets and stitch operations together.' },
  { num: '03', label: 'Automation Systems', desc: 'Workflows that remove the repetitive work from the team.' },
  { num: '04', label: 'Custom Solutions', desc: 'Systems shaped around the business — not the other way around.' },
];

export default function AgencyIntro() {
  const ref = useRef(null);
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.intro-row').forEach((row) => {
        gsap.from(row.querySelectorAll('.num, .label, .desc'), {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: 'expo.out',
          stagger: 0.08,
          scrollTrigger: { trigger: row, start: 'top 85%', once: true },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Marquee items={['Websites', 'Mobile Apps', 'Business Software', 'Dashboards', 'Automation', 'CRM', 'Digital Products', 'Maintenance']} />
      <section className="intro container" id="about" ref={ref}>
        <h2 className="intro-title">
          <RevealText>Not just websites.</RevealText>
          <br />
          <em><RevealText delay={0.15}>Digital systems.</RevealText></em>
        </h2>
        <div className="intro-statements">
          {STATEMENTS.map((s) => (
            <div key={s.num} className="intro-row">
              <span className="num">{s.num}</span>
              <span className="label">{s.label}</span>
              <span className="desc">{s.desc}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
