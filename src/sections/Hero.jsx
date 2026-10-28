import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap, SplitText, useGSAP, prefersReducedMotion } from '../lib/gsap';
import { useSectionNav } from '../lib/navigate';
import { useTheme } from '../lib/theme';
import { profile } from '../data/profile';
import Magnetic from '../components/Magnetic.jsx';
import LocalTime from '../components/LocalTime.jsx';

const NeuralScene = lazy(() => import('../components/NeuralScene.jsx'));

const rotating = ['agentic systems', 'fine-tuned LLMs', 'RAG pipelines', 'AI automation', 'AI-native teams'];

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch (e) {
    return false;
  }
}

export default function Hero({ ready }) {
  const root = useRef(null);
  const go = useSectionNav();
  const theme = useTheme();
  const [webgl] = useState(hasWebGL);
  const [word, setWord] = useState(0);
  const reduced = prefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setWord((w) => (w + 1) % rotating.length), 2400);
    return () => clearInterval(t);
  }, [reduced]);

  useGSAP(
    () => {
      if (!ready) return;
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const split = new SplitText('.hero__title .line', { type: 'words,chars', wordsClass: 'word', charsClass: 'char' });
        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
        tl.from(split.chars, { yPercent: 110, rotate: 8, opacity: 0, duration: 1.2, stagger: 0.025 })
          .from('.hero__eyebrow', { y: 20, opacity: 0, duration: 0.8 }, 0.2)
          .from('.hero__sub, .hero__ctas > *, .hero__meta > *', { y: 24, opacity: 0, duration: 0.9, stagger: 0.08 }, 0.5)
          .from('.neural', { scale: 0.6, opacity: 0, duration: 2, ease: 'power3.out' }, 0);

        gsap.to('.hero__content', {
          yPercent: -18, opacity: 0, ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        });
        gsap.to('.neural', {
          scale: 1.35, yPercent: 12, opacity: 0.15, ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        });
        return () => split.revert();
      });
    },
    { scope: root, dependencies: [ready] }
  );

  return (
    <section ref={root} className="hero" id="top">
      {webgl ? (
        <Suspense fallback={<div className="neural neural--fallback" />}>
          <NeuralScene light={theme === 'light'} reduced={reduced} />
        </Suspense>
      ) : (
        <div className="neural neural--fallback" />
      )}
      <div className="hero__glow" aria-hidden="true" />

      <div className="hero__content container">
        <p className="hero__eyebrow">
          <span className="pulse" aria-hidden="true" /> Now: {profile.role} at {profile.company}
        </p>
        <h1 className="hero__title" aria-label={profile.name}>
          <span className="line" aria-hidden="true">Abhiraj Singh</span>
          <span className="line line--outline" aria-hidden="true">Chatrath</span>
        </h1>
        <p className="hero__sub">
          I build{' '}
          <span className="hero__rotator" aria-live="off">
            {rotating.map((w, i) => (
              <span key={w} className={i === word ? 'is-on' : ''} aria-hidden={i !== word}>{w}</span>
            ))}
          </span>
          <br />
          for aerospace &amp; defense manufacturing, including places the cloud can't reach.
        </p>
        <div className="hero__ctas">
          <Magnetic>
            <button className="btn btn--accent" onClick={() => go('work')} data-cursor="scroll">
              See the work
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
            </button>
          </Magnetic>
          <Magnetic>
            <Link to="/resume" className="btn btn--ghost">Read my resume</Link>
          </Magnetic>
        </div>
        <div className="hero__meta">
          <span>{profile.location}</span>
          <LocalTime />
          <span className="hero__hint">Press <kbd>⌘</kbd><kbd>K</kbd> anywhere</span>
        </div>
      </div>

      <button className="hero__scroll" onClick={() => go('about')} aria-label="Scroll to about">
        <span />
      </button>
    </section>
  );
}
