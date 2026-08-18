import { motion } from 'framer-motion'
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
  const [revealing, setRevealing] = useState(false)

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
    const timer = setTimeout(() => {
      setRevealing(true)
    }, 200)

    return () => clearTimeout(timer)
  }, [])

  const handleTileDone = () => {
    tileCompletionRef.current += 1

    if (tileCompletionRef.current >= totalTiles) {
      onComplete?.()
    }
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
      {revealing ? (
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
    </div>
  )
}
