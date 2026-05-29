'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const links = [
  { label: 'Instagram', href: 'https://www.instagram.com/asa7ur/' },
  { label: 'GitHub',    href: 'https://github.com/asa7ur' },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/garik-asatryan-077a07275/' },
]

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // — CTA lines reveal independently —
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.footer-cta-wrap',
          start: 'top 85%',
        },
      })
      tl.from('.footer-cta-line-1', { yPercent: 110, duration: 1.1, ease: 'power4.out' })
        .from('.footer-cta-line-2', { yPercent: 110, duration: 1.1, ease: 'power4.out' }, '-=0.75')

      // — Bottom row staggered entrance —
      gsap.from('.footer-bottom-item', {
        opacity: 0,
        y: 14,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.footer-bottom',
          start: 'top bottom',
          once: true,
        },
      })

      // — Social links stagger —
      gsap.from('.footer-social-link', {
        opacity: 0,
        x: -10,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.footer-bottom',
          start: 'top bottom',
          once: true,
        },
      })

    }, sectionRef)

    // Recalculate positions after images/fonts load
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)

    return () => {
      ctx.revert()
      window.removeEventListener('load', onLoad)
    }
  }, [])

  return (
    <footer
      ref={sectionRef}
      className="relative bg-black text-white overflow-hidden pt-24 md:pt-40 pb-16 md:pb-16 section-px"
    >
      {/* Availability */}
      <div className="mb-10 md:mb-8 flex items-center gap-3">
        <span className="text-white/50 text-xs tracking-[0.35em] uppercase">
          Available for work
        </span>
        <span className="inline-block w-1.5 h-1.5 bg-red" />
      </div>

      {/* CTA headline — each line has its own clip container */}
      <div className="footer-cta-wrap mb-14 md:mb-20">
        <a
          href="mailto:asa7ur@gmail.com"
          className="block font-serif font-light leading-[0.88] tracking-tight group"
          data-cursor-hover
        >
          <div className="overflow-hidden">
            <span className="footer-cta-line-1 block text-[clamp(3.5rem,10vw,12rem)] uppercase text-white group-hover:text-red transition-colors duration-500">
              Let&apos;s Work
            </span>
          </div>
          <div className="overflow-hidden">
            <span className="footer-cta-line-2 block text-[clamp(3rem,9vw,11rem)] italic text-red">
              Together
            </span>
          </div>
        </a>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10 mb-12" />

      {/* Bottom row */}
      <div className="footer-bottom flex flex-col md:flex-row items-start md:items-center justify-between gap-10 md:gap-8">
        <div className="footer-bottom-item">
          <p className="font-serif text-lg font-light text-white/80">Garik Asatryan</p>
          <p className="text-xs tracking-[0.25em] uppercase text-white/40 mt-2">
            Fullstack Creative — Design &amp; Development
          </p>
        </div>

        <div className="flex flex-wrap gap-8 md:gap-8">
          {links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link text-xs tracking-[0.25em] uppercase text-white/55 hover:text-red transition-colors duration-300"
              data-cursor-hover
            >
              {label}
            </a>
          ))}
        </div>

        <p className="footer-bottom-item text-xs tracking-[0.2em] uppercase text-white/35 pt-2 md:pt-0 border-t border-white/10 w-full md:w-auto md:border-none">
          © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
