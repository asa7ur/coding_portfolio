'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  { id: 1, title: 'Music festival',     tags: ['Angular', 'TypeScript', 'Java', 'Spring Boot'], year: '2026', image: '/assets/1.png', links: [{ label: 'Frontend', url: 'https://github.com/asa7ur/valkyria-frontend' }, { label: 'Backend', url: 'https://github.com/asa7ur/valkyria-backend' }] },
  { id: 2, title: 'Art Portfolio',      tags: ['Next.js', 'React', 'Docker'],                   year: '2026', image: '/assets/2.png', links: [{ label: 'GitHub', url: 'https://github.com/asa7ur/asa7ur_art_portfolio' }] },
  { id: 3, title: 'Pastry Gallery',     tags: ['React', 'Node.js', 'Airtable'],                 year: '2024', image: '/assets/3.png', links: [{ label: 'GitHub', url: 'https://github.com/asa7ur/Tartas_Karina' }] },
  { id: 4, title: 'Real Estate Agency', tags: ['Java', 'Spring Boot', 'Docker'],                year: '2025', image: '/assets/4.png', links: [{ label: 'GitHub', url: 'https://github.com/asa7ur/dwese-inmobiliaria' }] },
  { id: 5, title: 'Canine Training',    tags: ['React', 'Vite'],                                year: '2024', image: '/assets/5.png', links: [{ label: 'GitHub', url: 'https://github.com/asa7ur/Educadores_Caninos' }] },
  { id: 6, title: 'Weather Forecast',   tags: ['TypeScript', 'Tailwind', 'Open-Meteo API'],     year: '2026', image: '/assets/6.png', links: [{ label: 'GitHub', url: 'https://github.com/asa7ur/tender-app' }] },
]

const col0 = projects.filter((_, i) => i % 3 === 0)
const col1 = projects.filter((_, i) => i % 3 === 1)
const col2 = projects.filter((_, i) => i % 3 === 2)

function ProjectCard({ project }: { project: typeof projects[0] }) {
  return (
    <div className="work-card group cursor-none" data-cursor-hover>

      {/* ── Desktop: image-only by default, info fades in on hover ── */}
      <div className="hidden md:block relative overflow-hidden aspect-video bg-white/5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={project.title}
          className="work-img-desktop w-full h-full object-cover object-top"
        />

        {/* Number */}
        <span className="absolute top-3 right-4 font-serif text-white/40 text-xs select-none z-10">
          0{project.id}
        </span>

        {/* Info panel — fades + slides in on hover */}
        <div className="work-info-panel absolute inset-x-0 bottom-0 z-20 pt-8 px-4 pb-4 bg-gradient-to-t from-black/95 via-black/75 to-transparent">
          <div className="flex items-baseline justify-between gap-3 mb-3">
            <h3 className="font-sans text-white text-sm font-normal uppercase tracking-widest">
              {project.title}
            </h3>
            <span className="font-serif italic text-white/40 text-sm shrink-0">
              {project.year}
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            {project.tags.map((tag) => (
              <span key={tag} className="text-xs tracking-widest uppercase text-white/50 bg-white/[0.06] px-2.5 py-1">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4 border-t border-white/[0.1] pt-3">
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs tracking-widest uppercase text-white/50 hover:text-red transition-colors duration-200"
              >
                {link.label}
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* ── Mobile: info always visible over image ── */}
      <div className="md:hidden relative overflow-hidden aspect-video bg-black">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-top"
        />

        {/* Number */}
        <span className="absolute top-3 right-4 font-serif text-white/40 text-xs select-none z-10">
          0{project.id}
        </span>

        {/* Info panel — always visible */}
        <div className="absolute inset-x-0 bottom-0 pt-8 px-4 pb-4 bg-gradient-to-t from-black via-black/75 to-transparent">
          <div className="flex items-baseline justify-between gap-3 mb-3">
            <h3 className="font-sans text-white text-sm font-normal uppercase tracking-widest">
              {project.title}
            </h3>
            <span className="font-serif italic text-white/40 text-sm shrink-0">
              {project.year}
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            {project.tags.map((tag) => (
              <span key={tag} className="text-xs tracking-widest uppercase text-white/50 bg-white/[0.06] px-2.5 py-1">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4 border-t border-white/[0.1] pt-3">
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs tracking-widest uppercase text-white/50 transition-colors duration-200"
              >
                {link.label}
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null)
  const ctaBtnRef  = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // — Heading reveal —
      gsap.from('.work-heading', {
        yPercent: 100,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.work-heading-wrap',
          start: 'top 85%',
        },
      })

      // — Cards entrance (trigger único en el grid para no interferir con el parallax) —
      // trigger en la sección (no en .work-parallax-grid que es display:none en móvil)
      gsap.from('.work-card', {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      })

      // — Parallax columns —
      const st = {
        trigger: '.work-parallax-grid',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2,
      }
      gsap.to('.work-col-left',  { y: -520, ease: 'none', scrollTrigger: st })
      gsap.to('.work-col-mid',   { y: -160, ease: 'none', scrollTrigger: st })
      gsap.to('.work-col-right', { y:  220, ease: 'none', scrollTrigger: st })

    }, sectionRef)

    // — Magnetic CTA button (desktop only) —
    const btn = ctaBtnRef.current
    if (btn && !window.matchMedia('(pointer: coarse)').matches) {
      const onMove = (e: MouseEvent) => {
        const r  = btn.getBoundingClientRect()
        const dx = (e.clientX - (r.left + r.width  / 2)) * 0.4
        const dy = (e.clientY - (r.top  + r.height / 2)) * 0.4
        gsap.to(btn, { x: dx, y: dy, duration: 0.3, ease: 'power2.out' })
      }
      const onLeave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' })
      btn.addEventListener('mousemove', onMove)
      btn.addEventListener('mouseleave', onLeave)
      return () => {
        ctx.revert()
        btn.removeEventListener('mousemove', onMove)
        btn.removeEventListener('mouseleave', onLeave)
      }
    }

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-black section-px" style={{ paddingTop: 'clamp(2.5rem, 4vw, 4rem)', paddingBottom: '2rem' }}>
      <div className="mb-12 md:mb-20">
        <span className="text-red text-xs tracking-[0.3em] uppercase block mb-3">
          Selected
        </span>
        <div className="work-heading-wrap overflow-hidden">
          <h2 className="work-heading font-serif text-[clamp(3rem,8vw,7rem)] font-light leading-none text-white">
            Work
          </h2>
        </div>
      </div>

      {/* Parallax column grid — desktop */}
      <div className="work-parallax-grid hidden md:flex gap-6 items-start">
        <div className="work-col-left flex-1 flex flex-col gap-6" style={{ paddingTop: '300px' }}>
          {col0.map((p) => <ProjectCard key={p.id} project={p} />)}
        </div>
        <div className="work-col-mid flex-1 flex flex-col gap-6" style={{ paddingTop: '150px' }}>
          {col1.map((p) => <ProjectCard key={p.id} project={p} />)}
        </div>
        <div className="work-col-right flex-1 flex flex-col gap-6 pt-0">
          {col2.map((p) => <ProjectCard key={p.id} project={p} />)}
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden flex flex-col gap-6">
        {projects.map((p) => <ProjectCard key={p.id} project={p} />)}
      </div>

      <div className="flex justify-center" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
        <a
          ref={ctaBtnRef}
          href="https://github.com/asa7ur"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-4 border border-white/20 px-14 py-6 text-white/60 text-sm tracking-[0.25em] uppercase hover:border-red hover:text-white transition-all duration-300"
          data-cursor-hover
        >
          <span className="w-2 h-2 bg-red group-hover:scale-150 transition-transform" />
          See All Work
        </a>
      </div>
    </section>
  )
}
