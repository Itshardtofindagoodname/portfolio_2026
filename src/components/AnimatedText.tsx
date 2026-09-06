import { motion, useReducedMotion } from 'motion/react'

type AnimatedTextProps = {
  text: string
  className?: string
  wordClassName?: string
  delay?: number
  once?: boolean
  stagger?: number
}

const AnimatedText = ({
  text,
  className,
  wordClassName = '',
  delay = 0,
  once = true,
  stagger = 0.045,
}: AnimatedTextProps) => {
  const reduce = useReducedMotion()
  const words = text.split(' ')

  if (reduce) {
    return <span className={className}>{text}</span>
  }

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: '-8%' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block whitespace-pre" aria-hidden="true">
          <motion.span
            className={`inline-block ${wordClassName}`}
            variants={{
              hidden: { opacity: 0, y: '0.75em', scale: 0.82, rotate: 5, filter: 'blur(4px)' },
              show: {
                opacity: 1,
                y: '0em',
                scale: 1,
                rotate: 0,
                filter: 'blur(0px)',
                transition: { type: 'spring', stiffness: 320, damping: 20, mass: 0.6 },
              },
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </motion.span>
  )
}

export default AnimatedText