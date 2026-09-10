import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATEMENTS = [
  'Not just a website.',
  'Not just an app.',
  'Not just another template.',
];

export default function Differentiator() {
  const ref = useRef(null);
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    const ctx = gsap.context(() => {
      gsap.from('.diff-statement', {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.15,
        scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true },
      });
      gsap.from('.diff-final', {
        y: 80,
        opacity: 0,
        duration: 1.1,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.diff-final', start: 'top 85%', once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="diff container" ref={ref}>
      {STATEMENTS.map((t) => (
        <div key={t} className="diff-statement">
          <span className="strike">{t}</span>
        </div>
      ))}
      <div className="diff-final">
        We build <em>systems</em> that fit the business.
      </div>
    </section>
  );
}
