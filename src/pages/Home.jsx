import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Preloader from '../components/Preloader.jsx';
import Hero from '../sections/Hero.jsx';
import Marquee from '../sections/Marquee.jsx';
import About from '../sections/About.jsx';
import Experience from '../sections/Experience.jsx';
import Work from '../sections/Work.jsx';
import Skills from '../sections/Skills.jsx';
import Ask from '../sections/Ask.jsx';
import Contact from '../sections/Contact.jsx';
import Footer from '../sections/Footer.jsx';
import { useReveal } from '../lib/useReveal';
import { scrollToTarget, lockScroll } from '../lib/smooth';
import { prefersReducedMotion } from '../lib/gsap';
import { profile } from '../data/profile';

function shouldPreload() {
  if (prefersReducedMotion()) return false;
  try {
    if (sessionStorage.getItem('preloaded')) return false;
    sessionStorage.setItem('preloaded', '1');
  } catch (e) { /* storage unavailable */ }
  return true;
}

export default function Home() {
  const root = useRef(null);
  const { hash } = useLocation();
  const [preload] = useState(shouldPreload);
  const [ready, setReady] = useState(!preload);

  useReveal(root);

  useEffect(() => {
    document.title = `${profile.name} · ${profile.role}`;
  }, []);

  useEffect(() => {
    lockScroll(!ready);
    if (ready && hash) setTimeout(() => scrollToTarget(hash), 400);
  }, [ready, hash]);

  return (
    <div ref={root}>
      {!ready && <Preloader onDone={() => setReady(true)} />}
      <Hero ready={ready} />
      <Marquee items={profile.headline.concat(['LangGraph', 'Air-gapped LLMs', 'Claude skills'])} />
      <About />
      <Experience />
      <Work />
      <Skills />
      <Ask />
      <Contact />
      <Footer />
    </div>
  );
}
