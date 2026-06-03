import { motion } from 'framer-motion'
import Vara from 'vara'
import { useEffect, useMemo, useRef, useState } from 'react'
import handwritingFontUrl from 'vara/fonts/Satisfy/SatisfySL.json?url'

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

const LOADER_MESSAGE = 'loading your experience'
const OVERLAY_COLOR = '#ffffff'
const GRID_STROKE = '#e0e0e0'
const HANDWRITING_COLOR = '#151515'

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
      delay: (order / totalTiles) * 1.15,
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
        duration: 0.72,
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
  const handwritingRef = useRef<HTMLDivElement>(null)
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
    const container = handwritingRef.current
    if (!container) {
      return
    }

    const fontSize = Math.max(28, Math.min(58, window.innerWidth * 0.055))
    let cancelled = false

    container.innerHTML = ''

    const handwriting = new Vara(
      '#pixel-preloader-handwriting',
      handwritingFontUrl,
      [
        {
          text: LOADER_MESSAGE,
          id: 'message',
          duration: 4500,
          autoAnimation: true,
          queued: true,
          letterSpacing: 0.25,
          textAlign: 'center',
        },
      ],
      {
        color: HANDWRITING_COLOR,
        fontSize,
        strokeWidth: 1.2,
        textAlign: 'center',
        autoAnimation: true,
      },
    )

    handwriting.ready(() => {
      if (cancelled) {
        return
      }

      const svg = container.querySelector('svg')
      if (svg) {
        svg.style.overflow = 'visible'
      }
    })

    handwriting.animationEnd(() => {
      if (!cancelled) {
        setPhase('fadingText')
      }
    })

    return () => {
      cancelled = true
      container.innerHTML = ''
    }
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
                  opacity: [1, 1, 0.92, 0.4, 0],
                  x: [0, 0, 8, 22, 42],
                  y: [0, -4, -14, -30, -52],
                  scale: [1, 1.02, 0.99, 0.95, 0.88],
                  rotate: [0, -1.5, 1.2, -2.8, -5],
                  skewX: [0, 0, -4, 8, 12],
                  filter: [
                    'blur(0px)',
                    'blur(0px)',
                    'blur(1.5px)',
                    'blur(6px)',
                    'blur(16px)',
                  ],
                  clipPath: [
                    'inset(0% 0% 0% 0%)',
                    'inset(0% 0% 0% 0%)',
                    'inset(0% 0% 0% 6%)',
                    'inset(0% 0% 0% 22%)',
                    'inset(0% 0% 0% 100%)',
                  ],
                }
              : {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  scale: 1,
                  rotate: 0,
                  skewX: 0,
                  filter: 'blur(0px)',
                  clipPath: 'inset(0% 0% 0% 0%)',
                }
          }
          transition={{
            duration: phase === 'fadingText' ? 1.35 : 0.45,
            ease: [0.22, 1, 0.36, 1],
            times: phase === 'fadingText' ? [0, 0.24, 0.5, 0.78, 1] : undefined,
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
              minHeight: 'clamp(110px, 18vw, 180px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              id="pixel-preloader-handwriting"
              ref={handwritingRef}
              style={{
                width: '100%',
                minHeight: 'inherit',
              }}
            />
          </div>
        </motion.div>
      ) : null}
    </div>
  )
}
