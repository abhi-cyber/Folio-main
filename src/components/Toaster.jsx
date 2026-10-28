import React, { useEffect, useState } from 'react';
import { onToast } from '../lib/toast';

export default function Toaster() {
  const [items, setItems] = useState([]);
  useEffect(
    () =>
      onToast((t) => {
        setItems((list) => [...list, t]);
        setTimeout(() => setItems((list) => list.filter((x) => x.id !== t.id)), 4200);
      }),
    []
  );
  return (
    <div className="toaster" role="status" aria-live="polite">
      {items.map((t) => (
        <div key={t.id} className={`toast toast--${t.type}`}>
          <span className="toast__dot" aria-hidden="true" />
          {t.message}
        </div>
      ))}
    </div>
  );
}
