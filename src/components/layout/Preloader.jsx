import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

/**
 * Cinematic preloader:
 *   Frame 1: MB inside a small ring
 *   Frame 2: "Digital Product Studio" / "We build what businesses need next"
 *   Frame 3: MAHESH BUILDS wordmark assembles
 *   Frame 4: Ring expands to viewport, morphs into hero background
 */
export default function Preloader({ onDone }) {
  const rootRef = useRef(null);
  const ringRef = useRef(null);
  const mbRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const wordmarkRef = useRef(null);
  const countRef = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      if (rootRef.current) rootRef.current.style.display = 'none';
      onDone?.();
      return;
    }

    document.body.style.overflow = 'hidden';

    const counter = { v: 0 };
    gsap.to(counter, {
      v: 100,
      duration: 2.0,
      ease: 'power2.inOut',
      onUpdate: () => setCount(Math.round(counter.v)),
    });

    const tl = gsap.timeline({
      defaults: { ease: 'expo.out' },
      onComplete: () => {
        document.body.style.overflow = '';
        onDone?.();
      },
    });

    // Frame 1: MB reveal inside ring
    tl.fromTo(ringRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.9, ease: 'expo.out' }
    )
    .fromTo(mbRef.current,
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.7 },
      '-=0.5'
    )

    // Frame 2: intro lines
    .fromTo(line1Ref.current.children,
      { yPercent: 100 },
      { yPercent: 0, duration: 0.6, stagger: 0.03 },
      0.4
    )
    .to(line1Ref.current.children,
      { yPercent: -100, duration: 0.5, stagger: 0.02, ease: 'expo.in' },
      1.0
    )
    .fromTo(line2Ref.current.children,
      { yPercent: 100 },
      { yPercent: 0, duration: 0.6, stagger: 0.02 },
      1.15
    )
    .to(line2Ref.current.children,
      { yPercent: -100, duration: 0.5, stagger: 0.015, ease: 'expo.in' },
      1.75
    )

    // Frame 3: wordmark assembles
    .fromTo(wordmarkRef.current.querySelectorAll('.pl-word > span'),
      { yPercent: 110, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.05 },
      1.6
    )
    .to(mbRef.current, { opacity: 0, scale: 0.6, duration: 0.5 }, 1.7)

    // Frame 4: ring expands & fades preloader
    .to(ringRef.current,
      {
        scale: 45,
        borderColor: 'rgba(255,255,255,0)',
        duration: 1.1,
        ease: 'expo.inOut',
      },
      2.15
    )
    .to(wordmarkRef.current, { opacity: 0, duration: 0.5 }, 2.5)
    .to(rootRef.current, { autoAlpha: 0, duration: 0.4 }, 2.85)
    .set(rootRef.current, { display: 'none' });

    return () => {
      tl.kill();
      document.body.style.overflow = '';
    };
  }, [onDone]);

  return (
    <div className="preloader" ref={rootRef}>
      <div className="preloader-stage">
        <div className="preloader-ring" ref={ringRef}>
          <span className="preloader-mb" ref={mbRef}>MB</span>
        </div>

        <div className="preloader-lines">
          <div className="pl-line" ref={line1Ref}>
            <span>DIGITAL</span><span>&nbsp;</span><span>PRODUCT</span><span>&nbsp;</span><span>STUDIO</span>
          </div>
          <div className="pl-line pl-line-2" ref={line2Ref}>
            <span>WE&nbsp;BUILD&nbsp;WHAT&nbsp;BUSINESSES&nbsp;NEED&nbsp;NEXT.</span>
          </div>
        </div>

        <div className="preloader-wordmark" ref={wordmarkRef}>
          <span className="pl-word"><span>MAHESH</span></span>
          <span className="pl-word"><span>BUILDS</span></span>
        </div>
      </div>

      <div className="preloader-bar">
        <span className="preloader-tag">LOADING</span>
        <span className="preloader-count" ref={countRef}>{String(count).padStart(3, '0')}</span>
      </div>
    </div>
  );
}
