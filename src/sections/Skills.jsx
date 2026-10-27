import React, { useRef, useState } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { skills } from '../data/profile';
import SectionHead from '../components/SectionHead.jsx';
import Marquee from './Marquee.jsx';

export default function Skills() {
  const root = useRef(null);
  const [active, setActive] = useState(0);
  const group = skills[active];

  useGSAP(
    () => {
      gsap.fromTo('.skills__chips li', { y: 24, opacity: 0, scale: 0.9 }, {
        y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.04, ease: 'back.out(2)',
      });
    },
    { scope: root, dependencies: [active] }
  );

  return (
    <section ref={root} id="skills" className="section skills">
      <div className="container">
        <SectionHead index="04" label="Toolbox" title="The stack behind the systems." />
        <div className="skills__grid">
          <div className="skills__tabs" role="tablist" aria-label="Skill groups">
            {skills.map((s, i) => (
              <button
                key={s.group}
                role="tab"
                id={`skill-tab-${i}`}
                aria-selected={i === active}
                aria-controls="skill-panel"
                className={i === active ? 'is-active' : ''}
                onClick={() => setActive(i)}
                onMouseEnter={() => window.matchMedia('(pointer: fine)').matches && setActive(i)}
              >
                <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                {s.group}
                <span className="skills__count">{s.items.length}</span>
              </button>
            ))}
          </div>
          <div className="skills__panel" id="skill-panel" role="tabpanel" aria-labelledby={`skill-tab-${active}`}>
            <p className="skills__panel-title">{group.group}</p>
            <ul className="skills__chips">
              {group.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>
      </div>
      <div className="skills__marquees">
        <Marquee items={['LangGraph', 'vLLM', 'PyTorch', 'Hugging Face', 'pgvector', 'Qdrant', 'Ollama', 'MCP', 'Claude Code', 'FastAPI']} />
        <Marquee items={['LoRA', 'QLoRA', 'GraphRAG', 'HippoRAG', 'Evals', 'Guardrails', 'Quantization', 'Air-gapped', 'Multi-agent', 'Tool calling']} reverse outline />
      </div>
    </section>
  );
}
