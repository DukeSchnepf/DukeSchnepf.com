import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { Scene } from '@/features/three-scene'
import { siteConfig } from '@/config/site.config'

const heroMetrics = [
  { label: 'Years Leading Creative Ops', value: '7+' },
  { label: 'Products Launched', value: '28' },
  { label: 'Communities Energised', value: '50K+' },
]

const heroBadges = ['Product Strategy', 'Live Ops', 'Community Growth']

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })

      timeline
        .from('.hero-headline', {
          y: 60,
          opacity: 0,
          duration: 0.9,
        })
        .from(
          '.hero-subtitle',
          {
            y: 30,
            opacity: 0,
            duration: 0.7,
          },
          '-=0.45'
        )
        .from(
          '.hero-cta .hero-cta-item',
          {
            y: 24,
            opacity: 0,
            duration: 0.6,
            stagger: 0.12,
          },
          '-=0.4'
        )

      gsap.from('.hero-metric', {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power2.out',
        delay: 0.2,
      })

      gsap.utils.toArray<HTMLElement>('.hero-floating').forEach((element, index) => {
        gsap.to(element, {
          y: index % 2 === 0 ? -18 : 18,
          x: index % 2 === 0 ? 12 : -12,
          rotate: index % 2 === 0 ? 6 : -6,
          duration: 4.5 + index,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 opacity-40">
        <Scene />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="hero-floating absolute -top-24 left-16 h-64 w-64 rounded-full bg-primary-500/20 blur-3xl" />
        <div className="hero-floating absolute -bottom-32 right-12 h-72 w-72 rounded-full bg-secondary-500/20 blur-3xl" />
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur hero-cta-item">
          <span className="h-2 w-2 rounded-full bg-primary-400 animate-pulse" />
          <span className="text-sm uppercase tracking-[0.3em] text-gray-300">
            {siteConfig.title}
          </span>
        </div>

        <h1 className="hero-headline text-5xl sm:text-6xl lg:text-7xl font-black leading-tight bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
          {siteConfig.name}
        </h1>

        <p className="hero-subtitle text-lg sm:text-2xl text-gray-300 max-w-3xl mx-auto">
          Orchestrating seamless player experiences across platforms, launching products that scale,
          and championing teams to deliver unforgettable live events.
        </p>

        <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/experience"
            className="hero-cta-item inline-flex items-center gap-3 px-8 py-3 rounded-full bg-primary-500 text-white text-lg font-semibold shadow-lg shadow-primary-500/30 hover:bg-primary-500/90 transition"
          >
            Explore Experience
            <span aria-hidden className="text-2xl">→</span>
          </Link>
          <Link
            to="/resume"
            className="hero-cta-item inline-flex items-center gap-3 px-8 py-3 rounded-full bg-white/10 text-white text-lg font-semibold hover:bg-white/20 transition"
          >
            Download Resume
          </Link>
          <a
            href="#contact"
            className="hero-cta-item inline-flex items-center gap-2 px-8 py-3 rounded-full border border-white/20 text-white/90 text-lg font-semibold hover:border-primary-400/70 hover:text-white transition"
          >
            Let&apos;s Collaborate
          </a>
        </div>

        <div className="hidden md:flex justify-center gap-4 text-sm text-white/90">
          {heroBadges.map((badge) => (
            <div
              key={badge}
              className="hero-floating inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-5 py-2 backdrop-blur"
            >
              <span className="h-2 w-2 rounded-full bg-secondary-400" />
              {badge}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
          {heroMetrics.map((metric) => (
            <div
              key={metric.label}
              className="hero-metric rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 text-left"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-2">{metric.label}</p>
              <p className="text-3xl font-bold text-white">{metric.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="hero-floating flex flex-col items-center text-gray-400">
          <span className="text-xs uppercase tracking-[0.5em]">Scroll</span>
          <div className="mt-3 h-12 w-[2px] overflow-hidden rounded-full bg-white/10">
            <div className="h-8 w-full origin-top scale-y-0 bg-gradient-to-b from-primary-400 to-secondary-400 animate-[scrollPulse_2.4s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>
    </section>
  )
}

