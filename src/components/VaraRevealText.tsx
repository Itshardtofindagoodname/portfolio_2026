import { useEffect, useId, useRef, useState } from 'react'
import Vara from 'vara'
import varaFontUrl from 'vara/fonts/Shadows-Into-Light/shadows-into-light.json?url'

let cachedFontUrl: string | null = null

const resolveFontUrl = async () => {
  if (cachedFontUrl) return cachedFontUrl

  const response = await fetch(varaFontUrl)
  if (!response.ok) throw new Error('Failed to load vara font')
  const json = await response.text()
  const blob = new Blob([json], { type: 'application/json' })
  cachedFontUrl = URL.createObjectURL(blob)
  return cachedFontUrl
}

type VaraRevealTextProps = {
  text: string
  className?: string
  fontSize?: number
  color?: string
  duration?: number
}

const VaraRevealText = ({
  text,
  className = '',
  fontSize = 30,
  color = '#0D1015',
  duration = 650,
}: VaraRevealTextProps) => {
  const rawId = useId().replace(/:/g, '')
  const containerId = `vara-${rawId}`
  const rootRef = useRef<HTMLSpanElement>(null)
  const containerRef = useRef<HTMLSpanElement>(null)
  const drawnWidthRef = useRef(0)
  const [inView, setInView] = useState(false)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true)
            observer.disconnect()
          }
        }
      },
      { threshold: 0.35 },
    )

    observer.observe(root)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const container = containerRef.current
    const root = rootRef.current
    if (!container || !inView) return

    const fitToWidth = () => {
      const svg = container.querySelector('svg')
      if (!svg || drawnWidthRef.current <= 0) return
      const available =
        Math.min(root?.getBoundingClientRect().width ?? 0, 600) || 600
      if (drawnWidthRef.current > available) {
        const scale = available / drawnWidthRef.current
        svg.style.transformOrigin = '0 50%'
        svg.style.transform = `scale(${scale})`
      } else {
        svg.style.transformOrigin = ''
        svg.style.transform = ''
      }
    }

    container.innerHTML = ''

    let disposed = false

    resolveFontUrl()
      .then((fontUrl) => {
        if (disposed) return
        const vara = new Vara(
          `#${containerId}`,
          fontUrl,
          [{ text, duration, strokeWidth: 1.45, color, width: 9999 }],
          {
            autoAnimation: true,
            fontSize,
            strokeWidth: 1.45,
            color,
          },
        )

        vara.ready(() => {
          const svg = container.querySelector('svg')
          if (svg) drawnWidthRef.current = svg.getBBox().width
          fitToWidth()
          setRevealed(true)
        })
      })
      .catch(() => {
        setRevealed(true)
      })

    const resizeObserver = root ? new ResizeObserver(fitToWidth) : null
    if (root) resizeObserver?.observe(root)

    return () => {
      disposed = true
      resizeObserver?.disconnect()
      drawnWidthRef.current = 0
      container.innerHTML = ''
    }
  }, [color, containerId, duration, fontSize, inView, text])

  return (
    <span
      ref={rootRef}
      className={`vara-reveal-text relative inline-block align-baseline ${revealed ? 'is-revealed' : ''} ${className}`}
    >
      <span className={`vara-reveal-fallback whitespace-nowrap ${revealed ? 'opacity-0' : 'opacity-100'}`}>{text}</span>
      <span
        ref={containerRef}
        id={containerId}
        aria-hidden="true"
        className={`vara-reveal-drawn pointer-events-none absolute left-0 -top-1 w-[600px] min-h-[1.4em] whitespace-nowrap ${revealed ? 'opacity-100' : 'opacity-0'}`}
      />
    </span>
  )
}

export default VaraRevealText