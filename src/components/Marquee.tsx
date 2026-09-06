type MarqueeProps = {
  items: string[]
  className?: string
  speed?: number
}

const Marquee = ({ items, className = '', speed = 28 }: MarqueeProps) => {
  const doubled = [...items, ...items]

  return (
    <div
      className={`marquee relative overflow-hidden whitespace-nowrap select-none py-3 md:py-4 bg-[#0D1015] text-[#F5F3EE] ${className}`}
      aria-hidden="true"
    >
      <div
        className="marquee-track inline-flex items-center gap-0"
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="marquee-item inline-flex items-center gap-4 md:gap-6 font-handwriting text-lg md:text-2xl px-3"
          >
            {item}
            <span className="text-[#4AC5CB]">✳</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default Marquee