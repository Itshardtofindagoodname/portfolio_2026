import { useState } from 'react'
import { HeroAnimation } from './animations/hero'
import { PixelPreloader } from './animations/pixelpreloader'
import Navbar from './components/Navbar'
import About from './components/About'
import Projects from './components/Projects'
import Reading from './components/Reading'
import Contact from './components/Contact'
import './App.css'

function App() {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
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
  )
}

export default App
