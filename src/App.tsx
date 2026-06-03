import { useEffect, useState } from 'react'
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

  useEffect(() => {
    if (!isLoaded) return

    const revealContext = gsap.context(() => {
      gsap.utils
        .toArray<HTMLElement>('.next-gen-reveal')
        .forEach((element, index) => {
          gsap.fromTo(
            element,
            {
              autoAlpha: 0,
              y: 54,
              rotate: index % 2 === 0 ? -1.6 : 1.6,
              filter: 'blur(10px)',
            },
            {
              autoAlpha: 1,
              y: 0,
              rotate: 0,
              filter: 'blur(0px)',
              duration: 0.85,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: element,
                start: 'top 84%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse',
              },
            },
          )
        })
    })

    ScrollTrigger.refresh()

    return () => {
      revealContext.revert()
    }
  }, [isLoaded])

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

        <main className="home-page" id="home">
          <HeroAnimation />
        </main>

        {isLoaded && (
          <>
            <About />
            <Projects />
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
      </div>
    </ReactLenis>
  )
}

export default App
