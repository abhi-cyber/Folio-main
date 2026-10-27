import React, { useEffect, useState } from 'react';

const fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Asia/Kolkata' });

export default function LocalTime() {
  const [now, setNow] = useState(() => fmt.format(new Date()));
  useEffect(() => {
    const t = setInterval(() => setNow(fmt.format(new Date())), 1000);
    return () => clearInterval(t);
  }, []);
  return <span className="mono">{now} IST</span>;
}
