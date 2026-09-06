import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, type RefObject } from 'react'

gsap.registerPlugin(ScrollTrigger)

export const useScrollParallax = (rootRef: RefObject<HTMLElement | null>) => {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const elements = root.querySelectorAll('[data-parallax]')
    if (!elements.length) return

    const ctx = gsap.context(() => {
      elements.forEach((el) => {
        const speed = parseFloat(el.getAttribute('data-parallax') ?? '8')
        gsap.fromTo(
          el,
          { yPercent: speed },
          {
            yPercent: -speed,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          },
        )
      })
    }, root)

    return () => ctx.revert()
  }, [rootRef])
}