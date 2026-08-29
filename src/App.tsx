import { useState, useEffect, lazy, Suspense } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ReactLenis, useLenis } from 'lenis/react'
import { HeroAnimation } from './animations/hero'
import { PixelPreloader } from './animations/pixelpreloader'
import Navbar from './components/Navbar'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

// Each below-the-fold section is an independent lazy chunk. The initial paint
// is just the navbar + hero (no React/framer/gsap/lenis/vara cost for the
// sections until they are actually needed).
const About = lazy(() => import('./components/About'))
const Projects = lazy(() => import('./components/Projects'))
const Reading = lazy(() => import('./components/Reading'))
const Contact = lazy(() => import('./components/Contact'))
const ProjectDeepDive = lazy(() => import('./components/ProjectDeepDive'))

const LenisScrollBridge = () => {
  useLenis(() => {
    ScrollTrigger.update()
  }, [])

  return null
}

const SectionFallback = () => {
  return <div aria-hidden="true" style={{ width: '100%' }} />
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
        <Navbar />

        {activeProject ? (
          <Suspense fallback={<SectionFallback />}>
            <ProjectDeepDive
              projectKey={activeProject}
              onBack={() => {
                window.location.hash = '#projects'
              }}
            />
          </Suspense>
        ) : (
          <>
            <main className="home-page" id="home">
              <HeroAnimation />
            </main>

            {isLoaded && (
              <>
                <Suspense fallback={<SectionFallback />}>
                  <About />
                </Suspense>
                <Suspense fallback={<SectionFallback />}>
                  <Projects
                    onSelectProject={(key) => {
                      window.location.hash = `#/project/${key}`
                    }}
                  />
                </Suspense>
                <Suspense fallback={<SectionFallback />}>
                  <Reading />
                </Suspense>
                <Suspense fallback={<SectionFallback />}>
                  <Contact />
                </Suspense>
              </>
            )}

            {!isLoaded && (
              <PixelPreloader onComplete={() => setIsLoaded(true)} />
            )}
          </>
        )}
      </div>
    </ReactLenis>
  )
}

export default App
