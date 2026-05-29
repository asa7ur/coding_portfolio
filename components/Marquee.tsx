interface MarqueeProps {
  text?: string
  speed?: number
  direction?: 'left' | 'right'
}

export default function Marquee({
  text = 'Design & Development',
  speed = 35,
  direction = 'left',
}: MarqueeProps) {
  const items = Array(16).fill(null)

  return (
    <div className="overflow-hidden border-y border-white/10 py-4 bg-black">
      <div
        className="flex whitespace-nowrap w-max"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: direction === 'right' ? 'reverse' : 'normal',
        }}
      >
        {[...items, ...items].map((_, i) => (
          <span key={i} className="flex shrink-0 items-center gap-6 pr-6 md:gap-10 md:pr-10">
            <span className="font-serif italic text-[1.1rem] md:text-[1.4rem] text-white/70 leading-none">
              {text}
            </span>
            <span className="text-red text-xs leading-none">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
