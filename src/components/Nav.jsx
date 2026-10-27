import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { sections, useSectionNav } from '../lib/navigate';
import { toggleTheme, useTheme } from '../lib/theme';
import { lockScroll } from '../lib/smooth';
import Magnetic from './Magnetic.jsx';

export default function Nav({ onOpenPalette }) {
  const go = useSectionNav();
  const theme = useTheme();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > last && y > 400);
      if (y < window.innerHeight * 0.5) setActive('');
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== '/') { setActive(''); return; }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    const t = setTimeout(() => sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    }), 200);
    return () => { clearTimeout(t); io.disconnect(); };
  }, [pathname]);

  useEffect(() => {
    lockScroll(menu);
    document.body.classList.toggle('menu-open', menu);
  }, [menu]);

  const pick = (id) => { setMenu(false); go(id); };

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${hidden && !menu ? 'is-hidden' : ''}`}>
      <div className="nav__inner">
        <Link to="/" className="nav__logo" aria-label="Home" onClick={() => setMenu(false)}>
          <span className="nav__mark">AS</span>
          <span className="nav__name">Abhiraj<em>.ai</em></span>
        </Link>

        <nav className="nav__links" aria-label="Sections">
          {sections.map((s) => (
            <button key={s.id} className={active === s.id ? 'is-active' : ''} onClick={() => pick(s.id)}>
              {s.label}
            </button>
          ))}
        </nav>

        <div className="nav__actions">
          <button className="nav__kbd" onClick={onOpenPalette} aria-label="Open command menu">
            <kbd>⌘</kbd><kbd>K</kbd>
          </button>
          <button className="nav__icon" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="4.5" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" /></svg>
            )}
          </button>
          <Magnetic>
            <Link to="/resume" className="btn btn--small btn--accent" onClick={() => setMenu(false)}>Resume</Link>
          </Magnetic>
          <button className={`nav__burger ${menu ? 'is-open' : ''}`} onClick={() => setMenu((m) => !m)} aria-label="Menu" aria-expanded={menu}>
            <span /><span />
          </button>
        </div>
      </div>

      <div className={`nav__sheet ${menu ? 'is-open' : ''}`} aria-hidden={!menu}>
        {sections.map((s, i) => (
          <button key={s.id} style={{ '--i': i }} onClick={() => pick(s.id)} tabIndex={menu ? 0 : -1}>
            <span>0{i + 1}</span>{s.label}
          </button>
        ))}
      </div>
    </header>
  );
}
