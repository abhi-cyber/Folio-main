// Single source of truth for site content. Mirrors public/resume/Abhiraj_Singh_Resume.pdf.

export const profile = {
  name: 'Abhiraj Singh',
  shortName: 'Abhiraj',
  role: 'Lead AI Engineer',
  company: 'iBase-t',
  location: 'Ahmedabad, India',
  email: 'abhicyber.dev@gmail.com',
  resumePdf: '/resume/Abhiraj_Singh_Resume.pdf',
  headline: ['Agentic AI', 'LLM Fine-Tuning', 'RAG', 'AI Automation', 'AI Enablement'],
  summary:
    'Lead AI Engineer building agentic systems and AI automation for aerospace and defense manufacturing, from fine-tuned LLMs running in air-gapped environments to end-to-end SDLC and business-workflow automation. I build AI agents, automation tools and Claude skills for technical and non-technical teams alike, and teach every employee, technical or not, to use AI effectively.',
  socials: [
    { label: 'GitHub', href: 'https://github.com/abhi-cyber', handle: '@abhi-cyber' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/abhiraj-singh-chatrath/', handle: 'abhiraj-singh-chatrath' },
    { label: 'X', href: 'https://x.com/abhicyber_dev', handle: '@abhicyber_dev' },
    { label: 'Instagram', href: 'https://www.instagram.com/abhiraj.21/', handle: '@abhiraj.21' },
  ],
};

export const stats = [
  { value: 0, suffix: '', label: 'cloud-API calls in our air-gapped LLM stack', display: 'Zero' },
  { value: 5, suffix: '', label: 'vector stores benchmarked for production RAG' },
  { value: 9.3, suffix: '/10', label: 'CGPA, B.E. Computer Science', decimals: 1 },
  { value: 4, suffix: '+', label: 'years shipping production software' },
];

export const experience = [
  {
    company: 'iBase-t',
    blurb: 'Maker of Solumina MES, the manufacturing execution system that runs production for aerospace and defense manufacturers.',
    location: 'Ahmedabad, India · On-site',
    roles: [
      {
        title: 'Lead AI Engineer',
        period: 'Sep 2026 – Present',
        current: true,
        points: [
          'Lead AI engineering at iBase-t, setting direction for agentic systems, AI automation and LLM deployment across air-gapped and standard environments; building and mentoring a team of AI engineers.',
          'Design and ship workflow automations, automation tools, AI agents and Claude skills that remove repetitive manual work for technical and non-technical teams across the company.',
          'Run company-wide AI enablement, teaching technical and non-technical employees hands-on to get the most out of AI tools, agents and automation.',
          'Partner with product and engineering to embed AI into Solumina products and define on-premise LLM reference architectures.',
        ],
      },
      {
        title: 'AI Engineer',
        period: 'Jul 2025 – Sep 2026',
        points: [
          'As the India office’s sole AI engineer, built an AI assistant that carries out Solumina’s manual workflows through natural language, powered by an in-house fine-tuned open-source LLM and a custom LangGraph agentic architecture with tool calling.',
          'Delivered production-grade LLM behavior in fully air-gapped environments: fine-tuned (LoRA/QLoRA) and served open-source models on-premise with zero cloud-API dependency, tuning for accuracy, latency and constrained hardware.',
          'Researched and prototyped multiple RAG architectures, including HippoRAG and knowledge-graph-based RAG, over technical manufacturing documentation; built retrieval on pgvector and benchmarked Pinecone, Qdrant, Chroma and FAISS.',
          'Built a complete AI-driven SDLC automation for internal engineering teams, covering requirements, code generation, review, testing and documentation, with evaluation and guardrails (golden test sets, grounding checks) to keep outputs reliable.',
        ],
      },
    ],
  },
  {
    company: 'Sabudh Foundation',
    location: 'Mohali, India · Hybrid',
    roles: [
      {
        title: 'Data Scientist Intern',
        period: 'Jan 2025 – Jun 2025',
        points: [
          'Built a RAG document Q&A system on locally hosted LLMs (Ollama) with voice responses, and a Perplexity-style AI search interface combining retrieval with fine-tuned models.',
          'Fine-tuned domain-specific LLMs for accuracy and inference speed, and prototyped multi-modal chatbots.',
        ],
      },
    ],
  },
  {
    company: 'Care.fi',
    location: 'Gurugram, India · On-site',
    roles: [
      {
        title: 'Software Development Engineer Intern',
        period: 'Apr 2024 – Oct 2024',
        points: [
          'Contributed to a healthcare insurance claims platform now used by hospitals across India, cutting a historically multi-day claims process to a few hours per patient.',
          'Owned the full stack of a new product (frontend, backend services and infrastructure), including a high-performance caching system built from the ground up; also built a PDF filter and editor for document workflows.',
        ],
      },
    ],
  },
  {
    company: 'Deep Eigen',
    location: 'Remote',
    roles: [
      {
        title: 'Frontend Developer Intern',
        period: 'Apr 2023 – Sep 2023',
        points: ['Built a Django-based appointment system for new-recruit scheduling and revamped the front end of the Swaayatt website.'],
      },
    ],
  },
  {
    company: 'GeeksforGeeks Student Chapter (GFG CUIET), Chitkara University',
    location: 'Rajpura, India',
    roles: [
      {
        title: 'Tech Team Coordinator',
        period: 'Jun 2022 – Mar 2024',
        points: ['Led development of the chapter website (React, Node.js) and coordinated student tech teams.'],
      },
    ],
  },
];

export const skills = [
  { group: 'Generative AI', items: ['Agentic AI', 'Multi-Agent Systems', 'RAG (GraphRAG, HippoRAG)', 'LLM Fine-Tuning (LoRA, QLoRA, PEFT)', 'Tool Calling', 'Model Context Protocol (MCP)', 'Prompt Engineering', 'LLM Evals & Guardrails'] },
  { group: 'AI Automation', items: ['SDLC & Business Workflow Automation', 'AI Agents & Automation Tools', 'Claude Skills', 'Claude Code', 'Microsoft Copilot Studio'] },
  { group: 'AI Frameworks', items: ['LangGraph', 'LangChain', 'Hugging Face', 'PyTorch', 'vLLM', 'Ollama', 'OpenAI, Anthropic & Gemini APIs'] },
  { group: 'Vector & Data', items: ['pgvector', 'PostgreSQL', 'Pinecone', 'Qdrant', 'Chroma', 'FAISS', 'Knowledge Graphs', 'MongoDB', 'Firebase'] },
  { group: 'Deployment', items: ['Air-Gapped / On-Premise LLM Deployment', 'Model Serving & Quantization', 'Docker', 'Git', 'CI/CD'] },
  { group: 'Languages & Web', items: ['Python', 'TypeScript', 'JavaScript', 'SQL', 'React', 'Next.js', 'React Native', 'Node.js', 'FastAPI', 'Django'] },
  { group: 'Leadership', items: ['AI Training & Enablement', 'Team Building & Mentoring', 'AI Strategy', 'Technical Roadmapping'] },
];

export const caseStudies = [
  {
    id: 'solumina-agent',
    kicker: 'iBase-t · Agentic AI',
    title: 'Natural-language agent for Solumina MES',
    problem: 'Operators in aerospace and defense plants were clicking through long, manual MES workflows.',
    built: 'An AI assistant that executes those workflows from plain language, on a custom LangGraph agent graph with tool calling and an in-house fine-tuned open-source LLM.',
    stack: ['LangGraph', 'Tool Calling', 'LoRA / QLoRA', 'vLLM'],
    accent: '#c6ff3d',
  },
  {
    id: 'air-gapped',
    kicker: 'iBase-t · LLMOps',
    title: 'Production LLMs with zero cloud dependency',
    problem: 'Defense customers run fully air-gapped. No OpenAI, no Anthropic, no internet.',
    built: 'Fine-tuned and served open-source models on-premise, tuned for accuracy and latency on constrained hardware, and defined reference architectures for on-prem LLM deployment.',
    stack: ['Quantization', 'Model Serving', 'Ollama', 'Docker'],
    accent: '#8b7bff',
  },
  {
    id: 'graph-rag',
    kicker: 'iBase-t · Retrieval research',
    title: 'HippoRAG & knowledge-graph RAG over manufacturing docs',
    problem: 'Dense technical documentation where plain vector search misses multi-hop answers.',
    built: 'Prototyped HippoRAG and graph-based RAG, shipped retrieval on pgvector, and benchmarked Pinecone, Qdrant, Chroma and FAISS to pick the right store.',
    stack: ['HippoRAG', 'Knowledge Graphs', 'pgvector', 'Qdrant'],
    accent: '#ff8a4c',
  },
  {
    id: 'sdlc',
    kicker: 'iBase-t · AI automation',
    title: 'AI-driven SDLC, requirements to docs',
    problem: 'Engineering teams spending hours on repeatable SDLC busywork.',
    built: 'An end-to-end pipeline for requirements, code generation, review, testing and documentation, kept honest by golden test sets and grounding checks.',
    stack: ['Multi-Agent', 'Evals', 'Guardrails', 'Claude Code'],
    accent: '#4cd6ff',
  },
  {
    id: 'enablement',
    kicker: 'iBase-t · Leadership',
    title: 'Company-wide AI enablement',
    problem: 'AI tools only help if everyone, not just engineers, knows how to use them.',
    built: 'Hands-on training for technical and non-technical staff, plus Claude skills, agents and automation tools that remove repetitive manual work across teams.',
    stack: ['Claude Skills', 'Copilot Studio', 'Training', 'Mentoring'],
    accent: '#ff5c8a',
  },
  {
    id: 'carefi',
    kicker: 'Care.fi · Full stack',
    title: 'Insurance claims in hours, not days',
    problem: 'Hospital insurance claims across India took multiple days per patient.',
    built: 'Owned the full stack of a new product on the claims platform, including a high-performance caching layer built from scratch and a PDF filter and editor.',
    stack: ['Node.js', 'React', 'Caching', 'Infra'],
    accent: '#ffd84c',
  },
];

export const sideProjects = [
  {
    title: 'Permiflow',
    description: 'RBAC SDK for roles and permissions with resource-based rules, middleware integration and audit logging. Published on npm.',
    tags: ['SDK', 'TypeScript'],
    image: 'https://cdn.sanity.io/images/h1kcjvc5/production/2e7cc23278eca767bf748ee86e7616e4382848e4-2048x2048.png?w=900&auto=format',
    live: 'https://www.npmjs.com/package/permiflow',
    code: 'https://github.com/abhi-cyber/permiflow-rbac-sdk',
  },
  {
    title: 'Blitz Chat',
    description: 'Realtime chat on React and Node.js, built to scale, with debounced presence and optimized rendering.',
    tags: ['Realtime', 'Full stack'],
    image: 'https://cdn.sanity.io/images/h1kcjvc5/production/5e4566d871ea49cb6b2b2ddcc09800d82788e56b-3840x2160.png?w=900&auto=format',
    live: 'https://blitz-chat.netlify.app/',
    code: 'https://github.com/abhi-cyber/Blitz-Chat',
  },
  {
    title: 'LMS Platform',
    description: 'Learning platform with a payment gateway and a teacher dashboard for uploading, editing and analysing courses.',
    tags: ['Full stack', 'Payments'],
    image: 'https://cdn.sanity.io/images/h1kcjvc5/production/d3fece5757a6255d27adf628b9825f4f350740b5-3839x1821.png?w=900&auto=format',
    live: 'https://lms-project-sage-phi.vercel.app/',
    code: 'https://github.com/abhi-cyber/lms-project',
  },
  {
    title: 'MealToGo',
    description: 'Food ordering app with Google Maps integration for discovering and ordering from local restaurants.',
    tags: ['React Native', 'Maps'],
    image: 'https://cdn.sanity.io/images/h1kcjvc5/production/d465b08bdac5b8924e292a12472f82730c052cd5-3840x2160.png?w=900&auto=format',
    live: 'https://mealtogo-launch.netlify.app/',
    code: 'https://github.com/abhi-cyber/MealToGo',
  },
  {
    title: '3D Portfolio',
    description: 'An earlier Three.js experiment in immersive, interactive portfolio storytelling.',
    tags: ['Three.js', 'WebGL'],
    image: 'https://cdn.sanity.io/images/h1kcjvc5/production/6aa93cefbc47dba3ab92d85668c76e6fd66147f8-3840x1955.png?w=900&auto=format',
    live: 'https://abhiraj3dportfolio.netlify.app/',
    code: 'https://github.com/abhi-cyber/3-D-Portfolio',
  },
];

export const education = {
  degree: 'B.E., Computer Science & Engineering',
  school: 'Chitkara University, Punjab',
  grade: 'CGPA 9.3/10',
  period: 'Sep 2021 – Jul 2025',
  certification: 'Data Science, Sabudh Foundation (2025)',
};
