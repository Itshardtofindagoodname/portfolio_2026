import { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ReactLenis, useLenis } from 'lenis/react'
import { HeroAnimation } from './animations/hero'
import { PixelPreloader } from './animations/pixelpreloader'
import Navbar from './components/Navbar'
import About from './components/About'
import Projects from './components/Projects'
import Reading from './components/Reading'
import Contact from './components/Contact'
import ProjectDeepDive from './components/ProjectDeepDive'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

const LenisScrollBridge = () => {
  useLenis(() => {
    ScrollTrigger.update()
  }, [])

  return null
}

function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeProject, setActiveProject] = useState<string | null>(() => {
    const hash = window.location.hash
    if (hash.startsWith('#/project/')) {
      return hash.replace('#/project/', '')
    }
    return null
  })

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash.startsWith('#/project/')) {
        setActiveProject(hash.replace('#/project/', ''))
      } else {
        setActiveProject(null)
      }
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    if (!activeProject) {
      const hash = window.location.hash
      if (hash && hash !== '#home' && !hash.startsWith('#/project/')) {
        const id = hash.replace('#', '')
        const timer = setTimeout(() => {
          const el = document.getElementById(id)
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' })
          }
        }, 150)
        return () => clearTimeout(timer)
      }
    }
  }, [activeProject])

  return (
    <ReactLenis
      root
      options={{
        anchors: true,
        autoRaf: true,
        lerp: 0.085,
        smoothWheel: true,
        wheelMultiplier: 0.9,
      }}
    >
      <LenisScrollBridge />
      <div className="app-shell flex flex-col">
        {isLoaded && <Navbar />}

        {activeProject ? (
          <ProjectDeepDive
            projectKey={activeProject}
            onBack={() => {
              window.location.hash = '#projects'
            }}
          />
        ) : (
          <>
            <main className="home-page" id="home">
              <HeroAnimation />
            </main>

            {isLoaded && (
              <>
                <About />
                <Projects onSelectProject={(key) => {
                  window.location.hash = `#/project/${key}`
                }} />
                <Reading />
                <Contact />
              </>
            )}

            {!isLoaded && (
              <PixelPreloader
                onComplete={() => setIsLoaded(true)}
                tileSize={72}
              />
            )}
          </>
        )}
      </div>
    </ReactLenis>
  )
}

export default App
