import { useState, useEffect, useRef } from 'react'
import { useInView, useReducedMotion } from 'motion/react'

const GLYPHS = '!<>-_\\/[]{}=+*^?#@%&'

type ScrambleTextProps = {
  text: string
  className?: string
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'div'
}

const ScrambleText = ({ text, className, as: Tag = 'span' }: ScrambleTextProps) => {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-8%' })
  const [display, setDisplay] = useState<string>(text)

  useEffect(() => {
    if (reduce || !inView) return

    let frame = 0
    const done = () => {
      if (interval) clearInterval(interval)
      setDisplay(text)
    }

    const interval = setInterval(() => {
      const next = text
        .split('')
        .map((char, i) =>
          char === ' ' || frame > i + 6 || frame > text.length * 0.72
            ? char
            : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
        )
        .join('')
      setDisplay(next)
      frame++
      if (frame > text.length * 1.35) done()
    }, 28)

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [inView, text, reduce])

  return (
    <Tag ref={ref as never} className={className} aria-label={text}>
      {display}
    </Tag>
  )
}

export default ScrambleText