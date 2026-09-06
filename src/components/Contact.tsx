import DoodleButton from './DoodleButton'
import VaraRevealText from './VaraRevealText'
import contactUsImage from '../assets/contact_us.webp'

const Contact = () => {
  return (
    <section
      id="contact"
      className="paper-cut-section relative bg-[#F5F3EE] pt-20 md:pt-32 overflow-hidden border-t-2 border-[#0D1015] flex flex-col items-center justify-between min-h-[90vh]"
    >
      <svg className="absolute top-10 left-10 w-16 h-16 pointer-events-none opacity-20" viewBox="0 0 100 100">
        <path
          d="M20,50 L80,50 M50,20 L50,80 M30,30 L70,70 M30,70 L70,30"
          fill="none"
          stroke="#0D1015"
          strokeLinecap="round"
          strokeWidth="2"
        ></path>
      </svg>

      <svg className="absolute top-1/4 right-1/4 w-12 h-12 pointer-events-none opacity-25" viewBox="0 0 50 50">
        <circle
          cx="25"
          cy="25"
          fill="none"
          r="20"
          stroke="#0D1015"
          strokeDasharray="4,4"
          strokeWidth="2"
        ></circle>
      </svg>
      <div className="absolute right-8 top-20 hidden font-handwriting text-3xl opacity-40 rotate-6 pointer-events-none select-none md:block">
        <VaraRevealText text="say hi, ship things" fontSize={30} color="#0D1015" />
      </div>

      <div className="max-w-4xl w-full px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10 flex-grow py-8">
        <div className="flex flex-col gap-8">
          <h1 className="font-headline-xl text-5xl md:text-6xl lowercase italic leading-none text-[#0D1015]">
            <VaraRevealText text="let's talk." fontSize={52} />
          </h1>
          
          <p className="font-body-lg text-lg text-[#5C5268] leading-relaxed">
            I'm always open to interesting projects, collaborations, or just a good conversation.
          </p>

          <div className="flex flex-wrap gap-4">
            <DoodleButton href="/Resume.pdf" download variant="paper">
              Download Resume
              <span className="material-symbols-outlined text-lg">download</span>
            </DoodleButton>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <svg className="w-12 h-12 mb-2 pointer-events-none opacity-30" viewBox="0 0 100 50">
              <path d="M10,10 Q50,40 90,10" fill="none" stroke="#0D1015" strokeLinecap="round" strokeWidth="2"></path>
              <path d="M80,10 L90,10 L85,20" fill="none" stroke="#0D1015" strokeWidth="2"></path>
            </svg>
            
            {[
              { label: 'EMAIL', href: 'mailto:debarjunthakur020@gmail.com' },
              { label: 'GITHUB', href: 'https://github.com/Itshardtofindagoodname' },
              { label: 'LINKEDIN', href: 'https://in.linkedin.com/in/debarjun-thakur' },
              { label: 'PEERLIST', href: 'https://peerlist.io/debarjunthakur' },
            ].map((link) => (
              <a
                key={link.label}
                className="font-label-caps text-xs md:text-sm inline-flex items-center w-max border-b border-[#0D1015]/70 pb-0.5 hover:italic hover:translate-x-1 transition-all duration-150 text-[#0D1015]"
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="relative flex justify-center border-2 border-[#0D1015] bg-[#F5F3EE] p-4 overflow-hidden group shadow-lg">
          <img
            alt="Debarjun Waving Illustration"
            loading="lazy"
            decoding="async"
            className="w-full max-w-sm object-cover group-hover:scale-102 transition-transform duration-500 ease-in-out"
            src={contactUsImage}
          />
          <div className="absolute inset-0 border-4 border-[#0D1015] border-dashed opacity-10 pointer-events-none"></div>
        </div>
      </div>

      <svg className="absolute bottom-32 left-4 w-12 h-12 pointer-events-none opacity-20" viewBox="0 0 100 100">
        <path
          d="M50 10 L60 40 L90 40 L65 60 L75 90 L50 70 L25 90 L35 60 L10 40 L40 40 Z"
          fill="none"
          stroke="#0D1015"
          strokeWidth="2"
        ></path>
      </svg>
      <svg className="absolute bottom-32 right-4 w-10 h-10 pointer-events-none opacity-20" viewBox="0 0 100 100">
        <path
          d="M50 10 L60 40 L90 40 L65 60 L75 90 L50 70 L25 90 L35 60 L10 40 L40 40 Z"
          fill="none"
          stroke="#0D1015"
          strokeWidth="2"
        ></path>
      </svg>

      <footer className="bg-[#F5F3EE] w-full py-8 border-t border-[#0D1015]/60 flex flex-col md:flex-row justify-between items-center px-6 md:px-12 gap-4 mt-auto">
        <div className="font-label-caps text-xs text-[#0D1015] flex items-center gap-2">
          DEBARJUN THAKUR © 2026
          <svg className="w-4 h-4 text-[#0D1015]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
            <line x1="9" x2="9.01" y1="9" y2="9"></line>
            <line x1="15" x2="15.01" y1="9" y2="9"></line>
          </svg>
        </div>
        <div className="font-label-caps text-xs text-[#0D1015] flex gap-4">
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
