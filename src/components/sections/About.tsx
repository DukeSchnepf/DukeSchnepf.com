import { useEffect, useRef } from 'react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
 
import { profile } from '@/config/profile.config'
import { skills as skillsConfig } from '@/config/skills.config'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

gsap.registerPlugin(ScrollTrigger)

const previewSkills = skillsConfig.technical.slice(0, 8)

// Keep Home page About concise; full details live on /about

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const leftCardRef = useRef<HTMLDivElement>(null)
  const rightCardRef = useRef<HTMLDivElement>(null)
  const { elementRef } = useIntersectionObserver({ threshold: 0.1 })

  useEffect(() => {
    if (!sectionRef.current) return

    // Parallax effect on header
    if (headerRef.current) {
      gsap.to(headerRef.current, {
        y: 50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }

    // Slide in from left
    if (leftCardRef.current) {
      gsap.fromTo(
        leftCardRef.current,
        {
          x: -100,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: leftCardRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }

    // Slide in from right
    if (rightCardRef.current) {
      gsap.fromTo(
        rightCardRef.current,
        {
          x: 100,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rightCardRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Stagger skill badges
      const badges = rightCardRef.current.querySelectorAll('.skill-badge')
      gsap.fromTo(
        badges,
        {
          scale: 0,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: rightCardRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }

    // Animate CTA buttons
    const ctaButtons = sectionRef.current.querySelectorAll('.cta-button')
    gsap.fromTo(
      ctaButtons,
      {
        y: 30,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ctaButtons[0],
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-400 bg-clip-text text-transparent">
            About Duke
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">{profile.overview}</p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Bio */}
          <Card ref={leftCardRef} glass hover animatedBorder>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
              Professional Overview
            </h3>
            <p className="text-gray-300 mb-4">{profile.overview}</p>
            <p className="text-gray-300">{profile.philosophy}</p>
          </Card>

          {/* Skills */}
          <Card ref={rightCardRef} glass hover animatedBorder>
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
              Key Skills
            </h3>
            <div className="flex flex-wrap gap-3">
              {previewSkills.map((skill) => (
                <Badge key={skill} variant="primary" className="skill-badge">
                  {skill}
                </Badge>
              ))}
            </div>
            <div className="mt-6">
              <Link to="/skills" className="text-primary-400 hover:text-primary-300 underline">
                View full skills →
              </Link>
            </div>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center space-y-6">
          <div className="cta-button">
            <Link
              to="/experience"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-primary-500/50"
            >
              Explore Experience
            </Link>
          </div>

          <div className="cta-button">
            <Link
              to="/resume"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-xl bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-200 border border-white/20"
            >
              View Resume
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

