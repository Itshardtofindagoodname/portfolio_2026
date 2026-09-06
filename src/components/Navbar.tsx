import { useState, useEffect } from 'react'

const navItems = [
  { id: 'about', label: 'ABOUT' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'reading', label: 'READING' },
  { id: 'contact', label: 'CONTACT' },
]

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
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const renderLink = (item: (typeof navItems)[number], index: number) => {
    const isActive = activeSection === item.id
    const rotDegs = ['rotate-[-2deg]', 'rotate-[1deg]', 'rotate-[-1deg]', 'rotate-[2deg]']
    const rot = rotDegs[index % rotDegs.length]

    return (
      <a
        key={item.id}
        href={`#${item.id}`}
        className={`nav-doodle-link text-xs md:text-sm font-label-caps tracking-[0.15em] px-2 py-1 transition-all duration-300 ${rot} ${
          isActive
            ? 'text-[#0D1015] font-bold border-b-4 border-[#4AC5CB]'
            : 'text-[#5C5268] hover:text-[#4AC5CB]'
        }`}
      >
        {item.label}
      </a>
    )
  }

  return (
    <nav className="navbar-shell sticky top-0 bg-[#F5F3EE]/90 backdrop-blur-md w-full border-b-2 border-[#0D1015] flex flex-col sm:flex-row justify-between items-center gap-3 px-4 md:px-12 py-3">
      <a
        href="#home"
        className="navbar-brand inline-block"
      >
        <img
          src="/dev-tag.png"
          alt="dev.tag"
          className="navbar-logo h-10 w-auto"
        />
      </a>

      <div className="navbar-links flex flex-wrap justify-center gap-x-4 gap-y-2 md:gap-x-8 items-center">
        {navItems.map(renderLink)}
      </div>
    </nav>
  )
}

export default Navbar
