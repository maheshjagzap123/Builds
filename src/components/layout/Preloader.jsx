import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const WELCOME_KEY = 'mb.welcomePlayed.v2';

export default function Preloader({ onDone }) {
  const rootRef = useRef(null);
  const markRef = useRef(null);
  const wordRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let played = false;
    try { played = sessionStorage.getItem(WELCOME_KEY) === '1'; } catch (_) { /* storage may be unavailable */ }

    if (reduced || played) {
      if (rootRef.current) rootRef.current.style.display = 'none';
      onDone?.();
      return;
    }

    try { sessionStorage.setItem(WELCOME_KEY, '1'); } catch (_) { /* storage may be unavailable */ }
    document.body.style.overflow = 'hidden';

    const timeline = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        onDone?.();
      },
    });

    timeline
      .fromTo(markRef.current, { scale: 0.75, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: 'expo.out' })
      .fromTo(wordRef.current, { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: 'expo.out' }, '-=0.2')
      .to(rootRef.current, { autoAlpha: 0, duration: 0.4, ease: 'power2.out' }, '+=0.25')
      .set(rootRef.current, { display: 'none' });

    return () => {
      timeline.kill();
      document.body.style.overflow = '';
    };
  }, [onDone]);

  return (
    <div className="preloader preloader-compact" ref={rootRef} aria-hidden="true">
      <div className="preloader-compact-inner">
        <span className="preloader-compact-mark" ref={markRef}>MB</span>
        <span className="preloader-compact-word" ref={wordRef}>MAHESH BUILDS</span>
      </div>
    </div>
  );
}
