import { useEffect, useRef } from 'react'
import { SEO } from '@/components/SEO'
import { Card } from '@/components/ui/Card'
import { experience } from '@/config/experience.config'
import { profile } from '@/config/profile.config'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function ExperiencePage() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!timelineRef.current) return

    // Animate timeline line
    gsap.fromTo(
      '.timeline-line',
      { scaleY: 0 },
      {
        scaleY: 1,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    // Animate each experience item
    itemsRef.current.forEach((item, index) => {
      if (!item) return

      const direction = index % 2 === 0 ? -100 : 100

      gsap.fromTo(
        item,
        {
          x: direction,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Animate timeline dots
      const dot = item.querySelector('.timeline-dot')
      if (dot) {
        gsap.fromTo(
          dot,
          { scale: 0, rotation: 180 },
          {
            scale: 1,
            rotation: 0,
            duration: 0.5,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }
    })
  }, [])

  return (
    <>
      <SEO title="Experience" description={`${profile.name} — Professional experience`} image={profile.headshot} />
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-12 text-center">Professional Experience</h1>
        
        <div ref={timelineRef} className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-secondary-500 transform -translate-x-1/2 timeline-line origin-top" />
          
          <div className="space-y-12">
            {experience.map((item, index) => (
              <div
                key={`${item.company}-${item.role}`}
                ref={(el) => (itemsRef.current[index] = el)}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                  <div className="timeline-dot w-4 h-4 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 ring-4 ring-black shadow-lg" />
                </div>

                {/* Content */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'}`}>
                  <Card glass hover className="transform transition-all duration-300 hover:scale-105">
                    <div className="space-y-2">
                      <h2 className="text-xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                        {item.role}
                      </h2>
                      <div className="text-gray-300 font-medium">{item.company}</div>
                      <div className="text-gray-400 text-sm">{item.start} – {item.end}</div>
                    </div>
                    <ul className={`mt-4 text-gray-300 space-y-2 text-sm ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      {item.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary-500 mt-1">•</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>

                {/* Spacer for the other side */}
                <div className="hidden md:block md:w-5/12" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}


