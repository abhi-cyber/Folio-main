import React, { useRef, useState } from 'react';
import { gsap } from '../lib/gsap';
import { toast } from '../lib/toast';
import { copyText } from '../lib/copy';
import { profile } from '../data/profile';
import SectionHead from '../components/SectionHead.jsx';
import Magnetic from '../components/Magnetic.jsx';
import Reactions from './Reactions.jsx';

const intents = ['Hiring', 'AI consulting', 'Collaboration', 'Speaking', 'Just saying hi'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate({ name, email, message }) {
  const errors = {};
  if (name.trim().length < 2) errors.name = 'Tell me your name.';
  if (!EMAIL_RE.test(email.trim())) errors.email = 'That email looks off.';
  if (message.trim().length < 10) errors.message = 'A few more words, please (10+ characters).';
  return errors;
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '', intent: 'Hiring', honey: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const formRef = useRef(null);

  const update = (e) => {
    const next = { ...form, [e.target.name]: e.target.value };
    setForm(next);
    if (touched[e.target.name]) setErrors(validate(next));
  };
  const blur = (e) => {
    setTouched((t) => ({ ...t, [e.target.name]: true }));
    setErrors(validate(form));
  };

  const submit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(errs).length) {
      gsap.fromTo(formRef.current, { x: -8 }, { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
      toast('A couple of fields need a look.', 'error');
      return;
    }
    if (form.honey) return; // bot
    setStatus('sending');
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          intent: form.intent,
          message: form.message,
          _subject: `Portfolio: ${form.intent} from ${form.name}`,
          _template: 'table',
          _captcha: 'false',
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || String(data.success) !== 'true') throw new Error(data.message || 'Send failed');
      setStatus('sent');
      toast("Message sent. I'll get back to you soon!", 'success');
    } catch (err) {
      setStatus('error');
      toast("Couldn't send right now. Email me directly instead.", 'error');
    }
  };

  const reset = () => {
    setForm({ name: '', email: '', message: '', intent: 'Hiring', honey: '' });
    setErrors({});
    setTouched({});
    setStatus('idle');
  };

  const field = (name) => (touched[name] && errors[name] ? 'has-error' : touched[name] ? 'is-valid' : '');

  return (
    <section id="contact" className="section contact container">
      <SectionHead index="06" label="Contact" title="Let's build something intelligent.">
        Roles, consulting on on-prem LLMs and agents, talks on AI enablement, or a simple hello. I read everything.
      </SectionHead>

      <div className="contact__grid">
        <aside className="contact__side reveal">
          <button className="contact__email" onClick={() => copyText(profile.email, 'Email copied')} data-cursor="copy">
            <span className="mono">email · click to copy</span>
            {profile.email}
          </button>
          <ul className="contact__socials">
            {profile.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer">
                  <span>{s.label}</span>
                  <span className="mono">{s.handle} ↗</span>
                </a>
              </li>
            ))}
          </ul>
          <Reactions />
        </aside>

        <div className="contact__form-wrap reveal">
          {status === 'sent' ? (
            <div className="sent" role="status">
              <div className="sent__check" aria-hidden="true">
                <svg viewBox="0 0 52 52"><circle cx="26" cy="26" r="24" /><path d="M15 27l7 7 15-16" /></svg>
              </div>
              <h3>Thanks, {form.name.split(' ')[0]}!</h3>
              <p>Your message is in my inbox. I usually reply within a day or two.</p>
              <button className="btn btn--ghost" onClick={reset}>Send another</button>
            </div>
          ) : (
            <form ref={formRef} className="form" onSubmit={submit} noValidate>
              <fieldset className="form__intents">
                <legend>What's this about?</legend>
                {intents.map((i) => (
                  <label key={i} className={form.intent === i ? 'is-on' : ''}>
                    <input type="radio" name="intent" value={i} checked={form.intent === i} onChange={update} />
                    {i}
                  </label>
                ))}
              </fieldset>
              <div className={`form__field ${field('name')}`}>
                <input id="c-name" name="name" value={form.name} onChange={update} onBlur={blur} placeholder=" " autoComplete="name" aria-invalid={!!(touched.name && errors.name)} aria-describedby="c-name-err" />
                <label htmlFor="c-name">Your name</label>
                <p id="c-name-err" className="form__err">{touched.name && errors.name}</p>
              </div>
              <div className={`form__field ${field('email')}`}>
                <input id="c-email" name="email" type="email" value={form.email} onChange={update} onBlur={blur} placeholder=" " autoComplete="email" aria-invalid={!!(touched.email && errors.email)} aria-describedby="c-email-err" />
                <label htmlFor="c-email">Email</label>
                <p id="c-email-err" className="form__err">{touched.email && errors.email}</p>
              </div>
              <div className={`form__field ${field('message')}`}>
                <textarea id="c-msg" name="message" rows={5} value={form.message} onChange={update} onBlur={blur} placeholder=" " maxLength={2000} aria-invalid={!!(touched.message && errors.message)} aria-describedby="c-msg-err" />
                <label htmlFor="c-msg">Message</label>
                <p id="c-msg-err" className="form__err">{touched.message && errors.message}</p>
                <span className="form__count mono">{form.message.length}/2000</span>
              </div>
              <input className="form__honey" name="honey" value={form.honey} onChange={update} tabIndex={-1} autoComplete="off" aria-hidden="true" />
              {status === 'error' && (
                <p className="form__alert" role="alert">
                  The form service didn't respond. Your message is still here. Try again, or email <a href={`mailto:${profile.email}`}>{profile.email}</a>.
                </p>
              )}
              <Magnetic strength={0.2}>
                <button className="btn btn--accent btn--wide" type="submit" disabled={status === 'sending'}>
                  {status === 'sending' ? <><span className="spinner" aria-hidden="true" /> Sending…</> : <>Send message <span aria-hidden="true">→</span></>}
                </button>
              </Magnetic>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
