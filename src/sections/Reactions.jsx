import React, { useEffect, useState } from 'react';
import { gsap } from '../lib/gsap';
import { toast } from '../lib/toast';

const options = [
  { id: 'wave', emoji: '👋', label: 'Say hi' },
  { id: 'fire', emoji: '🔥', label: 'This is fire' },
  { id: 'rocket', emoji: '🚀', label: 'Ship it' },
  { id: 'brain', emoji: '🧠', label: 'Big brain' },
  { id: 'heart', emoji: '💜', label: 'Love it' },
];

const STORAGE = 'reacted-v1';

function readMine() {
  try { return JSON.parse(localStorage.getItem(STORAGE) || '[]'); } catch (e) { return []; }
}

function burst(target, emoji) {
  const r = target.getBoundingClientRect();
  for (let i = 0; i < 10; i++) {
    const p = document.createElement('span');
    p.className = 'burst';
    p.textContent = emoji;
    p.style.left = `${r.left + r.width / 2}px`;
    p.style.top = `${r.top + r.height / 2}px`;
    document.body.appendChild(p);
    gsap.to(p, {
      x: gsap.utils.random(-120, 120),
      y: gsap.utils.random(-160, -40),
      rotation: gsap.utils.random(-90, 90),
      opacity: 0,
      scale: gsap.utils.random(0.6, 1.4),
      duration: gsap.utils.random(0.8, 1.3),
      ease: 'power2.out',
      onComplete: () => p.remove(),
    });
  }
}

export default function Reactions() {
  const [counts, setCounts] = useState(null);
  const [mine, setMine] = useState(readMine);

  useEffect(() => {
    fetch('/api/reactions')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setCounts)
      .catch(() => setCounts(null));
  }, []);

  const react = async (o, e) => {
    burst(e.currentTarget, o.emoji);
    if (mine.includes(o.id)) {
      toast('Already counted. Thanks for the love!', 'info');
      return;
    }
    const next = [...mine, o.id];
    setMine(next);
    try { localStorage.setItem(STORAGE, JSON.stringify(next)); } catch (err) { /* storage unavailable */ }
    setCounts((c) => (c ? { ...c, [o.id]: (c[o.id] || 0) + 1 } : c));
    try {
      const res = await fetch('/api/reactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emoji: o.id }),
      });
      if (!res.ok) throw new Error();
      setCounts(await res.json());
      toast(`${o.emoji} Reaction sent. Thank you!`, 'success');
    } catch (err) {
      toast(`${o.emoji} Thanks! (Live counts are offline right now.)`, 'info');
    }
  };

  return (
    <div className="reactions">
      <p className="reactions__label">Leave a reaction. Everyone sees the live count.</p>
      <div className="reactions__row">
        {options.map((o) => (
          <button
            key={o.id}
            className={`reaction ${mine.includes(o.id) ? 'is-mine' : ''}`}
            onClick={(e) => react(o, e)}
            aria-label={`${o.label}${counts ? `, ${counts[o.id]} so far` : ''}`}
            data-cursor={o.label}
          >
            <span className="reaction__emoji" aria-hidden="true">{o.emoji}</span>
            {counts && <span className="reaction__count mono">{counts[o.id]}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
