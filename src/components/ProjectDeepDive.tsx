import { useEffect } from 'react'
import { motion } from 'framer-motion'
import projectRegistryRaw from '../data/projects.json'

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

const projectRegistry = projectRegistryRaw as Record<string, ProjectData>

interface ProjectDeepDiveProps {
  projectKey: string
  onBack: () => void
}

const projectKeys = ['fastfox', 'profi', 'pragati', 'vaultify', 'slash']

const ProjectDeepDive = ({ projectKey, onBack }: ProjectDeepDiveProps) => {
  const project = projectRegistry[projectKey] || projectRegistry.fastfox

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [projectKey])

  const onNextProject = () => {
    const currentIndex = projectKeys.indexOf(projectKey)
    const nextIndex = (currentIndex + 1) % projectKeys.length
    const nextKey = projectKeys[nextIndex]
    window.location.hash = `#/project/${nextKey}`
  }

  return (
    <motion.main
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="mt-24 px-6 md:px-12 max-w-4xl mx-auto pb-16 relative"
    >
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
              onClick={onNextProject}
              className="px-8 py-3 border-2 border-black font-headline-md text-lg bg-black text-white hover:bg-white hover:text-black transition-all transform active:scale-95 jitter uppercase tracking-widest cursor-pointer inline-block text-center"
            >
              Next Project
            </button>
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
    </motion.main>
  )
}

export default ProjectDeepDive
