import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { highlights } from '@/config/highlights.config'
import { Card } from '@/components/ui/Card'

export function Highlights() {
  const sectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.highlight-header', {
        opacity: 0,
        y: 32,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.highlight-header',
          start: 'top 80%',
        },
      })

      ScrollTrigger.batch('.highlight-card', {
        start: 'top 85%',
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.12,
          }),
        onLeaveBack: (batch) =>
          gsap.to(batch, {
            opacity: 0,
            y: 30,
            scale: 0.96,
            overwrite: true,
          }),
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10">
        <div className="mx-auto h-full max-w-5xl rounded-[3rem] bg-gradient-to-br from-white/5 via-white/10 to-transparent blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto space-y-12">
        <div className="highlight-header text-center space-y-4">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-gray-300">
            Momentum
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Experience at a Glance</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Impact metrics from leading operations across global gaming communities, multi-platform
            launches, and high-performing creative teams.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {highlights.map((h) => (
            <Card
              key={h.label}
              glass
              className="highlight-card h-full translate-y-6 scale-95 opacity-0 border-white/20 bg-white/5 text-left"
            >
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-400">{h.label}</p>
                <p className="text-3xl font-black text-white sm:text-4xl">{h.value}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}


