import React, { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { experience } from '../data/profile';
import SectionHead from '../components/SectionHead.jsx';

export default function Experience() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo('.timeline__progress', { scaleY: 0 }, {
          scaleY: 1, ease: 'none',
          scrollTrigger: { trigger: '.timeline', start: 'top 60%', end: 'bottom 60%', scrub: true },
        });
        gsap.utils.toArray('.job').forEach((job) => {
          gsap.utils.toArray(job.querySelectorAll('.job__head, .role')).forEach((el) => {
            gsap.from(el, {
              y: 30, opacity: 0, duration: 0.9, ease: 'expo.out',
              scrollTrigger: { trigger: el, start: 'top 88%' },
            });
          });
          gsap.fromTo(job.querySelector('.job__node'), { scale: 0 }, {
            scale: 1, duration: 0.6, ease: 'back.out(3)',
            scrollTrigger: { trigger: job, start: 'top 60%', toggleActions: 'play none none reverse' },
          });
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="experience" className="section experience container">
      <SectionHead index="02" label="Experience" title="From intern to leading the AI team.">
        Five stops, one direction: closer to the model, closer to the business.
      </SectionHead>
      <div className="timeline">
        <div className="timeline__rail" aria-hidden="true"><span className="timeline__progress" /></div>
        {experience.map((job) => (
          <article className="job" key={job.company}>
            <span className="job__node" aria-hidden="true" />
            <header className="job__head">
              <h3>{job.company}</h3>
              <p className="job__loc mono">{job.location}</p>
              {job.blurb && <p className="job__blurb">{job.blurb}</p>}
            </header>
            <div className="job__roles">
              {job.roles.map((r) => (
                <div className={`role ${r.current ? 'role--current' : ''}`} key={r.title}>
                  <div className="role__top">
                    <h4>{r.title}</h4>
                    <span className="role__period mono">
                      {r.current && <span className="pulse" aria-hidden="true" />}
                      {r.period}
                    </span>
                  </div>
                  <ul>
                    {r.points.map((p) => <li key={p}>{p}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
