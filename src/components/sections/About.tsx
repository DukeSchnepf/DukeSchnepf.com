import { useEffect, useRef } from 'react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { siteConfig } from '@/config/site.config'
import gsap from 'gsap'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const skills = [
  'React',
  'TypeScript',
  'Node.js',
  'Next.js',
  'Three.js',
  'Tailwind CSS',
  'PostgreSQL',
  'MongoDB',
]

const timeline = [
  {
    year: '2024',
    title: 'Senior Developer',
    company: 'Tech Company',
    description: 'Leading development of modern web applications',
  },
  {
    year: '2022',
    title: 'Full Stack Developer',
    company: 'Startup Inc',
    description: 'Built scalable applications with React and Node.js',
  },
  {
    year: '2020',
    title: 'Junior Developer',
    company: 'Digital Agency',
    description: 'Started my journey in web development',
  },
]

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
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">About Me</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Learn more about my background, skills, and experience
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Bio */}
          <Card glass>
            <h3 className="text-2xl font-bold mb-4">Bio</h3>
            <p className="text-gray-300 mb-4">
              I'm a passionate full-stack developer with a love for creating beautiful,
              functional web applications. With years of experience in modern web technologies,
              I specialize in building scalable solutions that solve real-world problems.
            </p>
            <p className="text-gray-300">
              When I'm not coding, you can find me exploring new technologies, contributing to
              open-source projects, or sharing knowledge with the developer community.
            </p>
          </Card>

          {/* Skills */}
          <Card glass>
            <h3 className="text-2xl font-bold mb-6">Skills & Technologies</h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <Badge key={skill} variant="primary">
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>
        </div>

        {/* Timeline */}
        <div>
          <h3 className="text-2xl font-bold mb-8 text-center">Experience</h3>
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <Card key={index} glass hover>
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="text-primary-500 font-bold text-lg">{item.year}</div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                    <p className="text-gray-400 mb-1">{item.company}</p>
                    <p className="text-gray-300">{item.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href={siteConfig.resume}
            download
            className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium rounded-xl bg-secondary-500 text-white hover:bg-secondary-600 active:bg-secondary-700 transition-all duration-200"
          >
            Download Resume
          </a>
        </div>
      </div>
    </section>
  )
}

