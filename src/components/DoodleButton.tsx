import { motion, type HTMLMotionProps } from 'framer-motion'
import { gsap } from 'gsap'
import type { MouseEvent, ReactNode } from 'react'

type DoodleButtonProps = Omit<HTMLMotionProps<'a'>, 'children'> & {
  children: ReactNode
  variant?: 'ink' | 'paper' | 'underline'
}

const DoodleButton = ({
  children,
  className = '',
  variant = 'ink',
  onMouseEnter,
  onMouseLeave,
  ...props
}: DoodleButtonProps) => {
  const handleEnter = (event: MouseEvent<HTMLAnchorElement>) => {
    const button = event.currentTarget
    const scribble = button.querySelector('.button-scribble')
    const blot = button.querySelector('.button-blot')

    gsap.killTweensOf([button, scribble, blot])
    gsap
      .timeline({ defaults: { ease: 'elastic.out(1, 0.45)' } })
      .to(button, { x: 2, y: -4, rotate: -1.2, scale: 1.035, duration: 0.45 }, 0)
      .to(scribble, { scaleX: 1, opacity: 1, duration: 0.35 }, 0)
      .fromTo(
        blot,
        { scale: 0, opacity: 0, rotate: -18 },
        { scale: 1, opacity: 1, rotate: 4, duration: 0.45 },
        0.05,
      )

    onMouseEnter?.(event)
  }

  const handleLeave = (event: MouseEvent<HTMLAnchorElement>) => {
    const button = event.currentTarget
    const scribble = button.querySelector('.button-scribble')
    const blot = button.querySelector('.button-blot')

    gsap.killTweensOf([button, scribble, blot])
    gsap
      .timeline({ defaults: { ease: 'power3.out' } })
      .to(button, { x: 0, y: 0, rotate: 0, scale: 1, duration: 0.3 }, 0)
      .to(scribble, { scaleX: 0.18, opacity: 0.55, duration: 0.25 }, 0)
      .to(blot, { scale: 0.2, opacity: 0, duration: 0.2 }, 0)

    onMouseLeave?.(event)
  }

  const variantClasses = {
    ink: 'bg-primary text-on-primary border-2 border-black shadow-[5px_5px_0_#000]',
    paper: 'bg-white text-primary border-2 border-black shadow-[5px_5px_0_#000]',
    underline: 'bg-transparent text-primary border-0 shadow-none px-0 py-0',
  }

  return (
    <motion.a
      whileTap={{ scale: 0.94, rotate: 1.5 }}
      transition={{ type: 'spring', stiffness: 420, damping: 17 }}
      className={`doodle-button relative inline-flex w-max items-center justify-center gap-3 overflow-visible px-7 py-3 font-handwriting text-2xl leading-none ${variantClasses[variant]} ${className}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      {...props}
    >
      <span className="button-blot pointer-events-none absolute -right-3 -top-3 h-5 w-5 rounded-[38%_62%_45%_55%] bg-white/30 opacity-0" />
      <span className="relative z-10 inline-flex items-center gap-3">{children}</span>
      <svg
        aria-hidden="true"
        className="button-scribble pointer-events-none absolute -bottom-2 left-1/2 h-4 w-[88%] -translate-x-1/2 scale-x-[0.18] opacity-55"
        preserveAspectRatio="none"
        viewBox="0 0 120 14"
      >
        <path
          d="M3 8 C17 1 26 13 41 7 S70 2 84 8 104 15 117 6"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="3"
        />
      </svg>
    </motion.a>
  )
}

export default DoodleButton
