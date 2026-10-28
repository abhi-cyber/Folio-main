import React, { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';

export default function Preloader({ onDone }) {
  const root = useRef(null);
  const count = useRef(null);

  useGSAP(
    () => {
      const counter = { v: 0 };
      gsap
        .timeline({ onComplete: onDone })
        .to(counter, {
          v: 100,
          duration: 1.5,
          ease: 'power2.inOut',
          onUpdate: () => { if (count.current) count.current.textContent = String(Math.round(counter.v)).padStart(3, '0'); },
        })
        .to('.preloader__bar span', { scaleX: 1, duration: 1.5, ease: 'power2.inOut' }, 0)
        .to('.preloader__words span', { yPercent: -100, stagger: 0.4, duration: 0.45, ease: 'power3.inOut' }, 0.15)
        .to(root.current, { clipPath: 'inset(0 0 100% 0)', duration: 0.9, ease: 'expo.inOut' }, '+=0.1');
    },
    { scope: root }
  );

  return (
    <div ref={root} className="preloader" aria-hidden="true">
      <div className="preloader__words">
        <span>loading weights</span>
        <span>warming up agents</span>
        <span>retrieving context</span>
        <span>ready.</span>
      </div>
      <div className="preloader__count" ref={count}>000</div>
      <div className="preloader__bar"><span /></div>
    </div>
  );
}
