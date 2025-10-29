import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { profile } from '@/config/profile.config'
import { skills as skillsConfig } from '@/config/skills.config'

const previewSkills = skillsConfig.technical.slice(0, 8)

const focusAreas = [
  {
    title: 'Creative & Live Ops Leadership',
    description:
      'Guides cross-functional teams delivering launches, seasonal content, and live programming that keeps players engaged.',
  },
  {
    title: 'Community Growth Partnerships',
    description:
      'Builds alliances with brands, creators, and players to seed vibrant communities both in-person and online.',
  },
  {
    title: 'Data-Informed Strategy',
    description:
      'Translates analytics and player feedback into clear roadmaps for product improvements and operational efficiency.',
  },
]

export function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-header', {
        y: 32,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.about-header',
          start: 'top 85%',
        },
      })

      ScrollTrigger.batch('.about-reveal', {
        start: 'top 85%',
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            stagger: 0.15,
          }),
        onLeaveBack: (batch) =>
          gsap.to(batch, {
            opacity: 0,
            y: 24,
            overwrite: true,
          }),
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-x-0 top-0 -z-10 mx-auto h-[480px] max-w-6xl rounded-[3rem] bg-gradient-to-br from-secondary-500/10 via-white/5 to-transparent blur-3xl" />

      <div className="max-w-6xl mx-auto space-y-16">
        <div className="about-header text-center space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold text-white">About Duke</h2>
          <p className="text-gray-300 max-w-3xl mx-auto">{profile.overview}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="about-reveal translate-y-6 opacity-0 border border-white/10 bg-white/5 backdrop-blur">
            <div className="space-y-5">
              <h3 className="text-2xl font-semibold text-white">Professional Overview</h3>
              <p className="text-gray-300 leading-relaxed">{profile.overview}</p>
              <p className="text-gray-300 leading-relaxed">{profile.philosophy}</p>
            </div>
          </Card>

          <Card className="about-reveal translate-y-6 opacity-0 border border-white/10 bg-white/5 backdrop-blur">
            <h3 className="text-2xl font-semibold text-white mb-6">Key Skills Snapshot</h3>
            <div className="flex flex-wrap gap-3">
              {previewSkills.map((skill) => (
                <Badge key={skill} variant="primary" className="bg-primary-500/15 text-primary-200">
                  {skill}
                </Badge>
              ))}
            </div>
            <div className="mt-6">
              <Link to="/skills" className="text-primary-300 hover:text-primary-200 underline">
                View full skill stack
              </Link>
            </div>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {focusAreas.map((area) => (
            <div
              key={area.title}
              className="about-reveal translate-y-8 rounded-2xl border border-white/10 bg-white/5 p-6 text-left opacity-0 backdrop-blur"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-secondary-200 mb-3">Focus Area</p>
              <h4 className="text-xl font-semibold text-white mb-3">{area.title}</h4>
              <p className="text-gray-300 text-sm leading-relaxed">{area.description}</p>
            </div>
          ))}
        </div>

        <div className="about-reveal translate-y-8 flex flex-col sm:flex-row justify-center gap-4 opacity-0">
          <Link
            to="/experience"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-3 text-lg font-semibold text-white hover:bg-white/20 transition"
          >
            Explore Experience
          </Link>
          <Link
            to="/resume"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-secondary-500 px-7 py-3 text-lg font-semibold text-white shadow-lg shadow-secondary-500/30 hover:bg-secondary-500/90 transition"
          >
            View Resume
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3 text-lg font-semibold text-white/80 hover:text-white hover:border-white/30 transition"
          >
            Dive Deeper
          </Link>
        </div>
      </div>
    </section>
  )
}

