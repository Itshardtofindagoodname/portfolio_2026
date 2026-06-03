import { motion } from 'framer-motion'

const Projects = () => {
  return (
    <section id="projects" className="relative bg-dot-grid-pattern py-20 md:py-32 overflow-hidden border-t-2 border-black">
      {/* Background Marginalia */}
      <div className="absolute top-40 left-0 opacity-10 pointer-events-none select-none -rotate-12">
        <svg className="w-48 h-48" viewBox="0 0 100 100">
          <path d="M10,10 Q50,90 90,10" fill="none" stroke="black" strokeWidth="1"></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 relative z-10">
        {/* Headline */}
        <div className="flex flex-col md:flex-row items-baseline gap-4 mb-20 relative">
          <h2 className="font-handwriting text-headline-xl text-5xl md:text-6xl marker-highlight leading-none">
            Top 5 Projects
          </h2>
          <span className="font-handwriting text-2xl text-primary/40">
            / most recent experiments
          </span>
          {/* Hand drawn arrow */}
          <div className="hidden lg:block ml-10">
            <svg
              className="w-16 h-16 rotate-[160deg] opacity-20"
              fill="none"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10,90 Q40,80 50,50 T90,10"
                fill="none"
                stroke="black"
                strokeLinecap="round"
                strokeWidth="4"
              ></path>
              <path
                d="M80,20 L90,10 L80,5"
                fill="none"
                stroke="black"
                strokeLinecap="round"
                strokeWidth="4"
              ></path>
            </svg>
          </div>
          {/* Sketchy Annotation */}
          <div className="absolute -top-10 right-0 font-handwriting text-xl rotate-6 opacity-30 hidden md:block">
            "Code goes here!" ✎
          </div>
        </div>

        {/* Project Grid & Sidebar Wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-32">
          {/* Project Grid (Main Area) */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Project 1: FastFox */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
              className="index-card p-8 rotate-[-1.5deg] relative bg-white"
            >
              <div className="tape-effect tape-tl"></div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-headline-md text-2xl border-b-2 border-black pb-0.5 inline-block">
                  FastFox
                </h3>
                <div className="w-10 h-10 flex items-center justify-center border-2 border-black rounded-full rotate-[15deg] bg-white">
                  <span className="material-symbols-outlined text-xl text-primary">speed</span>
                </div>
              </div>
              <div className="aspect-video mb-6 rough-border overflow-hidden bg-white">
                <img
                  alt="FastFox - Ultra-fast web crawler"
                  className="w-full h-full object-cover grayscale opacity-80 hover:opacity-100 hover:scale-102 transition-all duration-300"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeuAUfvXzlhpizeSxY6N5UWtGFC6BSCNB3JId9m0fhfavtJP-nmsjneJlK-jQv4UCQ26VYzghEkZ6xcGLeUxOZ95QF7kl2I9UAwRvn8cT1Nl5_kSuCnUO7SW8TIfEkMCXsLTG7W61sp5IcLzWhdY21OKHFHT8VHwJkNeLYbuaqOeUOMQm39YuSzafY05EYy3nIiy0WuUfqdxJmotDv8AkdU6-mlBruC5YXmUpEsb-opG1zuyj2zxWtII_qKtYEGA5MeX7TTte_o-I"
                />
              </div>
              <p className="font-handwriting text-2xl text-primary mb-6 leading-tight">
                Ultra-fast web crawler built for data miners. Processes 10k pages/min with zero overhead.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="font-label-caps text-[10px] px-2 py-1 bg-black text-white rotate-2">
                  PYTHON
                </span>
                <span className="font-label-caps text-[10px] px-2 py-1 bg-black text-white -rotate-1">
                  GROQ API
                </span>
              </div>
              <a
                className="font-handwriting text-xl underline underline-offset-4 flex items-center gap-2 hover:font-bold"
                href="#"
              >
                View Repo <span className="material-symbols-outlined text-sm">open_in_new</span>
              </a>
            </motion.div>

            {/* Project 2: Profi */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="index-card p-8 rotate-[1.2deg] relative bg-white"
            >
              <div className="tape-effect tape-tr"></div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-headline-md text-2xl border-b-2 border-black pb-0.5 inline-block">
                  Profi
                </h3>
                <div className="w-10 h-10 flex items-center justify-center border-2 border-black rounded-full -rotate-[8deg] bg-white">
                  <span className="material-symbols-outlined text-xl text-primary">work_outline</span>
                </div>
              </div>
              <div className="aspect-video mb-6 rough-border overflow-hidden bg-white">
                <img
                  alt="Profi - AI task management"
                  className="w-full h-full object-cover grayscale opacity-80 hover:opacity-100 hover:scale-102 transition-all duration-300"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUdBez4wP33x86pzqpaMkYaEUYBHeY5I69UmK3GG15FXtIgJFFFCaWcTUAC7AqAXrzKlJxQERqxvd_t4hxtWlFWO-8fn1XmUC5JD9IfQftjzQNe_fPiwzswmxlCY5UkPLDrlvHlZ9dF4vThCpjEqpTOWkVasDafNOKk1oCU3pjmhpBXpgmdd-D6KBYAKp4awh8QR11ZupWn2F2SnUfG0q_6Qz0Vp87YXXRBwGf8gNRCPEQ2MonDGxzJBalrSALzpZAaUW1PyqpZCs"
                />
              </div>
              <p className="font-handwriting text-2xl text-primary mb-6 leading-tight">
                AI-driven career pathing for developers. Recommends stacks based on market volatility.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="font-label-caps text-[10px] px-2 py-1 bg-black text-white -rotate-2">
                  NEXT.JS
                </span>
                <span className="font-label-caps text-[10px] px-2 py-1 bg-black text-white rotate-3">
                  OPENAI
                </span>
              </div>
              {/* Scribble note */}
              <div className="absolute -bottom-6 -right-4 font-handwriting text-sm opacity-40 -rotate-12">
                "almost finished!"
              </div>
            </motion.div>

            {/* Project 3: Pragati */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
              className="index-card p-8 rotate-[-0.8deg] relative bg-white"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-headline-md text-2xl border-b-2 border-black pb-0.5 inline-block">
                  Pragati
                </h3>
                <span className="font-handwriting text-xl text-secondary">v2.0</span>
              </div>
              <div className="aspect-video mb-6 rough-border overflow-hidden bg-white">
                <img
                  alt="Pragati - Infrastructure Platform"
                  className="w-full h-full object-cover grayscale opacity-80 hover:opacity-100 hover:scale-102 transition-all duration-300"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYkF7fn7m9_AKLx-IR9KERRoJHg_c-TvW25KLDhR1ex9bQ0FutrURqY49L9esvpGwaLFdgkKJ5Z-K69CDGhAYowV0YEMQZY7tmDbJrjFwJvqIm5oBfUN2TkArN_amTudj1ViZdfxE1y5oP49AAhJja93srcWuWQJ7r5XtEl8i5i7evnjlQn0djKVt5nz4XGXzVIspkFntn9J0fe1PqGQYMl_8389MoO2gYQ1aWKrkG0qxP1IJ0S_tY3m4OR8EpYhNiJm9wwtGlRJY"
                />
              </div>
              <p className="font-handwriting text-2xl text-primary mb-6 leading-tight">
                Personal progress tracker for habitual learners. Visualizes skill gaps with custom graphs.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="font-label-caps text-[10px] px-2 py-1 bg-black text-white">
                  REDUX
                </span>
                <span className="font-label-caps text-[10px] px-2 py-1 bg-black text-white rotate-1">
                  MONGODB
                </span>
              </div>
            </motion.div>

            {/* Project 4: Vaultify */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="index-card p-8 rotate-[2deg] relative md:mt-12 bg-white"
            >
              <div className="tape-effect tape-tr" style={{ width: '60px', right: '-20px' }}></div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-headline-md text-2xl border-b-2 border-black pb-0.5 inline-block">
                  Vaultify
                </h3>
                <span className="material-symbols-outlined text-primary text-xl">lock</span>
              </div>
              <div className="aspect-video mb-6 rough-border overflow-hidden bg-white">
                <img
                  alt="Vaultify - Secure asset management"
                  className="w-full h-full object-cover grayscale opacity-80 hover:opacity-100 hover:scale-102 transition-all duration-300"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBG6TGo32PIOjWVWuhIdcPa63n6-5g9-8hccysIqUnz76Fwt498POSnHcnuCdVZRBi4vyHlozRuiBDp8S-ARGkfG7RIsZPH6rX3QxQRgWBBaM8lDJZJj-SEWZbCvASV80PzEM6AsZeDuaUaRQbkA1-VYSFoywO4pCWuFF65J_jlkpGA9OqJNWiaoRrQiLk5XRhJTFxLtIH5ralM69hYd8zGyzgmihtTeOs0DRCE-XuGIrwqWALQD-2TQ0Csc1Y2kNcDnalRrQfIeZw"
                />
              </div>
              <p className="font-handwriting text-2xl text-primary mb-6 leading-tight">
                End-to-end encrypted file sharing with self-destructing links. Security first, always.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="font-label-caps text-[10px] px-2 py-1 bg-black text-white -rotate-1">
                  TYPESCRIPT
                </span>
                <span className="font-label-caps text-[10px] px-2 py-1 bg-black text-white rotate-2">
                  WEB CRYPTO
                </span>
              </div>
            </motion.div>

            {/* Project 5: Slash */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
              className="index-card p-8 rotate-[-1.2deg] relative md:mt-12 bg-white"
            >
              <div className="tape-effect tape-tl" style={{ width: '70px', left: '-25px' }}></div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-headline-md text-2xl border-b-2 border-black pb-0.5 inline-block">
                  Slash
                </h3>
                <div className="w-10 h-10 flex items-center justify-center border-2 border-black rounded-full rotate-[-12deg] bg-white">
                  <span className="material-symbols-outlined text-xl text-primary">sports_esports</span>
                </div>
              </div>
              <div className="aspect-video mb-6 rough-border overflow-hidden bg-white">
                <img
                  alt="Slash - Browser-Native Game"
                  className="w-full h-full object-cover grayscale opacity-80 hover:opacity-100 hover:scale-102 transition-all duration-300"
                  src="https://lh3.googleusercontent.com/aida/AP1WRLtqsi4XySQsh6EjaLs961uM8lwQiOhfwkpUJVvUdLDa5A7T8Iulme_oOou1plBlTwrLMHaKyZhUE3UxnDiGknecCnLps-ASAWjH63DHMVpzLRIlqeAnyjEe9cDPbca9qSiA522jvgu3kaUV8hWpMZFV2zR6KO0TyakR6Wdae1AfFO9oyMJDa30OIGyqOsMcHacww9jY55YU5F6MlNQPjuMCGOSxuU4GB2-kNg2fPfEACdVNm-MVXsUb0A"
                />
              </div>
              <p className="font-handwriting text-2xl text-primary mb-6 leading-tight">
                A browser-native classic game experience with beautiful minimal hand-sketched graphics.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="font-label-caps text-[10px] px-2 py-1 bg-black text-white rotate-1">
                  TAILWIND
                </span>
                <span className="font-label-caps text-[10px] px-2 py-1 bg-black text-white -rotate-2">
                  ZUSTAND
                </span>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-12">
            {/* Honourable Mentions */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              className="wiggly-border p-8 bg-white rotate-[1.5deg] relative shadow-md"
            >
              <div className="tape-effect tape-tr !bg-black/10"></div>
              <h4 className="font-label-caps text-secondary mb-6 tracking-widest border-b-2 border-black pb-2">
                HONOURABLE MENTIONS
              </h4>
              <ul className="font-handwriting text-xl space-y-6">
                {[
                  'Talk-with-Web',
                  'HTML-CSS-JS Compiler',
                  'DotScript',
                  'Kinglike AI',
                  'LoRA Fine-Tuned LLaMA Model',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 hover:translate-x-1 transition-transform">
                    <span className="mt-1 text-primary/70">✎</span>
                    <p className="font-bold">{item}</p>
                  </li>
                ))}
              </ul>
              
              <div className="mt-10 pt-4 border-t-2 border-black border-dashed relative">
                <p className="font-handwriting text-base opacity-90 leading-relaxed">
                  If you want to see more on what I'm working on{' '}
                  <span className="relative inline-block ml-1">
                    <button className="font-bold px-3 py-1 bg-black text-white rounded-xs transform transition-all hover:scale-105 active:scale-95 z-10 relative">
                      click here
                    </button>
                    {/* Hand-scribbled circle graphic */}
                    <svg className="scribble-circle" preserveAspectRatio="none" viewBox="0 0 100 100">
                      <path
                        d="M10,50 C10,20 40,10 70,15 C100,20 95,60 80,85 C65,110 20,100 10,70 C0,40 30,20 60,25"
                        fill="none"
                        stroke="black"
                        strokeDasharray="2,2"
                        strokeWidth="2"
                      ></path>
                    </svg>
                  </span>
                </p>
                {/* Sketchy Arrow */}
                <div className="absolute -bottom-10 right-4">
                  <svg className="w-12 h-12 rotate-[-45deg] opacity-40" fill="none" viewBox="0 0 100 100">
                    <path d="M10,10 Q50,10 90,90" stroke="black" strokeLinecap="round" strokeWidth="4"></path>
                    <path d="M75,90 L90,90 L90,75" stroke="black" strokeLinecap="round" strokeWidth="4"></path>
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Achievements & Recognition SECTION */}
            <div className="space-y-6">
              <h4 className="font-headline-md marker-highlight text-2xl">
                🏆 Achievements
              </h4>
              <div className="flex flex-col gap-6">
                {[
                  {
                    title: 'Smart India Hackathon 2023 — Runner-Up',
                    desc: "India's largest national hackathon. Selected among the top few from 50,000+ teams nationwide with a selection rate of less than 1%.",
                    rot: 'rotate-[-1.5deg]',
                  },
                  {
                    title: 'AI Unite Hackathon 2023 — Top 5',
                    desc: 'Ranked in the top 5 nationally, securing a full merit scholarship for the GenAI Developer Program.',
                    rot: 'rotate-[2deg] ml-4',
                  },
                  {
                    title: 'International Hardware Model Making 2024 — Winner',
                    desc: 'Claimed first place for pioneering an IoT-enabled smart safety device for industrial workers.',
                    rot: 'rotate-[-2.5deg]',
                  },
                  {
                    title: '10+ Additional Competition Wins',
                    desc: 'Consistent top placements in local and regional coding sprints, data science hackathons, and hardware challenges.',
                    rot: 'rotate-[1.5deg] ml-2',
                  },
                  {
                    title: 'Student Developer Community Lead — 3+ Years',
                    desc: 'Founded and continues to run a student-led dev group, mentoring 200+ students in web technologies and open source.',
                    rot: 'rotate-[-3deg]',
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className={`award-sticker bg-white ${item.rot}`}
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

        {/* Sketchy Divider */}
        <div className="sketch-divider mb-20"></div>

        {/* EXPERIENCE SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <h2 className="font-headline-lg text-4xl md:text-5xl mb-16 marker-highlight">
            Professional Experience
          </h2>
          <div className="relative pl-8 md:pl-12">
            {/* Timeline Doodle */}
            <div className="timeline-doodle"></div>

            {/* Experience Item 1 */}
            <div className="relative mb-20 group">
              <div className="absolute -left-[44px] md:-left-[54px] top-1.5 w-8 h-8 bg-white border-3 border-black rounded-full z-10 flex items-center justify-center shadow-xs">
                <div className="w-3 h-3 bg-black rounded-full group-hover:scale-150 transition-transform"></div>
              </div>
              <div className="index-card p-10 rotate-[-0.5deg] bg-white relative">
                <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
                  <div>
                    <h3 className="font-headline-md text-2xl text-primary">Raen AI</h3>
                    <p className="font-handwriting text-2xl text-secondary">
                      Frontend Engineering Fellow
                    </p>
                  </div>
                  <span className="font-label-caps px-4 py-2 bg-black text-white rotate-2 border-2 border-black text-xs">
                    2024 — PRESENT
                  </span>
                </div>
                <p className="font-body-lg text-secondary max-w-3xl leading-relaxed">
                  Building the future of creative AI tools. Architected the main playground UI using
                  React and WebGL for seamless real-time interactions. Optimized canvas rendering by
                  40% through custom hook implementations.
                </p>
                {/* Annotation */}
                <div className="absolute -right-16 -bottom-8 hidden xl:block">
                  <div className="font-handwriting text-xl text-primary opacity-30 rotate-12 flex flex-col items-center">
                    <span className="material-symbols-outlined rotate-[-30deg]">arrow_upward</span>
                    <span>fastest growing startup</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Experience Item 2 */}
            <div className="relative group">
              <div className="absolute -left-[44px] md:-left-[54px] top-1.5 w-8 h-8 bg-white border-3 border-black rounded-full z-10 flex items-center justify-center shadow-xs">
                <div className="w-3 h-3 bg-black rounded-full group-hover:scale-150 transition-transform"></div>
              </div>
              <div className="index-card p-10 rotate-[0.3deg] bg-white">
                <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
                  <div>
                    <h3 className="font-headline-md text-2xl text-primary">Freelance Developer</h3>
                    <p className="font-handwriting text-2xl text-secondary">
                      Full Stack &amp; Design
                    </p>
                  </div>
                  <span className="font-label-caps px-4 py-2 bg-black text-white -rotate-1 border-2 border-black text-xs">
                    2022 — 2024
                  </span>
                </div>
                <p className="font-body-lg text-secondary max-w-3xl leading-relaxed">
                  Delivered bespoke web solutions for various international clients. Focused on
                  creating unique, high-contrast visual identities paired with robust backend
                  integrations.
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
