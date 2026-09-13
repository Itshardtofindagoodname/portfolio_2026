import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Hide cursor on touch devices or reduced motion
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let currentX = mouseX
    let currentY = mouseY
    let ringX = mouseX
    let ringY = mouseY
    let lastX = mouseX
    let lastY = mouseY
    let velocityX = 0
    let velocityY = 0
    let isHovered = false

    gsap.set([dot, ring], { opacity: 0 })

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      if (gsap.getProperty(dot, 'opacity') === 0) {
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 })
      }
    }

    const onMouseDown = () => {
      gsap.to(ring, { scale: 0.7, duration: 0.15, ease: 'power2.out' })
      gsap.to(dot, { scale: 1.5, duration: 0.15, ease: 'power2.out' })
    }

    const onMouseUp = () => {
      gsap.to(ring, { scale: isHovered ? 1.6 : 1, duration: 0.2, ease: 'power2.out' })
      gsap.to(dot, { scale: 1, duration: 0.2, ease: 'power2.out' })
    }

    const tick = () => {
      // Lerp mouse coordinates
      currentX += (mouseX - currentX) * 0.4
      currentY += (mouseY - currentY) * 0.4

      ringX += (mouseX - ringX) * 0.15
      ringY += (mouseY - ringY) * 0.15

      // Calculate velocity for subtle stretch/angle
      velocityX = mouseX - lastX
      velocityY = mouseY - lastY
      lastX = mouseX
      lastY = mouseY

      const speed = Math.hypot(velocityX, velocityY)
      const angle = Math.atan2(velocityY, velocityX) * (180 / Math.PI)
      const stretch = Math.min(speed * 0.015, 0.4)

      gsap.set(dot, {
        x: currentX,
        y: currentY,
      })

      gsap.set(ring, {
        x: ringX,
        y: ringY,
        rotation: angle,
        scaleX: isHovered ? 1.6 : 1 + stretch,
        scaleY: isHovered ? 1.6 : 1 - stretch * 0.5,
      })
    }

    gsap.ticker.add(tick)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)

    // Delegation for hover states
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (
        target?.closest('a, button, [role="button"], input, textarea, select, .interactive-hover, canvas')
      ) {
        isHovered = true
        gsap.to(ring, {
          scale: 1.6,
          borderColor: '#4AC5CB',
          backgroundColor: 'rgba(74, 197, 203, 0.1)',
          duration: 0.25,
          ease: 'power2.out',
        })
        gsap.to(dot, {
          backgroundColor: '#4AC5CB',
          scale: 0.5,
          duration: 0.25,
        })
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (
        target?.closest('a, button, [role="button"], input, textarea, select, .interactive-hover, canvas')
      ) {
        isHovered = false
        gsap.to(ring, {
          scale: 1,
          borderColor: '#0D1015',
          backgroundColor: 'transparent',
          duration: 0.25,
          ease: 'power2.out',
        })
        gsap.to(dot, {
          backgroundColor: '#0D1015',
          scale: 1,
          duration: 0.25,
        })
      }
    }

    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      gsap.ticker.remove(tick)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      <div
        ref={ringRef}
        className="fixed top-0 left-0 -ml-7 -mt-7 w-14 h-14 rounded-full border-2 border-[#0D1015] pointer-events-none transition-colors duration-200"
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-[10px] -mt-[10px] w-5 h-5 rounded-full bg-[#0D1015] pointer-events-none"
      />
    </div>
  )
}
