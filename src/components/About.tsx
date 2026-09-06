import DoodleButton from './DoodleButton'
import VaraRevealText from './VaraRevealText'
import AppIcon from './AppIcon'
import MotionReveal from './MotionReveal'
import AnimatedText from './AnimatedText'
import ScrambleText from './ScrambleText'
import TiltCard from './TiltCard'
import { useEffect, useRef } from 'react'
import { animate } from 'animejs'
import { useScrollParallax } from '../hooks/useScrollParallax'

const About = () => {
  const sectionRef = useRef<HTMLElement>(null)
  useScrollParallax(sectionRef)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const instance = animate(
      section.querySelectorAll('.float-doodle'),
      {
        y: [
          { value: 0, duration: 0 },
          { value: -10, duration: 2000, ease: 'inOutQuad' },
          { value: 0, duration: 2000, ease: 'inOutQuad' },
        ],
        rotate: [
          { value: '0deg', duration: 0 },
          { value: '2deg', duration: 4000, ease: 'inOutSine' },
          { value: '0deg', duration: 4000, ease: 'inOutSine' },
        ],
        loop: true,
        delay: (_el?: unknown, i?: number) => (i ?? 0) * 400,
      },
    )

    return () => {
      instance.pause()
    }
  }, [])
  return (
    <section ref={sectionRef} id="about" className="paper-cut-section no-top-cut relative bg-[#F5F3EE] py-20 md:py-32 overflow-hidden">
      <div className="float-doodle absolute top-20 right-10 font-handwriting text-5xl opacity-8 -rotate-12 pointer-events-none select-none text-[#0D1015]/20">
        CODE SHIP REPEAT
      </div>
      <div className="float-doodle absolute left-6 top-1/3 hidden font-handwriting text-3xl opacity-15 -rotate-6 pointer-events-none select-none md:block text-[#0D1015]/20">
        messy notes, clean code
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-32">
          <MotionReveal className="lg:col-span-6 relative order-2 lg:order-1 flex justify-center lg:justify-start" x={-32} y={0}>
            <TiltCard className="relative inline-block" intensity={7}>
              <div className="relative group transition-transform duration-300 hover:rotate-0 inline-block">
                <div className="tape-effect tape-tl opacity-80" />
                <div className="tape-effect tape-tr opacity-80" />
                <div className="tape-effect tape-bl opacity-60" />

                <div className="polaroid-frame rough-cut relative z-10 group-hover:shadow-2xl transition-shadow duration-300">
                  <img
                    alt="Debarjun Thakur"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full max-w-[360px] md:max-w-[420px] aspect-[3/4] object-cover grayscale hover:grayscale-0 transition-[filter] duration-700"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9QMiLqog5Hn1umNZ8t0xy64pWfRa9_Mn0NBTCk0USD_xonrbAqkLaZpBvhd3QmpRL9RVdPtzJfsig88FCDjKabmzGqfCc7EQbiBwIll8mOv48VHP5QxECuwl7N-j23GE5JBRn2mTcQ3UiRJC8hTSMhrpP2r3pOHptncL5JNC3rIPlIOxCkkfavkewsIzqSK6mG0qzXdAbQY8vQCxolhuPg3PIqra334P_En_qAjo14S2_Hcz4kdzS7ZfIBTOiMVo-qL25cVhVmmQ"
                  />
<div className="absolute bottom-4 left-0 right-0 text-center font-handwriting text-2xl text-[#0D1015] opacity-60">
                    <AnimatedText text="Me, thinking about CSS..." stagger={0.05} />
                  </div>
                </div>
              </div>
            </TiltCard>

            <div data-parallax="14" className="hidden lg:block absolute -right-10 bottom-0 z-20">
              <div className="font-handwriting text-[#0D1015] text-2xl rotate-[-5deg] max-w-[240px] leading-tight flex flex-col items-start">
                <span className="bg-[#BBDEE1]/20 backdrop-blur-xs px-2 py-1 wiggly-border">
                  Coffee &gt; Code. That's the way <br/> to live.
                </span>
              </div>
            </div>
          </MotionReveal>

          <div className="lg:col-span-6 flex flex-col justify-center h-full pt-8 order-1 lg:order-2">
            <div className="space-y-10 relative">
              <svg className="ink-splatter -top-16 -left-16 w-48 h-48" data-parallax="12" viewBox="0 0 100 100">
                <path d="M30,50 Q20,30 50,20 T80,50 T50,80 T30,50" fill="#0D1015" />
                <circle cx="20" cy="20" fill="#0D1015" r="2" />
                <circle cx="85" cy="85" fill="#0D1015" r="3" />
                <circle cx="10" cy="70" fill="#0D1015" r="1.5" />
              </svg>

              <MotionReveal y={0} x={24} delay={0.1}>
                <div className="relative inline-block">
                  <h1 className="font-headline-xl text-5xl md:text-6xl lg:text-7xl leading-none marker-highlight text-[#0D1015]">
                    <VaraRevealText text="HELLO" fontSize={54} />
                  </h1>
                  <div className="absolute -top-12 right-0 md:-right-12 font-handwriting text-[#0D1015] text-3xl rotate-12 bg-[#F5F3EE] px-4 py-2 rough-border">
                    I'm Debarjun!
                  </div>
                </div>
              </MotionReveal>

              <MotionReveal delay={0.2}>
                <p className="font-handwriting text-2xl md:text-3xl text-[#0D1015] max-w-xl leading-snug">
                  I am a <span className="scribble-underline font-bold">Frontend Developer</span>,
                  building fast web surfaces, product interfaces, CRM flows, SEO-friendly systems,
                  and tactile UI work that feels as thoughtful as a well-worn sketchbook.
                </p>
              </MotionReveal>

              <MotionReveal delay={0.3} y={0}>
                <div className="space-y-6">
                  {[
                    ['location_on', 'Based in India, working globally.'],
                    ['schedule', 'Primary frontend engineer for Raen AI web properties.'],
                    ['trending_up', 'Shipped SEO, performance, auth, CRM, and real-time interface work.'],
                  ].map(([icon, text], index) => (
                    <div key={text} className="flex items-center gap-4 group">
                      <div className={`w-10 h-10 rounded-full border-2 border-[#0D1015] flex items-center justify-center transition-transform bg-[#BBDEE1]/10 shadow-xs ${index % 2 === 0 ? 'rotate-[-12deg]' : 'rotate-[15deg]'} group-hover:rotate-0`}>
                        <AppIcon name={icon} size={22} className="text-[#0D1015]" />
                      </div>
                      <span className="font-body-md text-[#5C5268] border-b border-[#0D1015]/60 border-dashed pb-0.5">
                        {text}
                      </span>
                    </div>
                  ))}
                </div>
              </MotionReveal>

              <MotionReveal delay={0.4} y={0}>
                <div className="pt-6">
                  <DoodleButton href="#contact" variant="ink" className="font-handwriting">
                    Get in Touch
                    <AppIcon name="arrow_right_alt" size={20} className="text-current" />
                  </DoodleButton>
                </div>
              </MotionReveal>
            </div>
          </div>
        </div>

        <MotionReveal
          className="py-24 relative bg-[#0D1015] -mx-6 md:-mx-12 px-6 md:px-12 overflow-hidden mt-16"
          y={10}
        >
          <div style={{ transform: 'none' }} className="h-1 bg-white opacity-20 w-full mb-20" />

          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4 relative z-10">
            <div className="relative">
              <h2 className="font-label-caps text-label-caps text-white/60 tracking-[0.2em] mb-2 uppercase">
                <ScrambleText text="SYSTEM ARCHITECTURE" />
              </h2>
              <h3 className="font-headline-lg text-4xl md:text-5xl text-white">
                <VaraRevealText text="The Engineering Journal" fontSize={42} color="#F5F3EE" />
              </h3>
              <div data-parallax="10" className="absolute -right-24 top-0 hidden md:block">
                <svg className="w-16 h-16 rotate-[20deg] opacity-60 stroke-white" fill="none" viewBox="0 0 100 100">
                  <path d="M10,10 C40,20 60,80 90,90" fill="none" strokeWidth="3" strokeLinecap="round" />
                  <path d="M75,90 L90,90 L85,75" fill="none" strokeWidth="3" strokeLinecap="round" />
                </svg>
                <span className="font-handwriting text-2xl absolute -top-10 -right-4 opacity-70 text-white">
                  blueprint
                </span>
              </div>
            </div>
            <div data-parallax="16" className="font-handwriting text-3xl text-white/40 rotate-[-4deg]">
              010101 // tools of trade
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-12 relative z-10">
            <div className="md:col-span-5 sketch-paper rotate-[-1deg] group">
              <MotionReveal className="h-full" x={-20} y={0} delay={0.05}>
              <div className="hatching-shadow" />
              <svg className="sketch-border" preserveAspectRatio="none" viewBox="0 0 400 300">
                <path d="M10,10 Q200,5 390,15 T385,285 T15,290 T10,10" fill="none" stroke="white" strokeWidth="2" />
              </svg>
              <h4 className="font-headline-md text-3xl mb-6 text-white border-b border-white/30 pb-2">Languages</h4>
              <div className="flex flex-wrap gap-2">
                {['Python', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Dart'].map((lang) => (
                  <span
                    key={lang}
                    className={`skill-tag border-white/30 text-white cursor-default `}
                  >
                    {lang}
                  </span>
                ))}
              </div>
              <div className="mt-8">
                <h5 className="font-label-caps text-white/50 text-[10px] mb-4">BACKEND &amp; DATABASES</h5>
                <div className="flex flex-wrap gap-2">
                  {['FastAPI', 'Node.js', 'REST APIs', 'PostgreSQL', 'MongoDB'].map((db) => (
                    <span
                      key={db}
                      className={`skill-tag border-white/30 text-white cursor-default `}
                    >
                      {db}
                    </span>
                  ))}
                </div>
              </div>
              </MotionReveal>
            </div>

            <div className="md:col-span-7 sketch-paper rotate-[0.8deg] md:mt-12 group">
              <MotionReveal className="h-full" y={0} x={20} delay={0.12}>
              <div className="hatching-shadow" />
              <svg className="sketch-border" preserveAspectRatio="none" viewBox="0 0 600 400">
                <path d="M15,10 Q300,15 585,5 T590,385 T20,395 T15,10" fill="none" stroke="white" strokeWidth="2" />
              </svg>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-headline-md text-3xl mb-6 text-white border-b border-white/30 pb-2">Frontend</h4>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Next.js', 'Vite', 'Tailwind CSS', 'PostCSS'].map((item) => (
                      <span
                        key={item}
                        className={`skill-tag border-white/30 text-white cursor-default `}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-headline-md text-3xl mb-6 text-white border-b border-white/30 pb-2">Mobile</h4>
                  <div className="flex flex-wrap gap-2">
                    {['React Native', 'Flutter', 'Android Dev Kit'].map((item) => (
<span
                    key={item}
                    className={`skill-tag border-white/30 text-white cursor-default `}
                  >
                    {item}
                  </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-12 pt-6 border-t border-white/10">
                <h5 className="font-label-caps text-white/50 text-[10px] mb-4">PERFORMANCE &amp; SEO</h5>
                <div className="flex flex-wrap gap-2">
                  {['Technical SEO', 'Core Web Vitals', 'Semantic HTML', 'Structured Metadata'].map((item) => (
                    <span
                      key={item}
                      className={`skill-tag border-white/30 text-white cursor-default `}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              </MotionReveal>
            </div>

            <div className="md:col-span-12 sketch-paper rotate-[-0.3deg] group">
              <MotionReveal className="h-full" delay={0.18}>
              <div className="hatching-shadow" />
              <svg className="sketch-border" preserveAspectRatio="none" viewBox="0 0 1000 350">
                <path d="M10,20 Q500,5 990,15 T985,335 T15,340 T10,20" fill="none" stroke="white" strokeWidth="2.5" />
              </svg>
              <div className="flex flex-col md:flex-row gap-12">
                <div className="md:w-1/3">
                  <h4 className="font-headline-md text-4xl mb-4 text-white">AI &amp; Machine Learning</h4>
                  <p className="font-handwriting text-2xl text-white/60">Training, fine-tuning, and architecting LLM-driven applications.</p>
                  <div className="mt-8 flex gap-4">
                    <div className="w-12 h-12 rounded border border-white/30 flex items-center justify-center rotate-3 bg-transparent">
                      <AppIcon name="neurology" size={24} className="text-white" />
                    </div>
                    <div className="w-12 h-12 rounded border border-white/30 flex items-center justify-center -rotate-6 bg-transparent">
                      <AppIcon name="psychology" size={24} className="text-white" />
                    </div>
                  </div>
                </div>
                <div className="md:w-2/3 flex flex-wrap gap-3 items-center">
                  {[
                    'LangChain',
                    'Hugging Face',
                    'Groq API',
                    'LLaMA 3',
                    'Mixtral 8x7B',
                    'Salesforce BLIP',
                    'Unsloth',
                    'LoRA / PEFT fine-tuning',
                    'TRL',
                    'Alpaca Pipelines',
                    'RAG',
].map((item) => (
                    <span
                      key={item}
                      className={`skill-tag text-white cursor-default  ${
                        item === 'LangChain' || item === 'LoRA / PEFT fine-tuning'
                          ? '!border-white/50 bg-white/5'
                          : 'border-white/30'
                      }`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              </MotionReveal>
            </div>

            <div className="md:col-span-6 sketch-paper rotate-[1.5deg] group">
              <MotionReveal className="h-full" x={-20} y={0} delay={0.25}>
              <div className="hatching-shadow" />
              <svg className="sketch-border" preserveAspectRatio="none" viewBox="0 0 500 320">
                <path d="M10,15 Q250,25 490,5 T485,305 T15,310 T10,15" fill="none" stroke="white" strokeWidth="2" />
              </svg>
              <h4 className="font-headline-md text-3xl mb-6 text-white border-b border-white/30 pb-2">Infrastructure</h4>
              <div className="flex flex-wrap gap-2">
                {['Vercel', 'Netlify', 'AWS', 'Cloudflare', 'Docker', 'CI/CD'].map((item) => (
                  <span
                    key={item}
                    className={`skill-tag border-white/30 text-white cursor-default `}
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-8">
                <h5 className="font-label-caps text-white/50 text-[10px] mb-4">MISCELLANEOUS</h5>
                <div className="flex flex-wrap gap-2">
                  {['CRM systems', 'Cross-platform architecture', '.exe packaging'].map((item) => (
                    <span
                      key={item}
                      className={`skill-tag border-white/30 text-white cursor-default `}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              </MotionReveal>
            </div>

            <div className="md:col-span-6 sketch-paper rotate-[-2deg] md:-mt-8 group">
              <MotionReveal className="h-full" x={20} y={0} delay={0.32}>
              <div className="hatching-shadow" />
              <svg className="sketch-border" preserveAspectRatio="none" viewBox="0 0 500 320">
                <path d="M5,10 Q250,5 495,15 T490,310 T10,305 T5,10" fill="none" stroke="white" strokeWidth="2" />
              </svg>
              <h4 className="font-headline-md text-3xl mb-6 text-white border-b border-white/30 pb-2">Tools &amp; Workflow</h4>
              <ul className="font-handwriting text-2xl space-y-3">
                {[
                  'Git / GitHub',
                  'Figma (UI/UX Design)',
                  'ESLint & Prettier',
                  'Vite Ecosystem',
                  'VS Code Wizardry',
                ].map((item, idx) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-white"
                    style={{ transform: `rotate(${(idx % 2 === 0 ? 0.4 : -0.4)}deg)` }}
                  >
                    <span className="text-white/40">→</span> {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex justify-end">
                <span className="font-handwriting text-white/30 text-xl italic">
                  <VaraRevealText text="The Engine Room // 2026" fontSize={20} color="rgba(255, 255, 255, 0.3)" />
                </span>
              </div>
              </MotionReveal>
            </div>
          </div>

          <div className="absolute top-1/2 left-0 w-full h-1/2 opacity-5 pointer-events-none -z-0">
            <svg className="w-full h-full" viewBox="0 0 1000 500">
              <path d="M0,250 C100,200 200,300 300,250 C400,200 500,300 600,250 C700,200 800,300 900,250 L1000,250" fill="none" stroke="white" strokeWidth="1" />
              <path d="M0,350 C150,300 250,400 400,350 C550,300 650,400 800,350 L1000,350" fill="none" stroke="white" strokeWidth="1" />
            </svg>
          </div>
        </MotionReveal>
      </div>
    </section>
  )
}

export default About
