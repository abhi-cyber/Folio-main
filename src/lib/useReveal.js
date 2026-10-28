import { gsap, ScrollTrigger, useGSAP } from './gsap';

// Fade-up any `.reveal` element inside `scope` as it enters the viewport.
export function useReveal(scope) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set('.reveal', { y: 40, opacity: 0 });
        ScrollTrigger.batch('.reveal', {
          start: 'top 88%',
          once: true,
          onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, duration: 1, stagger: 0.08, ease: 'expo.out' }),
        });
      });
    },
    { scope }
  );
}
