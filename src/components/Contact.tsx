import { motion } from 'framer-motion'
import DoodleButton from './DoodleButton'
import VaraHoverText from './VaraHoverText'

const Contact = () => {
  return (
    <section
      id="contact"
      className="paper-cut-section relative bg-background pt-20 md:pt-32 overflow-hidden border-t-2 border-black flex flex-col items-center justify-between min-h-[90vh]"
    >
      {/* Decorative SVG Doodles */}
      <svg className="absolute top-10 left-10 w-16 h-16 pointer-events-none opacity-20" viewBox="0 0 100 100">
        <path
          className="doodle-stroke"
          d="M20,50 L80,50 M50,20 L50,80 M30,30 L70,70 M30,70 L70,30"
          fill="none"
          stroke="black"
          strokeLinecap="round"
          strokeWidth="2"
        ></path>
      </svg>

      <svg className="absolute top-1/4 right-1/4 w-12 h-12 pointer-events-none opacity-25" viewBox="0 0 50 50">
        <circle
          className="doodle-stroke"
          cx="25"
          cy="25"
          fill="none"
          r="20"
          stroke="black"
          strokeDasharray="4,4"
          strokeWidth="2"
        ></circle>
      </svg>
      <div className="absolute right-8 top-20 hidden font-handwriting text-3xl opacity-15 rotate-6 pointer-events-none select-none md:block">
        say hi, ship things
      </div>
      <svg className="absolute left-10 top-1/2 hidden h-20 w-36 opacity-15 pointer-events-none md:block" viewBox="0 0 130 70" fill="none">
        <path d="M8 36 C28 12 46 58 70 32 S102 24 122 44" stroke="black" strokeLinecap="round" strokeWidth="3" />
        <path d="M106 34 L122 44 L104 54" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
      </svg>

      <div className="max-w-4xl w-full px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10 flex-grow py-8">
        
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-8 next-gen-reveal"
        >
          <h1 className="font-headline-xl text-5xl md:text-6xl lowercase italic leading-none">
            <VaraHoverText text="let's talk." fontSize={52} />
          </h1>
          
          <p className="font-body-lg text-lg text-secondary leading-relaxed">
            I'm always open to interesting projects, collaborations, or just a good conversation.
          </p>

          <div className="flex flex-wrap gap-4">
            <DoodleButton href="/debarjun-thakur-resume.txt" download variant="paper">
              Download Resume
              <span className="material-symbols-outlined text-lg">download</span>
            </DoodleButton>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <svg className="w-12 h-12 mb-2 pointer-events-none opacity-30" viewBox="0 0 100 50">
              <path d="M10,10 Q50,40 90,10" fill="none" stroke="black" strokeLinecap="round" strokeWidth="2"></path>
              <path d="M80,10 L90,10 L85,20" fill="none" stroke="black" strokeWidth="2"></path>
            </svg>
            
            {[
              { label: 'EMAIL', href: 'mailto:hello@example.com' },
              { label: 'GITHUB', href: 'https://github.com' },
              { label: 'LINKEDIN', href: 'https://linkedin.com' },
              { label: 'TWITTER', href: 'https://twitter.com' },
            ].map((link) => (
              <a
                key={link.label}
                className="font-label-caps text-xs md:text-sm inline-flex items-center w-max border-b border-black pb-0.5 hover:italic hover:translate-x-1 transition-all duration-150"
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
              >
                {link.label}{' '}
                <span className="material-symbols-outlined align-middle ml-1 text-sm">
                  arrow_outward
                </span>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Illustration */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="relative flex justify-center border-2 border-black bg-white p-4 overflow-hidden group shadow-lg next-gen-reveal"
        >
          <img
            alt="Debarjun Waving Illustration"
            className="w-full max-w-sm object-cover group-hover:scale-102 transition-transform duration-500 ease-in-out"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAa0LScYfJCHU1blQjJA3sRzYqxg5yTAZSOeJOm17Yp9WpZa-DCnpyQNBQE67Vm0cQpCf6xa1phDEV0pGJsHqRAcuac4JDtdmtuF2z13dNKBANAWE0OfFWE5-j6-RzMq2aDSAHDAdV23n8Yr-EdOfK318vS4OAYVx8GQCDC1TVgiyVmPY03KvUkzpZN26l1oqXkCN69-XTbBa_6jiAssc6a1k-4l73NWYuhi1PT2PdeNuyAibkYOI0M9eu4r59En2wFe_XxU7R4Sig"
          />
          <div className="absolute inset-0 border-4 border-black border-dashed opacity-10 pointer-events-none"></div>
        </motion.div>
      </div>

      {/* Decorative stars */}
      <svg className="absolute bottom-32 left-4 w-12 h-12 pointer-events-none opacity-20" viewBox="0 0 100 100">
        <path
          className="doodle-stroke"
          d="M50 10 L60 40 L90 40 L65 60 L75 90 L50 70 L25 90 L35 60 L10 40 L40 40 Z"
          fill="none"
          stroke="black"
          strokeWidth="2"
        ></path>
      </svg>
      <svg className="absolute bottom-32 right-4 w-10 h-10 pointer-events-none opacity-20" viewBox="0 0 100 100">
        <path
          className="doodle-stroke"
          d="M50 10 L60 40 L90 40 L65 60 L75 90 L50 70 L25 90 L35 60 L10 40 L40 40 Z"
          fill="none"
          stroke="black"
          strokeWidth="2"
        ></path>
      </svg>

      {/* Unified Bottom Footer */}
      <footer className="bg-background w-full py-8 border-t border-black flex flex-col md:flex-row justify-between items-center px-6 md:px-12 gap-4 mt-auto">
        <div className="font-label-caps text-xs text-primary flex items-center gap-2">
          DEBARJUN THAKUR © 2026
          <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
            <line x1="9" x2="9.01" y1="9" y2="9"></line>
            <line x1="15" x2="15.01" y1="9" y2="9"></line>
          </svg>
        </div>
        <div className="font-label-caps text-xs text-primary flex gap-4">
          <a className="hover:italic transition-all" href="#about">ABOUT</a>
          <span className="opacity-40">·</span>
          <a className="hover:italic transition-all" href="#projects">PROJECTS</a>
          <span className="opacity-40">·</span>
          <a className="font-bold underline hover:italic transition-all" href="#contact">CONTACT</a>
        </div>
      </footer>
    </section>
  )
}

export default Contact
