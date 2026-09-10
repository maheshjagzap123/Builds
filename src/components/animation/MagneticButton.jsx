import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function MagneticButton({ children, className = '', href, onClick, type = 'button', strength = 0.35, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      gsap.to(el, { x: relX * strength, y: relY * strength, duration: 0.6, ease: 'power3.out' });
    };
    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' });
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [strength]);

  const Cmp = href ? 'a' : 'button';
  return (
    <Cmp
      ref={ref}
      className={className}
      href={href}
      onClick={onClick}
      type={href ? undefined : type}
      data-cursor="hover"
      {...rest}
    >
      {children}
    </Cmp>
  );
}
