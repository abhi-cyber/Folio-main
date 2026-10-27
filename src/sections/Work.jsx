import React, { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { caseStudies, sideProjects } from '../data/profile';
import SectionHead from '../components/SectionHead.jsx';
import Tilt from '../components/Tilt.jsx';
import { scrollToTarget } from '../lib/smooth';

export default function Work() {
  const root = useRef(null);
  const track = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
        const distance = () => track.current.scrollWidth - window.innerWidth;
        const tween = gsap.to(track.current, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: '.cases',
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
        gsap.to('.cases__bar span', {
          scaleX: 1, ease: 'none',
          scrollTrigger: { trigger: '.cases', start: 'top top', end: () => `+=${distance()}`, scrub: true },
        });
        gsap.utils.toArray('.case').forEach((card) => {
          gsap.from(card.querySelector('.case__inner'), {
            rotateY: -18, opacity: 0.3, ease: 'none',
            scrollTrigger: { trigger: card, containerAnimation: tween, start: 'left 100%', end: 'left 55%', scrub: true },
          });
        });
      });
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.side', {
          y: 60, opacity: 0, duration: 1, stagger: 0.1, ease: 'expo.out',
          scrollTrigger: { trigger: '.sides', start: 'top 80%' },
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="work" className="section work">
      <div className="container">
        <SectionHead index="03" label="Selected work" title="Systems I've designed and shipped.">
          Most of my recent work runs inside customers' factories, so these are written as case studies rather than links.
        </SectionHead>
      </div>

      <div className="cases">
        <div className="cases__track" ref={track}>
          {caseStudies.map((c, i) => (
            <article className="case" key={c.id} style={{ '--accent-case': c.accent }}>
              <Tilt className="case__inner" max={6}>
                <div className="case__top">
                  <span className="mono">{String(i + 1).padStart(2, '0')} / {String(caseStudies.length).padStart(2, '0')}</span>
                  <span className="case__kicker">{c.kicker}</span>
                </div>
                <h3>{c.title}</h3>
                <dl>
                  <dt>Problem</dt>
                  <dd>{c.problem}</dd>
                  <dt>What I built</dt>
                  <dd>{c.built}</dd>
                </dl>
                <ul className="chips">
                  {c.stack.map((s) => <li key={s}>{s}</li>)}
                </ul>
                <span className="case__orb" aria-hidden="true" />
              </Tilt>
            </article>
          ))}
          <article className="case case--cta">
            <div className="case__inner">
              <p className="mono">Want the details?</p>
              <h3>Architecture, evals and trade-offs are easier to walk through live.</h3>
              <a href="#contact" className="btn btn--accent" onClick={(e) => { e.preventDefault(); scrollToTarget('#contact'); }}>Let's talk</a>
            </div>
          </article>
        </div>
        <div className="cases__bar" aria-hidden="true"><span /></div>
      </div>

      <div className="container">
        <h3 className="sides__title reveal">Open source &amp; side projects</h3>
        <div className="sides">
          {sideProjects.map((p) => (
            <Tilt as="article" className="side" key={p.title} max={5} data-cursor="open">
              <a href={p.live} target="_blank" rel="noreferrer" className="side__img" tabIndex={-1} aria-hidden="true">
                <img src={p.image} alt="" loading="lazy" decoding="async" />
              </a>
              <div className="side__body">
                <div className="side__tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
                <h4>{p.title}</h4>
                <p>{p.description}</p>
                <div className="side__links">
                  <a href={p.live} target="_blank" rel="noreferrer">Live ↗</a>
                  <a href={p.code} target="_blank" rel="noreferrer">Code ↗</a>
                </div>
              </div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}
