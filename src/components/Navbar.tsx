import { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'motion/react'

const navItems = [
  { id: 'about', label: 'ABOUT' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'reading', label: 'READING & MUSINGS' },
  { id: 'contact', label: 'CONTACT' },
]

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home')
  const reduce = useReducedMotion()

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

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[90] max-w-[95vw] pointer-events-auto">
      <motion.nav
        className="macos-dock-nav relative rounded-full border-2 border-[#0D1015] bg-[#F5F3EE]/85 backdrop-blur-xl shadow-[0_12px_30px_rgba(13,16,21,0.18)] px-5 py-2.5 flex items-center gap-3 md:gap-6"
        initial={reduce ? false : { opacity: 0, y: -30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Dock Brand Logo */}
        <motion.a
          href="#home"
          className="dock-item flex items-center justify-center p-1 rounded-full hover:scale-110 transition-transform duration-200"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src="/dev-tag.png"
            alt="dev.tag"
            className="h-8 w-auto object-contain"
          />
        </motion.a>

        <div className="h-5 w-[1.5px] bg-[#0D1015]/20 rounded-full" aria-hidden="true" />

        {/* Dock Navigation Items */}
        <div className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.id

            return (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                className={`relative px-3 py-1.5 rounded-full font-label-caps text-[11px] sm:text-xs tracking-[0.14em] uppercase transition-colors duration-200 ${
                  isActive ? 'text-[#0D1015] font-bold' : 'text-[#5C5268] hover:text-[#0D1015]'
                }`}
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="dockActiveUnderline"
                    className="absolute left-0 right-0 -bottom-1 h-3.5 w-full pointer-events-none overflow-visible z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 26 }}
                  >
                    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 200 20" fill="none">
                      <path
                        d="M5,12 C40,8 80,15 120,10 C160,5 195,12 195,12 M10,16 C50,14 100,18 150,15 C180,13 192,16 192,16"
                        stroke="#4AC5CB"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </motion.div>
                )}
                {item.label}
              </motion.a>
            )
          })}
        </div>
      </motion.nav>
    </div>
  )
}

export default Navbar
