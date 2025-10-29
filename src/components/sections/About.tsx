import { useEffect, useRef } from 'react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
 
import { profile } from '@/config/profile.config'
import { skills as skillsConfig } from '@/config/skills.config'
import { smoothScrollTo } from '@/utils/helpers'
import gsap from 'gsap'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const previewSkills = skillsConfig.technical.slice(0, 8)

// Keep Home page About concise; full details live on /about

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const { elementRef } = useIntersectionObserver({ threshold: 0.1 })

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current.children,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={elementRef as unknown as React.RefObject<HTMLDivElement>} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">About Duke</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">{profile.overview}</p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Bio */}
          <Card glass>
            <h3 className="text-2xl font-bold mb-4">Professional Overview</h3>
            <p className="text-gray-300 mb-4">{profile.overview}</p>
            <p className="text-gray-300">{profile.philosophy}</p>
          </Card>

          {/* Skills */}
          <Card glass>
            <h3 className="text-2xl font-bold mb-6">Key Skills</h3>
            <div className="flex flex-wrap gap-3">
              {previewSkills.map((skill) => (
                <Badge key={skill} variant="primary">
                  {skill}
                </Badge>
              ))}
            </div>
            <div className="mt-6">
              <button
                onClick={() => smoothScrollTo('projects')}
                className="text-primary-400 hover:text-primary-300 underline"
              >
                View projects
              </button>
            </div>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={() => smoothScrollTo('projects')}
            className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all duration-200"
          >
            Explore Projects
          </button>
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => smoothScrollTo('contact')}
            className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium rounded-xl bg-secondary-500 text-white hover:bg-secondary-600 active:bg-secondary-700 transition-all duration-200"
          >
            Get in Touch
          </button>
        </div>
      </div>
    </section>
  )
}

