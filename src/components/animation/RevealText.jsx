import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Splits children into lines-by-word and reveals from below.
 * Works with any string of text.
 */
export default function RevealText({ children, as: Tag = 'span', delay = 0, className = '', splitBy = 'word' }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = ref.current.querySelectorAll('.rt-inner');

    if (prefersReduced) {
      gsap.set(targets, { y: 0, opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1,
          ease: 'expo.out',
          stagger: 0.06,
          delay,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 88%',
            once: true,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [delay]);

  const parts = String(children).split(splitBy === 'char' ? '' : ' ');

  return (
    <Tag ref={ref} className={`rt ${className}`.trim()}>
      {parts.map((part, i) => (
        <span key={i} className="rt-word">
          <span className="rt-inner">{part}{splitBy === 'word' && i < parts.length - 1 ? '\u00A0' : ''}</span>
        </span>
      ))}
    </Tag>
  );
}
