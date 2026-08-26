import { useEffect, useRef } from 'react'
import { useLenis } from 'lenis/react'
import { motion, useReducedMotion } from 'framer-motion'
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

const projectKeys = ['fastfox', 'gitgud', 'tornedo', 'profi', 'pragati', 'vaultify', 'slash', 'cairn']

// tiny hook: add is-visible to headings when in viewport (for ink sweep)
function useInkObserver(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const headings = el.querySelectorAll('.deepdive-section-heading')
    if (!('IntersectionObserver' in window)) {
      headings.forEach((h) => h.classList.add('is-visible'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.4, rootMargin: '0px 0px -10% 0px' }
    )
    headings.forEach((h) => io.observe(h))
    return () => io.disconnect()
  }, [ref])
}

const ProjectDeepDive = ({ projectKey, onBack }: ProjectDeepDiveProps) => {
  const project = projectRegistry[projectKey] || projectRegistry.fastfox
  const lenis = useLenis()
  const articleRef = useRef<HTMLElement>(null)
  const shouldReduceMotion = useReducedMotion()

  useInkObserver(articleRef)

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [projectKey, lenis])

  const onNextProject = () => {
    const currentIndex = projectKeys.indexOf(projectKey)
    const nextIndex = (currentIndex + 1) % projectKeys.length
    const nextKey = projectKeys[nextIndex]
    window.location.hash = `#/project/${nextKey}`
  }

  const archLines = project.architectureDiagram.split('\n')

  return (
    <motion.main
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={shouldReduceMotion ? undefined : { opacity: 0, y: -12 }}
      transition={{ duration: shouldReduceMotion ? 0.2 : 0.45, ease: [0.22, 1, 0.32, 1] }}
      className="mt-20 sm:mt-24 px-4 sm:px-6 md:px-12 max-w-4xl mx-auto pb-20 sm:pb-16 relative w-full min-w-0 overflow-x-clip"
    >
      {/* Marginalia Annotations — hidden on <xl as before */}
      <div className="hidden xl:block absolute -left-64 top-32 w-56 text-[20px] font-handwriting italic opacity-60 pointer-events-none select-none">
        <svg className="w-full h-12 mb-2" viewBox="0 0 150 50" aria-hidden="true">
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
        <p className="text-sm leading-snug">{project.marginalia}</p>
      </div>

      {/* The "Paper" Container — responsive padding + shadow scale */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.97, rotate: -0.35, y: 10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
        transition={
          shouldReduceMotion
            ? { duration: 0.2 }
            : { duration: 0.6, ease: [0.22, 1, 0.32, 1], delay: 0.08 }
        }
        className="relative bg-white p-5 sm:p-8 md:p-12 lg:p-16 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] paper-texture wiggly-border paper-unfold min-w-0 overflow-hidden will-change-transform"
        style={{ transformOrigin: 'top center' }}
      >
        {/* Tapes — keep but with reduced offsets on mobile via CSS */}
        <div className="tape tape-tl" aria-hidden="true" />
        <div className="tape tape-tr" aria-hidden="true" />
        <div className="tape tape-bl hidden sm:block" aria-hidden="true" />
        <div className="tape tape-br hidden sm:block" aria-hidden="true" />

        {/* Back Button */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 mb-8 sm:mb-12 group jitter border-none bg-transparent cursor-pointer touch-manipulation"
        >
          <svg className="rotate-180 shrink-0" fill="none" height="20" viewBox="0 0 40 24" width="32" aria-hidden="true">
            <path
              d="M2 12H38M38 12L30 4M38 12L30 20"
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
            />
          </svg>
          <span className="font-label-caps text-[11px] sm:text-xs uppercase tracking-widest border-b-2 border-transparent group-hover:border-black transition-colors duration-200">
            Back to Projects
          </span>
        </button>

        <article ref={articleRef} className="markdown-content min-w-0">
          <motion.header
            initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.45, ease: [0.22, 1, 0.32, 1] }}
            className="mb-8 sm:mb-12 min-w-0"
          >
            <h1 className="uppercase tracking-tighter text-[1.7rem] xs:text-[1.85rem] sm:text-4xl md:text-5xl border-b-2 border-black pb-2 inline-block max-w-full break-words leading-none">
              {project.filename}
            </h1>
            <div className="flex flex-wrap gap-2 sm:gap-4 mt-4">
              <span className="font-label-caps px-2.5 py-1 bg-black text-white text-[10px] leading-none tracking-widest">
                {project.ver}
              </span>
              <span className="font-label-caps px-2.5 py-1 border border-black text-[10px] leading-none tracking-widest bg-white">
                {project.releaseType}
              </span>
            </div>
          </motion.header>

          {/* 1. Introduction */}
          <motion.section
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.32, 1] }}
            className="mb-8 sm:mb-10 min-w-0"
          >
            <h2 className="deepdive-section-heading">1. Introduction</h2>
            <p className="mt-4">{project.intro}</p>
            <div className="quote-stamp relative p-5 sm:p-6 my-6 sm:my-8 border-2 border-black border-dashed bg-white transform rotate-[-0.4deg] sm:rotate-[-0.5deg] will-change-transform">
              <p className="italic mb-0 font-handwriting text-xl sm:text-2xl leading-tight pr-8">
                &ldquo;{project.introQuote}&rdquo;
              </p>
              <span className="material-symbols-outlined absolute -top-3 -right-3 sm:-top-4 sm:-right-4 text-3xl sm:text-4xl bg-white p-1 leading-none select-none" aria-hidden="true">
                {project.introIcon}
              </span>
            </div>
          </motion.section>

          {/* 2. Tech Stack, Features and Metrics */}
          <motion.section
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: 0.04, ease: [0.22, 1, 0.32, 1] }}
            className="mb-8 sm:mb-10 min-w-0"
          >
            <h2 className="deepdive-section-heading">2. Tech Stack, Features &amp; Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 my-6 sm:my-8">
              <div className="p-5 sm:p-6 border-2 border-black bg-white min-w-0">
                <h3 className="mt-0 text-[1.05rem] sm:text-xl">{project.stackTitle}</h3>
                <ul className="text-sm list-none pl-0 mt-3">
                  {project.stack.map((item, idx) => (
                    <li key={idx} className="relative pl-5 mb-2 before:content-['→'] before:absolute before:left-0 before:text-black text-[13px] sm:text-sm leading-snug break-words">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-5 sm:p-6 border-2 border-black bg-white transform rotate-[0.6deg] sm:rotate-[1deg] min-w-0">
                <h3 className="mt-0 text-[1.05rem] sm:text-xl">{project.metricsTitle}</h3>
                <ul className="text-sm list-none pl-0 mt-3">
                  {project.metrics.map((item, idx) => (
                    <li key={idx} className="relative pl-5 mb-2 before:content-['→'] before:absolute before:left-0 before:text-black text-[13px] sm:text-sm leading-snug break-words">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <h3>Key Capabilities</h3>
            <ul className="list-none pl-0">
              {project.capabilities.map((item, idx) => (
                <motion.li
                  key={idx}
                  initial={shouldReduceMotion ? false : { opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.38, delay: idx * 0.045, ease: [0.22, 1, 0.32, 1] }}
                  className="cap-item relative pl-6 mb-3 sm:mb-4 before:content-['→'] before:absolute before:left-0 before:text-black font-body-md text-[15px] sm:text-lg leading-snug break-words"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.section>

          {/* 3. Why it was built */}
          <motion.section
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.32, 1] }}
            className="mb-8 sm:mb-10 min-w-0"
          >
            <h2 className="deepdive-section-heading">3. Why it was built</h2>
            <p className="mt-4">{project.whyBuilt}</p>
          </motion.section>

          {/* 4. How it works */}
          <motion.section
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.32, 1] }}
            className="mb-8 sm:mb-10 min-w-0"
          >
            <h2 className="deepdive-section-heading">4. How it works</h2>
            <p>The flow of logic through {project.title} follows a structured pipeline:</p>
            <ol className="list-decimal pl-5 sm:pl-6 space-y-3 sm:space-y-4 font-body-md text-[15px] sm:text-lg marker:font-bold">
              {project.howItWorks.map((item, idx) => (
                <motion.li
                  key={idx}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.36, delay: idx * 0.05, ease: [0.22, 1, 0.32, 1] }}
                  className="pl-1 sm:pl-2 leading-snug break-words"
                >
                  {item}
                </motion.li>
              ))}
            </ol>
          </motion.section>

          {/* 5. Architecture */}
          <motion.section
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.32, 1] }}
            className="mb-8 sm:mb-10 min-w-0"
          >
            <h2 className="deepdive-section-heading">5. Architecture</h2>
            <p>The system follows a modular orchestration architecture:</p>
            <div className="my-6 sm:my-8 p-0 border-2 border-black bg-white relative overflow-hidden min-w-0">
              {/* subtle graph-paper dots + reveal */}
              <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(circle_at_1px_1px,black_1px,transparent_0)] bg-[length:16px_16px]" aria-hidden="true" />
              <div className="relative overflow-x-auto overscroll-x-contain scrollbar-thin -mx-0">
                <pre className="font-mono text-[11px] xs:text-xs sm:text-sm leading-relaxed whitespace-pre bg-transparent p-4 sm:p-8 m-0 border-none min-w-max">
                  {archLines.map((line, i) => (
                    <span
                      key={i}
                      className="arch-line"
                      style={{ ['--i' as string]: i } as React.CSSProperties}
                    >
                      {line || ' '}
                    </span>
                  ))}
                </pre>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-black/10 pointer-events-none" aria-hidden="true" />
            </div>
          </motion.section>

          {/* 6. What I learnt */}
          <motion.section
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.32, 1] }}
            className="mb-6 sm:mb-8 min-w-0"
          >
            <h2 className="deepdive-section-heading">6. What I learnt</h2>
            <p>Building {project.title} was a masterclass in frontend performance, system integrations, and modular architecture. Key takeaways include:</p>
            <ul className="list-none pl-0">
              {project.learnt.map((item, idx) => (
                <motion.li
                  key={idx}
                  initial={shouldReduceMotion ? false : { opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.38, delay: idx * 0.05, ease: [0.22, 1, 0.32, 1] }}
                  className="cap-item relative pl-6 mb-3 sm:mb-4 before:content-['→'] before:absolute before:left-0 before:text-black font-body-md text-[15px] sm:text-lg leading-snug break-words"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.section>

          <div className="hand-drawn-line mt-8 sm:mt-12 opacity-30" aria-hidden="true" />

          <footer className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto sm:flex-1 lg:flex-none px-6 sm:px-8 py-3.5 sm:py-3 border-2 border-black font-headline-md text-base sm:text-lg bg-black text-white hover:bg-white hover:text-black transition-colors duration-200 active:scale-[0.98] jitter uppercase tracking-widest no-underline inline-flex items-center justify-center text-center min-w-0 touch-manipulation"
            >
              View GitHub Repo
            </a>
            <button
              onClick={onNextProject}
              className="w-full sm:w-auto sm:flex-1 lg:flex-none px-6 sm:px-8 py-3.5 sm:py-3 border-2 border-black font-headline-md text-base sm:text-lg bg-black text-white hover:bg-white hover:text-black transition-colors duration-200 active:scale-[0.98] jitter uppercase tracking-widest cursor-pointer inline-flex items-center justify-center text-center min-w-0 touch-manipulation"
            >
              Next Project
            </button>
            <button
              onClick={onBack}
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-3 border-2 border-black font-headline-md text-base sm:text-lg bg-white hover:bg-black hover:text-white transition-colors duration-200 active:scale-[0.98] jitter uppercase tracking-widest cursor-pointer inline-flex items-center justify-center text-center min-w-0 touch-manipulation"
            >
              Back to Projects
            </button>
          </footer>
        </article>

        {/* Bottom Sketchbook Label — responsive: no absolute overlap on mobile */}
        <div className="mt-8 sm:absolute sm:-bottom-10 sm:right-0 sm:mt-0 text-right">
          <span className="font-handwriting text-base sm:text-xl opacity-40">
            ** Drafted in the back of a notebook **
          </span>
        </div>
      </motion.div>

      <aside className="mt-8 sm:mt-12 text-center xl:fixed xl:bottom-12 xl:right-12 xl:mt-0 z-40 flex justify-center xl:block">
        <div className="status-badge inline-block p-4 bg-white border-2 border-black rotate-[-2deg] sm:rotate-[-3deg] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-lg min-w-[9rem]">
          <p className="font-label-caps text-[10px] mb-1 tracking-widest">CURRENT STATUS</p>
          <p className="font-bold uppercase text-sm tracking-wide">{project.status}</p>
        </div>
      </aside>
    </motion.main>
  )
}

export default ProjectDeepDive
