import { motion, useReducedMotion, type HTMLMotionProps } from 'motion/react'
import type { ReactNode } from 'react'

type MotionRevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  x?: number
  rotate?: number
  scale?: number
  once?: boolean
  margin?: string
  duration?: number
  whileHover?: HTMLMotionProps<'div'>['whileHover']
  blur?: boolean
}

const MotionReveal = ({
  children,
  className,
  delay = 0,
  y = 36,
  x = 0,
  rotate = 0,
  scale = 0.9,
  once = true,
  margin = '-8%',
  duration = 0.75,
  whileHover,
  blur = true,
}: MotionRevealProps) => {
  const reduce = useReducedMotion()

  if (reduce) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once, margin }}
        transition={{ delay, duration: 0.5 }}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        x,
        y,
        scale,
        rotate,
        filter: blur ? 'blur(8px)' : 'blur(0px)',
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotate,
        filter: 'blur(0px)',
      }}
      viewport={{ once, margin }}
      transition={{
        delay,
        duration,
        ease: [0.22, 1, 0.36, 1],
        scale: { type: 'spring', stiffness: 220, damping: 17, mass: 0.7 },
      }}
      whileHover={whileHover}
    >
      {children}
    </motion.div>
  )
}

export default MotionReveal