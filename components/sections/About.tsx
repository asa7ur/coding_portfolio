'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { display: '10+', numValue: 10, suffix: '+', label: 'Projects shipped' },
  { display: '2+',  numValue: 3,  suffix: '+', label: 'Years of craft'   },
]

const stack = ['React', 'Angular', 'Next.js', 'TypeScript', 'Java', 'Spring Boot', 'Node.js', 'Docker']

export default function About() {
  const sectionRef  = useRef<HTMLElement>(null)
  const statRefs    = useRef<Array<HTMLSpanElement | null>>([])

  useEffect(() => {
    const ctx = gsap.context(() => {

      // — Headline word reveal —
      gsap.from('.about-word', {
        yPercent: 110,
        stagger: 0.07,
        duration: 1.1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.about-headline',
          start: 'top 80%',
        },
      })

      // — Body fade in —
      gsap.from('.about-body', {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-body',
          start: 'top 82%',
        },
      })

      // — Stats: fade + counter animation —
      gsap.from('.about-stat', {
        opacity: 0,
        y: 20,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-stats',
          start: 'top 85%',
        },
      })

      stats.forEach(({ numValue, suffix }, i) => {
        const el = statRefs.current[i]
        if (!el) return
        const obj = { val: 0 }
        gsap.to(obj, {
          val: numValue,
          duration: 1.8,
          ease: 'power2.out',
          delay: i * 0.15,
          onUpdate() { el.textContent = Math.round(obj.val) + suffix },
          scrollTrigger: { trigger: '.about-stats', start: 'top 85%' },
        })
      })

      // — Stack tags slide in from left —
      gsap.from('.about-tag', {
        xPercent: -15,
        opacity: 0,
        stagger: 0.05,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-stack',
          start: 'top 88%',
        },
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-white text-black py-20 md:py-36 section-px overflow-hidden">

      <div className="mb-8 md:mb-12">
        <span className="text-black/50 text-xs tracking-[0.35em] uppercase">
          About —
        </span>
      </div>

      {/* Headline */}
      <div className="about-headline mb-16 md:mb-28">
        {[
          { text: 'Making Ideas',  style: 'font-serif font-light uppercase text-[clamp(3.5rem,9vw,10rem)] leading-[0.9]' },
          { text: 'Come Alive',    style: 'font-serif italic font-light text-[clamp(3rem,8vw,9rem)] leading-[0.9] text-red' },
          { text: 'Through Code', style: 'font-serif font-light uppercase text-[clamp(3.5rem,9vw,10rem)] leading-[0.9]' },
          { text: '& Design',     style: 'font-serif italic font-light text-[clamp(3rem,8vw,9rem)] leading-[0.9] text-red' },
        ].map(({ text, style }) => (
          <div key={text} className="overflow-hidden">
            <p className={`about-word ${style}`}>{text}</p>
          </div>
        ))}
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-14 md:gap-24 items-start">

        {/* Left — bio + stack */}
        <div className="about-body space-y-7 max-w-2xl">
          <p className="font-sans text-xl text-black/70 leading-relaxed font-light">
            I started with design — layouts, typography, making things look right.
            Then I wanted to build what I was designing, so I went deep into code.
            Now I do both, and I think that&apos;s the point.
          </p>
          <p className="font-sans text-base text-black/55 leading-relaxed">
            I work best on projects where the visual and the technical are equally important —
            where a good idea deserves a well-built home. I&apos;m detail-obsessed,
            a bit perfectionist, and I don&apos;t ship things I wouldn&apos;t use myself.
          </p>

          {/* Stack tags */}
          <div className="about-stack flex flex-wrap gap-2 pt-2">
            {stack.map((tech) => (
              <span
                key={tech}
                className="about-tag text-xs tracking-widest uppercase text-black/55 border border-black/20 px-3 py-1.5 hover:border-red hover:text-red transition-colors duration-200"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="pt-2">
            <a
              href="mailto:asa7ur@gmail.com"
              className="inline-flex items-center gap-2 text-sm tracking-[0.2em] uppercase text-black border-b border-black/30 pb-0.5 hover:border-red hover:text-red transition-colors duration-300"
              data-cursor-hover
            >
              <span className="w-1 h-1 bg-red" />
              Say Hello
            </a>
          </div>
        </div>

        {/* Right — stats */}
        <div className="about-stats flex md:flex-col gap-10 md:gap-0 md:divide-y divide-black/10">
          {stats.map(({ display, label }, i) => (
            <div key={label} className="about-stat md:py-8 first:pt-0 last:pb-0 min-w-[120px]">
              <span
                ref={(el) => { statRefs.current[i] = el }}
                className="block font-serif text-[4rem] font-light leading-none text-red mb-1"
              >
                {display}
              </span>
              <span className="font-sans text-xs tracking-[0.2em] uppercase text-black/50">
                {label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
