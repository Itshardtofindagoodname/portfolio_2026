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
          const direction = index % 2 === 0 ? -1 : 1
          const timeline = gsap.timeline({
            paused: true,
            defaults: { ease: 'power3.out' },
            onComplete: () => {
              gsap.set(element, { clearProps: 'transform,filter,clipPath' })
            },
          })

          gsap.set(element, {
            autoAlpha: 0,
            y: 78,
            x: direction * 18,
            scale: 0.92,
            rotate: direction * 5,
            skewX: direction * 3,
            filter: 'blur(12px) contrast(1.35)',
            clipPath: 'polygon(0 15%, 100% 4%, 96% 100%, 4% 92%)',
            transformOrigin: `${direction > 0 ? 18 : 82}% 72%`,
          })

          timeline
            .to(element, {
              autoAlpha: 1,
              y: -10,
              x: direction * -4,
              scale: 1.035,
              rotate: direction * -2.6,
              skewX: direction * -1.2,
              filter: 'blur(0px) contrast(1)',
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
              duration: 0.55,
              ease: 'back.out(2.4)',
            })
            .to(element, {
              y: 0,
              x: 0,
              scale: 1,
              rotate: direction * 0.7,
              skewX: 0,
              duration: 0.24,
              ease: 'elastic.out(1, 0.45)',
            })
            .to(element, {
              rotate: 0,
              duration: 0.16,
              ease: 'sine.out',
            })

          ScrollTrigger.create({
            trigger: element,
            start: 'top 86%',
            once: true,
            onEnter: () => timeline.play(0),
          })
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
