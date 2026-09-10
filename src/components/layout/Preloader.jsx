import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * Cinematic welcome:
 *   Person-in-Namaste line figure + MB, ~2s total.
 *   Optional voice via SpeechSynthesis ("Welcome to Mahesh Builds"). Never blocks.
 *   Runs once per session (sessionStorage).
 */
const NAMASTE_KEY = 'mb.welcomePlayed';

export default function Preloader({ onDone }) {
  const rootRef = useRef(null);
  const ringRef = useRef(null);
  const figureRef = useRef(null);
  const mbRef = useRef(null);
  const wordmarkRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const played = typeof sessionStorage !== 'undefined' && sessionStorage.getItem(NAMASTE_KEY) === '1';

    if (prefersReduced || played) {
      if (rootRef.current) rootRef.current.style.display = 'none';
      onDone?.();
      return;
    }

    document.body.style.overflow = 'hidden';
    try { sessionStorage.setItem(NAMASTE_KEY, '1'); } catch (_) {}

    // --- Optional audio: SpeechSynthesis. Never awaited, never blocks. ---
    const speakWelcome = () => {
      try {
        if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
        const utter = new SpeechSynthesisUtterance('Welcome to Mahesh Builds');
        utter.rate = 0.95;
        utter.pitch = 1.0;
        utter.volume = 0.9;
        // Prefer an English voice if available
        const voices = window.speechSynthesis.getVoices();
        const preferred = voices.find((v) => /en(-|_)?(us|gb|in)/i.test(v.lang)) || voices[0];
        if (preferred) utter.voice = preferred;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utter);
      } catch (_) { /* silent — audio is optional */ }
    };

    // --- Animation timeline (~2s) ---
    const tl = gsap.timeline({
      defaults: { ease: 'expo.out' },
      onComplete: () => {
        document.body.style.overflow = '';
        try { window.speechSynthesis?.cancel(); } catch (_) {}
        onDone?.();
      },
    });

    tl
      // 0.00 – 0.35s : figure fades and lifts in
      .fromTo(figureRef.current,
        { opacity: 0, y: 14, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 0.55 })
      // Subtle bow / greeting: rotate the figure slightly forward and back
      .to(figureRef.current, { rotate: 3, duration: 0.35, ease: 'sine.inOut' }, 0.35)
      .to(figureRef.current, { rotate: 0, duration: 0.35, ease: 'sine.inOut' }, 0.70)

      // 0.40s : MB slides up beneath
      .fromTo(mbRef.current,
        { opacity: 0, yPercent: 60 },
        { opacity: 1, yPercent: 0, duration: 0.55 }, 0.40)

      // 0.50s : ring draws around
      .fromTo(ringRef.current,
        { strokeDashoffset: 500 },
        { strokeDashoffset: 0, duration: 0.9, ease: 'power2.inOut' }, 0.50)

      // 0.60s : trigger voice (well within animation, non-blocking)
      .call(speakWelcome, null, 0.60)

      // 1.15s : wordmark assembles
      .fromTo(wordmarkRef.current.querySelectorAll('.pl-word > span'),
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.05 }, 1.15)

      // 1.55s : ring expands into hero background
      .to(ringRef.current, { scale: 45, opacity: 0.4, duration: 0.65, ease: 'expo.inOut' }, 1.55)
      .to(figureRef.current, { opacity: 0, scale: 0.85, duration: 0.5 }, 1.55)
      .to(mbRef.current, { opacity: 0, duration: 0.4 }, 1.55)

      // 1.90s : fade out
      .to(wordmarkRef.current, { opacity: 0, duration: 0.4 }, 1.85)
      .to(rootRef.current, { autoAlpha: 0, duration: 0.35 }, 1.90)
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
        <div className="pl-symbol">
          <svg
            className="pl-ring"
            width="220"
            height="220"
            viewBox="0 0 220 220"
            aria-hidden="true"
          >
            <circle
              ref={ringRef}
              cx="110"
              cy="110"
              r="80"
              fill="none"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="1"
              strokeDasharray="502"
              strokeDashoffset="502"
              transform="rotate(-90 110 110)"
              style={{ transformOrigin: '110px 110px' }}
            />
          </svg>

          {/* Namaste figure — minimalist line SVG */}
          <svg
            ref={figureRef}
            className="pl-figure"
            width="90"
            height="120"
            viewBox="0 0 90 120"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Head */}
            <circle cx="45" cy="18" r="8" />
            {/* Neck / shoulders */}
            <path d="M45 26 V34" />
            <path d="M30 42 Q45 34 60 42" />
            {/* Torso */}
            <path d="M32 42 L36 82" />
            <path d="M58 42 L54 82" />
            {/* Arms folded in namaste — meeting at chest */}
            <path d="M32 42 Q28 55 40 60" />
            <path d="M58 42 Q62 55 50 60" />
            {/* Hands together (praying) */}
            <path d="M40 60 L45 66 L50 60 Z" fill="currentColor" fillOpacity="0.15" />
            <path d="M45 60 V70" />
            {/* Legs */}
            <path d="M36 82 L34 118" />
            <path d="M54 82 L56 118" />
          </svg>

          <div className="pl-mb" ref={mbRef}>MB</div>
        </div>

        <div className="preloader-wordmark" ref={wordmarkRef}>
          <span className="pl-word"><span>MAHESH</span></span>
          <span className="pl-word"><span>BUILDS</span></span>
        </div>
      </div>

      <div className="preloader-bar">
        <span className="preloader-tag">Welcome</span>
        <span className="preloader-tag">Mahesh Builds</span>
      </div>
    </div>
  );
}
