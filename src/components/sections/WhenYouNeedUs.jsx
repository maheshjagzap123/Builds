import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RevealText from '../animation/RevealText.jsx';
import FadeUp from '../animation/FadeUp.jsx';

gsap.registerPlugin(ScrollTrigger);

const SITUATIONS = [
  { problem: 'Your website is outdated.', solution: 'We modernize it.' },
  { problem: 'Your business runs on spreadsheets.', solution: 'We turn the workflow into software.' },
  { problem: 'Your team handles everything manually.', solution: 'We automate the repetitive work.' },
  { problem: 'Your customers keep asking the same questions.', solution: 'We build a digital self-service experience.' },
  { problem: 'You need a mobile app.', solution: 'We design and develop it.' },
];

export default function WhenYouNeedUs() {
  const ref = useRef(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.wyn-row').forEach((row) => {
        gsap.from(row.querySelectorAll('.wyn-problem, .wyn-solution'), {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: 'expo.out',
          stagger: 0.08,
          scrollTrigger: { trigger: row, start: 'top 90%', once: true },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section wyn container" id="when-you-need-us" ref={ref}>
      <div className="section-head">
        <div>
          <span className="eyebrow">03 — When you need us</span>
          <h2 className="h-section" style={{ marginTop: 24 }}>
            <RevealText>Situations we</RevealText>{' '}
            <em className="serif"><RevealText delay={0.1}>solve for.</RevealText></em>
          </h2>
        </div>
        <FadeUp className="meta">
          Not every project starts with a clear brief. Most start with a business problem.
          Here are the ones we hear most often.
        </FadeUp>
      </div>

      <div className="wyn-list">
        {SITUATIONS.map((s, i) => (
          <div key={s.problem} className="wyn-row">
            <span className="wyn-num">{String(i + 1).padStart(2, '0')}</span>
            <p className="wyn-problem">{s.problem}</p>
            <p className="wyn-solution"><span>→</span> {s.solution}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
