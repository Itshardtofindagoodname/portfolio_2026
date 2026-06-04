import { useState } from 'react'
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
