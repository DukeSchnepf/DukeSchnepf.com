import { useEffect, useRef } from 'react'
import { highlights } from '@/config/highlights.config'
import { Card } from '@/components/ui/Card'
import gsap from 'gsap'

export function Highlights() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const cards = sectionRef.current.querySelectorAll('.highlight-card')

    gsap.from(cards, {
      opacity: 0,
      y: 24,
      scale: 0.96,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 85%',
      },
    })
  }, [])

  return (
    <section ref={sectionRef} className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
        {highlights.map((h) => (
          <Card key={h.label} glass className="highlight-card">
            <div className="text-center">
              <div className="text-3xl font-extrabold text-white">{h.value}</div>
              <div className="text-gray-400 text-sm mt-1">{h.label}</div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}


