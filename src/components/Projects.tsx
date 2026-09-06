import DoodleButton from './DoodleButton'
import VaraRevealText from './VaraRevealText'
import AppIcon from './AppIcon'
import MotionReveal from './MotionReveal'
import AnimatedText from './AnimatedText'
import ScrambleText from './ScrambleText'

const repoBase = 'https://github.com/Itshardtofindagoodname'

const projects = [
  {
    title: 'FastFox',
    icon: 'speed',
    repo: `${repoBase}/fastfox`,
    marginalia: 'AI-powered CLI assistant',
    desc: 'AI-powered CLI that uses Groq, LLaMA 3, Mixtral, and BLIP to organize files, suggest commands, generate code, and ship as a packaged desktop-ready tool.',
    tags: ['PYTHON', 'GROQ API', 'LLAMA 3'],
    rotate: 'rotate-[-1.5deg]',
    mobileRotate: 'sm:rotate-[-1.5deg] rotate-[-0.7deg]',
  },
  {
    title: 'GitGud',
    icon: 'history_edu',
    repo: `${repoBase}/gitgud`,
    marginalia: 'Fabricated repo histories',
    desc: 'AI-fabricated GitHub repository history generator that writes complete multi-file codebases with Groq and Gemini, then publishes realistic backdated commit histories via the GitHub API.',
    tags: ['REACT', 'GROQ', 'GEMINI'],
    rotate: 'rotate-[1.2deg]',
    mobileRotate: 'sm:rotate-[1.2deg] rotate-[0.6deg]',
  },
  {
    title: 'Tornedo',
    icon: 'download',
    repo: `${repoBase}/Tornedo`,
    marginalia: 'Federated torrent client',
    desc: 'Local-first, terminal-native torrent search and download client that federates 10+ sources, dedupes and ranks results, and ships a crash-recovering WebTorrent engine.',
    tags: ['TYPESCRIPT', 'INK', 'WEBTORRENT'],
    rotate: 'rotate-[-0.8deg]',
    mobileRotate: 'sm:rotate-[-0.8deg] rotate-[-0.4deg]',
  },
  {
    title: 'Profi',
    icon: 'psychology',
    repo: `${repoBase}/Profi`,
    marginalia: 'AI-assisted project ideation',
    desc: 'Experimental workspace that turns raw ideas into actionable software plans with conversational AI, document ingestion, and structured project generation.',
    tags: ['REACT', 'VITE', 'TAILWIND'],
    rotate: 'rotate-[0.6deg]',
    mobileRotate: 'sm:rotate-[0.6deg] rotate-[0.4deg]',
  },
  {
    title: 'Pragati',
    icon: 'account_tree',
    repo: `${repoBase}/Pragati-SIH`,
    marginalia: 'AI-assisted infrastructure governance',
    desc: 'Full-stack civic platform for Smart India Hackathon 2023, with complaint workflows, contractor management, REST APIs, MongoDB, and an AI assistant endpoint.',
    tags: ['NEXT.JS', 'MONGODB', 'REST API'],
    rotate: 'rotate-[-0.8deg]',
    mobileRotate: 'sm:rotate-[-0.8deg] rotate-[-0.5deg]',
  },
  {
    title: 'Vaultify',
    icon: 'lock',
    repo: `${repoBase}/Vaultify-SIH`,
    marginalia: 'Blockchain document custody',
    desc: 'Secure document and asset-management frontend built with React and Tailwind, emphasizing accessible retrieval flows and scalable collaborative architecture.',
    tags: ['REACT', 'VITE', 'SECURITY'],
    rotate: 'rotate-[2deg] md:mt-12',
    mobileRotate: 'sm:rotate-[2deg] rotate-[0.7deg]',
  },
  {
    title: 'Slash',
    icon: 'sports_esports',
    repo: `${repoBase}/Slash`,
    marginalia: 'Browser-native arcade game',
    desc: 'Browser-native game shipped without a game engine, using vanilla JavaScript, real-time input handling, a custom loop, and collision logic.',
    tags: ['JAVASCRIPT', 'HTML', 'CSS'],
    rotate: 'rotate-[-1.2deg] md:mt-12',
    mobileRotate: 'sm:rotate-[-1.2deg] rotate-[-0.6deg]',
  },
  {
    title: 'Cairn',
    icon: 'travel_explore',
    repo: `${repoBase}/Cairn`,
    marginalia: 'Google for open data & ML',
    desc: 'Federated dataset, model, paper, and code search engine that fans out to 8 sources in parallel, streams results over SSE, and scores reproducibility transparently.',
    tags: ['NEXT.JS', 'SSE', 'TF-IDF'],
    rotate: 'rotate-[1.6deg] md:mt-12',
    mobileRotate: 'sm:rotate-[1.6deg] rotate-[0.6deg]',
  },
]

const mentions = [
  {
    title: 'Talk-with-Web',
    repo: `${repoBase}/Talk-with-Web`,
    desc: 'LangChain RAG app that turns a live webpage into a conversational knowledge base.',
  },
  {
    title: 'HTML-CSS-JS Compiler',
    repo: `${repoBase}/Html-Css-Js-Compiler`,
    desc: 'Client-side browser IDE with live preview for HTML, CSS, and JavaScript experiments.',
  },
  {
    title: 'DotScript',
    repo: `${repoBase}/DotScript`,
    desc: 'SEO-focused web project that reached top search visibility through semantic structure and performance tuning.',
  },
  {
    title: 'Kinglike AI',
    repo: `${repoBase}/KingLikeAI`,
    desc: 'Applied AI product experiment exploring machine learning features inside a user-facing web build.',
  },
  {
    title: 'LoRA Fine-Tuned LLaMA Model',
    repo: 'https://huggingface.co/Itshardtofindagoodname',
    desc: 'First published AI engineering project: a LoRA fine-tuned LLaMA 3.1 8B model trained with Unsloth.',
  },
]

const achievements = [
  {
    title: 'Smart India Hackathon 2023 - Runner-Up',
    desc: "Runner-up at one of Asia's most competitive hackathons, selected from more than 2 lakh teams.",
    rot: 'rotate-[-1.2deg] sm:rotate-[-1.5deg]',
  },
  {
    title: 'AI Unite Hackathon 2023 - Top 5',
    desc: "Ranked top 5 nationally and received a Master's scholarship plus AI-track recognition.",
    rot: 'rotate-[1.2deg] sm:rotate-[2deg] sm:ml-4',
  },
  {
    title: 'International Hardware Model Making 2024 - Winner',
    desc: 'Won first place in an international hardware innovation competition.',
    rot: 'rotate-[-1.5deg] sm:rotate-[-2.5deg]',
  },
  {
    title: '10+ Additional Competition Wins',
    desc: 'Consistent placements across software, AI, and hardware competitions.',
    rot: 'rotate-[1deg] sm:rotate-[1.5deg] sm:ml-2',
  },
  {
    title: 'Student Developer Community Lead - 3+ Years',
    desc: 'Founded and runs a student developer community focused on mentoring and open source.',
    rot: 'rotate-[-1.8deg] sm:rotate-[-3deg]',
  },
]

interface ProjectsProps {
  onSelectProject?: (key: string) => void
}

const Projects = ({ onSelectProject }: ProjectsProps) => {
  return (
    <section id="projects" className="paper-cut-section relative bg-[#F5F3EE] py-12 sm:py-16 md:py-20 lg:py-32 overflow-hidden border-y-2 border-[#0D1015]">
      <div className="absolute right-8 bottom-[60%] hidden font-handwriting text-3xl opacity-40 rotate-6 pointer-events-none select-none md:block">
        <span className="text-[#0D1015]">build / break / ship</span>
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-12 relative z-10">
        <div className="flex flex-col sm:flex-row sm:flex-wrap md:flex-row items-start sm:items-baseline gap-2 sm:gap-4 mb-10 sm:mb-14 md:mb-20 relative">
          <h2 className="font-handwriting text-headline-xl text-[2.1rem] xs:text-4xl sm:text-5xl md:text-6xl marker-highlight leading-none max-w-full break-words text-[#0D1015]">
            <span className="inline-block max-w-full">
              <VaraRevealText text="Top 8 Projects" fontSize={40} />
            </span>
          </h2>
          <span className="font-handwriting text-lg sm:text-xl md:text-2xl text-[#0D1015]/40 leading-tight">
            / shipped, hacked, tuned, repeated
          </span>
          <div className="absolute -top-10 right-0 font-handwriting text-xl rotate-6 opacity-30 hidden md:block pointer-events-none text-[#0D1015]">
            &quot;Code goes here!&quot;
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 md:gap-12 items-start mb-16 sm:mb-20 md:mb-32">
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-12 min-w-0">
            {projects.map((project, index) => {
              const targetRot = project.rotate.match(/-?[\d.]+/)?.[0] ?? '0'
              return (
                <MotionReveal
                  key={project.title}
                  className="h-full"
                  delay={(index % 2) * 0.1}
                  y={36}
                  whileHover={{ y: -8, scale: 1.02, transition: { type: 'spring', stiffness: 300, damping: 18 } }}
                >
                  <article
                    className={`project-snippet p-5 sm:p-6 relative bg-[#F5F3EE] border-[#0D1015] flex flex-col h-full min-w-0 overflow-visible ${project.mobileRotate}`}
                    style={{ transformOrigin: '50% 38%', transform: `rotate(${Number(targetRot)}deg)` }}
                  >
                    {index % 2 === 0 ? <div className="tape-effect tape-tl" aria-hidden="true" /> : <div className="tape-effect tape-tr" aria-hidden="true" />}
                    <div className="flex items-center justify-between gap-3 w-full mb-2">
                      <h3 className="font-headline-md text-xl sm:text-2xl border-b-2 border-[#0D1015] pb-0.5 inline-block self-start max-w-full break-words leading-tight text-[#0D1015]">
                        {project.title}
                      </h3>
                      <AppIcon
                        name={project.icon}
                        size={26}
                        className="text-[#0D1015] shrink-0 rotate-3 self-start"
                      />
                    </div>
                    <span className="block font-handwriting text-base sm:text-lg text-[#0D1015] mb-3 sm:mb-4 leading-tight break-words">
                      {project.marginalia}
                    </span>
                    <p className="font-handwriting text-lg sm:text-xl text-[#0D1015] mb-4 leading-snug break-words">
                      {project.desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-5 sm:mb-6">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tag}
                          className={`font-label-caps text-[9px] sm:text-[10px] px-1.5 py-0.5 bg-[#0D1015] text-[#F5F3EE] ${tagIndex % 2 === 0 ? 'rotate-2' : '-rotate-1'}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-auto flex justify-center pt-2">
                      <button
                        onClick={() => {
                          onSelectProject?.(project.title.toLowerCase())
                        }}
                        className="scribble-button text-base sm:text-[1.25rem] touch-manipulation text-[#0D1015]"
                      >
                        Understand Project
                      </button>
                    </div>
                  </article>
                </MotionReveal>
              )
            })}
          </div>

          <aside className="lg:col-span-4 space-y-8 sm:space-y-12 min-w-0">
            <div className="wiggly-border p-6 sm:p-8 bg-[#F5F3EE] border-[#0D1015] rotate-[1deg] sm:rotate-[1.5deg] relative shadow-md min-w-0 overflow-visible">
            <MotionReveal x={28} y={0} delay={0.1}>
              <div className="tape-effect tape-tr !bg-[#0D1015]/5" aria-hidden="true" />
              <h4 className="font-label-caps text-[#5C5268] mb-5 sm:mb-6 tracking-widest border-b-2 border-[#0D1015] pb-2 text-xs sm:text-sm">
                <ScrambleText text="HONOURABLE MENTIONS" />
              </h4>
              <ul className="font-handwriting text-lg sm:text-xl space-y-5 sm:space-y-6">
                {mentions.map((item) => (
                  <li
                    key={item.title}
                    className="group min-w-0"
                  >
                    <div className="flex items-start gap-2 min-w-0">
                      <AppIcon name="edit" size={20} className="mt-1 text-[#0D1015]/70 shrink-0" aria-hidden="true" />
                      <div className="min-w-0 flex-1">
                        <p className="font-bold leading-tight text-[1.05rem] sm:text-lg break-words text-[#0D1015]">{item.title}</p>
                        <p className="font-handwriting text-sm sm:text-base opacity-75 leading-snug mt-1 break-words text-[#0D1015]">
                          {item.desc}
                        </p>
                        <DoodleButton
                          href={item.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="underline"
                          className="!text-base sm:!text-lg mt-2"
                        >
                          View Repo
                        </DoodleButton>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-8 sm:mt-10 pt-6 border-t-2 border-[#0D1015] border-dashed relative">
                <p className="font-handwriting text-sm sm:text-base opacity-90 leading-relaxed flex flex-wrap items-center gap-x-2 gap-y-3 break-words text-[#0D1015]">
                  If you want to see more on what I&apos;m working on
                  <span className="relative inline-flex min-h-14 min-w-32 sm:min-h-16 sm:min-w-36 items-center justify-center">
                    <DoodleButton
                      href={`${repoBase}?tab=repositories`}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="underline"
                      className="click-here-button !text-lg sm:!text-xl z-10 text-[#0D1015]"
                    >
                      click here
                    </DoodleButton>
                    <svg className="scribble-circle" preserveAspectRatio="none" viewBox="0 0 100 100" aria-hidden="true">
                      <path
                        d="M10,50 C10,20 40,10 70,15 C100,20 95,60 80,85 C65,110 20,100 10,70 C0,40 30,20 60,25"
                        fill="none"
                        stroke="#0D1015"
                        strokeDasharray="2,2"
                        strokeWidth="2"
                      />
                    </svg>
                  </span>
                </p>
              </div>
            </MotionReveal>
            </div>

            <div className="space-y-4 sm:space-y-6 min-w-0">
              <MotionReveal y={16}>
                <h4 className="font-headline-md marker-highlight text-xl sm:text-2xl text-[#0D1015]">
                  <AnimatedText text="Achievements" stagger={0.09} />
                </h4>
              </MotionReveal>
              <div className="flex flex-col gap-4 sm:gap-6">
                {achievements.map((item, idx) => (
                  <MotionReveal key={item.title} y={20} delay={idx * 0.07}>
                    <div
                      className={`award-sticker bg-[#F5F3EE] border-[#0D1015] p-4 sm:p-[16px] min-w-0 ${item.rot}`}
                    >
                      <p className="font-handwriting text-base sm:text-lg font-bold leading-tight break-words text-[#0D1015]">
                        {item.title}
                      </p>
                      <p className="font-handwriting text-sm sm:text-base mt-2 opacity-80 leading-snug break-words text-[#0D1015]">
                        {item.desc}
                      </p>
                    </div>
                  </MotionReveal>
                ))}
              </div>
            </div>
          </aside>
        </div>

        <div className="sketch-divider mb-12 sm:mb-16 md:mb-20" aria-hidden="true" />

        <div className="relative">
          <h2 className="font-headline-lg text-[1.9rem] xs:text-3xl sm:text-4xl md:text-5xl mb-8 sm:mb-12 md:mb-16 marker-highlight leading-tight max-w-full break-words text-[#0D1015]">
            <VaraRevealText text="Professional Experience" fontSize={44} />
          </h2>
          <div className="relative pl-6 sm:pl-8 md:pl-12 min-w-0">
            <div className="timeline-doodle" aria-hidden="true" />

            <MotionReveal className="relative mb-10 sm:mb-14 md:mb-20 group min-w-0" y={24}>
              <div className="experience-number-marker absolute -left-[28px] sm:-left-[38px] md:-left-[60px] top-1 z-10 text-[10px] sm:text-xs bg-[#F5F3EE] border-[#0D1015] text-[#0D1015]">
                01
              </div>
              <div className="index-card p-5 sm:p-8 md:p-10 rotate-[-0.3deg] sm:rotate-[-0.5deg] bg-[#F5F3EE] border-[#0D1015] relative min-w-0 overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-5 sm:mb-6 gap-3 sm:gap-4 min-w-0">
                  <div className="min-w-0">
                    <h3 className="font-headline-md text-xl sm:text-2xl text-[#0D1015] leading-tight break-words">Raen AI</h3>
                    <p className="font-handwriting text-xl sm:text-2xl text-[#5C5268] leading-tight break-words">
                      Frontend Developer
                    </p>
                  </div>
                  <span className="font-label-caps px-3 sm:px-4 py-1.5 sm:py-2 bg-[#0D1015] text-[#F5F3EE] rotate-1 sm:rotate-2 border-2 border-[#0D1015] text-[10px] sm:text-xs shrink-0 self-start tracking-widest leading-none">
                    MAY 2024 - PRESENT
                  </span>
                </div>
                <p className="font-body-lg text-[#5C5268] max-w-3xl leading-relaxed mb-4 sm:mb-5 text-[15px] sm:text-base break-words">
                  Primary frontend engineer for Raen AI&apos;s web presence, spanning marketing pages,
                  product interfaces, and internal platforms. Owns technical SEO, performance,
                  semantic structure, Core Web Vitals, and responsive delivery across the company&apos;s
                  web properties.
                </p>
                <ul className="font-handwriting text-lg sm:text-xl leading-tight grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 max-w-4xl text-[#0D1015]">
                  <li className="border-l-2 border-[#0D1015]/60 pl-3 break-words">Drove brand SEO to the #1 Google result.</li>
                  <li className="border-l-2 border-[#0D1015]/60 pl-3 break-words">Led GarageView CRM frontend through production release.</li>
                  <li className="border-l-2 border-[#0D1015]/60 pl-3 break-words">Built auth flows and real-time data interfaces.</li>
                  <li className="border-l-2 border-[#0D1015]/60 pl-3 break-words">Optimized load time, assets, rendering, and responsiveness.</li>
                </ul>
              </div>
            </MotionReveal>

            <MotionReveal className="relative group min-w-0" y={24} delay={0.1}>
              <div className="experience-number-marker absolute -left-[28px] sm:-left-[38px] md:-left-[60px] top-1 z-10 text-[10px] sm:text-xs bg-[#F5F3EE] border-[#0D1015] text-[#0D1015]">
                02
              </div>
              <div className="index-card p-5 sm:p-8 md:p-10 rotate-[0.2deg] sm:rotate-[0.3deg] bg-[#F5F3EE] border-[#0D1015] min-w-0 overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-5 sm:mb-6 gap-3 sm:gap-4 min-w-0">
                  <div className="min-w-0">
                    <h3 className="font-headline-md text-lg sm:text-2xl text-[#0D1015] leading-tight break-words">Freelance Software Developer</h3>
                    <p className="font-handwriting text-lg sm:text-2xl text-[#5C5268] leading-tight break-words">
                      Web, Software &amp; Client Delivery
                    </p>
                  </div>
                  <span className="font-label-caps px-3 sm:px-4 py-1.5 sm:py-2 bg-[#0D1015] text-[#F5F3EE] -rotate-1 border-2 border-[#0D1015] text-[10px] sm:text-xs shrink-0 self-start tracking-widest leading-none">
                    2023 - MAY 2024
                  </span>
                </div>
                <p className="font-body-lg text-[#5C5268] max-w-3xl leading-relaxed text-[15px] sm:text-base break-words">
                  Delivered end-to-end web and software projects for businesses and NGOs, covering
                  requirements, scoping, development, testing, and handoff while managing concurrent
                  client codebases independently.
                </p>
              </div>
            </MotionReveal>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
