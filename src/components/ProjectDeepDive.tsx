import { useEffect } from 'react'

interface ProjectData {
  title: string
  filename: string
  ver: string
  releaseType: string
  marginalia: string
  intro: string
  introQuote: string
  introIcon: string
  stackTitle: string
  stack: string[]
  metricsTitle: string
  metrics: string[]
  capabilities: string[]
  whyBuilt: string
  whyBuiltDetail?: string
  howItWorks: string[]
  architectureDiagram: string
  learnt: string[]
  githubUrl: string
  status: string
}

const projectRegistry: Record<string, ProjectData> = {
  fastfox: {
    title: 'FastFox',
    filename: 'FastFox.md',
    ver: 'VER 1.0.4',
    releaseType: 'STABLE RELEASE',
    marginalia: 'Optimized: Low-Latency CLI Orchestration',
    intro: 'FastFox is a high-performance command-line orchestration tool designed to bridge the gap between natural language intent and system-level execution. By leveraging the low-latency inference capabilities of LLaMA 3 via Groq, FastFox transforms vague user requests into precise terminal commands, file manipulations, and code snippets in milliseconds.',
    introQuote: "The terminal is the developer's canvas; FastFox is the intelligent brush that knows exactly which stroke to make next.",
    introIcon: 'terminal',
    stackTitle: 'The Engine',
    stack: [
      'Python 3.11+ (Core Logic)',
      'Groq API (Inference Hub)',
      'LLaMA 3 8B (Primary Logic)',
      'Mixtral 8x7B (Script Generation)',
      'Salesforce BLIP (Vision/Image Meta)'
    ],
    metricsTitle: 'Efficiency Benchmarks',
    metrics: [
      '< 1s Latency Per Query',
      '94% Command Accuracy Rate',
      'POSIX Compliant Script Generation',
      'Sub-50ms Local Context Parsing'
    ],
    capabilities: [
      'Predictive Autocomplete: Suggests the next most likely command based on local shell history and project context.',
      'Contextual File Management: Automagically renames, moves, and categorizes hundreds of files using AI-generated metadata.',
      'Safe Execution Mode: Dry-run previews with natural language explanations of what the command will do before execution.'
    ],
    whyBuilt: 'I spent too many hours digging through man pages or Googling specific find and sed flags. The existing solutions were either too slow (standard GPT-4 calls) or too disconnected from the local file system. The Motivation: Create a CLI tool that feels like an extension of the developer\'s thought process—minimal friction, zero context-switching, and instantaneous response times.',
    howItWorks: [
      'Capture & Contextualize: The CLI captures the user\'s natural language input and gathers local context (current directory structure, active environment variables, and recent shell history).',
      'Streamed Inference: Context is formatted into a dense prompt and sent to Groq\'s LPU. The response is streamed back to provide immediate visual feedback.',
      'Validation & Execution: Generated commands are parsed for safety. The user can toggle between \'Auto-pilot\' or \'Manual Confirmation\' before the script hits the shell.'
    ],
    architectureDiagram: `[ CLI / TYPER ]  -- (Natural Language) --> [ ORCHESTRATOR ]
                                                   |
                                                   +--> [ CONTEXT ENGINE ]
                                                   |
                                                   +--> [ LLM CLIENT (GROQ) ]
                                                            |
                                                            +--> [ SHELL KERNEL ]`,
    learnt: [
      'Latency Optimization: I learned that in CLI tools, a 500ms delay is the difference between a "tool" and an "impediment." Switching to Groq\'s hardware-accelerated LPU was a pivotal architectural pivot.',
      'Prompt Engineering for Shells: Translating natural language into POSIX-compliant syntax while accounting for edge cases (like whitespace in filenames or platform-specific flags) required hundreds of iterations on the system instructions.',
      'Safety First: Implementing a robust dry-run system is essential when dealing with AI-generated shell commands to prevent catastrophic data loss.'
    ],
    githubUrl: 'https://github.com/Itshardtofindagoodname/fastfox',
    status: 'IN PRODUCTION'
  },
  vaultify: {
    title: 'Vaultify',
    filename: 'Vaultify.md',
    ver: 'VER 1.0.4',
    releaseType: 'STABLE RELEASE',
    marginalia: 'Confidential: Zero-Knowledge Architecture',
    intro: 'Vaultify is a zero-knowledge architectural blueprint for modern data preservation. Built on the principles of absolute privacy, it utilizes a decentralized node network to ensure that no single entity—not even the developers—can peek into your digital safe. It aims to bridge the gap between user-friendly cloud storage and hardline cryptographic security.',
    introQuote: 'Think of it like a physical bank vault, but the keys are held only by the owner, and the vault exists in a thousand places at once.',
    introIcon: 'lock_open',
    stackTitle: 'The Stack',
    stack: [
      'Frontend: React 18, TypeScript, TailwindCSS',
      'Backend: Rust (Axum Framework)',
      'Encryption: AES-256-GCM + Argon2id',
      'Storage: IPFS / Filecoin Integration'
    ],
    metricsTitle: 'Performance Wins',
    metrics: [
      '99.9% Uptime via Node Redundancy',
      '< 200ms Time to First Byte (Global)',
      'Zero plaintext data stored on disk',
      '100/100 Lighthouse Security Score'
    ],
    capabilities: [
      'Multi-Signature Auth: Requires multiple device verification for high-value access.',
      'Offline Recovery: Deterministic key generation from physical seed phrases.',
      'Biometric Handshakes: Local-only biometric verification before decryption.'
    ],
    whyBuilt: 'The motivation was simple: The modern web is broken. We trade our privacy for convenience every single day. Most "secure" cloud services still hold the master keys to your data, making them a single point of failure and a prime target for subpoena or breach. Vaultify was built as a response to the growing need for data sovereignty. I wanted to create a system where the provider is mathematically incapable of accessing user data, returning the power of digital ownership to the individual.',
    howItWorks: [
      'Key Derivation: Your password is put through Argon2id locally on the client. The server never sees the raw password or the derived key.',
      'Client-Side Encryption: Data is encrypted using AES-256-GCM. A unique IV is generated for every single file.',
      'Sharding: The encrypted blob is split into 10 fragments. Only 7 are needed to reconstruct the file (Reed-Solomon erasure coding).',
      'Distribution: Fragments are distributed across the decentralized node network.'
    ],
    architectureDiagram: `[ CLIENT ]  <-- (TLS 1.3) --> [ API GATEWAY ]
                                  |
                                  +--> [ AUTH NODE ] (OIDC)
                                  |
                                  +--> [ SHARD MANAGER ]
                                           |
                                           +--> [ NODE A ]
                                           +--> [ NODE B ]
                                           +--> [ NODE C... ]`,
    learnt: [
      'Rust\'s Memory Safety: Using Rust for the backend eliminated entire classes of memory-related vulnerabilities that are common in C++.',
      'The Complexity of "Simple" Crypto: Implementing AES-256-GCM correctly requires obsessive attention to detail, especially regarding Nonce reuse.',
      'UX for Privacy: Security is only useful if people actually use it. Designing a recovery flow that is both secure and human-friendly was the hardest design challenge.'
    ],
    githubUrl: 'https://github.com/Itshardtofindagoodname/Vaultify-SIH',
    status: 'IN PRODUCTION'
  },
  pragati: {
    title: 'Pragati',
    filename: 'PRAGATI.md',
    ver: 'VER 2.1.0',
    releaseType: 'STABLE RELEASE',
    marginalia: 'Built for scaling transparency in large-scale public works.',
    intro: 'PRAGATI (Pro-Active Governance And Timely Implementation) is a multi-purpose and multi-modal platform aimed at addressing common man\'s grievances, and simultaneously monitoring and reviewing important programs and projects of the Government. It was designed to bridge the gap between policy making and ground-level execution using modern data visualization and real-time reporting.',
    introQuote: 'The platform bridges the gap between policy making and ground-level execution using modern data visualization and real-time reporting.',
    introIcon: 'analytics',
    stackTitle: 'The Stack',
    stack: [
      'Frontend: React / Redux for state management',
      'Database: PostgreSQL for relational integrity',
      'GIS: Leaflet.js for geospatial mapping',
      'Backend: Node.js Microservices architecture',
      'Caching: Redis for high-speed caching'
    ],
    metricsTitle: 'Metrics & Wins',
    metrics: [
      '40% Reduction in reporting latency',
      '1200+ Active infrastructure sites tracked',
      '99.9% Uptime for document verification',
      '10k+ Concurrent data updates handled'
    ],
    capabilities: [
      'Proprietary Dashboard: Translates complex geospatial data into actionable insights for high-level officials.',
      'Automated Milestones: Real-time tracking against project deadlines.',
      'Low-Bandwidth Optimization: Designed for field efficiency in remote areas.'
    ],
    whyBuilt: 'Before PRAGATI, infrastructure projects often suffered from "information silos." Field engineers reported data in disparate formats, leading to delays that were only identified months later. The motivation was simple: transparency through centralization. The goal was to create a "single source of truth" where a bottleneck in a highway project in one state could be immediately visible to the central monitoring committee, bypassing bureaucratic hurdles.',
    howItWorks: [
      'Data Ingestion: Field officers upload geo-tagged photos and progress reports via a low-bandwidth optimized mobile interface.',
      'Validation: Reports undergo automated validation checks against project milestones stored in the database.',
      'Visualization: Data is aggregated and rendered onto an interactive national map with drill-down capabilities.',
      'Review Cycle: The system automatically flags "at-risk" projects based on predictive modeling of historical delay patterns.'
    ],
    architectureDiagram: `[ FIELD OFFICER ]  --> [ API GATEWAY ]
                                     |
                                     +--> [ VALIDATION ENGINE ]
                                     |
                                     +--> [ MAPPING SERVICE ]
                                              |
                                              +--> [ REDIS CACHE ]
                                              +--> [ POSTGRES DB ]`,
    learnt: [
      'Performance over Flashiness: A dashboard that takes 10 seconds to load is useless in a high-stakes review meeting. Optimization is a core feature.',
      'Data Integrity is King: When monitoring billions in infrastructure, a single bad data point can lead to catastrophic decision-making.',
      'Graceful Degradation: The system had to work seamlessly on 3G networks in remote rural areas as well as it did on fiber in the capital.'
    ],
    githubUrl: 'https://github.com/Itshardtofindagoodname/Pragati-SIH',
    status: 'IN PRODUCTION'
  },
  profi: {
    title: 'Profi',
    filename: 'Profi.md',
    ver: 'VER 0.8.2-BETA',
    releaseType: 'EXPERIMENTAL RELEASE',
    marginalia: 'Local-First LLM Orchestration',
    intro: 'Profi is an experimental task management system designed to eliminate manual triage. It uses a local-first LLM architecture to analyze task descriptions, predict cognitive load, and automatically organize workflows based on "Flow State" compatibility.',
    introQuote: 'Every pixel added to a productivity tool is a potential distraction. Brutalist design isn\'t just an aesthetic; it\'s a functional choice.',
    introIcon: 'psychology',
    stackTitle: 'The Stack',
    stack: [
      'Local LLM: Ollama / Llama 3 (8B)',
      'Frontend: TypeScript, React, Tailwind CSS',
      'Database: SQLite (Local-first persistence)',
      'Inference: Sidecar Process Bridge'
    ],
    metricsTitle: 'Performance Metrics',
    metrics: [
      '98% Triage Accuracy (Auto-Tagging)',
      '< 1.2s LLM Latency (Local Optimized)',
      'Zero Cloud Dependencies',
      '40% Reduction in context-switching'
    ],
    capabilities: [
      'Semantic Ingestion: Users input tasks in a markdown-like scratchpad. Profi parses this text to extract intent, deadlines, and urgency.',
      'Cognitive Load Analysis: The local LLM evaluates the technical complexity and emotional weight of the task, assigning a "Focus Weight" score.',
      'Dynamic Scheduling: Tasks are auto-grouped into "Flow Cycles" (90-min deep work) and "Sprint Bursts" (15-min admin work) based on bio-rhythm settings.'
    ],
    whyBuilt: 'Standard task managers are passive digital lists. They store information but offer no intelligence. I found myself spending more time dragging cards between "Doing" and "Done" than actually doing the work. The motivation was to build a tool that understands context. If I write "Refactor the authentication middleware," the system should know that\'s a high-energy task and shouldn\'t be scheduled next to a series of "Reply to emails" admin tasks.',
    howItWorks: [
      'Semantic Ingestion: Users input tasks in a markdown-like scratchpad. Profi parses this text to extract intent, deadlines, and urgency.',
      'Cognitive Load Analysis: The local LLM evaluates the technical complexity and emotional weight of the task, assigning a "Focus Weight" score.',
      'Dynamic Scheduling: Tasks are auto-grouped into "Flow Cycles" (90-min deep work) and "Sprint Bursts" (15-min admin work) based on bio-rhythm settings.'
    ],
    architectureDiagram: `[ USER INPUT ]  -- (Markdown) --> [ PARSING WORKER ]
                                          |
                                          +--> [ LOCAL LLM ] (Ollama)
                                          |
                                          +--> [ TASK ENGINE ]
                                                   |
                                                   +--> [ LOCAL DB ] (SQLite)
                                                   +--> [ UI LAYER ]`,
    learnt: [
      'The LLM is a teammate: Prompting for "intent extraction" requires a different approach than standard chatbot interactions.',
      'Latency kills productivity: Even 2 seconds of waiting feels like an eternity in deep work. Local optimization was the hardest part.',
      'UI minimalism is essential: Every pixel added to a productivity tool is a distraction. Brutalism serves a functional focus.'
    ],
    githubUrl: 'https://github.com/Itshardtofindagoodname/Profi',
    status: 'IN DEVELOPMENT'
  },
  slash: {
    title: 'Slash',
    filename: 'Slash.md',
    ver: 'VER 4.2.0-Alpha',
    releaseType: 'STABLE RELEASE',
    marginalia: "Wait, no Canvas API? That's wild.",
    intro: 'Slash is a high-fidelity action engine built entirely within the constraints of a modern web browser\'s DOM, bypassing traditional heavy canvases for a more \'web-native\' experience. The project explores the limits of browser performance by treating every game entity—bullets, enemies, environment—as a standard DOM element or a Web Component. By leveraging WebAssembly for the core physics loop and CSS for the rendering pipeline, Slash achieves hardware-accelerated performance without the "black box" of a <canvas> element.',
    introQuote: "The goal was to bridge the gap between 'Web App' and 'High Performance Game,' proving that the DOM is not just for forms and text.",
    introIcon: 'bolt',
    stackTitle: 'The Stack',
    stack: [
      'Core Logic: Rust + WebAssembly',
      'State Sync: WebRTC (P2P Mesh)',
      'Styling: Custom CSS Houdini Paint Worklets',
      'Communication: SharedArrayBuffer for Workers'
    ],
    metricsTitle: 'Performance Wins',
    metrics: [
      '~4ms Sub-frame Input Latency',
      '2,000 active DOM elements @ 144fps',
      '120kb Initial Load (Gzipped WASM)',
      'Zero GPU Overhead: Purely CPU-optimized pathing'
    ],
    capabilities: [
      'DOM Native: Right Click > Inspect Element projectiles in mid-air.',
      'Multi-threaded: Heavy lifting happens in a pool of 4 Web Workers.',
      'Allocation-Free: Zero Garbage Collection overhead during the hot loop.'
    ],
    whyBuilt: 'Modern web games are usually sequestered into a single canvas element. While performant, this breaks the fundamental nature of the web: accessibility, inspectability, and SEO. I wanted to build an engine where you could Right Click > Inspect Element a projectile in mid-air and change its velocity via the DevTools console. The goal was to bridge the gap between "Web App" and "High Performance Game," proving that the DOM is not just for forms and text, but a powerful (if misunderstood) rendering target.',
    howItWorks: [
      'Input Capture: Raw mouse/keyboard events are piped directly into the WASM linear memory space via a shared buffer.',
      'Spatial Hash Update: Physics engine (Rust) calculates collisions using a multi-threaded spatial grid.',
      'DOM Reconciliation: A lightweight Diff-ing engine updates only the transform: translate3d properties of the entity Web Components.'
    ],
    architectureDiagram: `[ INPUT BUFFER ] --> [ WASM CORE ]
                       |
                       +--> [ SHARED ARRAY BUFFER ]
                                |
                                +--> [ WEB WORKERS ] (4 Nodes)
                                         |
                                         +--> [ DOM UPDATE ]`,
    learnt: [
      'WASM Overhead: The overhead of crossing the JS/WASM boundary is real. Batching operations is crucial for maintaining frame rates.',
      'Garbage Collection: High-performance code must be allocation-free during the hot loop to avoid stuttering.',
      'CSS as Render Target: CSS Variables and translate3d are incredibly efficient ways to pass data from JS to the browser\'s compositor.'
    ],
    githubUrl: 'https://github.com/Itshardtofindagoodname/Slash',
    status: 'IN PRODUCTION BETA'
  }
}

interface ProjectDeepDiveProps {
  projectKey: string
  onBack: () => void
}

const ProjectDeepDive = ({ projectKey, onBack }: ProjectDeepDiveProps) => {
  const project = projectRegistry[projectKey] || projectRegistry.fastfox

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [projectKey])

  return (
    <main className="mt-24 px-6 md:px-12 max-w-4xl mx-auto pb-16 relative">
      {/* Marginalia Annotations */}
      <div className="hidden xl:block absolute -left-64 top-32 w-56 text-[20px] font-handwriting italic opacity-60">
        <svg className="w-full h-12 mb-2" viewBox="0 0 150 50">
          <path
            className="svg-doodle"
            d="M140 10 Q 75 45 10 10"
            fill="none"
            stroke="black"
            strokeWidth="2"
            style={{ strokeDasharray: 140, strokeDashoffset: 0 }}
          />
          <path
            className="svg-doodle"
            d="M15 5 L 10 10 L 17 14"
            fill="none"
            stroke="black"
            strokeWidth="2"
            style={{ strokeDasharray: 20, strokeDashoffset: 0 }}
          />
        </svg>
        <p className="text-sm">{project.marginalia}</p>
      </div>

      {/* The "Paper" Container */}
      <div className="relative bg-white p-8 md:p-16 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] paper-texture wiggly-border">
        {/* Tapes */}
        <div className="tape tape-tl"></div>
        <div className="tape tape-tr"></div>
        <div className="tape tape-bl"></div>
        <div className="tape tape-br"></div>

        {/* Back Button */}
        <button onClick={onBack} className="inline-flex items-center gap-2 mb-12 group jitter border-none bg-transparent cursor-pointer">
          <svg className="rotate-180" fill="none" height="24" viewBox="0 0 40 24" width="40">
            <path
              d="M2 12H38M38 12L30 4M38 12L30 20"
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
            />
          </svg>
          <span className="font-label-caps text-xs uppercase tracking-widest border-b-2 border-transparent group-hover:border-black transition-colors duration-200">
            Back to Projects
          </span>
        </button>

        <article className="markdown-content">
          <header className="mb-12">
            <h1 className="uppercase tracking-tighter text-4xl md:text-5xl border-b-2 border-black pb-2 inline-block">
              {project.filename}
            </h1>
            <div className="flex gap-4 mt-4">
              <span className="font-label-caps px-2 py-1 bg-black text-white text-[10px]">
                {project.ver}
              </span>
              <span className="font-label-caps px-2 py-1 border border-black text-[10px]">
                {project.releaseType}
              </span>
            </div>
          </header>

          {/* 1. Introduction */}
          <section className="mb-8">
            <h2>1. Introduction</h2>
            <p>{project.intro}</p>
            <div className="relative p-6 my-8 border-2 border-black border-dashed bg-white transform rotate-[-0.5deg]">
              <p className="italic mb-0 font-handwriting text-2xl">"{project.introQuote}"</p>
              <span className="material-symbols-outlined absolute -top-4 -right-4 text-4xl bg-white p-1">
                {project.introIcon}
              </span>
            </div>
          </section>

          {/* 2. Tech Stack, Features and Metrics */}
          <section className="mb-8">
            <h2>2. Tech Stack, Features &amp; Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
              <div className="p-6 border-2 border-black bg-white">
                <h3 className="mt-0">{project.stackTitle}</h3>
                <ul className="text-sm list-none pl-0">
                  {project.stack.map((item, idx) => (
                    <li key={idx} className="relative pl-5 mb-2 before:content-['→'] before:absolute before:left-0 before:text-black">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 border-2 border-black bg-white transform rotate-[1deg]">
                <h3 className="mt-0">{project.metricsTitle}</h3>
                <ul className="text-sm list-none pl-0">
                  {project.metrics.map((item, idx) => (
                    <li key={idx} className="relative pl-5 mb-2 before:content-['→'] before:absolute before:left-0 before:text-black">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <h3>Key Capabilities</h3>
            <ul className="list-none pl-0">
              {project.capabilities.map((item, idx) => (
                <li key={idx} className="relative pl-6 mb-4 before:content-['→'] before:absolute before:left-0 before:text-black font-body-md text-lg">
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* 3. Why it was built */}
          <section className="mb-8">
            <h2>3. Why it was built</h2>
            <p>{project.whyBuilt}</p>
          </section>

          {/* 4. How it works */}
          <section className="mb-8">
            <h2>4. How it works</h2>
            <p>The flow of logic through {project.title} follows a structured pipeline:</p>
            <ol className="list-decimal pl-6 space-y-4 font-body-md text-lg">
              {project.howItWorks.map((item, idx) => (
                <li key={idx} className="pl-2">
                  {item}
                </li>
              ))}
            </ol>
          </section>

          {/* 5. Architecture */}
          <section className="mb-8">
            <h2>5. Architecture</h2>
            <p>The system follows a modular orchestration architecture:</p>
            <div className="my-8 p-8 border-2 border-black bg-white relative overflow-x-auto">
              <pre className="font-mono text-sm leading-relaxed whitespace-pre bg-transparent p-0 m-0 border-none">
                {project.architectureDiagram}
              </pre>
              <svg className="absolute bottom-2 right-2 w-24 h-24 opacity-20 pointer-events-none" viewBox="0 0 100 100">
                <path
                  className="svg-doodle"
                  d="M10 10 Q 50 50 90 90 M90 90 L 70 90 M90 90 L 90 70"
                  fill="none"
                  stroke="black"
                  strokeWidth="4"
                  style={{ strokeDasharray: 200, strokeDashoffset: 0 }}
                />
              </svg>
            </div>
          </section>

          {/* 6. What I learnt */}
          <section className="mb-8">
            <h2>6. What I learnt</h2>
            <p>Building {project.title} was a masterclass in frontend performance, system integrations, and modular architecture. Key takeaways include:</p>
            <ul className="list-none pl-0">
              {project.learnt.map((item, idx) => (
                <li key={idx} className="relative pl-6 mb-4 before:content-['→'] before:absolute before:left-0 before:text-black font-body-md text-lg">
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <div className="hand-drawn-line mt-12 opacity-30"></div>

          <footer className="mt-8 flex flex-wrap gap-4">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border-2 border-black font-headline-md text-lg bg-black text-white hover:bg-white hover:text-black transition-all transform active:scale-95 jitter uppercase tracking-widest no-underline inline-block text-center"
            >
              View GitHub Repo
            </a>
            <button
              onClick={onBack}
              className="px-8 py-3 border-2 border-black font-headline-md text-lg bg-white hover:bg-black hover:text-white transition-all transform active:scale-95 jitter uppercase tracking-widest cursor-pointer inline-block text-center"
            >
              Back to Projects
            </button>
          </footer>
        </article>

        {/* Bottom Sketchbook Label */}
        <div className="absolute -bottom-10 right-0">
          <span className="font-handwriting text-xl opacity-40">
            ** Drafted in the back of a notebook **
          </span>
        </div>
      </div>

      <aside className="mt-12 text-center xl:fixed xl:bottom-12 xl:right-12 xl:mt-0 z-40">
        <div className="inline-block p-4 bg-white border border-black rotate-[-3deg] shadow-lg">
          <p className="font-label-caps text-[10px] mb-1">CURRENT STATUS</p>
          <p className="font-bold uppercase">{project.status}</p>
        </div>
      </aside>
    </main>
  )
}

export default ProjectDeepDive
