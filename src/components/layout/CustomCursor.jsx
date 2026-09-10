import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

/**
 * Custom cursor:
 *   - Small center dot that snaps to the pointer
 *   - Outer ring that eases toward the pointer
 *   - On [data-cursor] elements the ring scales up and optionally shows a label
 * Desktop only. Native cursor hidden via `body.has-custom-cursor`.
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [label, setLabel] = useState('');

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    document.body.classList.add('has-custom-cursor');

    const state = { x: -100, y: -100, rx: -100, ry: -100 };
    const dot = dotRef.current;
    const ring = ringRef.current;

    const onMove = (e) => {
      state.x = e.clientX;
      state.y = e.clientY;
      // Dot follows immediately (subtle, no easing)
      gsap.set(dot, { x: state.x, y: state.y });
    };

    const raf = () => {
      // Ring eases toward pointer
      state.rx += (state.x - state.rx) * 0.18;
      state.ry += (state.y - state.ry) * 0.18;
      if (ring) ring.style.transform = `translate3d(${state.rx}px, ${state.ry}px, 0) translate(-50%, -50%)`;
      req = requestAnimationFrame(raf);
    };
    let req = requestAnimationFrame(raf);

    const onOver = (e) => {
      const t = e.target.closest('[data-cursor]');
      if (t) {
        ring.classList.add('is-hover');
        const kind = t.getAttribute('data-cursor');
        const l = t.getAttribute('data-cursor-label') || '';
        if (kind === 'view') ring.classList.add('is-view');
        setLabel(l);
      } else {
        ring.classList.remove('is-hover', 'is-view');
        setLabel('');
      }
    };

    const onDown = () => ring.classList.add('is-down');
    const onUp = () => ring.classList.remove('is-down');
    const onLeave = () => {
      gsap.to([dot, ring], { autoAlpha: 0, duration: 0.2 });
    };
    const onEnter = () => {
      gsap.to([dot, ring], { autoAlpha: 1, duration: 0.2 });
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      cancelAnimationFrame(req);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.body.classList.remove('has-custom-cursor');
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef} aria-hidden="true" />
      <div className="cursor-ring" ref={ringRef} aria-hidden="true">
        <span className="cursor-ring-label">{label}</span>
      </div>
    </>
  );
}
