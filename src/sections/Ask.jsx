import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { profile, experience, skills, caseStudies, education } from '../data/profile';
import { scrollToTarget } from '../lib/smooth';
import SectionHead from '../components/SectionHead.jsx';

// A scripted, offline "ask me" terminal. Answers come from the same data as the resume,
// so nothing is invented and no API key ships to the browser.

const lead = experience[0].roles[0];

const intents = [
  { keys: ['help', '?', 'commands'], answer: () => 'Try: whoami · role · experience · skills · projects · rag · airgapped · agents · enablement · education · resume · contact · hire · clear' },
  { keys: ['whoami', 'who are', 'yourself', 'intro'], answer: () => `${profile.name}. ${profile.role} at ${profile.company}, based in ${profile.location}. ${profile.summary}` },
  { keys: ['role', 'current', 'now', 'job', 'lead', 'ibase', 'solumina'], answer: () => `${lead.title} at iBase-t (${lead.period}).\n- ${lead.points.join('\n- ')}` },
  { keys: ['experience', 'career', 'history', 'work', 'timeline'], answer: () => experience.map((e) => e.roles.map((r) => `${r.period.padEnd(20)} ${r.title} · ${e.company}`).join('\n')).join('\n') },
  { keys: ['skills', 'stack', 'tools', 'tech', 'languages', 'framework'], answer: () => skills.map((s) => `${s.group}: ${s.items.join(', ')}`).join('\n') },
  { keys: ['projects', 'built', 'case', 'portfolio', 'shipped'], answer: () => caseStudies.map((c, i) => `${i + 1}. ${c.title} (${c.kicker})`).join('\n') + '\n\nScroll to "Selected work" for the full case studies.' },
  { keys: ['rag', 'retrieval', 'vector', 'hipporag', 'graphrag', 'pgvector', 'embedding'], answer: () => 'Prototyped HippoRAG and knowledge-graph RAG over technical manufacturing documentation, shipped retrieval on pgvector, and benchmarked Pinecone, Qdrant, Chroma and FAISS against it.' },
  { keys: ['airgapped', 'air-gapped', 'air gapped', 'offline', 'on-prem', 'onprem', 'premise', 'fine-tune', 'finetune', 'fine tune', 'lora', 'qlora', 'llm'], answer: () => 'Fine-tuned open-source LLMs with LoRA/QLoRA and served them fully on-premise with zero cloud-API dependency, tuned for accuracy and latency on constrained hardware. Now defining on-prem LLM reference architectures for Solumina.' },
  { keys: ['agent', 'agents', 'agentic', 'langgraph', 'tool', 'automation', 'sdlc'], answer: () => 'Built a natural-language assistant that executes Solumina MES workflows on a custom LangGraph agent with tool calling, plus an AI-driven SDLC pipeline (requirements → code → review → tests → docs) guarded by golden test sets and grounding checks.' },
  { keys: ['enablement', 'teach', 'training', 'mentor', 'team', 'leadership', 'claude'], answer: () => 'I run company-wide AI enablement: hands-on sessions for technical and non-technical staff, plus Claude skills, agents and automation tools that remove repetitive work. I am also building and mentoring a team of AI engineers.' },
  { keys: ['education', 'degree', 'college', 'university', 'cgpa', 'study'], answer: () => `${education.degree}, ${education.school} · ${education.grade} · ${education.period}\nCertification: ${education.certification}` },
  { keys: ['resume', 'cv', 'pdf'], answer: () => 'Opening the resume page… (there is a PDF download button at the top)', action: 'resume' },
  { keys: ['contact', 'email', 'reach', 'mail', 'talk', 'connect'], answer: () => `Email: ${profile.email}\n${profile.socials.map((s) => `${s.label}: ${s.href}`).join('\n')}\nOr use the form just below. Taking you there…`, action: 'contact' },
  { keys: ['hire', 'hiring', 'available', 'freelance', 'consult', 'opportunit'], answer: () => "Happy to talk about AI engineering roles, consulting on on-prem LLMs and agentic automation, or speaking about AI enablement. Drop a note in the contact form and I'll reply personally." },
  { keys: ['hello', 'hi', 'hey', 'yo', 'namaste'], answer: () => "Hey! 👋 I'm a scripted guide to Abhiraj's work. Type `help` to see what I know." },
  { keys: ['sudo'], answer: () => 'Nice try. This incident will be reported to the guardrails team. 🛡️' },
  { keys: ['coffee', 'chai'], answer: () => 'Chai, always. Best ideas come with it.' },
];

// Short keys must match whole words, so "hi" doesn't fire on "this".
function matches(q, key) {
  if (key === '?') return q === '?';
  if (key.length > 4) return q.includes(key);
  return new RegExp(`(^|[^a-z])${key}([^a-z]|$)`).test(q);
}

function respond(input) {
  const q = input.toLowerCase().trim();
  if (!q) return null;
  let best = null;
  let bestScore = 0;
  for (const intent of intents) {
    const score = intent.keys.reduce((n, k) => n + (matches(q, k) ? k.length : 0), 0);
    if (score > bestScore) { best = intent; bestScore = score; }
  }
  if (!best) return { text: "I don't have that one yet. Type `help` for topics, or ask Abhiraj directly through the contact form." };
  return { text: best.answer(), action: best.action };
}

const suggestions = ['whoami', 'What are you doing now?', 'How do you run LLMs air-gapped?', 'Tell me about RAG', 'skills', 'Are you open to opportunities?'];

export default function Ask() {
  const navigate = useNavigate();
  const [lines, setLines] = useState([
    { kind: 'sys', text: 'abhiraj.ai · v2.0 · scripted assistant, answers sourced from the resume' },
    { kind: 'sys', text: 'Type `help` or tap a suggestion below.' },
  ]);
  const [value, setValue] = useState('');
  const [typing, setTyping] = useState(false);
  const [history, setHistory] = useState([]);
  const [cursor, setCursor] = useState(-1);
  const body = useRef(null);
  const timer = useRef(null);

  useEffect(() => {
    if (body.current) body.current.scrollTop = body.current.scrollHeight;
  }, [lines]);

  useEffect(() => () => clearInterval(timer.current), []);

  const ask = (q) => {
    if (typing || !q.trim()) return;
    setHistory((h) => [q, ...h].slice(0, 20));
    setCursor(-1);
    setValue('');
    if (q.trim().toLowerCase() === 'clear') { setLines([]); return; }
    const res = respond(q);
    setLines((l) => [...l, { kind: 'in', text: q }, { kind: 'out', text: '' }]);
    setTyping(true);
    let i = 0;
    const full = res.text;
    const step = Math.max(1, Math.round(full.length / 90));
    timer.current = setInterval(() => {
      i += step;
      setLines((l) => {
        const copy = l.slice();
        copy[copy.length - 1] = { kind: 'out', text: full.slice(0, i) };
        return copy;
      });
      if (i >= full.length) {
        clearInterval(timer.current);
        setTyping(false);
        if (res.action === 'resume') setTimeout(() => navigate('/resume'), 700);
        if (res.action === 'contact') setTimeout(() => scrollToTarget('#contact'), 900);
      }
    }, 16);
  };

  const onKey = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(cursor + 1, history.length - 1);
      if (history[next] !== undefined) { setCursor(next); setValue(history[next]); }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = cursor - 1;
      setCursor(Math.max(next, -1));
      setValue(next >= 0 ? history[next] : '');
    }
  };

  return (
    <section id="ask" className="section ask container">
      <SectionHead index="05" label="Ask me anything" title="Interview me, the fast way.">
        A small terminal that knows my resume. Ask about agents, RAG, air-gapped LLMs, or what I'm up to now.
      </SectionHead>
      <div className="term reveal">
        <div className="term__bar">
          <span /><span /><span />
          <p className="mono">~/abhiraj — ask</p>
        </div>
        <div className="term__body" ref={body} aria-live="polite">
          {lines.map((l, i) => (
            <pre key={i} className={`term__line term__line--${l.kind}`}>
              {l.kind === 'in' && <span className="term__prompt">❯ </span>}
              {l.text}
              {typing && i === lines.length - 1 && <span className="term__caret" />}
            </pre>
          ))}
        </div>
        <form className="term__input" onSubmit={(e) => { e.preventDefault(); ask(value); }}>
          <span className="term__prompt" aria-hidden="true">❯</span>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKey}
            placeholder="ask something… e.g. how do you fine-tune?"
            aria-label="Ask a question"
            autoComplete="off"
            spellCheck="false"
          />
          <button type="submit" disabled={typing || !value.trim()} aria-label="Send">↵</button>
        </form>
      </div>
      <div className="ask__suggest">
        {suggestions.map((s) => (
          <button key={s} onClick={() => ask(s)} disabled={typing}>{s}</button>
        ))}
      </div>
    </section>
  );
}
