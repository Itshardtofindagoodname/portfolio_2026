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

  useEffect(() => {
    const container = containerRef.current
    if (!container || !isHovering) return

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
      },
    )

    return () => {
      container.innerHTML = ''
      void vara
    }
  }, [containerId, fontSize, isHovering, text])

  return (
    <span
      className={`vara-hover-text relative inline-block align-baseline ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <span className={isHovering ? 'opacity-0' : 'opacity-100'}>{text}</span>
      <span
        ref={containerRef}
        id={containerId}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-1 min-h-[1.4em]"
      />
    </span>
  )
}

export default VaraHoverText
