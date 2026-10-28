import React, { useRef } from 'react';
import { gsap, SplitText, useGSAP } from '../lib/gsap';
import { profile, stats } from '../data/profile';
import SectionHead from '../components/SectionHead.jsx';

export default function About() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const split = new SplitText('.about__statement', { type: 'words', wordsClass: 'word' });
        gsap.fromTo(split.words, { opacity: 0.14 }, {
          opacity: 1, stagger: 0.1, ease: 'none',
          scrollTrigger: { trigger: '.about__statement', start: 'top 80%', end: 'bottom 45%', scrub: true },
        });
        gsap.utils.toArray('.stat__value').forEach((el) => {
          const target = parseFloat(el.dataset.value);
          const decimals = parseInt(el.dataset.decimals || '0', 10);
          if (el.dataset.display) return;
          const obj = { v: 0 };
          gsap.to(obj, {
            v: target, duration: 1.8, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
            onUpdate: () => { el.textContent = obj.v.toFixed(decimals); },
          });
        });
        gsap.from('.stat', {
          y: 40, opacity: 0, stagger: 0.1, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: '.about__stats', start: 'top 85%' },
        });
        return () => split.revert();
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="about" className="section about container">
      <SectionHead index="01" label="About" title="Shipping AI where it actually has to work." />
      <p className="about__statement">
        I lead AI engineering at iBase-t, the company behind Solumina MES, the system that runs production lines for aerospace and defense manufacturers. My job is to make LLMs useful in places that are hostile to them: air-gapped plants, strict accuracy bars, and teams who have never written a prompt. I fine-tune and serve open-source models on-premise, design agentic workflows with LangGraph, research better retrieval, and teach everyone around me to work with AI.
      </p>
      <div className="about__stats">
        {stats.map((s) => (
          <div className="stat" key={s.label}>
            <div className="stat__num">
              <span className="stat__value" data-value={s.value} data-decimals={s.decimals || 0} data-display={s.display || undefined}>
                {s.display || (s.decimals ? s.value.toFixed(s.decimals) : s.value)}
              </span>
              <span className="stat__suffix">{s.suffix}</span>
            </div>
            <p>{s.label}</p>
          </div>
        ))}
      </div>
      <p className="about__summary sr-only">{profile.summary}</p>
    </section>
  );
}
