import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap, useGSAP } from '../lib/gsap';
import { copyText } from '../lib/copy';
import { profile, experience, skills, education } from '../data/profile';
import '../styles/resume.css';

export default function Resume() {
  const root = useRef(null);

  useEffect(() => {
    document.title = `Resume · ${profile.name}`;
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.timeline({ defaults: { ease: 'expo.out' } })
          .from('.cv-toolbar > *', { y: -20, opacity: 0, stagger: 0.06, duration: 0.8 })
          .from('.cv-sheet', { y: 80, opacity: 0, rotateX: 8, transformPerspective: 1200, duration: 1.2 }, 0.1)
          .from('.cv-sheet .cv-anim', { y: 18, opacity: 0, stagger: 0.035, duration: 0.8 }, 0.45);
      });
    },
    { scope: root }
  );

  return (
    <div ref={root} className="cv-page">
      <div className="cv-toolbar container">
        <Link to="/" className="cv-back">← Back to site</Link>
        <div className="cv-actions">
          <button className="btn btn--ghost btn--small" onClick={() => copyText(window.location.href, 'Resume link copied')}>Copy link</button>
          <button className="btn btn--ghost btn--small" onClick={() => window.print()}>Print</button>
          <a className="btn btn--accent btn--small" href={profile.resumePdf} download="Abhiraj_Singh_Chatrath_Resume.pdf">
            Download PDF
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 4v12M6 10l6 6 6-6M5 20h14" /></svg>
          </a>
        </div>
      </div>

      <article className="cv-sheet" aria-label="Resume">
        <header className="cv-header cv-anim">
          <div>
            <h1>{profile.name}</h1>
            <p className="cv-title">Lead AI Engineer · Agentic AI &amp; Automation · LLM Fine-Tuning · RAG · AI Enablement</p>
          </div>
          <ul className="cv-contact">
            <li>{profile.location}</li>
            <li><a href={`mailto:${profile.email}`}>{profile.email}</a></li>
            <li><a href="https://www.linkedin.com/in/abhiraj-singh-chatrath/" target="_blank" rel="noreferrer">linkedin.com/in/abhiraj-singh-chatrath</a></li>
            <li><a href="https://github.com/abhi-cyber" target="_blank" rel="noreferrer">github.com/abhi-cyber</a></li>
          </ul>
        </header>

        <section className="cv-section">
          <h2 className="cv-anim">Summary</h2>
          <p className="cv-anim">{profile.summary}</p>
        </section>

        <section className="cv-section">
          <h2 className="cv-anim">Experience</h2>
          {experience.map((job) => (
            <div className="cv-job" key={job.company}>
              <div className="cv-row cv-anim">
                <h3>{job.company}</h3>
                <span>{job.location}</span>
              </div>
              {job.blurb && <p className="cv-blurb cv-anim">{job.blurb}</p>}
              {job.roles.map((r) => (
                <div className="cv-role" key={r.title}>
                  <div className="cv-row cv-anim">
                    <h4>{r.title}</h4>
                    <span>{r.period}</span>
                  </div>
                  <ul>
                    {r.points.map((p) => <li className="cv-anim" key={p}>{p}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </section>

        <section className="cv-section">
          <h2 className="cv-anim">Technical skills</h2>
          <dl className="cv-skills">
            {skills.map((s) => (
              <div className="cv-anim" key={s.group}>
                <dt>{s.group}</dt>
                <dd>{s.items.join(', ')}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="cv-section">
          <h2 className="cv-anim">Education</h2>
          <div className="cv-row cv-anim">
            <p><strong>{education.degree}</strong>, {education.school} · {education.grade}</p>
            <span>{education.period}</span>
          </div>
          <p className="cv-anim"><strong>Certification:</strong> {education.certification}</p>
        </section>
      </article>

      <p className="cv-foot container mono">Prefer the original? <a href={profile.resumePdf} target="_blank" rel="noreferrer">Open the PDF in a new tab ↗</a></p>
    </div>
  );
}
