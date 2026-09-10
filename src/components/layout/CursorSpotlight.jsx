import { useEffect, useRef } from 'react';

/**
 * A soft radial glow that trails the cursor with easing.
 * Desktop only. Skipped for reduced-motion and touch devices.
 */
export default function CursorSpotlight() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const el = ref.current;
    if (!el) return;

    const state = { x: window.innerWidth / 2, y: window.innerHeight / 2, rx: 0, ry: 0, active: false };

    const onMove = (e) => {
      state.x = e.clientX;
      state.y = e.clientY;
      if (!state.active) {
        state.active = true;
        el.style.opacity = '1';
      }
    };
    const onLeave = () => {
      state.active = false;
      el.style.opacity = '0';
    };

    let req;
    const raf = () => {
      state.rx += (state.x - state.rx) * 0.12;
      state.ry += (state.y - state.ry) * 0.12;
      el.style.transform = `translate3d(${state.rx}px, ${state.ry}px, 0) translate(-50%, -50%)`;
      req = requestAnimationFrame(raf);
    };
    req = requestAnimationFrame(raf);

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(req);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return <div className="cursor-spotlight" ref={ref} aria-hidden="true" />;
}
