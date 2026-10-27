import React, { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../lib/gsap';

// A dot + trailing ring. Grows over anything interactive; shows a label for [data-cursor].
export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) return;
    document.documentElement.classList.add('has-cursor');
    const xDot = gsap.quickTo(dot.current, 'x', { duration: 0.08 });
    const yDot = gsap.quickTo(dot.current, 'y', { duration: 0.08 });
    const xRing = gsap.quickTo(ring.current, 'x', { duration: 0.45, ease: 'power3' });
    const yRing = gsap.quickTo(ring.current, 'y', { duration: 0.45, ease: 'power3' });

    let shown = false;
    const move = (e) => {
      if (!shown) {
        shown = true;
        gsap.set([dot.current, ring.current], { x: e.clientX, y: e.clientY, opacity: 1 });
      }
      xDot(e.clientX); yDot(e.clientY); xRing(e.clientX); yRing(e.clientY);
    };
    const over = (e) => {
      const target = e.target.closest('a, button, input, textarea, [data-cursor], [role="button"]');
      const text = target?.closest('[data-cursor]')?.dataset.cursor || '';
      ring.current.classList.toggle('is-hover', !!target);
      ring.current.classList.toggle('is-label', !!text);
      label.current.textContent = text;
    };
    const down = () => ring.current.classList.add('is-down');
    const up = () => ring.current.classList.remove('is-down');
    const leave = () => gsap.to([dot.current, ring.current], { opacity: 0, duration: 0.2 });
    const enter = () => gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.2 });

    window.addEventListener('pointermove', move);
    window.addEventListener('pointerover', over);
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    document.addEventListener('mouseleave', leave);
    document.addEventListener('mouseenter', enter);
    return () => {
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', over);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      document.removeEventListener('mouseleave', leave);
      document.removeEventListener('mouseenter', enter);
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
      <div ref={ring} className="cursor-ring" aria-hidden="true"><span ref={label} /></div>
    </>
  );
}
