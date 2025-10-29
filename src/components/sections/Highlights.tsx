import { useEffect, useRef } from 'react'
import { highlights } from '@/config/highlights.config'
import { Card } from '@/components/ui/Card'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Highlights() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!sectionRef.current) return

    // Animate cards in with stagger
    gsap.fromTo(
      cardsRef.current,
      {
        y: 50,
        opacity: 0,
        scale: 0.9,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    // Animate numbers counting up
    highlights.forEach((highlight, index) => {
      const card = cardsRef.current[index]
      if (!card) return

      const numValue = highlight.value.replace(/\D/g, '')
      if (!numValue) return

      const targetNumber = parseInt(numValue, 10)
      const suffix = highlight.value.replace(/\d/g, '')

      const counter = { value: 0 }
      const numberElement = card.querySelector('.highlight-number')

      if (numberElement) {
        gsap.to(counter, {
          value: targetNumber,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          onUpdate: () => {
            numberElement.textContent = Math.floor(counter.value) + suffix
          },
        })
      }
    })
  }, [])

  return (
    <section ref={sectionRef} className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
        {highlights.map((h, index) => (
          <Card
            key={h.label}
            glass
            className="highlight-card transform transition-all duration-300 hover:scale-105"
            ref={(el) => (cardsRef.current[index] = el)}
          >
            <div className="text-center">
              <div className="highlight-number text-3xl font-extrabold text-white bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                {h.value}
              </div>
              <div className="text-gray-400 text-sm mt-1">{h.label}</div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}


