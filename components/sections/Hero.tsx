'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type OrbCfg = {
  cls:    string
  size:   number   // tamaño desktop (px @ 1440px viewport)
  blur:   number
  color:  string
  magnet: number
}

const SPEED = 120

const ORBS: OrbCfg[] = [
  // — 4 grandes —
  { cls: 'orb-0', size: 820, blur: 65, color: 'rgba(185,18,18,0.62)', magnet: 0.62 },
  { cls: 'orb-1', size: 640, blur: 55, color: 'rgba(195,12,12,0.52)', magnet: 0.74 },
  { cls: 'orb-2', size: 480, blur: 50, color: 'rgba(200,8,8,0.48)',   magnet: 0.84 },
  { cls: 'orb-3', size: 560, blur: 58, color: 'rgba(175,15,15,0.55)', magnet: 0.70 },
  // — 5 pequeños —
  { cls: 'orb-4', size: 220, blur: 30, color: 'rgba(210,6,6,0.58)',   magnet: 1.00 },
  { cls: 'orb-5', size: 165, blur: 24, color: 'rgba(215,5,5,0.52)',   magnet: 1.12 },
  { cls: 'orb-6', size: 135, blur: 20, color: 'rgba(200,8,8,0.50)',   magnet: 1.20 },
  { cls: 'orb-7', size: 185, blur: 26, color: 'rgba(205,7,7,0.54)',   magnet: 1.06 },
  { cls: 'orb-8', size: 150, blur: 22, color: 'rgba(218,5,5,0.48)',   magnet: 1.16 },
]

// clamp(min, vw, max) — referencia 1440px, mínimo 45% del tamaño desktop en móvil
const orbWidth  = (s: number) => `clamp(${Math.round(s * 0.45)}px, ${(s / 14.4).toFixed(1)}vw, ${s}px)`
const orbMargin = (s: number) => `clamp(-${Math.round(s / 2)}px, -${(s / 28.8).toFixed(1)}vw, -${Math.round(s * 0.225)}px)`

export default function Hero() {
  const sectionRef     = useRef<HTMLElement>(null)
  const orbEls         = useRef<(HTMLDivElement | null)[]>([])
  const mouseActiveRef = useRef(false)
  const convergeRef    = useRef<ReturnType<typeof setTimeout> | null>(null)
  const mouseXRef      = useRef(0)
  const mouseYRef      = useRef(0)

  useEffect(() => {
    const W = window.innerWidth
    const H = window.innerHeight

    // — Escalar blur según viewport (mínimo 55% para que los orbs sigan viéndose en móvil) —
    const blurScale = Math.max(Math.min(W / 1440, 1), 0.55)
    ORBS.forEach(({ blur }, i) => {
      const el = orbEls.current[i]
      if (el) el.style.filter = `blur(${Math.round(blur * blurScale)}px)`
    })

    // — Posición actual GSAP de un orb —
    const getPos = (cls: string) => {
      const el = sectionRef.current?.querySelector(`.${cls}`)
      if (!el) return { x: 0, y: 0 }
      return { x: gsap.getProperty(el, 'x') as number, y: gsap.getProperty(el, 'y') as number }
    }

    // — Mover a velocidad constante —
    const moveTo = (cls: string, tx: number, ty: number, onDone?: () => void) => {
      const { x, y } = getPos(cls)
      const dur = Math.max(Math.hypot(tx - x, ty - y) / SPEED, 0.05)
      gsap.to(`.${cls}`, { x: tx, y: ty, duration: dur, ease: 'none', overwrite: true, onComplete: onDone })
    }

    // ── Idle wander ───────────────────────────────────────────────────────────
    // Rango máximo donde el núcleo del gradiente (65% del radio) no sale del viewport
    const safeRange = (i: number) => {
      const half = (orbEls.current[i]?.offsetWidth ?? 200) / 2
      const core = half * 0.65
      return {
        x: Math.max(W / 2 - core, 20),
        y: Math.max(H / 2 - core, 20),
      }
    }

    const loopOrb = (cls: string, i: number) => {
      if (mouseActiveRef.current) return
      const { x: rx, y: ry } = safeRange(i)
      moveTo(
        cls,
        gsap.utils.random(-rx, rx),
        gsap.utils.random(-ry, ry),
        () => loopOrb(cls, i)
      )
    }

    const startIdle = () => ORBS.forEach(({ cls }, i) => gsap.delayedCall(i * 0.3, () => loopOrb(cls, i)))
    const stopIdle  = () => ORBS.forEach(({ cls }) => gsap.killTweensOf(`.${cls}`, 'x,y'))

    const ctx = gsap.context(() => {

      // — Posiciones iniciales aleatorias dentro del rango seguro —
      ORBS.forEach(({ cls }, i) => {
        const { x: rx, y: ry } = safeRange(i)
        gsap.set(`.${cls}`, {
          x: gsap.utils.random(-rx, rx),
          y: gsap.utils.random(-ry, ry),
        })
      })

      gsap.from('.hero-word', { yPercent: 110, stagger: 0.1, duration: 1.2, ease: 'power4.out', delay: 0.3 })
      gsap.from('.hero-meta-item', { opacity: 0, y: 10, stagger: 0.18, duration: 0.9, ease: 'power3.out', delay: 1.5 })

      gsap.set('.hero-scroll-line', { yPercent: -100 })
      gsap.fromTo('.hero-scroll-line', { yPercent: -100 }, { yPercent: 100, duration: 1.6, ease: 'none', repeat: -1, delay: 1.8 })

      gsap.to('.hero-title', {
        yPercent: -20, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true },
      })

    }, sectionRef)

    startIdle()

    // ── Mouse magnet ──────────────────────────────────────────────────────────
    const section = sectionRef.current!

    const convergeToMouse = () => ORBS.forEach(({ cls }) => moveTo(cls, mouseXRef.current, mouseYRef.current))

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      mouseXRef.current = e.clientX - rect.left  - rect.width  / 2
      mouseYRef.current = e.clientY - rect.top   - rect.height / 2

      if (!mouseActiveRef.current) { mouseActiveRef.current = true; stopIdle() }
      if (convergeRef.current) clearTimeout(convergeRef.current)

      ORBS.forEach(({ cls, magnet }) => moveTo(cls, mouseXRef.current * magnet, mouseYRef.current * magnet))
      convergeRef.current = setTimeout(convergeToMouse, 1800)
    }

    const onLeave = () => {
      mouseActiveRef.current = false
      if (convergeRef.current) clearTimeout(convergeRef.current)
      startIdle()
    }

    // Solo activar en dispositivos con puntero fino (desktop)
    if (!window.matchMedia('(pointer: coarse)').matches) {
      section.addEventListener('mousemove', onMove)
      section.addEventListener('mouseleave', onLeave)
    }

    return () => {
      ctx.revert()
      section.removeEventListener('mousemove', onMove)
      section.removeEventListener('mouseleave', onLeave)
      if (convergeRef.current) clearTimeout(convergeRef.current)
      stopIdle()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Orbs — tamaño relativo al viewport via clamp */}
      <div className="absolute inset-0 pointer-events-none">
        {ORBS.map(({ cls, size, color }, i) => (
          <div
            key={cls}
            ref={(el) => { orbEls.current[i] = el }}
            className={`${cls} absolute rounded-full`}
            style={{
              width:      orbWidth(size),
              height:     orbWidth(size),
              left:       '50%',
              top:        '50%',
              marginLeft: orbMargin(size),
              marginTop:  orbMargin(size),
              background: `radial-gradient(circle, ${color} 0%, transparent 65%)`,
              // filter se aplica en useEffect escalado por viewport
            }}
          />
        ))}
      </div>


      <div className="hero-title relative z-10 text-center px-8 select-none">
        <div className="overflow-hidden">
          <h1 className="hero-word font-serif text-[clamp(3.5rem,8vw,12rem)] font-light leading-[0.9] text-white uppercase tracking-tight">
            Garik Asatryan
          </h1>
        </div>
        <div className="overflow-hidden mt-3 md:mt-4">
          <p className="hero-word font-serif text-[clamp(1.8rem,6vw,8rem)] italic font-light text-red leading-none">
            Design &amp; Development
          </p>
        </div>
      </div>

      <div className="absolute bottom-8 md:bottom-10 w-full flex justify-between items-end section-px z-10">
        <span className="hero-meta-item text-xs tracking-[0.25em] uppercase text-white/50">
          Portfolio {new Date().getFullYear()}
        </span>
        <span className="hero-meta-item text-xs tracking-[0.25em] uppercase text-white/50">
          Scroll to explore
        </span>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-16 overflow-hidden z-10">
        <div className="hero-scroll-line w-full h-full bg-red opacity-70" />
      </div>
    </section>
  )
}
