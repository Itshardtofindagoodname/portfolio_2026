import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from 'motion/react'
import allPeepsImage from '../assets/all-peeps.avif'
import ScrambleText from '../components/ScrambleText'

interface CrowdCanvasProps {
  src: string
  rows?: number
  cols?: number
}

type Stage = {
  width: number
  height: number
}

type ResetPeepProps = {
  startX: number
  startY: number
  endX: number
}

type Peep = {
  image: HTMLImageElement
  rect: number[]
  width: number
  height: number
  x: number
  y: number
  anchorY: number
  scaleX: number
  walk: gsap.core.Timeline | null
  setRect: (rect: number[]) => void
  render: (ctx: CanvasRenderingContext2D) => void
}

type WalkFactory = (options: {
  peep: Peep
  props: ResetPeepProps
}) => gsap.core.Timeline

// The crowd sprite was downsampled to half resolution for a smaller
// download. Peeps are drawn from their source cell but rendered at the
// original pre-shrink size, so this factor keeps them the same on screen.
const SPRITE_SCALE = 2

const CrowdCanvas = ({ src, rows = 15, cols = 7 }: CrowdCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const config = {
      src,
      rows,
      cols,
    }

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Cap pixel ratio at 1.5 so high-DPI screens don't push 3-4x the pixels
    // per frame through the draw calls.
    const dpr = Math.min(devicePixelRatio || 1, 1.5)

    const randomRange = (min: number, max: number) =>
      min + Math.random() * (max - min)
    const randomIndex = <T,>(array: T[]) => randomRange(0, array.length) | 0
    const removeFromArray = <T,>(array: T[], i: number) => array.splice(i, 1)[0]
    const removeItemFromArray = <T,>(array: T[], item: T) =>
      removeFromArray(array, array.indexOf(item))
    const removeRandomFromArray = <T,>(array: T[]) =>
      removeFromArray(array, randomIndex(array))
    const getRandomFromArray = <T,>(array: T[]) => array[randomIndex(array) | 0]

    const resetPeep = ({
      stage,
      peep,
    }: {
      stage: Stage
      peep: Peep
    }): ResetPeepProps => {
      const direction = Math.random() > 0.5 ? 1 : -1
      const offsetY = 100 - 250 * gsap.parseEase('power2.in')(Math.random())
      const startY = stage.height - peep.height + offsetY
      let startX: number
      let endX: number

      if (direction === 1) {
        startX = -peep.width
        endX = stage.width
        peep.scaleX = 1
      } else {
        startX = stage.width + peep.width
        endX = 0
        peep.scaleX = -1
      }

      peep.x = startX
      peep.y = startY
      peep.anchorY = startY

      return {
        startX,
        startY,
        endX,
      }
    }

    const normalWalk: WalkFactory = ({ peep, props }) => {
      const { startY, endX } = props
      const xDuration = 10
      const yDuration = 0.25

      const tl = gsap.timeline()
      tl.timeScale(randomRange(0.5, 1.5))
      tl.to(
        peep,
        {
          duration: xDuration,
          x: endX,
          ease: 'none',
        },
        0,
      )
      tl.to(
        peep,
        {
          duration: yDuration,
          repeat: xDuration / yDuration,
          yoyo: true,
          y: startY - 10,
        },
        0,
      )

      return tl
    }

    const walks: WalkFactory[] = [normalWalk]

    const createPeep = ({
      image,
      rect,
    }: {
      image: HTMLImageElement
      rect: number[]
    }): Peep => {
      const peep: Peep = {
        image,
        rect: [],
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        anchorY: 0,
        scaleX: 1,
        walk: null,
        setRect: (rect: number[]) => {
          peep.rect = rect
          peep.width = rect[2] * SPRITE_SCALE
          peep.height = rect[3] * SPRITE_SCALE
        },
        render: (ctx: CanvasRenderingContext2D) => {
          ctx.save()
          ctx.translate(peep.x, peep.y)
          ctx.scale(peep.scaleX, 1)
          ctx.drawImage(
            peep.image,
            peep.rect[0],
            peep.rect[1],
            peep.rect[2],
            peep.rect[3],
            0,
            0,
            peep.width,
            peep.height,
          )
          ctx.restore()
        },
      }

      peep.setRect(rect)
      return peep
    }

    const img = document.createElement('img')
    const stage: Stage = {
      width: 0,
      height: 0,
    }

    const allPeeps: Peep[] = []
    const availablePeeps: Peep[] = []
    const crowd: Peep[] = []

    const createPeeps = () => {
      const { rows, cols } = config
      const { naturalWidth: width, naturalHeight: height } = img
      const total = rows * cols
      const rectWidth = width / rows
      const rectHeight = height / cols

      for (let i = 0; i < total; i++) {
        allPeeps.push(
          createPeep({
            image: img,
            rect: [
              (i % rows) * rectWidth,
              ((i / rows) | 0) * rectHeight,
              rectWidth,
              rectHeight,
            ],
          }),
        )
      }
    }

    const initCrowd = () => {
      while (availablePeeps.length) {
        const peep = addPeepToCrowd()
        peep.walk?.progress(Math.random())
      }
    }

    const addPeepToCrowd = () => {
      const peep = removeRandomFromArray(availablePeeps)
      const walk = getRandomFromArray(walks)({
        peep,
        props: resetPeep({
          peep,
          stage,
        }),
      }).eventCallback('onComplete', () => {
        removePeepFromCrowd(peep)
        addPeepToCrowd()
      })

      peep.walk = walk

      crowd.push(peep)
      crowd.sort((a, b) => a.anchorY - b.anchorY)

      return peep
    }

    const removePeepFromCrowd = (peep: Peep) => {
      removeItemFromArray(crowd, peep)
      availablePeeps.push(peep)
    }

    const render = () => {
      if (!canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.save()
      ctx.scale(dpr, dpr)

      crowd.forEach((peep) => {
        peep.render(ctx)
      })

      ctx.restore()
    }

    const resize = () => {
      if (!canvas) return
      stage.width = canvas.clientWidth
      stage.height = canvas.clientHeight
      // Canvas backing store uses the capped DPR from the effect scope.
      canvas.width = Math.max(1, Math.round(stage.width * dpr))
      canvas.height = Math.max(1, Math.round(stage.height * dpr))

      crowd.forEach((peep) => {
        peep.walk?.kill()
      })

      crowd.length = 0
      availablePeeps.length = 0
      availablePeeps.push(...allPeeps)

      initCrowd()
    }

    let ticking = false

    const startTicker = () => {
      if (ticking) return
      ticking = true
      gsap.ticker.add(render)
    }

    const stopTicker = () => {
      if (!ticking) return
      ticking = false
      gsap.ticker.remove(render)
    }

    const init = () => {
      createPeeps()
      resize()
      startTicker()
    }

    img.onload = init
    img.src = config.src

    const pauseAnimations = () => {
      stopTicker()
      crowd.forEach((peep) => {
        peep.walk?.pause()
      })
    }

    const resumeAnimations = () => {
      crowd.forEach((peep) => {
        peep.walk?.resume()
      })
      startTicker()
    }

    const handleResize = () => resize()
    window.addEventListener('resize', handleResize)

    const handleVisibility = () => {
      if (document.visibilityState === 'hidden') {
        pauseAnimations()
      } else {
        resumeAnimations()
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)

    const canvasEl = canvas
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) resumeAnimations()
          else pauseAnimations()
        }
      },
      { threshold: 0.05 },
    )
    io.observe(canvasEl)

    return () => {
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibility)
      io.disconnect()
      gsap.ticker.remove(render)
      crowd.forEach((peep) => {
        if (peep.walk) peep.walk.kill()
      })
    }
  }, [src, rows, cols])

  return (
    <canvas ref={canvasRef} className="absolute bottom-0 h-[85vh] w-full" style={{ zIndex: 2 }} />
  )
}

const HeroAnimation = ({ revealed = false }: { revealed?: boolean }) => {
  const copyRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()

  const { scrollY } = useScroll()
  const copyY = useTransform(scrollY, [0, 420], [0, -90])
  const copyOpacity = useTransform(scrollY, [0, 380], [1, 0])
  const crowdY = useTransform(scrollY, [0, 420], [0, 46])

  const line: Variants = {
    hidden: { opacity: 0, y: 46, rotate: 3, scale: 0.92, filter: 'blur(6px)' },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      rotate: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        delay: 0.15 + i * 0.18,
        type: 'spring',
        stiffness: 260,
        damping: 18,
        mass: 0.7,
      } as const,
    }),
  }

  // The hero doodle strokes stay completely hidden until the intro reveal
  // finishes, so they never flash fully-drawn before animating.
  useEffect(() => {
    const context = gsap.context(() => {
      gsap.set('.hero-circle-path', { strokeDasharray: 600, strokeDashoffset: 600 })
      gsap.set('.hero-gold-underline-path', {
        strokeDasharray: 600,
        strokeDashoffset: 600,
      })
    }, copyRef)

    return () => context.revert()
  }, [])

  useEffect(() => {
    const copy = copyRef.current
    if (!revealed || !copy) return

    const context = gsap.context(() => {
      gsap.to(
        '.hero-circle-path',
        {
          strokeDashoffset: 0,
          duration: 1.3,
          ease: 'power2.out',
          delay: 1.1,
        },
      )

      gsap.to(
        '.hero-gold-underline-path',
        {
          strokeDashoffset: 0,
          duration: 1.1,
          ease: 'power2.out',
          delay: 1.65,
        },
      )
    }, copy)

    return () => context.revert()
  }, [revealed])

  const shared = {
    initial: 'hidden',
    animate: revealed ? 'show' : 'hidden',
  }

  return (
    <section
      ref={sectionRef}
      className="hero-section relative min-h-[88vh] overflow-hidden bg-[#F5F3EE] text-[#0D1015]"
    >
      <motion.div
        ref={copyRef}
        className="hero-copy absolute left-1/2 top-8 z-10 grid w-full max-w-5xl -translate-x-1/2 content-start justify-items-center gap-3 px-6 text-center text-[#0D1015] md:top-12 lg:top-16"
        style={reduce ? undefined : { y: copyY, opacity: copyOpacity }}
      >
        <motion.span
          {...shared}
          custom={0}
          variants={reduce ? undefined : line}
          className="hero-copy-item font-label-caps text-[10px] md:text-xs uppercase tracking-[0.28em] text-[#0D1015]/45"
        >
          <ScrambleText text="frontend systems / motion / tactile interfaces" />
        </motion.span>

        <motion.h1
          {...shared}
          custom={1}
          variants={reduce ? undefined : line}
          className="hero-copy-item font-headline-xl text-3xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-normal max-w-4xl mt-20"
        >
          Want someone who<br />
          <motion.span
            {...shared}
            custom={2}
            variants={reduce ? undefined : line}
            className="relative inline-block px-3 italic"
          >
            stands out
            <svg className="absolute -inset-x-4 md:-inset-x-8 -inset-y-4 md:-inset-y-8 w-[120%] h-[180%] md:h-[200%] pointer-events-none overflow-visible" viewBox="0 0 220 80" fill="none">
              <path className="hero-circle-path" d="M10,40 C10,15 90,5 180,15 C215,22 215,55 180,68 C90,78 10,65 10,40 Z M15,35 C30,12 110,8 190,18" stroke="#0D1015" strokeWidth="3.5" strokeLinecap="round" />
            </svg>
          </motion.span>
          {' '}from the{' '}
          <motion.span
            {...shared}
            custom={3}
            variants={reduce ? undefined : line}
            className="relative inline-block pb-2 px-1"
          >
            crowd ?
            <svg className="absolute left-0 right-0 -bottom-2 h-4 w-full pointer-events-none overflow-visible" preserveAspectRatio="none" viewBox="0 0 200 20" fill="none">
              <path className="hero-gold-underline-path" d="M5,12 C40,8 80,15 120,10 C160,5 195,12 195,12 M10,16 C50,14 100,18 150,15 C180,13 192,16 192,16" stroke="#4AC5CB" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </motion.span>
        </motion.h1>
      </motion.div>

      <motion.div
        className="absolute inset-x-0 bottom-0 h-full overflow-hidden"
        style={reduce ? undefined : { y: crowdY }}
      >
        <CrowdCanvas src={allPeepsImage} rows={15} cols={7} />
      </motion.div>

      {!reduce && (
        <motion.div
          className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-1 text-[#0D1015]/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: revealed ? 1 : 0 }}
          transition={{ delay: 2.1, duration: 0.6 }}
          aria-hidden="true"
        >
          <span className="font-label-caps text-[9px] tracking-[0.3em] uppercase">scroll</span>
          <motion.span
            className="w-5 h-9 rounded-full border-2 border-[#0D1015]/40 flex justify-center pt-1.5"
            animate={{ y: [0, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.span
              className="w-1 h-2 rounded-full bg-[#0D1015]/50"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.span>
        </motion.div>
      )}
    </section>
  )
}

export { CrowdCanvas, HeroAnimation }
