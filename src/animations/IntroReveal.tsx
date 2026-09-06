import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export interface IntroRevealProps {
  onComplete: () => void
  brand?: string
}

/*
 * Generate a clip-path polygon string for a given collapse progress.
 *
 * progress 0 → full viewport rectangle
 * progress 1 → all 12 vertices collapsed to center (50% 50%)
 *
 * The asymmetry array offsets each vertex from its "ideal" position
 * on the rectangle edge, so the collapse feels organic rather than mechanical.
 */
function morphPolygon(progress: number, asym: number[]): string {
  const vertices: [number, number][] = [
    [0, 0],     // top-left
    [33, 0],    // top-mid-left
    [67, 0],    // top-mid-right
    [100, 0],   // top-right
    [100, 33],  // right-mid-top
    [100, 67],  // right-mid-bottom
    [100, 100], // bottom-right
    [67, 100],  // bottom-mid-right
    [33, 100],  // bottom-mid-left
    [0, 100],   // bottom-left
    [0, 67],    // left-mid-bottom
    [0, 33],    // left-mid-top
  ]

  const coords = vertices.map(([x, y], i) => {
    const a = asym[i % asym.length]
    // Apply asymmetry: push vertex away from or toward center along its edge
    const ox = 50 + (x - 50) * a
    const oy = 50 + (y - 50) * a
    // Collapse toward center
    const fx = ox + (50 - ox) * progress
    const fy = oy + (50 - oy) * progress
    return `${fx.toFixed(2)}% ${fy.toFixed(2)}%`
  })

  return `polygon(${coords.join(', ')})`
}

// Fixed asymmetry factors — each one offsets a vertex to break uniformity.
// Values near 1.0 = edge of viewport, values away from 1.0 pull that
// vertex slightly inward or outward before the collapse begins.
const ASYM = [
  1.00, 0.90, 1.10, 1.00, // top edge: left→right
  0.94, 1.06,              // right edge: top→bottom
  1.00, 1.10, 0.90, 1.00, // bottom edge: right→left
  1.06, 0.94,              // left edge: bottom→top
]

/**
 * Onto-inspired page reveal transition.
 *
 * Architecture — three conceptual planes:
 *   P1  The portfolio underneath (already mounted, hidden by covers)
 *   P2  Primary + secondary dark covering surfaces (clip-path polygon morphed)
 *   P3  Brand identity panel (geometric frame with name + accent)
 *
 * The covers dominate the viewport. Their clip-path polygons morph
 * inward with organic asymmetry, simultaneously scaling and rotating
 * for physical weight. The brand panel lifts away. The hero emerges
 * through the retreating geometry — all one continuous motion.
 */
export function IntroReveal({
  onComplete,
  brand = 'DEBARJUN THAKUR',
}: IntroRevealProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const reportedRef = useRef(false)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const t = setTimeout(() => {
        if (!reportedRef.current) {
          reportedRef.current = true
          onComplete()
        }
      }, 60)
      return () => clearTimeout(t)
    }

    const coverP = root.querySelector<HTMLElement>('.intro-cover-p')
    const coverS = root.querySelector<HTMLElement>('.intro-cover-s')
    const panel = root.querySelector<HTMLElement>('.intro-panel')
    const brandEl = root.querySelector<HTMLElement>('.intro-brand')
    const accent = root.querySelector<HTMLElement>('.intro-accent')
    const heroEls = document.querySelectorAll<HTMLElement>('.hero-reveal')

    if (!coverP || !coverS || !panel || !brandEl) return

    document.documentElement.style.overflow = 'hidden'

    heroEls.forEach((el) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(30px) scale(0.98)'
    })

    // Diagonal ensures coverage even when the surface rotates.
    const vw = window.innerWidth
    const vh = window.innerHeight
    const diag = Math.sqrt(vw * vw + vh * vh)
    const bigScale = diag / Math.min(vw, vh) * 1.02

    // Pre-compute polygon states.
    const FULL = morphPolygon(0, ASYM)
    const MID = morphPolygon(0.55, ASYM)
    const END = morphPolygon(1, ASYM)

    const tl = gsap.timeline({
      onComplete: () => {
        coverP.style.pointerEvents = 'none'
        coverS.style.pointerEvents = 'none'
        document.documentElement.style.overflow = ''
        if (!reportedRef.current) {
          reportedRef.current = true
          onComplete()
        }
      },
    })

    // ──────────────────────────────────────────────────────
    //  INITIAL STATES
    // ──────────────────────────────────────────────────────

    gsap.set(coverP, { clipPath: FULL, scale: 1, rotation: 0, opacity: 1 })
    gsap.set(coverS, { clipPath: FULL, scale: 1, rotation: 0, opacity: 0.5 })
    gsap.set(panel, { scale: 1, opacity: 1, y: 0 })
    gsap.set(brandEl, { opacity: 0, y: 16 })
    if (accent) gsap.set(accent, { scaleX: 0, opacity: 0 })

    // ──────────────────────────────────────────────────────
    //  TIMELINE  (absolute positions in seconds)
    //
    //  0.00  ─── brand entrance
    //  0.65  ─── hold
    //  1.15  ─── panel + covers begin retreat
    //  1.70  ─── hero emerges
    //  2.70  ─── done
    // ──────────────────────────────────────────────────────

    // A  brand entrance
    tl.to(brandEl, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0)
    if (accent) {
      tl.to(accent, { scaleX: 1, opacity: 1, duration: 0.45, ease: 'power2.out' }, 0.1)
    }

    // B  hold (empty tween)
    tl.to({}, { duration: 0.5 }, 0.65)

    // C  panel lifts away
    tl.to(panel, { scale: 2.4, opacity: 0, duration: 1.05, ease: 'expo.in' }, 1.15)
    tl.to(brandEl, { opacity: 0, y: -24, duration: 0.5, ease: 'power2.in' }, 1.18)
    if (accent) {
      tl.to(accent, { scaleX: 0.15, opacity: 0, duration: 0.35, ease: 'power2.in' }, 1.18)
    }

    // D  primary cover — polygon morph (two-phase: power3.in → expo.out)
    tl.to(coverP, { clipPath: MID, duration: 0.6, ease: 'power3.in' }, 1.25)
    tl.to(coverP, { clipPath: END, duration: 0.5, ease: 'expo.out' }, 1.85)

    // E  primary cover — scale + rotation (runs concurrently with D)
    tl.to(coverP, { scale: bigScale, rotation: 2, duration: 1.35, ease: 'expo.out' }, 1.15)

    // F  secondary cover — follows primary ~100ms later
    tl.to(coverS, { clipPath: MID, duration: 0.65, ease: 'power3.in' }, 1.35)
    tl.to(coverS, { clipPath: END, duration: 0.55, ease: 'expo.out' }, 2.0)
    tl.to(coverS, { scale: bigScale * 1.04, rotation: -1.2, duration: 1.3, ease: 'expo.out' }, 1.25)

    // G  covers fade
    tl.to(coverP, { opacity: 0, duration: 0.45, ease: 'power1.out' }, 1.9)
    tl.to(coverS, { opacity: 0, duration: 0.4, ease: 'power1.out' }, 2.0)

    // H  hero emerges — starts while covers are still retreating
    tl.to(heroEls, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.95,
      stagger: 0.08,
      ease: 'power3.out',
    }, 1.7)

    return () => {
      tl.kill()
      document.documentElement.style.overflow = ''
    }
  }, [onComplete])

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'auto',
        overflow: 'hidden',
      }}
    >
      {/* primary dark covering — oversized for safe rotation */}
      <div
        className="intro-cover-p"
        style={{
          position: 'absolute',
          top: '-25%',
          left: '-25%',
          width: '150%',
          height: '150%',
          backgroundColor: '#181a1e',
          zIndex: 1,
          willChange: 'clip-path, transform, opacity',
        }}
      />

      {/* secondary covering — creates layered depth */}
      <div
        className="intro-cover-s"
        style={{
          position: 'absolute',
          top: '-25%',
          left: '-25%',
          width: '150%',
          height: '150%',
          backgroundColor: '#22242a',
          zIndex: 2,
          willChange: 'clip-path, transform, opacity',
        }}
      />

      {/* brand panel — geometric frame with text */}
      <div
        className="intro-panel"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(400px, 80vw)',
          zIndex: 3,
          willChange: 'transform, opacity',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'clamp(0.5rem, 1.5vh, 0.9rem)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            border: '1px solid rgba(255,255,255,0.08)',
            pointerEvents: 'none',
          }}
        />

        <div
          className="intro-brand"
          style={{
            textAlign: 'center',
            padding: 'clamp(1.8rem, 5vh, 3rem) clamp(1.5rem, 4vw, 2.5rem)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-headline-xl), sans-serif',
              fontSize: 'clamp(0.5rem, 1.3vw, 0.7rem)',
              fontWeight: 700,
              letterSpacing: '0.32em',
              color: 'rgba(255,255,255,0.45)',
              textTransform: 'uppercase',
              display: 'block',
            }}
          >
            {brand}
          </span>
        </div>

        <div
          className="intro-accent"
          style={{
            width: '36px',
            height: '1px',
            backgroundColor: 'rgba(255,255,255,0.15)',
            transformOrigin: 'center center',
          }}
        />
      </div>
    </div>
  )
}
