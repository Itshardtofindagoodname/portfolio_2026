import { motion } from 'framer-motion'

const About = () => {
  return (
    <section id="about" className="relative bg-dot-grid-pattern py-20 md:py-32 overflow-hidden border-t-2 border-black">
      {/* Background Texture Elements */}
      <div className="absolute top-20 right-10 font-handwriting text-5xl opacity-5 -rotate-12 pointer-events-none select-none">
        CODE SHIP REPEAT
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 relative z-10">
        {/* Hero About Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-32"
        >
          {/* Polaroid Hero Area */}
          <div className="lg:col-span-6 relative order-2 lg:order-1 flex justify-center lg:justify-start">
            <div className="relative group transition-transform duration-300 hover:rotate-0 inline-block">
              {/* Tapes */}
              <div className="tape-effect tape-tl opacity-80"></div>
              <div className="tape-effect tape-tr opacity-80"></div>
              <div className="tape-effect tape-bl opacity-60"></div>
              
              <div className="polaroid-frame rough-cut relative z-10 group-hover:shadow-2xl transition-shadow duration-300">
                <img
                  alt="Debarjun Thakur Photo"
                  className="w-full max-w-[360px] md:max-w-[420px] aspect-[3/4] object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9QMiLqog5Hn1umNZ8t0xy64pWfRa9_Mn0NBTCk0USD_xonrbAqkLaZpBvhd3QmpRL9RVdPtzJfsig88FCDjKabmzGqfCc7EQbiBwIll8mOv48VHP5QxECuwl7N-j23GE5JBRn2mTcQ3UiRJC8hTSMhrpP2r3pOHptncL5JNC3rIPlIOxCkkfavkewsIzqSK6mG0qzXdAbQY8vQCxolhuPg3PIqra334P_En_qAjo14S2_Hcz4kdzS7ZfIBTOiMVo-qL25cVhVmmQ"
                />
                <div className="absolute bottom-4 left-0 right-0 text-center font-handwriting text-2xl text-primary opacity-60">
                  Me, Thinking about CSS...
                </div>
              </div>
            </div>

            {/* Hand-drawn annotation */}
            <div className="hidden lg:block absolute -right-16 bottom-0 z-20">
              <div className="font-handwriting text-primary text-3xl rotate-[-5deg] max-w-[240px] leading-tight flex flex-col items-start">
                <svg
                  className="w-20 h-20 -mb-4 -ml-4 rotate-[160deg] opacity-60"
                  fill="none"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10,90 Q40,80 50,50 T90,10"
                    fill="none"
                    stroke="black"
                    strokeLinecap="round"
                    strokeWidth="3"
                  ></path>
                  <path
                    d="M80,20 L90,10 L80,5"
                    fill="none"
                    stroke="black"
                    strokeLinecap="round"
                    strokeWidth="3"
                  ></path>
                </svg>
                <span className="bg-white/60 backdrop-blur-xs px-2 py-1 wiggly-border">
                  This guy codes until his coffee turns cold.
                </span>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-6 flex flex-col justify-center h-full pt-8 order-1 lg:order-2">
            <div className="space-y-10 relative">
              {/* Ink Splatter */}
              <svg className="ink-splatter -top-16 -left-16 w-48 h-48" viewBox="0 0 100 100">
                <path d="M30,50 Q20,30 50,20 T80,50 T50,80 T30,50" fill="black"></path>
                <circle cx="20" cy="20" fill="black" r="2"></circle>
                <circle cx="85" cy="85" fill="black" r="3"></circle>
                <circle cx="10" cy="70" fill="black" r="1.5"></circle>
              </svg>

              <div className="relative inline-block">
                <h1 className="font-headline-xl text-5xl md:text-6xl lg:text-7xl leading-none marker-highlight">
                  HELLOOO.
                </h1>
                <div className="absolute -top-12 right-0 md:-right-12 font-handwriting text-primary text-3xl rotate-12 bg-white/95 px-4 py-2 rough-border">
                  I'm Debarjun!
                </div>
              </div>

              <p className="font-handwriting text-2xl md:text-3xl text-primary max-w-lg leading-snug">
                I am a{' '}
                <span className="scribble-underline font-bold">Frontend Developer</span>{' '}
                and designer focused on building interfaces that feel as tactile and thoughtful as a
                well-worn sketchbook.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center rotate-[-12deg] group-hover:rotate-0 transition-transform bg-white shadow-xs">
                    <span className="material-symbols-outlined text-primary text-xl">location_on</span>
                  </div>
                  <span className="font-body-md text-secondary border-b border-black border-dashed pb-0.5">
                    Based in India, working globally.
                  </span>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center rotate-[15deg] group-hover:rotate-0 transition-transform bg-white shadow-xs">
                    <span className="material-symbols-outlined text-primary text-xl">schedule</span>
                  </div>
                  <span className="font-body-md text-secondary border-b border-black border-dashed pb-0.5">
                    Ships high-quality code at 2am sharp.
                  </span>
                </div>
              </div>

              <div className="pt-6">
                <a
                  className="relative inline-flex items-center gap-4 bg-primary text-on-primary px-8 py-4 font-label-caps text-xs tracking-widest rough-border hover:translate-x-1 hover:-translate-y-1 transition-all duration-200"
                  href="#contact"
                >
                  LET'S COLLABORATE
                  <span className="material-symbols-outlined text-lg">arrow_right_alt</span>
                  {/* Scribble behind button */}
                  <div className="absolute -bottom-2 -left-2 w-full h-full border-2 border-black -z-10 wiggly-border bg-white"></div>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tech & Tools Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="py-12 relative"
        >
          {/* Sketchy Divider */}
          <div className="sketch-divider mb-20"></div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
            <div className="relative">
              <h2 className="font-label-caps text-xs text-secondary tracking-[0.2em] mb-2 uppercase">
                SYSTEM ARCHITECTURE
              </h2>
              <h3 className="font-headline-lg text-4xl md:text-5xl marker-highlight">
                Tech Stack &amp; Tools
              </h3>
              {/* Hand drawn arrow */}
              <div className="absolute -right-24 top-0 hidden md:block">
                <svg
                  className="w-16 h-16 rotate-[20deg] opacity-30"
                  fill="none"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10,10 C40,20 60,80 90,90"
                    fill="none"
                    stroke="black"
                    strokeLinecap="round"
                    strokeWidth="3"
                  ></path>
                  <path
                    d="M75,90 L90,90 L85,75"
                    fill="none"
                    stroke="black"
                    strokeLinecap="round"
                    strokeWidth="3"
                  ></path>
                </svg>
                <span className="font-handwriting text-2xl absolute -top-10 -right-4 opacity-40">
                  the gear
                </span>
              </div>
            </div>
            <div className="font-handwriting text-2xl md:text-3xl text-primary opacity-40 rotate-[-4deg]">
              010101 // craft
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Frontend Block */}
            <div className="index-card p-10 rotate-[-1.2deg] relative bg-white">
              <div className="tape-effect tape-tr !w-16 !rotate-[15deg] !-right-6 !-top-4"></div>
              <div className="flex justify-between items-start mb-8">
                <h4 className="font-headline-md text-2xl border-b-2 border-black pb-1">
                  Frontend
                </h4>
                <span className="material-symbols-outlined text-primary text-3xl">data_object</span>
              </div>
              <ul className="font-handwriting text-2xl space-y-4">
                <li className="flex items-center gap-3 hover:translate-x-1 transition-transform">
                  <span className="text-xl text-primary/60">➔</span> React &amp; Next.js
                </li>
                <li className="flex items-center gap-3 hover:translate-x-1 transition-transform">
                  <span className="text-xl text-primary/60">➔</span> TypeScript
                </li>
                <li className="flex items-center gap-3 hover:translate-x-1 transition-transform">
                  <span className="text-xl text-primary/60">➔</span> Tailwind CSS
                </li>
                <li className="flex items-center gap-3 hover:translate-x-1 transition-transform">
                  <span className="text-xl text-primary/60">➔</span> Framer Motion
                </li>
              </ul>
              <div className="mt-10 pt-4 border-t-2 border-black border-dotted">
                <span className="font-label-caps text-[10px] text-secondary">
                  PRIMARY TOOLS FOR SHIPMENT
                </span>
              </div>
            </div>

            {/* Workflow Block */}
            <div className="index-card p-10 rotate-[0.8deg] relative bg-white">
              <div className="flex justify-between items-start mb-8">
                <h4 className="font-headline-md text-2xl border-b-2 border-black pb-1">
                  Workflow
                </h4>
                <span className="material-symbols-outlined text-primary text-3xl">architecture</span>
              </div>
              <ul className="font-handwriting text-2xl space-y-4">
                <li className="flex items-center gap-3 hover:translate-x-1 transition-transform">
                  <span className="text-xl text-primary/60">✓</span> Figma (UI/UX)
                </li>
                <li className="flex items-center gap-3 hover:translate-x-1 transition-transform">
                  <span className="text-xl text-primary/60">✓</span> VS Code / Git
                </li>
                <li className="flex items-center gap-3 hover:translate-x-1 transition-transform">
                  <span className="text-xl text-primary/60">✓</span> Docker / CI/CD
                </li>
                <li className="flex items-center gap-3 hover:translate-x-1 transition-transform">
                  <span className="text-xl text-primary/60">✓</span> Node.js Ecosystem
                </li>
              </ul>
              <div className="mt-10 pt-4 border-t-2 border-black border-dotted">
                <span className="font-label-caps text-[10px] text-secondary">THE ENGINE ROOM</span>
              </div>
            </div>

            {/* Learning / Image Box */}
            <div className="rough-border p-8 flex flex-col justify-between bg-white relative rotate-[-0.5deg] shadow-lg overflow-hidden min-h-[300px]">
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <img
                  alt="Working"
                  className="w-full h-full object-cover grayscale"
                  src="https://lh3.googleusercontent.com/aida/AP1WRLs6gWOPWGCoX6CznSox-Ndc1SUCoEOdS-VPpCk6dnKbC6cmxsE2TI_DkSNbZacFsa-w-dSfi7XmPvH4tVs1FrnBg-4uxRAtzsp3k515bA9k0RJj-obTSw_igeQtNkZLFfw4DbhOrYpSZ0QOCkzWLtPlGjx3290cz0E7IRfbLYZBUPCyIKA-GW4cJu88pVuj3V3dHyjHtmcIYr9oEWNKxb41ZduHMKXCiQhq5Qz65tvgTzCaUOT7_b6Vg2w"
                />
              </div>
              <div className="relative z-10">
                <h4 className="font-label-caps text-[12px] text-white mb-6 tracking-widest bg-black inline-block px-4 py-2 rotate-[-3deg] rough-cut">
                  CURRENTLY EXPLORING
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {/* Tech Icons as Stickers */}
                  <div className="index-card p-3 flex flex-col items-center justify-center rotate-[-8deg] bg-white hover:rotate-0 transition-all duration-200 hover:scale-110 shadow-xs cursor-default">
                    <img
                      alt="WebGL Icon"
                      className="w-8 h-8 mb-1 grayscale object-contain"
                      src="https://lh3.googleusercontent.com/aida/AP1WRLvAsQ6E9RTBmd-AmR75Vi0Fe-htZ2UsU668CBpKmijGdbjCodWmYyTVp7EXwjOzqFO2GbRtz3J8-1CsVVpKRWx4O44eL554A70Zv9zP-5N2bbWg1HA7bDdT0lhohtmdrcyUcEBjGABsspBqY1nMwzRFmY9t5u3WhsjDy-XPWmKpG39NIUlya2H9vuUTaU2hWkbzs3FWS58Eu51WNfYBzop2r3b-JlWD8myG86ZLT3tG5nUIron7ddM5yk4"
                    />
                    <span className="text-[9px] font-bold font-label-caps">WEBGL</span>
                  </div>
                  <div className="index-card p-3 flex flex-col items-center justify-center rotate-[10deg] bg-white hover:rotate-0 transition-all duration-200 hover:scale-110 shadow-xs cursor-default">
                    <span className="material-symbols-outlined text-2xl mb-1 text-primary">database</span>
                    <span className="text-[9px] font-bold font-label-caps">POSTGRES</span>
                  </div>
                  <div className="index-card p-3 flex flex-col items-center justify-center rotate-[4deg] bg-white hover:rotate-0 transition-all duration-200 hover:scale-110 shadow-xs cursor-default">
                    <span className="material-symbols-outlined text-2xl mb-1 text-primary">brush</span>
                    <span className="text-[9px] font-bold font-label-caps">SHADERS</span>
                  </div>
                  <div className="index-card p-3 flex flex-col items-center justify-center rotate-[-6deg] bg-white hover:rotate-0 transition-all duration-200 hover:scale-110 shadow-xs cursor-default">
                    <img
                      alt="Astro Icon"
                      className="w-8 h-8 mb-1 grayscale object-contain"
                      src="https://lh3.googleusercontent.com/aida/AP1WRLu6eOPQVHIaHDSdQtGNJ0hwFl-nVk1gPZCg5AKcHt6ojTATffpZelNCUHWNHL04vECwkAX21hpZdSWrVmGpDGO-8qLHqBzCAOVwe24hItqd_4-oAqo2wLd9yZREh6DPSFzQNGG20VXIxnrWZ1gIJNtFLSG_DtkJb3kG27gqCwyJK9vGnEvPrVuSEyX0mUDlMOSPdDNe0sE-dB7UrvBn7N70-iuh9YyO4l8dFqW6Ff7Fg0E7qIGVU20iclI"
                    />
                    <span className="text-[9px] font-bold font-label-caps">ASTRO</span>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex items-center justify-between relative z-10">
                <span className="font-handwriting text-2xl">Never finished...</span>
                <span className="material-symbols-outlined animate-bounce">arrow_downward</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
