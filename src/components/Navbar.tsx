import { useState, useEffect } from 'react'

const navItems = [
  { id: 'about', label: 'ABOUT' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'reading', label: 'READING' },
  { id: 'contact', label: 'CONTACT' },
]

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const closeOnDesktop = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false)
    }

    window.addEventListener('resize', closeOnDesktop)
    return () => window.removeEventListener('resize', closeOnDesktop)
  }, [])

  const renderLink = (item: (typeof navItems)[number], index: number) => {
    const isActive = activeSection === item.id
    const rotDegs = ['rotate-[-2deg]', 'rotate-[1deg]', 'rotate-[-1deg]', 'rotate-[2deg]']
    const rot = rotDegs[index % rotDegs.length]

    return (
      <a
        key={item.id}
        href={`#${item.id}`}
        onClick={() => setIsMenuOpen(false)}
        className={`nav-doodle-link text-xs md:text-sm font-label-caps tracking-[0.15em] px-2 py-1 transition-all duration-300 ${rot} ${
          isActive
            ? 'text-primary font-bold border-b-4 border-black'
            : 'text-secondary hover:text-primary'
        }`}
      >
        {item.label}
      </a>
    )
  }

  return (
    <nav className="sticky top-0 bg-background/90 backdrop-blur-md w-full border-b-2 border-black flex justify-between items-center px-4 md:px-12 py-3 z-50 transition-all duration-300">
      <a
        href="#home"
        onClick={() => setIsMenuOpen(false)}
        className="max-w-[72vw] truncate text-sm sm:text-base font-headline-md font-bold text-primary tracking-[0.1em] border-2 border-black px-3 py-1 wiggly-border hover:bg-black hover:text-white transition-colors duration-200"
      >
        DEBARJUN THAKUR
      </a>

      <button
        type="button"
        aria-label={isMenuOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={isMenuOpen}
        className="nav-menu-button md:hidden w-11 h-11 bg-white border-2 border-black shadow-[3px_3px_0_#000] flex items-center justify-center"
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        <span className="material-symbols-outlined text-2xl">
          {isMenuOpen ? 'close' : 'menu'}
        </span>
      </button>

      <div className="hidden md:flex gap-4 md:gap-8 items-center">
        {navItems.map(renderLink)}
      </div>

      <div
        className={`mobile-nav-panel md:hidden absolute left-3 right-3 top-[calc(100%+10px)] bg-white border-2 border-black shadow-[6px_6px_0_#000] overflow-hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-80 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="grid gap-3 p-5">
          {navItems.map(renderLink)}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
