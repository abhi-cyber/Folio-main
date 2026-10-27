import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="notfound container">
      <p className="mono">404 · hallucination detected</p>
      <h1>This page isn't grounded in any source.</h1>
      <Link to="/" className="btn btn--accent">Back to reality</Link>
    </section>
  );
}
