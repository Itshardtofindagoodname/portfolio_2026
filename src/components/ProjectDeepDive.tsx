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
  fastfox: { title: 'FastFox', filename: 'FastFox.md', ver: 'VER 2.1.0', releaseType: 'PUBLIC BETA', marginalia: 'AI-Powered Command Line Productivity', intro: 'FastFox is an AI-augmented command-line assistant that combines file organization, command generation, code assistance, and document analysis into a single workflow. Designed for developers and power users, it transforms the terminal into an intelligent workspace capable of understanding both files and intent.', introQuote: 'The fastest interface is still a blinking cursor—provided it understands what you mean.', introIcon: 'terminal', stackTitle: 'The Stack', stack: ['Core: Python', 'AI Models: Groq LLMs', 'Computer Vision: BLIP Image Captioning', 'Data Processing: Pandas, PyPDF2', 'System Integration: Win32 APIs'], metricsTitle: 'Performance Metrics', metrics: ['50+ Files Organized Per Batch', 'Multi-Format Document Processing', 'Sub-Second Command Suggestions', 'Unified AI Workflow Through CLI'], capabilities: ['AI File Organization: Automatically groups files based on semantic meaning rather than filenames.', 'Command Generation: Converts natural language instructions into executable terminal commands.', 'Code Assistance: Generates and explains code directly within terminal workflows.', 'Document Understanding: Extracts information from PDFs, spreadsheets, text files, and images.'], whyBuilt: 'Modern workflows force users to jump between file explorers, chatbots, terminals, and editors. FastFox was built to unify these actions inside a single command-line experience where AI becomes part of the operating environment rather than a separate destination.', howItWorks: ['Users issue commands through the FastFox CLI.', 'Files are processed through specialized handlers depending on format.', 'AI models analyze content, intent, and context.', 'Results are returned as executable actions, suggestions, or organized outputs.'], architectureDiagram: `[ USER ] | v [ FASTFOX CLI ] | +---+---+---+ | | | v v v [ FILE ] [ LLM ] [ IMAGE MODEL ] PROCESS ENGINE ENGINE | | | +----------+----------+ | v [ OUTPUT ]`, learnt: ['Good developer tooling prioritizes speed above almost everything else.', 'Natural-language interfaces become far more useful when connected to system actions.', 'The challenge of AI products often lies in orchestration rather than intelligence.'], githubUrl: 'https://github.com/Itshardtofindagoodname/fastfox', status: 'ACTIVE DEVELOPMENT' },
  vaultify: { title: 'Vaultify', filename: 'Vaultify.md', ver: 'VER 1.0.0-SIH', releaseType: 'HACKATHON RELEASE', marginalia: 'Decentralized Legal Document Infrastructure', intro: 'Vaultify is a blockchain-powered document custody platform designed for legal workflows where trust, authority, and access control matter as much as the files themselves. The system enables clients, lawyers, and judicial authorities to securely exchange, manage, and verify sensitive legal records through programmable permissions.', introQuote: 'The problem with legal documents is not storage. It is proving who should be allowed to see them.', introIcon: 'gavel', stackTitle: 'The Stack', stack: ['Frontend: React, Vite, Tailwind CSS', 'Web3: Thirdweb SDK', 'State Management: React Context', 'Storage Layer: Decentralized File Handling', 'Role-Based Workflow Engine'], metricsTitle: 'System Metrics', metrics: ['3 Distinct Authority Roles Supported', 'Multi-Level Access Control Architecture', 'Secure Document Sharing Workflow', 'Blockchain-Backed Ownership Verification'], capabilities: ['Role-Aware Access: Different experiences for clients, lawyers, and judges ensure only relevant actions are exposed.', 'Authority Delegation: Users can grant and revoke access permissions without exposing entire document repositories.', 'Court Case Management: Documents can be associated with legal proceedings and accessed through controlled workflows.'], whyBuilt: 'Legal systems still rely heavily on fragmented communication channels and centralized repositories. Sensitive files often move through email chains, messaging apps, and multiple intermediaries. Vaultify was built to explore how programmable ownership and permission models could reduce ambiguity while preserving accountability.', howItWorks: ['Users authenticate through a Web3-enabled identity layer.', 'Documents are uploaded and linked to their respective legal entities.', 'Authorities can be assigned, updated, or revoked through permission controls.', 'Participants access only the information relevant to their role in the workflow.'], architectureDiagram: `[ CLIENT / LAWYER / JUDGE ] | v [ REACT FRONTEND ] | v [ WEB3 CONTEXT LAYER ] | +----------+----------+ | | v v [ FILE SYSTEM ] [ AUTHORITY ENGINE ] | | +----------+----------+ | v [ THIRDWEB / WEB3 ]`, learnt: ['Access control is often harder to design than authentication itself.', 'Legal workflows demand clear permission boundaries more than complex UI.', 'Blockchain integrations become powerful when used to enforce process, not just store data.'], githubUrl: 'https://github.com/Itshardtofindagoodname/Vaultify-SIH', status: 'COMPLETED' },
  pragati: { title: 'Pragati', filename: 'Pragati.md', ver: 'VER 1.2.0-SIH', releaseType: 'INTELLIGENT GOVERNANCE RELEASE', marginalia: 'AI-Assisted Public Infrastructure Management', intro: 'Pragati is a governance platform built to coordinate citizens, contractors, and government departments through a unified workflow. By combining structured task management with AI-assisted dependency analysis, the system helps public projects move from complaint registration to execution with greater transparency.', introQuote: 'Infrastructure projects fail less from lack of effort and more from lack of coordination.', introIcon: 'account_tree', stackTitle: 'The Stack', stack: ['Frontend: Next.js, React', 'Backend: Node.js API Routes', 'Database: MongoDB, Mongoose', 'AI Layer: LangChain, Google Gemini', 'Authentication: JWT'], metricsTitle: 'Platform Metrics', metrics: ['AI-Assisted Task Dependency Analysis', 'Multi-Stakeholder Workflow Management', 'Citizen-to-Execution Tracking Pipeline', 'Role-Based Operational Dashboards'], capabilities: ['Complaint Management: Citizens can submit infrastructure-related concerns with supporting information.', 'Contractor Registry: Verified contractors participate in project execution workflows.', 'Department Coordination: Administrative units manage project assignments and approvals.', 'AI Scheduling Assistance: Gemini-powered analysis helps identify project dependencies and sequencing.'], whyBuilt: 'Public infrastructure projects often suffer from disconnected communication between departments, contractors, and citizens. Pragati was built to create a shared operational layer where issues can be tracked, resources coordinated, and dependencies analyzed before they become bottlenecks.', howItWorks: ['Citizens submit complaints and requests through the platform.', 'Administrative teams review and classify incoming issues.', 'Contractors and departments are assigned based on project scope.', 'AI evaluates dependencies between tasks and recommends execution order.'], architectureDiagram: `[ CITIZENS ] | v [ COMPLAINT SYSTEM ] | v [ MONGODB DATABASE ] | +------+------+------+ | | | v v v [ TASKS ] [ CONTRACTORS ] [ DEPARTMENTS ] | v [ GEMINI + LANGCHAIN ] | v [ DEPENDENCY ANALYSIS ]`, learnt: ['Real-world workflows are rarely linear and require flexible data models.', 'AI is most useful when augmenting decision-making instead of replacing it.', 'Government systems benefit significantly from visibility and accountability tooling.'], githubUrl: 'https://github.com/Itshardtofindagoodname/Pragati-SIH', status: 'COMPLETED' },
  profi: {
    title: 'Profi',
    filename: 'Profi.md',
    ver: 'VER 0.9.0-ALPHA',
    releaseType: 'EXPERIMENTAL RELEASE',
    marginalia: 'AI-Assisted Project Ideation Workspace',
    intro: 'Profi is an experimental workspace for transforming raw ideas into actionable software plans. Combining conversational AI, document ingestion, and structured project generation, it acts as a bridge between inspiration and execution.',
    introQuote: 'Ideas are cheap. Clarity is expensive.',
    introIcon: 'psychology',
    stackTitle: 'The Stack',
    stack: [
      'Frontend: React',
      'AI Backend Integration',
      'Document Upload Pipeline',
      'Project Planning Engine',
      'Local Persistence Layer'
    ],
    metricsTitle: 'Workspace Metrics',
    metrics: [
      'AI-Generated Project Blueprints',
      'Document & Link Ingestion Support',
      'Interactive Planning Workflow',
      'Rapid Idea-to-Spec Conversion'
    ],
    capabilities: [
      'Conversational ideation workflows.',
      'Project plan generation from prompts.',
      'Document-assisted knowledge ingestion.',
      'Structured feature and roadmap creation.'
    ],
    whyBuilt: 'Most project ideas die between inspiration and planning. Profi was built to reduce that gap by helping users structure concepts into executable software roadmaps.',
    howItWorks: [
      'Users submit ideas or supporting documents.',
      'AI extracts requirements and project intent.',
      'Structured plans, features, and implementation suggestions are generated.',
      'Users iterate through conversational refinement.'
    ],
    architectureDiagram: `[ USER ]
      |
      v
 [ REACT UI ]
      |
 +----+----+
 |         |
 v         v
[ CHAT ] [ PLANNER ]
      |
      v
 [ AI BACKEND ]`,
    learnt: [
      'Planning is often more difficult than implementation.',
      'AI excels at reducing blank-page friction.',
      'Simple interfaces encourage deeper exploration.'
    ],
    githubUrl: 'https://github.com/Itshardtofindagoodname/Profi',
    status: 'IN DEVELOPMENT'
  },
  slash: {
    title: 'Slash',
    filename: 'Slash.md',
    ver: 'VER 1.0.0',
    releaseType: 'PLAYABLE RELEASE',
    marginalia: 'Browser-Based Arcade Experiment',
    intro: 'Slash is a lightweight browser game focused on responsive gameplay, instant accessibility, and pure client-side execution. Built with vanilla web technologies, it demonstrates how engaging interactive experiences can emerge without heavy frameworks.',
    introQuote: 'Great games are measured in milliseconds, not megabytes.',
    introIcon: 'sports_esports',
    stackTitle: 'The Stack',
    stack: [
      'HTML5',
      'CSS3',
      'Vanilla JavaScript',
      'Browser Rendering APIs'
    ],
    metricsTitle: 'Game Metrics',
    metrics: [
      'Zero Dependencies',
      'Instant Browser Startup',
      'Single-Page Architecture',
      'Pure Client-Side Execution'
    ],
    capabilities: [
      'Real-time gameplay mechanics.',
      'Interactive scoring systems.',
      'Responsive browser controls.',
      'Lightweight deployment footprint.'
    ],
    whyBuilt: 'Slash was built as an exploration of how far core web technologies can be pushed without relying on large frameworks or game engines.',
    howItWorks: [
      'Game state is managed entirely in-browser.',
      'JavaScript controls rendering and interactions.',
      'User actions drive score progression and gameplay loops.',
      'Everything executes locally within the browser.'
    ],
    architectureDiagram: `[ PLAYER ]
      |
      v
 [ INPUT LOOP ]
      |
      v
 [ GAME LOGIC ]
      |
      v
 [ RENDER ENGINE ]
      |
      v
 [ SCORE SYSTEM ]`,
    learnt: [
      'Performance becomes visible immediately in interactive systems.',
      'Gameplay feel matters more than graphical complexity.',
      'Vanilla JavaScript remains surprisingly capable for small games.'
    ],
    githubUrl: 'https://github.com/Itshardtofindagoodname/Slash',
    status: 'COMPLETED'
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
