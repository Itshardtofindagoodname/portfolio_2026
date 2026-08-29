import { useEffect, useMemo, useRef, useState } from 'react'

export interface PixelPreloaderProps {
  onComplete?: () => void
  tileSize?: number
}

type TileSpec = {
  delay: number
  x: number
  y: number
  rotate: number
}

const OVERLAY_COLOR = '#ffffff'
const GRID_STROKE = '#e0e0e0'
const MAX_TILES = 120

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
      delay: (order / totalTiles) * 0.42,
      x: (Math.random() - 0.5) * 28,
      y: (Math.random() - 0.5) * 28,
      rotate: (Math.random() - 0.5) * 8,
    }
  })

  return specs
}

export function PixelPreloader({
  onComplete,
  tileSize = 96,
}: PixelPreloaderProps) {
  const reportedRef = useRef(false)
  const [revealing, setRevealing] = useState(false)

  const spec = useMemo(() => {
    if (typeof window === 'undefined') {
      return { columns: 12, rows: 10, totalTiles: 120 }
    }
    const computedColumns = Math.min(
      Math.ceil(window.innerWidth / tileSize),
      16,
    )
    const computedRows = Math.min(
      Math.ceil(window.innerHeight / tileSize),
      12,
    )
    let totalTiles = computedColumns * computedRows
    if (totalTiles > MAX_TILES) {
      totalTiles = MAX_TILES
    }
    return { columns: computedColumns, rows: computedRows, totalTiles }
  }, [tileSize])

  const { columns, rows, totalTiles } = spec

  const tileSpecs = useMemo(() => createTileSpecs(totalTiles), [totalTiles])

  useEffect(() => {
    const timer = setTimeout(() => {
      setRevealing(true)
    }, 200)
    return () => clearTimeout(timer)
  }, [])

  // Cheap, pure-CSS reveal: no per-tile JS animation loop, so it stays smooth
  // on low-end phones. Completion is driven by a simple duration, which is
  // robust and runs independently of animation frame timing.
  useEffect(() => {
    if (!revealing) return
    const lastDelay = tileSpecs.length ? tileSpecs[tileSpecs.length - 1].delay : 0
    const doneAt = (lastDelay + 0.42) * 1000 + 60
    const timer = window.setTimeout(() => {
      if (!reportedRef.current) {
        reportedRef.current = true
        onComplete?.()
      }
    }, doneAt)
    return () => {
      window.clearTimeout(timer)
      reportedRef.current = false
    }
  }, [revealing, onComplete, tileSpecs])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        overflow: 'hidden',
        pointerEvents: 'auto',
        backgroundColor: OVERLAY_COLOR,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {tileSpecs.map((t, index) => (
          <div
            key={index}
            data-tile={index}
            className="pp-tile"
            style={
              {
                ['--i' as string]: index,
                ['--d' as string]: `${t.delay}s`,
                ['--tx' as string]: `${t.x}px`,
                ['--ty' as string]: `${t.y}px`,
                ['--r' as string]: `${t.rotate}deg`,
                backgroundColor: OVERLAY_COLOR,
                border: `1px solid ${GRID_STROKE}`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
      <style>{`
        .pp-tile {
          width: 100%;
          height: 100%;
          opacity: 1;
          transform: none;
          will-change: transform, opacity;
        }
        .pp-tile {
          animation: ppReveal 0.42s cubic-bezier(0.22,1,0.36,1) var(--d) forwards;
        }
        @keyframes ppReveal {
          from { opacity: 1; transform: translate3d(0,0,0) scale(1) rotate(0deg); }
          to {
            opacity: 0;
            transform: translate3d(var(--tx), var(--ty), 0) scale(0.88) rotate(var(--r));
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .pp-tile { animation: none !important; opacity: 0 !important; }
        }
      `}</style>
    </div>
  )
}
