import { useState } from 'react'
import { HeroAnimation } from './animations/hero'
import { PixelPreloader } from './animations/pixelpreloader'
import './App.css'

function App() {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className="app-shell">
      <main className="home-page">
        <HeroAnimation />
      </main>

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
