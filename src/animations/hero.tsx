import { gsap } from 'gsap'
import { useEffect, useRef, useState } from 'react'
import allPeepsImage from '../assets/all-peeps.png'

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

const CrowdCanvas = ({ src, rows = 15, cols = 7 }: CrowdCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const config = {
      src,
      rows,
      cols,
    }

    // UTILS
    const randomRange = (min: number, max: number) =>
      min + Math.random() * (max - min)
    const randomIndex = <T,>(array: T[]) => randomRange(0, array.length) | 0
    const removeFromArray = <T,>(array: T[], i: number) => array.splice(i, 1)[0]
    const removeItemFromArray = <T,>(array: T[], item: T) =>
      removeFromArray(array, array.indexOf(item))
    const removeRandomFromArray = <T,>(array: T[]) =>
      removeFromArray(array, randomIndex(array))
    const getRandomFromArray = <T,>(array: T[]) => array[randomIndex(array) | 0]

    // TWEEN FACTORIES
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

    // FACTORY FUNCTIONS
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
          peep.width = rect[2]
          peep.height = rect[3]
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

    // MAIN
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
      ctx.scale(devicePixelRatio, devicePixelRatio)

      crowd.forEach((peep) => {
        peep.render(ctx)
      })

      ctx.restore()
    }

    const resize = () => {
      if (!canvas) return
      stage.width = canvas.clientWidth
      stage.height = canvas.clientHeight
      canvas.width = stage.width * devicePixelRatio
      canvas.height = stage.height * devicePixelRatio

      crowd.forEach((peep) => {
        peep.walk?.kill()
      })

      crowd.length = 0
      availablePeeps.length = 0
      availablePeeps.push(...allPeeps)

      initCrowd()
    }

    const init = () => {
      createPeeps()
      resize()
      gsap.ticker.add(render)
    }

    img.onload = init
    img.src = config.src

    const handleResize = () => resize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      gsap.ticker.remove(render)
      crowd.forEach((peep) => {
        if (peep.walk) peep.walk.kill()
      })
    }
  }, [src, rows, cols])

  return (
    <canvas ref={canvasRef} className="absolute bottom-0 h-[90vh] w-full" style={{ zIndex: 2 }} />
  )
}

interface HeroAnimationProps {
  isLoaded?: boolean
  loadingDuration?: number
}

const HeroAnimation = ({ isLoaded = true, loadingDuration = 0 }: HeroAnimationProps) => {
  const copyRef = useRef<HTMLDivElement>(null)
  const [shouldAnimate, setShouldAnimate] = useState(false)

  useEffect(() => {
    if (!isLoaded) return

    const animationDelay = loadingDuration
    const timer = setTimeout(() => {
      setShouldAnimate(true)
    }, animationDelay)

    return () => clearTimeout(timer)
  }, [isLoaded, loadingDuration])

  useEffect(() => {
    const copy = copyRef.current
    if (!copy || !shouldAnimate) return

    const context = gsap.context(() => {
      gsap.fromTo(
        '.hero-copy-item',
        { autoAlpha: 0, y: 18 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.82,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.18,
        },
      )

      gsap.to('.hero-doodle-line path', {
        strokeDashoffset: 0,
        duration: 1.1,
        ease: 'power2.out',
        delay: 0.45,
      })

      // Animate hand-drawn circle around "stands out"
      gsap.fromTo(
        '.hero-circle-path',
        { strokeDasharray: 600, strokeDashoffset: 600 },
        {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: 'power2.out',
          delay: 0.75,
        }
      )

      // Animate hand-drawn yellow underline under "you have me."
      gsap.fromTo(
        '.hero-gold-underline-path',
        { strokeDasharray: 600, strokeDashoffset: 600 },
        {
          strokeDashoffset: 0,
          duration: 1.0,
          ease: 'power2.out',
          delay: 1.15,
        }
      )
    }, copy)

    return () => context.revert()
  }, [shouldAnimate])

  return (
    <section className="hero-section relative min-h-screen overflow-hidden bg-white text-black">
      <div
        ref={copyRef}
        className="hero-copy absolute left-1/2 top-8 z-10 grid w-full max-w-5xl -translate-x-1/2 content-start justify-items-center gap-3 px-6 text-center text-black md:top-12"
      >
        <span className="hero-copy-item font-label-caps text-[10px] md:text-xs uppercase tracking-[0.28em] text-black/45">
          frontend systems / motion / tactile interfaces
        </span>
        <h1 className="hero-copy-item font-headline-xl text-3xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-normal max-w-4xl">
          If you want someone<br />
          who <span className="relative inline-block px-3 italic">
            stands out
            <svg className="absolute -inset-x-4 md:-inset-x-8 -inset-y-4 md:-inset-y-8 w-[120%] h-[180%] md:h-[200%] pointer-events-none overflow-visible" viewBox="0 0 220 80" fill="none">
              <path className="hero-circle-path" d="M10,40 C10,15 90,5 180,15 C215,22 215,55 180,68 C90,78 10,65 10,40 Z M15,35 C30,12 110,8 190,18" stroke="black" strokeWidth="3.5" strokeLinecap="round" />
            </svg>
          </span> from the crowd, 
          <span className="relative inline-block pb-2 px-1">
            you have me.
            <svg className="absolute left-0 right-0 -bottom-2 h-4 w-full pointer-events-none overflow-visible" preserveAspectRatio="none" viewBox="0 0 200 20" fill="none">
              <path className="hero-gold-underline-path" d="M5,12 C40,8 80,15 120,10 C160,5 195,12 195,12 M10,16 C50,14 100,18 150,15 C180,13 192,16 192,16" stroke="#ffd23f" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </span>
        </h1>
        <p className="hero-copy-item max-w-[46ch] font-handwriting text-xl md:text-2xl leading-tight text-black/65 mt-2">
          I build fast web experiences that feel like polished product work with a sketchbook soul.
        </p>
        <svg
          aria-hidden="true"
          className="hero-copy-item hero-doodle-line mt-1 h-8 w-52 opacity-55 md:w-72"
          preserveAspectRatio="none"
          viewBox="0 0 240 32"
        >
          <path
            d="M5 20 C42 5 74 31 112 16 S180 8 235 20"
            fill="none"
            stroke="black"
            strokeLinecap="round"
            strokeWidth="3"
          />
        </svg>
      </div>

      <style>
        {`
          .standing-out-image {
            z-index: 2;
          }
          @media (max-width: 768px) {
            .standing-out-image {
              z-index: 4;
              bottom: -30px !important;
            }
          }
        `}
      </style>
      <div className="absolute inset-x-0 bottom-0 h-full overflow-hidden">
        {/* standing_out guy behind crowd */}
        <img
          src="/standing_out.png"
          alt="Standing out from the crowd"
          className="absolute left-1/2 -translate-x-1/2 object-contain pointer-events-none select-none standing-out-image"
          style={{
            bottom: '150px',
            height: '300px',
            width: 'auto',
          }}
        />
        <CrowdCanvas src={allPeepsImage} rows={15} cols={7} />
      </div>
      <div className="torn-hero-edge" aria-hidden="true" style={{ zIndex: 3 }} />
    </section>
  )
}

export { CrowdCanvas, HeroAnimation }
