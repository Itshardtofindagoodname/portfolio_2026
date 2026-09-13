import { useState, useEffect, lazy, Suspense } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ReactLenis, useLenis } from 'lenis/react'
import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react'
import { HeroAnimation } from './animations/hero'
import IntroLoader from './animations/IntroLoader'
import { PixelPreloader } from './animations/pixelpreloader'
import Navbar from './components/Navbar'
import Marquee from './components/Marquee'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

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
  return <div aria-hidden="true" style={{ width: '100%', minHeight: '200px' }} />
}

const ScrollProgress = () => {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 })

  if (reduce) return null

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[100] h-[3px] origin-left bg-[#4AC5CB]"
      style={{ scaleX }}
    />
  )
}

function App() {
  const [introDone, setIntroDone] = useState(false)
  const [revealDone, setRevealDone] = useState(false)
  const [activeProject, setActiveProject] = useState<string | null>(() => {
    const hash = window.location.hash
    if (hash.startsWith('#/project/')) {
      return hash.replace('#/project/', '')
    }
    return null
  })

  useEffect(() => {
    const hidden = !introDone || !revealDone
    document.documentElement.style.overflow = hidden ? 'hidden' : ''
    if (hidden) window.scrollTo(0, 0)
  }, [introDone, revealDone])

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
    if (!introDone || !revealDone) return
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
  }, [activeProject, introDone, revealDone])

  return (
    <>
      <ScrollProgress />
      {!introDone && <IntroLoader onComplete={() => setIntroDone(true)} />}
      {introDone && !revealDone && (
        <PixelPreloader onComplete={() => setRevealDone(true)} tileSize={72} />
      )}
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
                <HeroAnimation revealed={introDone && revealDone} />
              </main>
              <div className="torn-hero-edge" aria-hidden="true" />

              <Marquee
                items={[
                  'FRONTEND SYSTEMS',
                  'MOTION',
                  'TACTILE INTERFACES',
                  'REACT',
                  'TYPESCRIPT',
                  'GSAP',
                  'LENIS',
                  'MATTER.JS',
                  'VITE',
                  'TAILWIND CSS',
                ]}
              />

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
        </div>
      </ReactLenis>
    </>
  )
}

export default App
