import React from 'react';

export default function SectionHead({ index, label, title, children }) {
  return (
    <div className="section-head">
      <p className="section-head__label reveal"><span className="mono">{index}</span> {label}</p>
      <h2 className="section-head__title reveal">{title}</h2>
      {children && <p className="section-head__lede reveal">{children}</p>}
    </div>
  );
}
