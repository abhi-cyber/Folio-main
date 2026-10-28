import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sections, useSectionNav } from '../lib/navigate';
import { toggleTheme } from '../lib/theme';
import { lockScroll } from '../lib/smooth';
import { copyText } from '../lib/copy';
import { profile } from '../data/profile';

export default function CommandPalette({ open, onClose }) {
  const go = useSectionNav();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState(0);
  const input = useRef(null);

  const actions = useMemo(
    () => [
      ...sections.map((s) => ({ group: 'Navigate', label: `Go to ${s.label}`, run: () => go(s.id) })),
      { group: 'Resume', label: 'Open resume page', run: () => navigate('/resume') },
      { group: 'Resume', label: 'Download resume (PDF)', run: () => window.open(profile.resumePdf, '_blank') },
      { group: 'Contact', label: 'Copy email address', run: () => copyText(profile.email, 'Email copied') },
      { group: 'Contact', label: 'Send an email', run: () => (window.location.href = `mailto:${profile.email}`) },
      ...profile.socials.map((s) => ({ group: 'Social', label: `Open ${s.label}`, run: () => window.open(s.href, '_blank', 'noopener') })),
      { group: 'Preferences', label: 'Toggle light / dark theme', run: toggleTheme },
    ],
    [go, navigate]
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? actions.filter((a) => `${a.group} ${a.label}`.toLowerCase().includes(q)) : actions;
  }, [actions, query]);

  useEffect(() => {
    lockScroll(open);
    if (open) {
      setQuery('');
      setIndex(0);
      setTimeout(() => input.current?.focus(), 30);
    }
  }, [open]);

  useEffect(() => setIndex(0), [query]);

  if (!open) return null;

  const run = (a) => { onClose(); setTimeout(a.run, 60); };
  const onKey = (e) => {
    if (e.key === 'Escape') onClose();
    else if (e.key === 'ArrowDown') { e.preventDefault(); setIndex((i) => Math.min(i + 1, results.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setIndex((i) => Math.max(i - 1, 0)); }
    else if (e.key === 'Enter' && results[index]) run(results[index]);
  };

  let lastGroup = '';
  return (
    <div className="palette" role="dialog" aria-modal="true" aria-label="Command menu" onMouseDown={onClose}>
      <div className="palette__box" onMouseDown={(e) => e.stopPropagation()} onKeyDown={onKey}>
        <div className="palette__search">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
          <input ref={input} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Type a command or search…" aria-label="Search commands" />
          <kbd>esc</kbd>
        </div>
        <ul className="palette__list" role="listbox">
          {results.length === 0 && <li className="palette__empty">No matches. Try “resume” or “email”.</li>}
          {results.map((a, i) => {
            const header = a.group !== lastGroup ? (lastGroup = a.group) : null;
            return (
              <React.Fragment key={a.label}>
                {header && <li className="palette__group">{header}</li>}
                <li
                  role="option"
                  aria-selected={i === index}
                  className={i === index ? 'is-active' : ''}
                  onMouseEnter={() => setIndex(i)}
                  onClick={() => run(a)}
                >
                  {a.label}
                  <span aria-hidden="true">↵</span>
                </li>
              </React.Fragment>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
