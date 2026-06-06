import { motion } from 'framer-motion'
import DoodleButton from './DoodleButton'
import VaraHoverText from './VaraHoverText'

// Import local project images
import fastfoxImage from '../assets/fastfox.png'
import profiImage from '../assets/profi.png'
import pragatiImage from '../assets/pragati.png'
import vaultifyImage from '../assets/vaultify.png'
import slashImage from '../assets/slash.png'

const repoBase = 'https://github.com/Itshardtofindagoodname'

const projects = [
  {
    title: 'FastFox',
    icon: 'speed',
    repo: `${repoBase}/fastfox`,
    image: fastfoxImage,
    desc: 'AI-powered CLI that uses Groq, LLaMA 3, Mixtral, and BLIP to organize files, suggest commands, generate code, and ship as a packaged desktop-ready tool.',
    tags: ['PYTHON', 'GROQ API', 'LLAMA 3'],
    rotate: 'rotate-[-1.5deg]',
  },
  {
    title: 'Profi',
    icon: 'work_outline',
    repo: `${repoBase}/Profi`,
    image: profiImage,
    desc: 'AI-integrated task management system built with React, Vite, and Tailwind, focused on prioritization, workflow clarity, and clean component architecture.',
    tags: ['REACT', 'VITE', 'TAILWIND'],
    rotate: 'rotate-[1.2deg]',
  },
  {
    title: 'Pragati',
    icon: 'account_balance',
    repo: `${repoBase}/Pragati-SIH`,
    image: pragatiImage,
    desc: 'Full-stack civic platform for Smart India Hackathon 2023, with complaint workflows, contractor management, REST APIs, MongoDB, and an AI assistant endpoint.',
    tags: ['NEXT.JS', 'MONGODB', 'REST API'],
    rotate: 'rotate-[-0.8deg]',
  },
  {
    title: 'Vaultify',
    icon: 'lock',
    repo: `${repoBase}/Vaultify-SIH`,
    image: vaultifyImage,
    desc: 'Secure document and asset-management frontend built with React and Tailwind, emphasizing accessible retrieval flows and scalable collaborative architecture.',
    tags: ['REACT', 'VITE', 'SECURITY'],
    rotate: 'rotate-[2deg] md:mt-12',
  },
  {
    title: 'Slash',
    icon: 'sports_esports',
    repo: `${repoBase}/Slash`,
    image: slashImage,
    desc: 'Browser-native game shipped without a game engine, using vanilla JavaScript, real-time input handling, a custom loop, and collision logic.',
    tags: ['JAVASCRIPT', 'HTML', 'CSS'],
    rotate: 'rotate-[-1.2deg] md:mt-12',
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
    rot: 'rotate-[-1.5deg]',
  },
  {
    title: 'AI Unite Hackathon 2023 - Top 5',
    desc: "Ranked top 5 nationally and received a Master's scholarship plus AI-track recognition.",
    rot: 'rotate-[2deg] ml-4',
  },
  {
    title: 'International Hardware Model Making 2024 - Winner',
    desc: 'Won first place in an international hardware innovation competition.',
    rot: 'rotate-[-2.5deg]',
  },
  {
    title: '10+ Additional Competition Wins',
    desc: 'Consistent placements across software, AI, and hardware competitions.',
    rot: 'rotate-[1.5deg] ml-2',
  },
  {
    title: 'Student Developer Community Lead - 3+ Years',
    desc: 'Founded and runs a student developer community focused on mentoring and open source.',
    rot: 'rotate-[-3deg]',
  },
]

interface ProjectsProps {
  onSelectProject?: (key: string) => void
}

const Projects = ({ onSelectProject }: ProjectsProps) => {
  return (
    <section id="projects" className="paper-cut-section relative bg-white py-20 md:py-32 overflow-hidden border-y-2 border-black">
      <div className="absolute top-40 left-0 opacity-10 pointer-events-none select-none -rotate-12">
        <svg className="w-48 h-48" viewBox="0 0 100 100">
          <path d="M10,10 Q50,90 90,10" fill="none" stroke="black" strokeWidth="1" />
        </svg>
      </div>
      <div className="absolute right-8 top-28 hidden font-handwriting text-3xl opacity-15 rotate-6 pointer-events-none select-none md:block">
        build / break / ship
      </div>
      <svg className="absolute left-8 bottom-36 hidden h-24 w-48 opacity-15 pointer-events-none md:block" viewBox="0 0 180 80" fill="none">
        <path d="M8 42 C34 20 52 62 78 38 S122 14 164 45" stroke="black" strokeLinecap="round" strokeWidth="3" />
        <path d="M148 32 L166 45 L145 55" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
      </svg>

      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row items-baseline gap-4 mb-20 relative next-gen-reveal">
          <h2 className="font-handwriting text-headline-xl text-5xl md:text-6xl marker-highlight leading-none">
            <VaraHoverText text="Top 5 Projects" fontSize={44} />
          </h2>
          <span className="font-handwriting text-2xl text-primary/40">
            / shipped, hacked, tuned, repeated
          </span>
          <div className="absolute -top-10 right-0 font-handwriting text-xl rotate-6 opacity-30 hidden md:block">
            "Code goes here!"
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-32">
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-12">
            {projects.map((project, index) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: (index % 2) * 0.08 }}
                className={`project-snippet next-gen-reveal p-6 relative bg-white flex flex-col h-full ${project.rotate}`}
              >
                {index % 2 === 0 ? <div className="tape-effect tape-tl" /> : <div className="tape-effect tape-tr" />}
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-headline-md text-xl border-b-2 border-black pb-0.5 inline-block">
                    {project.title}
                  </h3>
                  <span className="material-symbols-outlined text-lg opacity-40">{project.icon}</span>
                </div>
                <div className="aspect-video mb-4 rough-border overflow-hidden bg-white">
                  <img
                    alt={`${project.title} project preview`}
                    className="w-full h-full object-cover grayscale opacity-80 hover:opacity-100 hover:scale-102 transition-all duration-300"
                    src={project.image}
                  />
                </div>
                <p className="font-handwriting text-xl text-primary mb-4 leading-tight">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tag}
                      className={`font-label-caps text-[9px] px-1.5 py-0.5 bg-black text-white ${
                        tagIndex % 2 === 0 ? 'rotate-2' : '-rotate-1'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex justify-center">
                  <button
                    onClick={() => {
                      onSelectProject?.(project.title.toLowerCase())
                    }}
                    className="scribble-button"
                  >
                    Understand Project
                  </button>
                </div>
              </motion.article>
            ))}
          </div>

          <aside className="lg:col-span-4 space-y-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              className="wiggly-border next-gen-reveal p-8 bg-white rotate-[1.5deg] relative shadow-md"
            >
              <div className="tape-effect tape-tr !bg-black/10" />
              <h4 className="font-label-caps text-secondary mb-6 tracking-widest border-b-2 border-black pb-2">
                HONOURABLE MENTIONS
              </h4>
              <ul className="font-handwriting text-xl space-y-6">
                {mentions.map((item) => (
                  <li key={item.title} className="group">
                    <div className="flex items-start gap-2">
                      <span className="material-symbols-outlined mt-1 text-primary/70 text-base">edit</span>
                      <div>
                        <p className="font-bold leading-tight">{item.title}</p>
                        <p className="font-handwriting text-base opacity-75 leading-snug mt-1">
                          {item.desc}
                        </p>
                        <DoodleButton
                          href={item.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="underline"
                          className="!text-lg mt-2"
                        >
                          View Repo
                        </DoodleButton>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-10 pt-6 border-t-2 border-black border-dashed relative">
                <p className="font-handwriting text-base opacity-90 leading-relaxed flex flex-wrap items-center gap-x-2 gap-y-3">
                  If you want to see more on what I'm working on
                  <span className="relative inline-flex min-h-16 min-w-36 items-center justify-center">
                    <DoodleButton
                      href={`${repoBase}?tab=repositories`}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="underline"
                      className="click-here-button !text-xl z-10"
                    >
                      click here
                    </DoodleButton>
                    <svg className="scribble-circle" preserveAspectRatio="none" viewBox="0 0 100 100">
                      <path
                        d="M10,50 C10,20 40,10 70,15 C100,20 95,60 80,85 C65,110 20,100 10,70 C0,40 30,20 60,25"
                        fill="none"
                        stroke="black"
                        strokeDasharray="2,2"
                        strokeWidth="2"
                      />
                    </svg>
                  </span>
                </p>
              </div>
            </motion.div>

            <div className="space-y-6">
              <h4 className="font-headline-md marker-highlight text-2xl">
                Achievements
              </h4>
              <div className="flex flex-col gap-6">
                {achievements.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className={`award-sticker next-gen-reveal bg-white ${item.rot}`}
                  >
                    <p className="font-handwriting text-lg font-bold leading-tight">
                      {item.title}
                    </p>
                    <p className="font-handwriting text-base mt-2 opacity-80 leading-snug">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        <div className="sketch-divider mb-20" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="relative next-gen-reveal"
        >
          <h2 className="font-headline-lg text-4xl md:text-5xl mb-16 marker-highlight">
            Professional Experience
          </h2>
          <div className="relative pl-8 md:pl-12">
            <div className="timeline-doodle" />

            <div className="relative mb-20 group">
              <div className="experience-number-marker absolute -left-[48px] md:-left-[60px] top-1 z-10">
                01
              </div>
              <div className="index-card p-10 rotate-[-0.5deg] bg-white relative">
                <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
                  <div>
                    <h3 className="font-headline-md text-2xl text-primary">Raen AI</h3>
                    <p className="font-handwriting text-2xl text-secondary">
                      Frontend Developer
                    </p>
                  </div>
                  <span className="font-label-caps px-4 py-2 bg-black text-white rotate-2 border-2 border-black text-xs">
                    MAY 2024 - PRESENT
                  </span>
                </div>
                <p className="font-body-lg text-secondary max-w-3xl leading-relaxed mb-5">
                  Primary frontend engineer for Raen AI's web presence, spanning marketing pages,
                  product interfaces, and internal platforms. Owns technical SEO, performance,
                  semantic structure, Core Web Vitals, and responsive delivery across the company's
                  web properties.
                </p>
                <ul className="font-handwriting text-xl leading-tight grid md:grid-cols-2 gap-3 max-w-4xl">
                  <li className="border-l-2 border-black pl-3">Drove brand SEO to the #1 Google result.</li>
                  <li className="border-l-2 border-black pl-3">Led GarageView CRM frontend through production release.</li>
                  <li className="border-l-2 border-black pl-3">Built auth flows and real-time data interfaces.</li>
                  <li className="border-l-2 border-black pl-3">Optimized load time, assets, rendering, and responsiveness.</li>
                </ul>
              </div>
            </div>

            <div className="relative group">
              <div className="experience-number-marker absolute -left-[48px] md:-left-[60px] top-1 z-10">
                02
              </div>
              <div className="index-card p-10 rotate-[0.3deg] bg-white">
                <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
                  <div>
                    <h3 className="font-headline-md text-2xl text-primary">Freelance Software Developer</h3>
                    <p className="font-handwriting text-2xl text-secondary">
                      Web, Software &amp; Client Delivery
                    </p>
                  </div>
                  <span className="font-label-caps px-4 py-2 bg-black text-white -rotate-1 border-2 border-black text-xs">
                    2023 - MAY 2024
                  </span>
                </div>
                <p className="font-body-lg text-secondary max-w-3xl leading-relaxed">
                  Delivered end-to-end web and software projects for businesses and NGOs, covering
                  requirements, scoping, development, testing, and handoff while managing concurrent
                  client codebases independently.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
