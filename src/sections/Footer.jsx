import React from 'react';
import { Link } from 'react-router-dom';
import { profile } from '../data/profile';
import { scrollToTarget } from '../lib/smooth';
import Marquee from './Marquee.jsx';

export default function Footer() {
  return (
    <footer className="footer">
      <Marquee items={['Open to interesting AI problems', 'Agents that actually ship', 'LLMs without the cloud', 'Teaching teams to use AI']} />
      <div className="footer__inner container">
        <div>
          <p className="footer__big">Abhiraj<em>.ai</em></p>
          <p className="footer__tag">{profile.role} · {profile.location}</p>
        </div>
        <nav className="footer__links" aria-label="Footer">
          <Link to="/resume">Resume</Link>
          <a href={profile.resumePdf} target="_blank" rel="noreferrer">PDF</a>
          {profile.socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label}</a>
          ))}
        </nav>
        <button className="footer__top" onClick={() => scrollToTarget(document.body)} aria-label="Back to top">↑</button>
      </div>
      <p className="footer__fine container mono">© {new Date().getFullYear()} {profile.name}. Built with React, GSAP, Three.js &amp; Lenis.</p>
    </footer>
  );
}
