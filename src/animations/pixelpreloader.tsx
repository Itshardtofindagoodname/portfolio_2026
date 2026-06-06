import { motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'

export interface PixelPreloaderProps {
  onComplete?: () => void
  tileSize?: number
}

type PreloaderPhase = 'writing' | 'fadingText' | 'revealing'

type TileSpec = {
  delay: number
  x: number
  y: number
  rotate: number
}

const OVERLAY_COLOR = '#ffffff'
const GRID_STROKE = '#e0e0e0'

const styleTagContent = `
  .preloader-highlight-container {
    position: relative;
    display: inline-block;
  }
  .preloader-scribble-svg {
    position: absolute;
    left: -5%;
    bottom: -6px;
    width: 110%;
    height: 18px;
    pointer-events: none;
    z-index: -1;
  }
  .preloader-scribble-path {
    fill: none;
    stroke: #000000;
    stroke-width: 2.5;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 600;
    stroke-dashoffset: 600;
    animation: preloader-draw 1.0s ease-in-out forwards;
  }
  @keyframes preloader-draw {
    to {
      stroke-dashoffset: 0;
    }
  }
  .preloader-animate-pulse {
    animation: preloader-ink-pulse 2.5s ease-in-out infinite;
    transform-origin: center;
  }
  @keyframes preloader-ink-pulse {
    0%, 100% { transform: scaleX(1) scaleY(1); opacity: 0.95; }
    50% { transform: scaleX(1.01) scaleY(0.98); opacity: 0.85; }
  }
`

function createTileSpecs(totalTiles: number) {
  const indices = Array.from({ length: totalTiles }, (_, index) => index)

  for (let index = indices.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    ;[indices[index], indices[randomIndex]] = [
      indices[randomIndex],
      indices[index],
    ]
  }

  const specs = new Array<TileSpec>(totalTiles)

  indices.forEach((tileIndex, order) => {
    specs[tileIndex] = {
      // Sped up grid animation delays
      delay: (order / totalTiles) * 0.42,
      x: (Math.random() - 0.5) * 28,
      y: (Math.random() - 0.5) * 28,
      rotate: (Math.random() - 0.5) * 8,
    }
  })

  return specs
}

function StaticGrid({ columns, rows }: { columns: number; rows: number }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {Array.from({ length: columns * rows }, (_, index) => (
        <div
          key={index}
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: OVERLAY_COLOR,
            border: `1px solid ${GRID_STROKE}`,
          }}
        />
      ))}
    </div>
  )
}

function RevealTile({
  spec,
  onDone,
}: {
  spec: TileSpec
  onDone: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: 0 }}
      animate={{
        opacity: 0,
        scale: 0.88,
        x: spec.x,
        y: spec.y,
        rotate: spec.rotate,
      }}
      transition={{
        // Sped up tile fade-out duration
        duration: 0.42,
        ease: [0.22, 1, 0.36, 1],
        delay: spec.delay,
      }}
      onAnimationComplete={onDone}
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: OVERLAY_COLOR,
        border: `1px solid ${GRID_STROKE}`,
        willChange: 'transform, opacity',
      }}
    />
  )
}

export function PixelPreloader({
  onComplete,
  tileSize = 84,
}: PixelPreloaderProps) {
  const tileCompletionRef = useRef(0)
  const [phase, setPhase] = useState<PreloaderPhase>('writing')
  const [mounted, setMounted] = useState(true)

  const { columns, rows, totalTiles } = useMemo(() => {
    if (typeof window === 'undefined') {
      return { columns: 14, rows: 10, totalTiles: 140 }
    }

    const computedColumns = Math.min(Math.ceil(window.innerWidth / tileSize), 24)
    const computedRows = Math.min(Math.ceil(window.innerHeight / tileSize), 16)

    return {
      columns: computedColumns,
      rows: computedRows,
      totalTiles: computedColumns * computedRows,
    }
  }, [tileSize])

  const tileSpecs = useMemo(() => createTileSpecs(totalTiles), [totalTiles])

  useEffect(() => {
    // Automatically transition from text writing to fading after 1.35 seconds
    const timer = setTimeout(() => {
      setPhase('fadingText')
    }, 1350)

    return () => clearTimeout(timer)
  }, [])

  const handleTileDone = () => {
    tileCompletionRef.current += 1

    if (tileCompletionRef.current >= totalTiles) {
      setMounted(false)
      onComplete?.()
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        overflow: 'hidden',
        pointerEvents: 'auto',
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: styleTagContent }} />

      {phase === 'revealing' ? (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
          }}
        >
          {tileSpecs.map((spec, index) => (
            <RevealTile key={index} spec={spec} onDone={handleTileDone} />
          ))}
        </div>
      ) : (
        <StaticGrid columns={columns} rows={rows} />
      )}

      {phase !== 'revealing' ? (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.98, filter: 'blur(8px)' }}
          animate={
            phase === 'fadingText'
              ? {
                  opacity: 0,
                  y: -24,
                  scale: 0.95,
                  filter: 'blur(12px)',
                }
              : {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  scale: 1,
                  filter: 'blur(0px)',
                }
          }
          transition={{
            duration: phase === 'fadingText' ? 0.35 : 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
          onAnimationComplete={() => {
            if (phase === 'fadingText') {
              setPhase('revealing')
            }
          }}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
          }}
        >
          <div
            style={{
              width: 'min(90vw, 900px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <h1 
              style={{
                fontFamily: 'var(--font-headline-xl)',
                color: '#1b1b1b',
                fontWeight: 'normal',
                textAlign: 'center',
              }}
              className="text-4xl md:text-6xl flex flex-col items-center gap-3"
            >
              <span className="flex items-center flex-wrap justify-center gap-x-4">
                <span className="preloader-highlight-container">
                  Frontend
                  <svg className="preloader-scribble-svg preloader-animate-pulse" preserveAspectRatio="none" viewBox="0 0 200 20">
                    <path className="preloader-scribble-path" d="M5,12 C40,8 80,15 120,10 C160,5 195,12 195,12 M10,16 C50,14 100,18 150,15 C180,13 192,16 192,16" />
                  </svg>
                </span>
                <span style={{ opacity: 0.45 }}>Engineer •</span>
              </span>
              <span className="flex items-center flex-wrap justify-center gap-x-4 mt-2">
                <span className="preloader-highlight-container">
                  AI Systems
                  <svg className="preloader-scribble-svg preloader-animate-pulse" style={{ animationDelay: '0.35s' }} preserveAspectRatio="none" viewBox="0 0 200 20">
                    <path className="preloader-scribble-path" style={{ animationDelay: '0.35s' }} d="M5,10 C30,14 70,8 110,12 C150,16 195,9 195,9 M8,15 C45,12 95,17 145,14 C175,12 192,15 192,15" />
                  </svg>
                </span>
                <span style={{ opacity: 1.0 }}>Builder</span>
              </span>
            </h1>
          </div>
        </motion.div>
      ) : null}
    </div>
  )
}
