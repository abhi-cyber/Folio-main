// Tiny pub/sub so any component can raise a toast without context plumbing.
const listeners = new Set();
let id = 0;

export function toast(message, type = 'info') {
  const t = { id: ++id, message, type };
  listeners.forEach((fn) => fn(t));
}

export function onToast(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
