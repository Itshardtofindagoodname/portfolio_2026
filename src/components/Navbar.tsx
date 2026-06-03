import { useState, useEffect } from 'react'

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'reading', 'contact']
      const scrollPos = window.scrollY + 200

      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className="sticky top-0 bg-background/90 backdrop-blur-md w-full border-b-2 border-black flex justify-between items-center px-4 md:px-12 py-3 z-50 transition-all duration-300">
      <a
        href="#home"
        className="text-base font-headline-md font-bold text-primary tracking-[0.1em] border-2 border-black px-3 py-1 wiggly-border hover:bg-black hover:text-white transition-colors duration-200"
      >
        DEBARJUN THAKUR
      </a>
      <div className="flex gap-4 md:gap-8 items-center">
        {[
          { id: 'about', label: 'ABOUT' },
          { id: 'projects', label: 'PROJECTS' },
          { id: 'reading', label: 'READING' },
          { id: 'contact', label: 'CONTACT' },
        ].map((item, index) => {
          const isActive = activeSection === item.id
          // Rotate navbar item slightly to match the sketchbook layout vibe
          const rotDegs = ['rotate-[-2deg]', 'rotate-[1deg]', 'rotate-[-1deg]', 'rotate-[2deg]']
          const rot = rotDegs[index % rotDegs.length]
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`text-xs md:text-sm font-label-caps tracking-[0.15em] px-2 py-1 transition-all duration-150 ${rot} ${
                isActive
                  ? 'text-primary font-bold border-b-4 border-black'
                  : 'text-secondary hover:text-primary'
              }`}
            >
              {item.label}
            </a>
          )
        })}
      </div>
    </nav>
  )
}

export default Navbar
