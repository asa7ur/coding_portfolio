'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    number: '01',
    title: 'Design',
    italic: true,
    description:
      'You get an interface people actually want to use — clear, intentional, and on-brand. No generic templates, no guesswork. Every screen designed to communicate something.',
    tags: ['UI / UX', 'Visual Identity', 'Art Direction', 'Typography'],
  },
  {
    number: '02',
    title: 'Development',
    italic: false,
    description:
      'You get a working product, not a prototype. Solid frontend, solid backend, connected and tested. I own the full stack so nothing gets lost between layers.',
    tags: ['React · Angular', 'Next.js', 'Spring Boot', 'TypeScript'],
  },
  {
    number: '03',
    title: 'Architecture',
    italic: true,
    description:
      'You get a system built to last. I think through the structure before writing a single line — so scaling, maintaining, and handing off the project is never a nightmare.',
    tags: ['System Design', 'Docker', 'Database', 'CI / CD'],
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=280%',
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      })

      // 0 → 1
      tl.to('.svc-word-0',  { yPercent: -115, opacity: 0, duration: 1 }, 0.5)
        .to('.svc-info-0',  { opacity: 0, y: -20, duration: 0.6 }, 0.5)
        .fromTo('.svc-word-1',
          { yPercent: 115, opacity: 0 },
          { yPercent: 0,   opacity: 1, duration: 1 }, '<')
        .fromTo('.svc-info-1',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0,  duration: 0.7 }, '-=0.5')
        .to('.svc-bar-fill', { width: '33.3%', duration: 0.4, ease: 'power2.out' }, 0.8)

      // 1 → 2
      tl.to('.svc-word-1',  { yPercent: -115, opacity: 0, duration: 1 }, 2.5)
        .to('.svc-info-1',  { opacity: 0, y: -20, duration: 0.6 }, 2.5)
        .fromTo('.svc-word-2',
          { yPercent: 115, opacity: 0 },
          { yPercent: 0,   opacity: 1, duration: 1 }, '<')
        .fromTo('.svc-info-2',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0,  duration: 0.7 }, '-=0.5')
        .to('.svc-bar-fill', { width: '66.6%', duration: 0.4, ease: 'power2.out' }, 2.8)

      // finish bar
      tl.to('.svc-bar-fill', { width: '100%', duration: 0.4, ease: 'power2.out' }, 4.2)

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full bg-black text-white flex flex-col justify-between overflow-hidden section-px py-14 md:py-20"
    >
      {/* Top label */}
      <div className="flex items-center justify-between">
        <span className="text-white/50 text-xs tracking-[0.35em] uppercase">
          What I do
        </span>
      </div>

      {/* Main content — split layout */}
      <div className="flex-1 flex items-center">
        <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-10 md:gap-16 items-center">

          {/* Left: info panel — fixed height so panels don't shift layout */}
          <div className="relative" style={{ minHeight: 'clamp(14rem, 42vh, 20rem)' }}>
            {services.map(({ number, description, tags }, i) => (
              <div
                key={number}
                className={`svc-info-${i} absolute inset-0 flex flex-col justify-center gap-5`}
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                <span className="font-serif italic text-red/70 text-[clamp(2.5rem,5vw,5rem)] leading-none">
                  {number}
                </span>
                <p className="font-sans text-white/70 text-sm md:text-base leading-relaxed font-light">
                  {description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs tracking-[0.2em] uppercase text-white/55 border border-white/25 px-3 py-1.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right: big animated service word */}
          <div className="relative overflow-hidden" style={{ height: 'clamp(4rem, 9vw, 11rem)' }}>
            {services.map(({ title, italic }, i) => (
              <div
                key={title}
                className={`svc-word-${i} absolute inset-0 flex items-center`}
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                <h2
                  className={`font-serif leading-none tracking-tight text-white uppercase text-[clamp(2.5rem,6vw,8rem)] ${
                    italic ? 'italic font-light' : 'font-light'
                  }`}
                >
                  {title}
                </h2>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Bottom progress bar */}
      <div className="flex flex-col gap-3">
        <div className="w-full h-px bg-white/10 relative overflow-hidden">
          <div className="svc-bar-fill absolute left-0 top-0 h-full bg-red" style={{ width: '0%' }} />
        </div>
        <div className="flex justify-between">
          {services.map(({ title }) => (
            <span key={title} className="text-xs tracking-[0.2em] uppercase text-white/45">
              {title}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
