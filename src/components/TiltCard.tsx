import { useRef, useState } from 'react'
import { motion, useReducedMotion, useSpring } from 'motion/react'
import type { ReactNode, PointerEvent } from 'react'

type TiltCardProps = {
  children: ReactNode
  className?: string
  /** Max rotation in degrees */
  intensity?: number
  /** Soft radial glare that follows the cursor */
  glare?: boolean
}

const TiltCard = ({ children, className, intensity = 9, glare = true }: TiltCardProps) => {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)
  const [hover, setHover] = useState(false)

  const rotateX = useSpring(0, { stiffness: 260, damping: 18, mass: 0.5 })
  const rotateY = useSpring(0, { stiffness: 260, damping: 18, mass: 0.5 })

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    rotateY.set((px - 0.5) * 2 * intensity)
    rotateX.set(-(py - 0.5) * 2 * intensity)
    if (glareRef.current) {
      glareRef.current.style.setProperty('--gc', `${px * 100}% ${py * 100}%`)
    }
  }

  const reset = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onPointerMove={onMove}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => {
        setHover(false)
        reset()
      }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', transformPerspective: 900 }}
    >
      {children}
      {!reduce && glare && (
        <div
          ref={glareRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: hover ? 1 : 0,
            background: 'radial-gradient(220px circle at var(--gc, 50% 50%), rgba(255,255,255,0.28), transparent 60%)',
          }}
        />
      )}
    </motion.div>
  )
}

export default TiltCard