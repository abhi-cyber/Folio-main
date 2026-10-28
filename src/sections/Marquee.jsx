import React from 'react';

export default function Marquee({ items, reverse = false, outline = false }) {
  const row = [...items, ...items];
  return (
    <div className={`marquee ${reverse ? 'marquee--reverse' : ''} ${outline ? 'marquee--outline' : ''}`} aria-hidden="true">
      <div className="marquee__track">
        {row.map((t, i) => (
          <span key={i}>{t}<i>✦</i></span>
        ))}
      </div>
    </div>
  );
}
