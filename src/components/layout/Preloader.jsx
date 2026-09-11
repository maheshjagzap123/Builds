import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * Intro preloader — ~2s, plays once per browser session.
 *
 *   Frame 1  (0.00–0.55s)  Namaste mark draws in (minimal line + solid, no emoji)
 *   Frame 2  (0.45–0.95s)  MB monogram settles beneath the mark
 *   Frame 3  (0.85–1.55s)  "Welcome to Mahesh Builds." reveals
 *   Frame 4  (1.55–2.00s)  Whole stage lifts + fades → hands off to Hero
 *
 * - No loading counter, no filler copy.
 * - Optional spoken welcome; never blocks the transition if autoplay is unavailable.
 * - Skipped on internal hash navigation (session-once) and for prefers-reduced-motion.
 * - Restores scroll on complete and on unmount; GSAP timeline is killed on cleanup.
 */

const PLAYED_KEY = 'mb.introPlayed';

export default function Preloader({ onDone }) {
  const rootRef = useRef(null);
  const markRef = useRef(null);
  const strokeRefs = useRef([]);
  const mbRef = useRef(null);
  const welcomeRef = useRef(null);
  const stageRef = useRef(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const alreadyPlayed =
      typeof sessionStorage !== 'undefined' &&
      sessionStorage.getItem(PLAYED_KEY) === '1';

    const finish = () => {
      document.body.style.overflow = '';
      try { window.speechSynthesis?.cancel(); } catch (_) { /* silent */ }
      onDone?.();
    };

    // Skip entirely: reduced motion, or already shown this session (internal nav).
    if (prefersReduced || alreadyPlayed) {
      if (rootRef.current) rootRef.current.style.display = 'none';
      finish();
      return;
    }

    try { sessionStorage.setItem(PLAYED_KEY, '1'); } catch (_) { /* silent */ }

    document.body.style.overflow = 'hidden';

    // Optional voice — fire-and-forget, wrapped so a blocked autoplay never stalls us.
    const speak = () => {
      try {
        if (!('speechSynthesis' in window)) return;
        const u = new SpeechSynthesisUtterance('Welcome to Mahesh Builds');
        u.rate = 0.98;
        u.pitch = 1.0;
        u.volume = 0.8;
        const voices = window.speechSynthesis.getVoices();
        const preferred =
          voices.find((v) => /en(-|_)?(gb|in|us)/i.test(v.lang)) || voices[0];
        if (preferred) u.voice = preferred;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(u);
      } catch (_) { /* silent */ }
    };

    const strokes = strokeRefs.current.filter(Boolean);

    // Prime stroke-draw for the namaste mark.
    strokes.forEach((el) => {
      const len = el.getTotalLength ? el.getTotalLength() : 200;
      gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
    });

    const tl = gsap.timeline({
      defaults: { ease: 'expo.out' },
      onComplete: finish,
    });

    // Frame 1 — namaste mark: container settles, strokes draw, solid fill fades up.
    tl.fromTo(markRef.current,
      { opacity: 0, scale: 0.86, y: 8 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5 },
      0
    )
      .to(strokes, { strokeDashoffset: 0, duration: 0.55, stagger: 0.05 }, 0.05)
      .fromTo('.pl-fill',
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        0.35
      )
      .call(speak, null, 0.5)

      // Frame 2 — MB monogram rises beneath the mark.
      .fromTo(mbRef.current,
        { yPercent: 60, opacity: 0, letterSpacing: '0.2em' },
        { yPercent: 0, opacity: 1, letterSpacing: '0.02em', duration: 0.5 },
        0.5
      )

      // Frame 3 — welcome line clips in.
      .fromTo(welcomeRef.current,
        { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
        { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 0.6, ease: 'power3.out' },
        0.9
      )

      // Frame 4 — stage lifts + fades, then the whole overlay clears for the Hero.
      .to(stageRef.current,
        { y: -24, opacity: 0, duration: 0.45, ease: 'power2.in' },
        1.55
      )
      .to(rootRef.current,
        { autoAlpha: 0, duration: 0.4, ease: 'power2.out' },
        1.6
      )
      .set(rootRef.current, { display: 'none' });

    return () => {
      tl.kill();
      document.body.style.overflow = '';
      try { window.speechSynthesis?.cancel(); } catch (_) { /* silent */ }
    };
  }, [onDone]);

  const setStroke = (i) => (el) => { strokeRefs.current[i] = el; };

  return (
    <div className="preloader intro-preloader" ref={rootRef} aria-hidden="true">
      <div className="intro-stage" ref={stageRef}>
        {/* Namaste mark — geometric line + solid, deliberately not illustrative */}
        <div className="intro-mark" ref={markRef}>
          <svg viewBox="0 0 120 140" width="112" height="130" fill="none" role="presentation">
            {/* head */}
            <circle
              className="pl-fill"
              cx="60" cy="26" r="12"
              fill="currentColor"
            />
            {/* joined hands / prayer diamond — line stroke that draws in */}
            <path
              ref={setStroke(0)}
              d="M60 44 L88 92 L60 108 L32 92 Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            {/* shoulders / arms rising to the hands */}
            <path
              ref={setStroke(1)}
              d="M32 92 C20 104, 18 120, 22 132 M88 92 C100 104, 102 120, 98 132"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* centre line of the pressed palms */}
            <path
              ref={setStroke(2)}
              d="M60 50 L60 104"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.55"
            />
          </svg>
        </div>

        <div className="intro-mb" ref={mbRef}>MB</div>

        <div className="intro-welcome" ref={welcomeRef}>
          Welcome to <span className="serif">Mahesh Builds.</span>
        </div>
      </div>
    </div>
  );
}
