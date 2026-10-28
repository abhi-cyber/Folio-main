import { useEffect, useState } from 'react';

const listeners = new Set();

function current() {
  return document.documentElement.dataset.theme || 'dark';
}

export function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem('theme', theme); } catch (e) { /* storage unavailable */ }
  listeners.forEach((fn) => fn(theme));
}

export function toggleTheme() {
  setTheme(current() === 'dark' ? 'light' : 'dark');
}

export function useTheme() {
  const [theme, set] = useState(current);
  useEffect(() => {
    listeners.add(set);
    return () => listeners.delete(set);
  }, []);
  return theme;
}
