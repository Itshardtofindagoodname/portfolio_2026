import { useEffect, useRef } from 'react'
import { useLenis } from 'lenis/react'
import projectRegistryRaw from '../data/projects.json'
import VaraRevealText from './VaraRevealText'
import AppIcon from './AppIcon'
import MotionReveal from './MotionReveal'
import AnimatedText from './AnimatedText'

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

const ProjectDeepDive = ({ projectKey, onBack }: ProjectDeepDiveProps) => {
  const project = projectRegistry[projectKey] || projectRegistry.fastfox
  const lenis = useLenis()
  const articleRef = useRef<HTMLElement>(null)

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
    <main
      className="mt-20 sm:mt-24 px-4 sm:px-6 md:px-12 max-w-4xl mx-auto pb-20 sm:pb-16 relative w-full min-w-0 overflow-x-clip"
    >
      <div className="hidden xl:block absolute -left-64 top-32 w-56 text-[20px] font-handwriting italic opacity-60 pointer-events-none select-none text-[#0D1015]">
        <svg className="w-full h-12 mb-2" viewBox="0 0 150 50" aria-hidden="true">
          <path
            d="M140 10 Q 75 45 10 10"
            fill="none"
            stroke="#0D1015"
            strokeWidth="2"
          />
          <path
            d="M15 5 L 10 10 L 17 14"
            fill="none"
            stroke="#0D1015"
            strokeWidth="2"
          />
        </svg>
        <p className="text-sm leading-snug">{project.marginalia}</p>
      </div>

      <MotionReveal
        className="relative bg-[#F5F3EE] p-5 sm:p-8 md:p-12 lg:p-16 shadow-[6px_6px_0px_0px_rgba(13,16,21,0.15)] sm:shadow-[8px_8px_0px_0px_rgba(13,16,21,0.18)] md:shadow-[12px_12px_0px_0px_rgba(13,16,21,0.2)] paper-texture wiggly-border paper-unfold min-w-0 overflow-hidden"
        y={16}
        rotate={0.4}
      >
        <div className="tape tape-tl" aria-hidden="true" />
        <div className="tape tape-tr" aria-hidden="true" />
        <div className="tape tape-bl hidden sm:block" aria-hidden="true" />
        <div className="tape tape-br hidden sm:block" aria-hidden="true" />

        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 mb-8 sm:mb-12 group jitter border-none bg-transparent cursor-pointer touch-manipulation"
        >
          <svg className="rotate-180 shrink-0" fill="none" height="20" viewBox="0 0 40 24" width="32" aria-hidden="true">
            <path
              d="M2 12H38M38 12L30 4M38 12L30 20"
              stroke="#0D1015"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
            />
          </svg>
          <span className="font-label-caps text-[11px] sm:text-xs uppercase tracking-widest border-b-2 border-transparent group-hover:border-[#4AC5CB] transition-colors duration-200 text-[#0D1015]">
            Back to Projects
          </span>
        </button>

        <article ref={articleRef} className="markdown-content min-w-0">
          <header className="mb-8 sm:mb-12 min-w-0">
            <h1 className="uppercase tracking-tighter text-[1.7rem] xs:text-[1.85rem] sm:text-4xl md:text-5xl border-b-2 border-[#0D1015] pb-2 inline-block max-w-full leading-none text-[#0D1015]">
              <VaraRevealText text={project.filename.toUpperCase()} fontSize={34} />
            </h1>
            <div className="flex flex-wrap gap-2 sm:gap-4 mt-4">
              <span className="font-label-caps px-2.5 py-1 bg-[#0D1015] text-[#F5F3EE] text-[10px] leading-none tracking-widest">
                {project.ver}
              </span>
              <span className="font-label-caps px-2.5 py-1 border border-[#0D1015] text-[10px] leading-none tracking-widest bg-[#F5F3EE] text-[#0D1015]">
                {project.releaseType}
              </span>
            </div>
          </header>

          <section className="mb-8 sm:mb-10 min-w-0">
            <h2 className="deepdive-section-heading is-visible text-[#0D1015]">
              <VaraRevealText text="1. Introduction" fontSize={30} />
            </h2>
            <p className="mt-4 text-[#0D1015]">
              <AnimatedText text={project.intro} stagger={0.035} />
            </p>
            <div className="quote-stamp relative p-5 sm:p-6 my-6 sm:my-8 border-2 border-[#0D1015] border-dashed bg-[#F5F3EE] transform rotate-[-0.4deg] sm:rotate-[-0.5deg] will-change-transform">
              <p className="italic mb-0 font-handwriting text-xl sm:text-2xl leading-tight pr-8 text-[#0D1015]">
                &ldquo;{project.introQuote}&rdquo;
              </p>
              <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-[#F5F3EE] p-1 leading-none select-none text-[#0D1015]" aria-hidden="true">
                <AppIcon name={project.introIcon} size={30} />
              </div>
            </div>
          </section>

          <section className="mb-8 sm:mb-10 min-w-0">
            <h2 className="deepdive-section-heading is-visible text-[#0D1015]">
              <VaraRevealText text="2. Tech Stack, Features &amp; Metrics" fontSize={30} />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 my-6 sm:my-8">
              <div className="p-5 sm:p-6 border-2 border-[#0D1015] bg-[#F5F3EE] min-w-0">
                <h3 className="mt-0 text-[1.05rem] sm:text-xl text-[#0D1015]">{project.stackTitle}</h3>
                <ul className="text-sm list-none pl-0 mt-3 text-[#0D1015]">
                  {project.stack.map((item, idx) => (
                    <li key={idx} className="relative pl-5 mb-2 before:content-['→'] before:absolute before:left-0 text-[13px] sm:text-sm leading-snug break-words">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-5 sm:p-6 border-2 border-[#0D1015] bg-[#F5F3EE] transform rotate-[0.6deg] sm:rotate-[1deg] min-w-0">
                <h3 className="mt-0 text-[1.05rem] sm:text-xl text-[#0D1015]">{project.metricsTitle}</h3>
                <ul className="text-sm list-none pl-0 mt-3 text-[#0D1015]">
                  {project.metrics.map((item, idx) => (
                    <li key={idx} className="relative pl-5 mb-2 before:content-['→'] before:absolute before:left-0 text-[13px] sm:text-sm leading-snug break-words">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <h3 className="text-[#0D1015]">Key Capabilities</h3>
            <ul className="list-none pl-0">
              {project.capabilities.map((item, idx) => (
                <li
                  key={idx}
                  className="cap-item relative pl-6 mb-3 sm:mb-4 before:content-['→'] before:absolute before:left-0 font-body-md text-[15px] sm:text-lg leading-snug break-words text-[#0D1015]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-8 sm:mb-10 min-w-0">
            <h2 className="deepdive-section-heading is-visible text-[#0D1015]">
              <VaraRevealText text="3. Why it was built" fontSize={30} />
            </h2>
            <p className="mt-4 text-[#0D1015]">{project.whyBuilt}</p>
          </section>

          <section className="mb-8 sm:mb-10 min-w-0">
            <h2 className="deepdive-section-heading is-visible text-[#0D1015]">
              <VaraRevealText text="4. How it works" fontSize={30} />
            </h2>
            <p className="text-[#0D1015]">The flow of logic through {project.title} follows a structured pipeline:</p>
            <ol className="list-decimal pl-5 sm:pl-6 space-y-3 sm:space-y-4 font-body-md text-[15px] sm:text-lg marker:font-bold text-[#0D1015]">
              {project.howItWorks.map((item, idx) => (
                <li
                  key={idx}
                  className="pl-1 sm:pl-2 leading-snug break-words"
                >
                  {item}
                </li>
              ))}
            </ol>
          </section>

          <section className="mb-8 sm:mb-10 min-w-0">
            <h2 className="deepdive-section-heading is-visible text-[#0D1015]">
              <VaraRevealText text="5. Architecture" fontSize={30} />
            </h2>
            <p className="text-[#0D1015]">The system follows a modular orchestration architecture:</p>
            <div className="my-6 sm:my-8 p-0 border-2 border-[#0D1015] bg-[#F5F3EE] relative overflow-hidden min-w-0">
              <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[radial-gradient(circle_at_1px_1px,#0D1015_1px,transparent_0)] bg-[length:16px_16px]" aria-hidden="true" />
              <div className="relative overflow-x-auto overscroll-x-contain scrollbar-thin -mx-0">
                <pre className="font-mono text-[11px] xs:text-xs sm:text-sm leading-relaxed whitespace-pre bg-transparent p-4 sm:p-8 m-0 border-none min-w-max text-[#0D1015]">
                  {archLines.map((line, i) => (
                    <span
                      key={i}
                      className="block"
                    >
                      {line || ' '}
                    </span>
                  ))}
                </pre>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#0D1015]/10 pointer-events-none" aria-hidden="true" />
            </div>
          </section>

          <section className="mb-6 sm:mb-8 min-w-0">
            <h2 className="deepdive-section-heading is-visible text-[#0D1015]">
              <VaraRevealText text="6. What I learnt" fontSize={30} />
            </h2>
            <p className="text-[#0D1015]">Building {project.title} was a masterclass in frontend performance, system integrations, and modular architecture. Key takeaways include:</p>
            <ul className="list-none pl-0">
              {project.learnt.map((item, idx) => (
                <li
                  key={idx}
                  className="cap-item relative pl-6 mb-3 sm:mb-4 before:content-['→'] before:absolute before:left-0 font-body-md text-[15px] sm:text-lg leading-snug break-words text-[#0D1015]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <div className="hand-drawn-line mt-8 sm:mt-12 opacity-30" aria-hidden="true" />

          <footer className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto sm:flex-1 lg:flex-none px-6 sm:px-8 py-3.5 sm:py-3 border-2 border-[#0D1015] font-headline-md text-base sm:text-lg bg-[#0D1015] text-[#F5F3EE] hover:bg-[#4AC5CB] hover:text-[#0D1015] transition-colors duration-200 active:scale-[0.98] jitter uppercase tracking-widest no-underline inline-flex items-center justify-center text-center min-w-0 touch-manipulation"
            >
              View GitHub Repo
            </a>
            <button
              onClick={onNextProject}
              className="w-full sm:w-auto sm:flex-1 lg:flex-none px-6 sm:px-8 py-3.5 sm:py-3 border-2 border-[#0D1015] font-headline-md text-base sm:text-lg bg-[#0D1015] text-[#F5F3EE] hover:bg-[#4AC5CB] hover:text-[#0D1015] transition-colors duration-200 active:scale-[0.98] jitter uppercase tracking-widest cursor-pointer inline-flex items-center justify-center text-center min-w-0 touch-manipulation"
            >
              Next Project
            </button>
            <button
              onClick={onBack}
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-3 border-2 border-[#0D1015] font-headline-md text-base sm:text-lg bg-[#F5F3EE] text-[#0D1015] hover:bg-[#4AC5CB] hover:text-[#0D1015] transition-colors duration-200 active:scale-[0.98] jitter uppercase tracking-widest cursor-pointer inline-flex items-center justify-center text-center min-w-0 touch-manipulation"
            >
              Back to Projects
            </button>
          </footer>
        </article>

        <div className="mt-8 sm:absolute sm:-bottom-10 sm:right-0 sm:mt-0 text-right">
          <span className="font-handwriting text-base sm:text-xl opacity-40 text-[#0D1015]">
            ** Drafted in the back of a notebook **
          </span>
        </div>
      </MotionReveal>

      <aside className="mt-8 sm:mt-12 text-center xl:fixed xl:bottom-12 xl:right-12 xl:mt-0 z-40 flex justify-center xl:block">
        <div className="status-badge inline-block p-4 bg-[#F5F3EE] border-2 border-[#0D1015] rotate-[-2deg] sm:rotate-[-3deg] shadow-[4px_4px_0px_0px_rgba(13,16,21,0.15)] sm:shadow-lg min-w-[9rem]">
          <p className="font-label-caps text-[10px] mb-1 tracking-widest text-[#0D1015]">CURRENT STATUS</p>
          <p className="font-bold uppercase text-sm tracking-wide text-[#0D1015]">{project.status}</p>
        </div>
      </aside>
    </main>
  )
}

export default ProjectDeepDive
