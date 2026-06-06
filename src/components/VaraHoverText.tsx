import { useEffect, useId, useRef, useState } from 'react'
import Vara from 'vara'
import varaFontUrl from 'vara/fonts/Shadows-Into-Light/shadows-into-light.json?url'

type VaraHoverTextProps = {
  text: string
  className?: string
  fontSize?: number
}

const VaraHoverText = ({ text, className = '', fontSize = 30 }: VaraHoverTextProps) => {
  const rawId = useId().replace(/:/g, '')
  const containerId = `vara-${rawId}`
  const containerRef = useRef<HTMLSpanElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [shouldDraw, setShouldDraw] = useState(false)

  useEffect(() => {
    if (isHovering) {
      setShouldDraw(true)
      return
    }

    const timeoutId = window.setTimeout(() => setShouldDraw(false), 260)
    return () => window.clearTimeout(timeoutId)
  }, [isHovering])

  useEffect(() => {
    const container = containerRef.current
    if (!container || !shouldDraw) return

    container.innerHTML = ''
    const vara = new Vara(
      `#${containerId}`,
      varaFontUrl,
      [{ text, duration: 420, strokeWidth: 1.45, color: '#000000' }],
      {
        autoAnimation: true,
        fontSize,
        strokeWidth: 1.45,
        color: '#000000',
        width: 600,
      },
    )

    return () => {
      container.innerHTML = ''
      void vara
    }
  }, [containerId, fontSize, shouldDraw, text])

  return (
    <span
      className={`vara-hover-text relative inline-block align-baseline ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <span className={`vara-hover-fallback ${isHovering ? 'opacity-0' : 'opacity-100'}`}>{text}</span>
      <span
        ref={containerRef}
        id={containerId}
        aria-hidden="true"
        className={`vara-hover-drawn pointer-events-none absolute left-0 -top-1 w-[600px] min-h-[1.4em] ${isHovering ? 'opacity-100' : 'opacity-0'}`}
      />
    </span>
  )
}

export default VaraHoverText
