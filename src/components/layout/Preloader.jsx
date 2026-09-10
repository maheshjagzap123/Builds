import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const LINES = ['INITIALIZING', 'BUILDING DIGITAL EXPERIENCES', 'MAHESH BUILDS'];

export default function Preloader({ onDone }) {
  const rootRef = useRef(null);
  const linesRef = useRef(null);
  const wordmarkRef = useRef(null);
  const ringRef = useRef(null);
  const countRef = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      gsap.set(rootRef.current, { display: 'none' });
      onDone?.();
      return;
    }

    document.body.style.overflow = 'hidden';

    // Counter
    const counter = { v: 0 };
    gsap.to(counter, {
      v: 100,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: () => setCount(Math.round(counter.v)),
    });

    // Line rotation
    const lineEls = linesRef.current.children;
    gsap.set(lineEls, { y: 24, opacity: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        onDone?.();
      },
    });

    Array.from(lineEls).forEach((el, i) => {
      tl.to(el, { y: 0, opacity: 1, duration: 0.5, ease: 'expo.out' }, i * 0.5 + 0.1)
        .to(el, { y: -24, opacity: 0, duration: 0.4, ease: 'expo.in' }, i * 0.5 + 0.7);
    });

    tl.to(wordmarkRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' }, '-=0.2')
      .to(ringRef.current, {
        scale: 40,
        borderColor: 'rgba(255,255,255,0)',
        duration: 1.1,
        ease: 'expo.inOut',
      }, '-=0.1')
      .to(rootRef.current, { autoAlpha: 0, duration: 0.5, ease: 'power2.out' }, '-=0.4')
      .set(rootRef.current, { display: 'none' });

    return () => {
      tl.kill();
      document.body.style.overflow = '';
    };
  }, [onDone]);

  return (
    <div className="preloader" ref={rootRef}>
      <div className="preloader-inner">
        <div className="preloader-ring" ref={ringRef}>
          <span className="preloader-mb">MB</span>
        </div>
        <div className="preloader-lines" ref={linesRef}>
          {LINES.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>
      </div>
      <div className="preloader-wordmark" ref={wordmarkRef} style={{ transform: 'translateY(20px)' }}>
        MAHESH BUILDS
      </div>
      <div className="preloader-progress">LOADING</div>
      <div className="preloader-count" ref={countRef}>{String(count).padStart(3, '0')}</div>
    </div>
  );
}
