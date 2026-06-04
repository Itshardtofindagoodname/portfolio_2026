import { motion } from 'framer-motion'
import DoodleButton from './DoodleButton'
import VaraHoverText from './VaraHoverText'

const WebGlLogo = () => (
  <svg className="w-9 h-9 mb-1" viewBox="0 0 64 64" aria-hidden="true">
    <path d="M8 42 L32 8 L56 42 Z" fill="none" stroke="black" strokeWidth="4" strokeLinejoin="round" />
    <path d="M18 42 C26 30 38 30 46 42" fill="none" stroke="black" strokeWidth="4" strokeLinecap="round" />
    <circle cx="32" cy="42" r="6" fill="black" />
  </svg>
)

const DockerLogo = () => (
  <svg className="w-10 h-9 mb-1" viewBox="0 0 80 64" aria-hidden="true">
    <path d="M13 32h9v9h-9zM24 32h9v9h-9zM35 32h9v9h-9zM24 21h9v9h-9zM35 21h9v9h-9zM46 32h9v9h-9z" fill="black" />
    <path d="M9 43h55c-3 11-12 17-26 17H27C15 60 8 54 5 43z" fill="none" stroke="black" strokeWidth="4" strokeLinejoin="round" />
    <path d="M60 34c5-5 10-4 14 1-4 3-8 4-13 2" fill="none" stroke="black" strokeWidth="4" strokeLinecap="round" />
  </svg>
)

const AiLogo = () => (
  <svg className="w-9 h-9 mb-1" viewBox="0 0 64 64" aria-hidden="true">
    <path d="M32 6 L36 24 L54 28 L36 34 L32 52 L28 34 L10 28 L28 24 Z" fill="none" stroke="black" strokeWidth="4" strokeLinejoin="round" />
    <circle cx="49" cy="48" r="5" fill="black" />
  </svg>
)

const About = () => {
  return (
    <section id="about" className="paper-cut-section relative bg-dot-grid-pattern py-20 md:py-32 overflow-hidden">
      <div className="absolute top-20 right-10 font-handwriting text-5xl opacity-5 -rotate-12 pointer-events-none select-none">
        CODE SHIP REPEAT
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-32 next-gen-reveal"
        >
          <div className="lg:col-span-6 relative order-2 lg:order-1 flex justify-center lg:justify-start">
            <div className="relative group transition-transform duration-300 hover:rotate-0 inline-block">
              <div className="tape-effect tape-tl opacity-80" />
              <div className="tape-effect tape-tr opacity-80" />
              <div className="tape-effect tape-bl opacity-60" />

              <div className="polaroid-frame rough-cut relative z-10 group-hover:shadow-2xl transition-shadow duration-300">
                <img
                  alt="Debarjun Thakur"
                  className="w-full max-w-[360px] md:max-w-[420px] aspect-[3/4] object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9QMiLqog5Hn1umNZ8t0xy64pWfRa9_Mn0NBTCk0USD_xonrbAqkLaZpBvhd3QmpRL9RVdPtzJfsig88FCDjKabmzGqfCc7EQbiBwIll8mOv48VHP5QxECuwl7N-j23GE5JBRn2mTcQ3UiRJC8hTSMhrpP2r3pOHptncL5JNC3rIPlIOxCkkfavkewsIzqSK6mG0qzXdAbQY8vQCxolhuPg3PIqra334P_En_qAjo14S2_Hcz4kdzS7ZfIBTOiMVo-qL25cVhVmmQ"
                />
                <div className="absolute bottom-4 left-0 right-0 text-center font-handwriting text-2xl text-primary opacity-60">
                  Me, thinking about CSS...
                </div>
              </div>
            </div>

            <div className="hidden lg:block absolute -right-16 bottom-0 z-20">
              <div className="font-handwriting text-primary text-3xl rotate-[-5deg] max-w-[240px] leading-tight flex flex-col items-start">
                <svg className="w-20 h-20 -mb-4 -ml-4 rotate-[160deg] opacity-60" fill="none" viewBox="0 0 100 100">
                  <path d="M10,90 Q40,80 50,50 T90,10" fill="none" stroke="black" strokeLinecap="round" strokeWidth="3" />
                  <path d="M80,20 L90,10 L80,5" fill="none" stroke="black" strokeLinecap="round" strokeWidth="3" />
                </svg>
                <span className="bg-white/60 backdrop-blur-xs px-2 py-1 wiggly-border">
                  This guy codes until his coffee turns cold.
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center h-full pt-8 order-1 lg:order-2">
            <div className="space-y-10 relative">
              <svg className="ink-splatter -top-16 -left-16 w-48 h-48" viewBox="0 0 100 100">
                <path d="M30,50 Q20,30 50,20 T80,50 T50,80 T30,50" fill="black" />
                <circle cx="20" cy="20" fill="black" r="2" />
                <circle cx="85" cy="85" fill="black" r="3" />
                <circle cx="10" cy="70" fill="black" r="1.5" />
              </svg>

              <div className="relative inline-block">
                <h1 className="font-headline-xl text-5xl md:text-6xl lg:text-7xl leading-none marker-highlight">
                  <VaraHoverText text="HELLOOO." fontSize={54} />
                </h1>
                <div className="absolute -top-12 right-0 md:-right-12 font-handwriting text-primary text-3xl rotate-12 bg-white/95 px-4 py-2 rough-border">
                  I'm Debarjun!
                </div>
              </div>

              <p className="font-handwriting text-2xl md:text-3xl text-primary max-w-xl leading-snug">
                I am a <span className="scribble-underline font-bold">Frontend Developer</span>,
                building fast web surfaces, product interfaces, CRM flows, SEO-friendly systems,
                and tactile UI work that feels as thoughtful as a well-worn sketchbook.
              </p>

              <div className="space-y-6">
                {[
                  ['location_on', 'Based in India, working globally.'],
                  ['schedule', 'Primary frontend engineer for Raen AI web properties.'],
                  ['trending_up', 'Shipped SEO, performance, auth, CRM, and real-time interface work.'],
                ].map(([icon, text], index) => (
                  <div key={text} className="flex items-center gap-4 group">
                    <div className={`w-10 h-10 rounded-full border-2 border-black flex items-center justify-center transition-transform bg-white shadow-xs ${index % 2 === 0 ? 'rotate-[-12deg]' : 'rotate-[15deg]'} group-hover:rotate-0`}>
                      <span className="material-symbols-outlined text-primary text-xl">{icon}</span>
                    </div>
                    <span className="font-body-md text-secondary border-b border-black border-dashed pb-0.5">
                      {text}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <DoodleButton href="#contact" variant="ink" className="font-handwriting">
                  Get in Touch
                  <span className="material-symbols-outlined text-lg">arrow_right_alt</span>
                </DoodleButton>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="py-12 relative next-gen-reveal"
        >
          <div className="sketch-divider mb-20" />

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
            <div className="relative">
              <h2 className="font-label-caps text-xs text-secondary tracking-[0.2em] mb-2 uppercase">
                SYSTEM ARCHITECTURE
              </h2>
              <h3 className="font-headline-lg text-4xl md:text-5xl marker-highlight">
                Tech Stack &amp; Tools
              </h3>
            </div>
            <div className="font-handwriting text-2xl md:text-3xl text-primary opacity-40 rotate-[-4deg]">
              010101 // craft
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="index-card p-10 rotate-[-1.2deg] relative bg-white next-gen-reveal">
              <div className="tape-effect tape-tr !w-16 !rotate-[15deg] !-right-6 !-top-4" />
              <div className="flex justify-between items-start mb-8">
                <h4 className="font-headline-md text-2xl border-b-2 border-black pb-1">Frontend</h4>
                <span className="material-symbols-outlined text-primary text-3xl">data_object</span>
              </div>
              <ul className="font-handwriting text-2xl space-y-4">
                {['React & Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'].map((tool) => (
                  <li key={tool} className="flex items-center gap-3 hover:translate-x-1 transition-transform">
                    <span className="material-symbols-outlined text-lg text-primary/60">arrow_forward</span>
                    {tool}
                  </li>
                ))}
              </ul>
              <div className="mt-10 pt-4 border-t-2 border-black border-dotted">
                <span className="font-label-caps text-[10px] text-secondary">PRIMARY TOOLS FOR SHIPMENT</span>
              </div>
            </div>

            <div className="index-card p-10 rotate-[0.8deg] relative bg-white next-gen-reveal">
              <div className="flex justify-between items-start mb-8">
                <h4 className="font-headline-md text-2xl border-b-2 border-black pb-1">Workflow</h4>
                <span className="material-symbols-outlined text-primary text-3xl">architecture</span>
              </div>
              <ul className="font-handwriting text-2xl space-y-4">
                {['Figma (UI/UX)', 'VS Code / Git', 'Docker / CI/CD', 'Node.js Ecosystem'].map((tool) => (
                  <li key={tool} className="flex items-center gap-3 hover:translate-x-1 transition-transform">
                    <span className="material-symbols-outlined text-lg text-primary/60">check</span>
                    {tool}
                  </li>
                ))}
              </ul>
              <div className="mt-10 pt-4 border-t-2 border-black border-dotted">
                <span className="font-label-caps text-[10px] text-secondary">THE ENGINE ROOM</span>
              </div>
            </div>

            <div className="rough-border p-8 flex flex-col justify-between bg-white relative rotate-[-0.5deg] shadow-lg overflow-hidden min-h-[300px] next-gen-reveal">
              <div className="relative z-10">
                <h4 className="font-label-caps text-[12px] text-white mb-6 tracking-widest bg-black inline-block px-4 py-2 rotate-[-3deg] rough-cut">
                  CURRENTLY EXPLORING
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    ['WEBGL', <WebGlLogo key="webgl" />],
                    ['POSTGRES', <span key="postgres" className="material-symbols-outlined text-3xl mb-1 text-primary">database</span>],
                    ['AI', <AiLogo key="ai" />],
                    ['DOCKER', <DockerLogo key="docker" />],
                  ].map(([label, icon], index) => (
                    <div
                      key={label as string}
                      className={`index-card p-3 flex flex-col items-center justify-center bg-white hover:rotate-0 transition-all duration-200 hover:scale-110 shadow-xs cursor-default ${
                        ['rotate-[-8deg]', 'rotate-[10deg]', 'rotate-[4deg]', 'rotate-[-6deg]'][index]
                      }`}
                    >
                      {icon}
                      <span className="text-[9px] font-bold font-label-caps">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-8 flex items-center justify-between relative z-10">
                <span className="font-handwriting text-2xl">Always learning something new...</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
