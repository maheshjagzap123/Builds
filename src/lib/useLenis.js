import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;

    // Refresh ScrollTrigger once layout + fonts settle, so triggers below the
    // fold always compute correct positions (prevents stuck opacity:0 sections).
    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 300);
    window.addEventListener('load', () => ScrollTrigger.refresh());

    // On touch devices use native scrolling — Lenis smooth-scroll on mobile is
    // the usual cause of blank / stuck scroll regions. Only smooth on desktop.
    if (prefersReduced || isTouch) {
      return () => clearTimeout(refreshTimer);
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    const rafId = requestAnimationFrame(raf);

    gsap.ticker.lagSmoothing(0);

    return () => {
      clearTimeout(refreshTimer);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
}
