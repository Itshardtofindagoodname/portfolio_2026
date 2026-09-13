import { useState } from 'react'
import DoodleButton from './DoodleButton'
import VaraRevealText from './VaraRevealText'
import AppIcon from './AppIcon'
import MotionReveal from './MotionReveal'

const repoBase = 'https://github.com/Itshardtofindagoodname'

const projects = [
  {
    key: 'fastfox',
    num: '01',
    title: 'FastFox',
    icon: 'speed',
    marginalia: 'AI-powered CLI assistant',
    bubble: 'organizes files & generates CLI code!',
    desc: 'AI-powered CLI that uses Groq, LLaMA 3, Mixtral, and BLIP to organize files, suggest commands, generate code, and ship as a packaged desktop-ready tool.',
    tags: ['PYTHON', 'GROQ API', 'LLAMA 3'],
    isDark: true,
    rot: 'rotate-[-2.5deg]',
  },
  {
    key: 'gitgud',
    num: '02',
    title: 'GitGud',
    icon: 'history_edu',
    marginalia: 'Fabricated repo histories',
    bubble: 'backdates realistic commit graphs!',
    desc: 'AI-fabricated GitHub repository history generator that writes complete multi-file codebases with Groq and Gemini, then publishes realistic backdated commit histories via the GitHub API.',
    tags: ['REACT', 'GROQ', 'GEMINI'],
    isDark: false,
    rot: 'rotate-[2.2deg]',
  },
  {
    key: 'tornedo',
    num: '03',
    title: 'Tornedo',
    icon: 'download',
    marginalia: 'Federated torrent client',
    bubble: 'federates 10+ torrent sources!',
    desc: 'Local-first, terminal-native torrent search and download client that federates 10+ sources, dedupes and ranks results, and ships a crash-recovering WebTorrent engine.',
    tags: ['TYPESCRIPT', 'INK', 'WEBTORRENT'],
    isDark: true,
    rot: 'rotate-[-1.8deg]',
  },
  {
    key: 'glimpses',
    num: '04',
    title: 'Glimpses',
    icon: 'terminal',
    marginalia: 'Cross-repo fuzzy search CLI',
    bubble: 'instant fuzzy search over files & symbols!',
    desc: 'Cross-repo fuzzy go-to-anything CLI for developers. Instant fuzzy search over file paths and code symbols across every local git repository, powered by hand-written FST and Bloom filter data structures.',
    tags: ['TYPESCRIPT', 'FST', 'BLOOM FILTER'],
    isDark: false,
    rot: 'rotate-[1.5deg]',
  },
  {
    key: 'vaultify',
    num: '05',
    title: 'Vaultify',
    icon: 'lock',
    marginalia: 'SIH 2023 Runner-Up platform',
    bubble: 'Smart India Hackathon Runner-Up!',
    desc: 'Secure document and asset-management platform built for Smart India Hackathon 2023, emphasizing accessible retrieval flows and scalable collaborative architecture.',
    tags: ['REACT', 'BLOCKCHAIN', 'SECURITY'],
    isDark: true,
    rot: 'rotate-[-2.2deg]',
  },
  {
    key: 'slash',
    num: '06',
    title: 'Slash',
    icon: 'sports_esports',
    marginalia: 'Engine-free arcade game',
    bubble: 'vanilla JS arcade game loop!',
    desc: 'Browser-native game shipped without a game engine, using vanilla JavaScript, real-time input handling, a custom loop, and collision logic.',
    tags: ['JAVASCRIPT', 'HTML', 'CSS'],
    isDark: false,
    rot: 'rotate-[2.8deg]',
  },
  {
    key: 'cairn',
    num: '07',
    title: 'Cairn',
    icon: 'travel_explore',
    marginalia: 'Google for open data & ML',
    bubble: 'fans out to 8 ML sources live!',
    desc: 'Federated dataset, model, paper, and code search engine that fans out to 8 sources in parallel, streams results over SSE, and scores reproducibility transparently.',
    tags: ['NEXT.JS', 'SSE', 'TF-IDF'],
    isDark: true,
    rot: 'rotate-[-1.6deg]',
  },
  {
    key: 'know-more',
    num: '08',
    title: 'Know More',
    icon: 'code',
    marginalia: 'Open source experiments',
    bubble: 'check out all other open repos!',
    desc: 'Collection of open-source CLI tools, compilers, RAG experiments, fine-tuned models, and utility libraries hosted on GitHub.',
    tags: ['GITHUB', 'OPEN SOURCE', 'REPOS'],
    isDark: false,
    rot: 'rotate-[2.1deg]',
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
    id: 'ach-1',
    title: 'Smart India Hackathon 2023 - Runner-Up',
    desc: "Runner-up at Asia's most competitive hackathon, selected from over 2 lakh teams across India.",
    tag: 'RUNNER-UP',
    date: 'DEC 2023',
  },
  {
    id: 'ach-2',
    title: 'AI Unite Hackathon 2023 - Top 5',
    desc: "Ranked top 5 nationally and received a Master's scholarship plus AI-track recognition.",
    tag: 'TOP 5 NATIONAL',
    date: 'OCT 2023',
  },
  {
    id: 'ach-3',
    title: 'International Hardware Model Making 2024 - Winner',
    desc: 'Won first place in an international hardware innovation competition.',
    tag: 'FIRST PLACE WINNER',
    date: 'FEB 2024',
  },
  {
    id: 'ach-4',
    title: '10+ Additional Competition Placements & Wins',
    desc: 'Consistent top podium placements across national software, AI, and hardware competitions.',
    tag: 'MULTIPLE AWARDS',
    date: '2022 - 2024',
  },
  {
    id: 'ach-5',
    title: 'Student Developer Community Lead - 3+ Years',
    desc: 'Founded and runs a thriving student developer community focused on mentoring, workshops, and open source.',
    tag: 'COMMUNITY LEAD',
    date: '2021 - PRESENT',
  },
]

interface ProjectsProps {
  onSelectProject?: (key: string) => void
}

export default function Projects({ onSelectProject }: ProjectsProps) {
  const [activeProjectKey, setActiveProjectKey] = useState<string>('fastfox')
  const activeProj = projects.find((p) => p.key === activeProjectKey) || projects[0]

  return (
    <section id="projects" className="paper-cut-section relative bg-[#F5F3EE] py-16 md:py-28 overflow-hidden border-y-2 border-[#0D1015]">
      {/* Background Cartoon Doodles & Ink Drops */}
      <div className="absolute top-12 right-12 font-handwriting text-4xl opacity-10 rotate-12 pointer-events-none select-none text-[#0D1015]">
        SKETCHBOOK // TOP 08
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-baseline justify-between gap-4 mb-12 relative">
          <div>
            <span className="font-label-caps text-xs text-[#4AC5CB] uppercase tracking-[0.2em] block mb-1">
              ORGANIC SKETCHBOOK SHOWCASE
            </span>
            <h2 className="font-headline-xl text-5xl md:text-6xl text-[#0D1015]">
              <VaraRevealText text="Top Projects" fontSize={46} />
            </h2>
          </div>
          <span className="font-handwriting text-xl md:text-2xl text-[#5C5268] italic">
            // hand-drawn paper cutouts &amp; tactile software designs
          </span>
        </div>

        {/* CARTOONIC DOODLY SHOWCASE: Cards Grid Selector at Top & Detailed Polaroid Sheet Below */}
        <div className="mb-28">

          {/* 8 Doodly Non-Box Paper Cutout Cards Grid (Primary Selector at Top) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {projects.map((project) => {
              const isActive = project.key === activeProjectKey
              return (
                <MotionReveal key={project.title} delay={0.04 * parseInt(project.num)}>
                  <div
                    onClick={() => setActiveProjectKey(project.key)}
                    className={`relative p-6 cursor-pointer transition-all duration-300 ${project.rot} ${isActive
                      ? 'bg-[#0D1015] text-[#F5F3EE] border-4 border-[#0D1015] shadow-[8px_8px_0_0_#4AC5CB] -translate-y-2 z-20'
                      : 'bg-[#F5F3EE] text-[#0D1015] border-2 border-[#0D1015] shadow-[6px_6px_0_0_#0D1015] hover:rotate-0 hover:scale-[1.04] hover:z-10'
                      }`}
                    style={{
                      borderRadius: project.num === '01' ? '255px 15px 225px 15px/15px 225px 15px 255px' : '15px 225px 15px 255px/255px 15px 225px 15px',
                    }}
                  >
                    {/* Tape accent */}
                    <div className="tape-effect tape-tr !w-12 !h-4 opacity-80" aria-hidden="true" />

                    <div className="flex items-center justify-between mb-3 border-b-2 border-dashed pb-2 border-current/30">
                      <span className={`font-mono font-bold text-sm ${isActive ? 'text-[#4AC5CB]' : 'text-[#0D1015]'}`}>
                        #{project.num}
                      </span>
                      <AppIcon name={project.icon} size={24} className={isActive ? 'text-[#4AC5CB]' : 'text-[#0D1015]'} />
                    </div>

                    <h4 className="font-headline-md text-2xl font-bold mb-1">
                      {project.title}
                    </h4>

                    <p className={`font-handwriting text-lg mb-4 line-clamp-2 ${isActive ? 'text-[#BBDEE1]' : 'text-[#5C5268]'}`}>
                      {project.marginalia}
                    </p>

                    <div className="flex items-center justify-between pt-2">
                      <span className={`font-label-caps text-[9px] px-2 py-0.5 border font-bold ${isActive ? 'border-[#4AC5CB] text-[#4AC5CB]' : 'border-[#0D1015] text-[#0D1015]'
                        }`}>
                        {project.tags[0]}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          if (project.key === 'know-more') {
                            const el = document.getElementById('know-more-section')
                            el?.scrollIntoView({ behavior: 'smooth' })
                          } else {
                            onSelectProject?.(project.key)
                          }
                        }}
                        className={`text-xs font-bold font-headline-md flex items-center gap-1 hover:underline ${isActive ? 'text-[#4AC5CB]' : 'text-[#0D1015]'
                          }`}
                      >
                        {project.key === 'know-more' ? 'Know More' : 'Explore'} <AppIcon name="arrow_forward" size={14} />
                      </button>
                    </div>
                  </div>
                </MotionReveal>
              )
            })}
          </div>

          {/* Featured Selected Project (Borderless Paper-Written Text) */}
          <div className="relative py-8 md:py-12 border-t-2 border-b-2 border-dashed border-[#0D1015]/40 my-8">
            {/* Speech Bubble Doodled Annotation */}
            <div className="hidden md:block absolute -top-6 right-8 bg-[#4AC5CB] text-[#0D1015] font-handwriting text-xl px-4 py-1 border-2 border-[#0D1015] rotate-6 shadow-xs z-20">
              {activeProj.bubble}
              <div className="absolute -bottom-2 left-6 w-3 h-3 bg-[#4AC5CB] border-r-2 border-b-2 border-[#0D1015] rotate-45" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8 space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-xs px-3 py-1 bg-[#0D1015] text-[#F5F3EE] font-bold uppercase tracking-widest">
                    SELECTED PROJECT #{activeProj.num}
                  </span>
                  <span className="font-handwriting text-2xl text-[#5C5268] border-b-2 border-dashed border-[#0D1015]/40 pb-0.5">
                    {activeProj.marginalia}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 border-2 border-[#0D1015] rounded-full bg-[#4AC5CB] text-[#0D1015]">
                    <AppIcon name={activeProj.icon} size={36} />
                  </div>
                  <h3 className="font-headline-xl text-4xl md:text-6xl text-[#0D1015] font-bold">
                    {activeProj.title}
                  </h3>
                </div>

                <p className="font-handwriting text-2xl md:text-3xl leading-snug text-[#0D1015] max-w-3xl">
                  {activeProj.desc}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {activeProj.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-label-caps text-xs px-3 py-1 border-2 border-[#0D1015] text-[#0D1015] bg-[#4AC5CB]/20 font-bold tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col justify-between items-stretch gap-6 border-l-0 lg:border-l-2 lg:border-dashed lg:border-[#0D1015]/40 lg:pl-8 pt-6 lg:pt-0">
                <div className="space-y-2 font-handwriting text-xl text-[#0D1015]">
                  <div className="font-headline-md text-xs font-mono text-[#5C5268] uppercase tracking-wider">SKETCH NOTEBOOK SPEC</div>
                  <div className="border-b border-[#0D1015]/20 pb-1"> Production-ready build</div>
                  <div className="border-b border-[#0D1015]/20 pb-1"> Custom architecture &amp; workflows</div>
                  <div> Tested &amp; documented repo</div>
                </div>

                {activeProj.key === 'know-more' ? (
                  <a
                    href={`${repoBase}?tab=repositories`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-4 px-6 font-bold text-lg font-headline-md flex items-center justify-center gap-3 bg-[#0D1015] text-[#F5F3EE] border-2 border-[#0D1015] hover:bg-[#4AC5CB] hover:text-[#0D1015] transition-all duration-200 shadow-[4px_4px_0_0_#4AC5CB] hover:scale-[1.02] cursor-pointer"
                  >
                    View All GitHub Repos
                    <AppIcon name="open_in_new" size={22} />
                  </a>
                ) : (
                  <button
                    onClick={() => onSelectProject?.(activeProj.key)}
                    className="w-full py-4 px-6 font-bold text-lg font-headline-md flex items-center justify-center gap-3 bg-[#0D1015] text-[#F5F3EE] border-2 border-[#0D1015] hover:bg-[#4AC5CB] hover:text-[#0D1015] transition-all duration-200 shadow-[4px_4px_0_0_#4AC5CB] hover:scale-[1.02] cursor-pointer"
                  >
                    Understand Project
                    <AppIcon name="arrow_forward" size={22} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Know More List Section (Revealed when Slot 08 is active) */}
        {activeProjectKey === 'know-more' && (
          <div id="know-more-section" className="mb-28 py-8 relative transition-all duration-300 animate-fadeIn">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b-2 border-[#0D1015] pb-4">
              <div>
                <span className="font-label-caps text-xs text-[#4AC5CB] uppercase tracking-[0.2em] block mb-1">
                  ADDITIONAL OPEN SOURCE &amp; REPOS
                </span>
                <h3 className="font-headline-lg text-3xl md:text-5xl text-[#0D1015]">
                  Know More
                </h3>
              </div>
              <p className="font-handwriting text-xl text-[#5C5268]">
                Additional open source systems, tools, and AI fine-tuning experiments.
              </p>
            </div>

            <div className="space-y-6">
              {mentions.map((item) => (
                <div key={item.title} className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-dashed border-[#0D1015]/20 pb-4 gap-4">
                  <div>
                    <h4 className="font-bold text-2xl text-[#0D1015]">{item.title}</h4>
                    <p className="font-handwriting text-xl text-[#5C5268] mt-1">{item.desc}</p>
                  </div>
                  <DoodleButton href={item.repo} target="_blank" variant="ink" className="!text-sm shrink-0 self-start sm:self-center">
                    View Repo
                  </DoodleButton>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-6 border-t-2 border-dashed border-[#0D1015] flex flex-wrap items-center justify-between gap-4">
              <span className="font-handwriting text-2xl text-[#0D1015]">Want to explore more repositories?</span>
              <DoodleButton href={`${repoBase}?tab=repositories`} target="_blank" variant="paper">
                GitHub Repositories
                <AppIcon name="open_in_new" size={18} />
              </DoodleButton>
            </div>
          </div>
        )}

        {/* REDESIGNED ACHIEVEMENTS SECTION: Notebook Checkmarked To-Do List (No Outer Box) */}
        <div className="achievements-checklist-section mb-32 py-8 relative">

          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b-2 border-[#0D1015] pb-4">
            <div>
              <span className="font-label-caps text-xs text-[#4AC5CB] uppercase tracking-[0.2em] block mb-1">
                MILESTONES &amp; DISTINCTIONS
              </span>
              <h3 className="font-headline-xl text-4xl md:text-5xl text-[#0D1015]">
                <VaraRevealText text="Achievements Checklist" fontSize={46} />
              </h3>
            </div>
            <span className="font-handwriting text-2xl text-[#5C5268] italic mt-2 md:mt-0">
              ✓ verified accomplishments &amp; honors
            </span>
          </div>

          {/* Notebook Lined Paper To-Do Checklist */}
          <div className="space-y-4 relative">
            {/* Lined Notebook Red Margin Indicator Line */}
            <div className="absolute left-10 md:left-14 top-0 bottom-0 w-[2px] bg-red-400/50 pointer-events-none" />

            {achievements.map((item, idx) => (
              <MotionReveal key={item.id} delay={idx * 0.08} y={15}>
                <div className="group relative flex items-start gap-4 md:gap-6 p-4 md:p-6 bg-[#F5F3EE] hover:bg-white border-2 border-[#0D1015] shadow-[4px_4px_0_0_#0D1015] transition-all duration-200 hover:-translate-y-1">

                  {/* Checkmarked Box */}
                  <div className="shrink-0 mt-1 w-8 h-8 rounded border-2 border-[#0D1015] bg-[#4AC5CB] text-[#0D1015] flex items-center justify-center font-bold text-xl shadow-xs">
                    <svg className="w-6 h-6 stroke-[#0D1015]" fill="none" viewBox="0 0 24 24" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>

                  {/* Content Item */}
                  <div className="flex-grow space-y-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="font-headline-md text-xl md:text-2xl font-bold text-[#0D1015] line-through decoration-[#4AC5CB] decoration-2">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 bg-[#4AC5CB] text-[#0D1015] border border-[#0D1015] uppercase tracking-wider">
                          ✓ {item.tag}
                        </span>
                        <span className="font-mono text-xs text-[#5C5268] border border-[#0D1015]/30 px-2 py-0.5 bg-[#F5F3EE]">
                          {item.date}
                        </span>
                      </div>
                    </div>

                    <p className="font-handwriting text-xl text-[#5C5268] leading-snug">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>

        {/* Professional Track Timeline */}
        <div className="relative">
          <h2 className="font-headline-lg text-3xl md:text-5xl mb-12 marker-highlight text-[#0D1015]">
            <VaraRevealText text="Professional Experience" fontSize={44} />
          </h2>

          <div className="relative pl-8 md:pl-12">
            <div className="timeline-doodle" aria-hidden="true" />

            {/* Experience Card 01 */}
            <MotionReveal className="relative mb-14 group" y={24}>
              <div className="experience-number-marker absolute -left-[38px] md:-left-[60px] top-1 z-10 text-xs bg-[#F5F3EE] border-2 border-[#0D1015] text-[#0D1015] px-2 py-0.5 font-bold">
                01
              </div>
              <div className="index-card p-6 md:p-10 rotate-[-0.5deg] bg-[#F5F3EE] border-2 border-[#0D1015] relative shadow-md">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6 gap-3">
                  <div>
                    <h3 className="font-headline-md text-2xl text-[#0D1015]">Raen AI</h3>
                    <p className="font-handwriting text-2xl text-[#5C5268]">Frontend Developer</p>
                  </div>
                  <span className="font-label-caps px-4 py-2 bg-[#0D1015] text-[#F5F3EE] border-2 border-[#0D1015] text-xs font-bold tracking-widest">
                    MAY 2024 - PRESENT
                  </span>
                </div>
                <p className="font-body-lg text-[#5C5268] max-w-3xl leading-relaxed mb-5">
                  Primary frontend engineer for Raen AI&apos;s web presence, spanning marketing pages, product interfaces, and internal platforms. Owns technical SEO, performance, semantic structure, Core Web Vitals, and responsive delivery.
                </p>
                <ul className="font-handwriting text-xl leading-tight grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-4xl text-[#0D1015]">
                  <li className="border-l-2 border-[#0D1015] pl-3">Drove brand SEO to the #1 Google result.</li>
                  <li className="border-l-2 border-[#0D1015] pl-3">Led GarageView CRM frontend through production release.</li>
                  <li className="border-l-2 border-[#0D1015] pl-3">Built auth flows and real-time data interfaces.</li>
                  <li className="border-l-2 border-[#0D1015] pl-3">Optimized load time, assets, rendering, and responsiveness.</li>
                </ul>
              </div>
            </MotionReveal>

            {/* Experience Card 02 */}
            <MotionReveal className="relative group" y={24} delay={0.1}>
              <div className="experience-number-marker absolute -left-[38px] md:-left-[60px] top-1 z-10 text-xs bg-[#F5F3EE] border-2 border-[#0D1015] text-[#0D1015] px-2 py-0.5 font-bold">
                02
              </div>
              <div className="index-card p-6 md:p-10 rotate-[0.3deg] bg-[#F5F3EE] border-2 border-[#0D1015] shadow-md">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6 gap-3">
                  <div>
                    <h3 className="font-headline-md text-2xl text-[#0D1015]">Freelance Software Developer</h3>
                    <p className="font-handwriting text-2xl text-[#5C5268]">Web, Software &amp; Client Delivery</p>
                  </div>
                  <span className="font-label-caps px-4 py-2 bg-[#0D1015] text-[#F5F3EE] border-2 border-[#0D1015] text-xs font-bold tracking-widest">
                    2023 - MAY 2024
                  </span>
                </div>
                <p className="font-body-lg text-[#5C5268] max-w-3xl leading-relaxed">
                  Delivered end-to-end web and software projects for businesses and NGOs, covering requirements, scoping, development, testing, and handoff while managing client codebases independently.
                </p>
              </div>
            </MotionReveal>
          </div>
        </div>

      </div>
    </section>
  )
}

