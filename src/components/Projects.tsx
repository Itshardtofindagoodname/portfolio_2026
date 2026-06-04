import { motion } from 'framer-motion'
import DoodleButton from './DoodleButton'
import VaraHoverText from './VaraHoverText'

const repoBase = 'https://github.com/Itshardtofindagoodname'

const projects = [
  {
    title: 'FastFox',
    icon: 'speed',
    repo: `${repoBase}/fastfox`,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDeuAUfvXzlhpizeSxY6N5UWtGFC6BSCNB3JId9m0fhfavtJP-nmsjneJlK-jQv4UCQ26VYzghEkZ6xcGLeUxOZ95QF7kl2I9UAwRvn8cT1Nl5_kSuCnUO7SW8TIfEkMCXsLTG7W61sp5IcLzWhdY21OKHFHT8VHwJkNeLYbuaqOeUOMQm39YuSzafY05EYy3nIiy0WuUfqdxJmotDv8AkdU6-mlBruC5YXmUpEsb-opG1zuyj2zxWtII_qKtYEGA5MeX7TTte_o-I',
    desc: 'AI-powered CLI that uses Groq, LLaMA 3, Mixtral, and BLIP to organize files, suggest commands, generate code, and ship as a packaged desktop-ready tool.',
    tags: ['PYTHON', 'GROQ API', 'LLAMA 3'],
    rotate: 'rotate-[-1.5deg]',
  },
  {
    title: 'Profi',
    icon: 'work_outline',
    repo: `${repoBase}/Profi`,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAUdBez4wP33x86pzqpaMkYaEUYBHeY5I69UmK3GG15FXtIgJFFFCaWcTUAC7AqAXrzKlJxQERqxvd_t4hxtWlFWO-8fn1XmUC5JD9IfQftjzQNe_fPiwzswmxlCY5UkPLDrlvHlZ9dF4vThCpjEqpTOWkVasDafNOKk1oCU3pjmhpBXpgmdd-D6KBYAKp4awh8QR11ZupWn2F2SnUfG0q_6Qz0Vp87YXXRBwGf8gNRCPEQ2MonDGxzJBalrSALzpZAaUW1PyqpZCs',
    desc: 'AI-integrated task management system built with React, Vite, and Tailwind, focused on prioritization, workflow clarity, and clean component architecture.',
    tags: ['REACT', 'VITE', 'TAILWIND'],
    rotate: 'rotate-[1.2deg]',
  },
  {
    title: 'Pragati',
    icon: 'account_balance',
    repo: `${repoBase}/Pragati-SIH`,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAYkF7fn7m9_AKLx-IR9KERRoJHg_c-TvW25KLDhR1ex9bQ0FutrURqY49L9esvpGwaLFdgkKJ5Z-K69CDGhAYowV0YEMQZY7tmDbJrjFwJvqIm5oBfUN2TkArN_amTudj1ViZdfxE1y5oP49AAhJja93srcWuWQJ7r5XtEl8i5i7evnjlQn0djKVt5nz4XGXzVIspkFntn9J0fe1PqGQYMl_8389MoO2gYQ1aWKrkG0qxP1IJ0S_tY3m4OR8EpYhNiJm9wwtGlRJY',
    desc: 'Full-stack civic platform for Smart India Hackathon 2023, with complaint workflows, contractor management, REST APIs, MongoDB, and an AI assistant endpoint.',
    tags: ['NEXT.JS', 'MONGODB', 'REST API'],
    rotate: 'rotate-[-0.8deg]',
  },
  {
    title: 'Vaultify',
    icon: 'lock',
    repo: `${repoBase}/Vaultify-SIH`,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBG6TGo32PIOjWVWuhIdcPa63n6-5g9-8hccysIqUnz76Fwt498POSnHcnuCdVZRBi4vyHlozRuiBDp8S-ARGkfG7RIsZPH6rX3QxQRgWBBaM8lDJZJj-SEWZbCvASV80PzEM6AsZeDuaUaRQbkA1-VYSFoywO4pCWuFF65J_jlkpGA9OqJNWiaoRrQiLk5XRhJTFxLtIH5ralM69hYd8zGyzgmihtTeOs0DRCE-XuGIrwqWALQD-2TQ0Csc1Y2kNcDnalRrQfIeZw',
    desc: 'Secure document and asset-management frontend built with React and Tailwind, emphasizing accessible retrieval flows and scalable collaborative architecture.',
    tags: ['REACT', 'VITE', 'SECURITY'],
    rotate: 'rotate-[2deg] md:mt-12',
  },
  {
    title: 'Slash',
    icon: 'sports_esports',
    repo: `${repoBase}/Slash`,
    image:
      'https://lh3.googleusercontent.com/aida/AP1WRLtqsi4XySQsh6EjaLs961uM8lwQiOhfwkpUJVvUdLDa5A7T8Iulme_oOou1plBlTwrLMHaKyZhUE3UxnDiGknecCnLps-ASAWjH63DHMVpzLRIlqeAnyjEe9cDPbca9qSiA522jvgu3kaUV8hWpMZFV2zR6KO0TyakR6Wdae1AfFO9oyMJDa30OIGyqOsMcHacww9jY55YU5F6MlNQPjuMCGOSxuU4GB2-kNg2fPfEACdVNm-MVXsUb0A',
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

const Projects = () => {
  return (
    <section id="projects" className="paper-cut-section relative bg-dot-grid-pattern py-20 md:py-32 overflow-hidden border-y-2 border-black">
      <div className="absolute top-40 left-0 opacity-10 pointer-events-none select-none -rotate-12">
        <svg className="w-48 h-48" viewBox="0 0 100 100">
          <path d="M10,10 Q50,90 90,10" fill="none" stroke="black" strokeWidth="1" />
        </svg>
      </div>

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
                className={`index-card next-gen-reveal p-8 relative bg-white ${project.rotate}`}
              >
                {index % 2 === 0 ? <div className="tape-effect tape-tl" /> : <div className="tape-effect tape-tr" />}
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-headline-md text-2xl border-b-2 border-black pb-0.5 inline-block">
                    <VaraHoverText text={project.title} fontSize={30} />
                  </h3>
                  <div className="w-10 h-10 flex items-center justify-center border-2 border-black rounded-full rotate-[12deg] bg-white">
                    <span className="material-symbols-outlined text-xl text-primary">{project.icon}</span>
                  </div>
                </div>
                <div className="aspect-video mb-6 rough-border overflow-hidden bg-white">
                  <img
                    alt={`${project.title} project preview`}
                    className="w-full h-full object-cover grayscale opacity-80 hover:opacity-100 hover:scale-102 transition-all duration-300"
                    src={project.image}
                  />
                </div>
                <p className="font-handwriting text-2xl text-primary mb-6 leading-tight">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-2 mb-7">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tag}
                      className={`font-label-caps text-[10px] px-2 py-1 bg-black text-white ${
                        tagIndex % 2 === 0 ? 'rotate-2' : '-rotate-1'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <DoodleButton
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="paper"
                  className="!text-xl !px-5 !py-2"
                >
                  View Repo
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                </DoodleButton>
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
              <div className="absolute -left-[44px] md:-left-[54px] top-1.5 w-8 h-8 bg-white border-3 border-black rounded-full z-10 flex items-center justify-center shadow-xs">
                <div className="w-3 h-3 bg-black rounded-full group-hover:scale-150 transition-transform" />
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
              <div className="absolute -left-[44px] md:-left-[54px] top-1.5 w-8 h-8 bg-white border-3 border-black rounded-full z-10 flex items-center justify-center shadow-xs">
                <div className="w-3 h-3 bg-black rounded-full group-hover:scale-150 transition-transform" />
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
