import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

/**
 * Cinematic preloader (restored earlier version):
 *   Frame 1: MB inside a small ring
 *   Frame 2: "Digital Product Studio" / "We build what businesses need next"
 *   Frame 3: MAHESH BUILDS wordmark assembles
 *   Frame 4: Ring expands to viewport, morphs into hero background
 *
 * Runs once per session. Optional non-blocking voice.
 * Respects prefers-reduced-motion.
 */

const WELCOME_KEY = 'mb.welcomePlayed';

export default function Preloader({ onDone }) {
  const rootRef = useRef(null);
  const ringRef = useRef(null);
  const mbRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const wordmarkRef = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Note: session-once skip is disabled while iterating; animation plays on every refresh.
    // To re-enable, gate the timeline behind: sessionStorage.getItem(WELCOME_KEY) === '1'.
    if (prefersReduced) {
      if (rootRef.current) rootRef.current.style.display = 'none';
      onDone?.();
      return;
    }

    document.body.style.overflow = 'hidden';

    // Optional voice — never blocks the animation.
    const speak = () => {
      try {
        if (!('speechSynthesis' in window)) return;
        const u = new SpeechSynthesisUtterance('Welcome to Mahesh Builds');
        u.rate = 0.95;
        u.pitch = 1.0;
        u.volume = 0.85;
        const voices = window.speechSynthesis.getVoices();
        const preferred = voices.find((v) => /en(-|_)?(gb|us|in)/i.test(v.lang)) || voices[0];
        if (preferred) u.voice = preferred;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(u);
      } catch (_) { /* silent */ }
    };

    const counter = { v: 0 };
    gsap.to(counter, {
      v: 100,
      duration: 3.4,
      ease: 'power2.inOut',
      onUpdate: () => setCount(Math.round(counter.v)),
    });

    const tl = gsap.timeline({
      defaults: { ease: 'expo.out' },
      onComplete: () => {
        document.body.style.overflow = '';
        try { window.speechSynthesis?.cancel(); } catch (_) {}
        onDone?.();
      },
    });

    // Frame 1: MB inside ring — calm entry
    tl.fromTo(ringRef.current,
      { scale: 0.4, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.1, ease: 'expo.out' }
    )
    .fromTo(mbRef.current,
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.9 },
      '-=0.6'
    )
    .call(speak, null, 0.6)

    // Frame 2: intro lines — held longer, calmer
    .fromTo(line1Ref.current.children,
      { yPercent: 100 },
      { yPercent: 0, duration: 0.7, stagger: 0.04 },
      0.9
    )
    .to(line1Ref.current.children,
      { yPercent: -100, duration: 0.6, stagger: 0.03, ease: 'expo.in' },
      1.9
    )
    .fromTo(line2Ref.current.children,
      { yPercent: 100 },
      { yPercent: 0, duration: 0.7, stagger: 0.02 },
      2.15
    )
    .to(line2Ref.current.children,
      { yPercent: -100, duration: 0.6, stagger: 0.02, ease: 'expo.in' },
      3.05
    )

    // Frame 3: wordmark assembles
    .fromTo(wordmarkRef.current.querySelectorAll('.pl-word > span'),
      { yPercent: 110, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1.0, stagger: 0.07 },
      2.9
    )
    .to(mbRef.current, { opacity: 0, scale: 0.75, duration: 0.6 }, 3.0)

    // Frame 4: cinematic ring expansion → dissolves into hero
    .to(ringRef.current,
      { scale: 45, borderColor: 'rgba(255,255,255,0)', duration: 1.4, ease: 'expo.inOut' },
      3.9
    )
    .to(wordmarkRef.current, { opacity: 0, duration: 0.6 }, 4.6)
    .to(rootRef.current, { autoAlpha: 0, duration: 0.55, ease: 'power2.out' }, 4.9)
    .set(rootRef.current, { display: 'none' });

    return () => {
      tl.kill();
      document.body.style.overflow = '';
      try { window.speechSynthesis?.cancel(); } catch (_) {}
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
        <span className="preloader-count">{String(count).padStart(3, '0')}</span>
      </div>
    </div>
  );
}
