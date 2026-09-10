import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const [label, setLabel] = useState('');

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const state = { x: 0, y: 0, rx: 0, ry: 0 };
    const dotEl = dot.current;
    const ringEl = ring.current;

    const onMove = (e) => {
      state.x = e.clientX;
      state.y = e.clientY;
      gsap.to(dotEl, { x: state.x, y: state.y, duration: 0.05, ease: 'none' });
    };

    const raf = () => {
      state.rx += (state.x - state.rx) * 0.15;
      state.ry += (state.y - state.ry) * 0.15;
      if (ringEl) {
        ringEl.style.transform = `translate3d(${state.rx}px, ${state.ry}px, 0) translate(-50%, -50%)`;
      }
      req = requestAnimationFrame(raf);
    };
    let req = requestAnimationFrame(raf);

    const onOver = (e) => {
      const t = e.target.closest('[data-cursor]');
      if (t) {
        ringEl.classList.add('hover');
        const l = t.getAttribute('data-cursor-label') || '';
        setLabel(l);
      } else {
        ringEl.classList.remove('hover');
        setLabel('');
      }
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    return () => {
      cancelAnimationFrame(req);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dot} />
      <div className="cursor-ring" ref={ring}>
        <span className="cursor-label">{label}</span>
      </div>
    </>
  );
}
