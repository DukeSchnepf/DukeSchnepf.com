import { useEffect, useRef } from 'react'
import { Scene } from '@/features/three-scene'
import { siteConfig } from '@/config/site.config'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()
    tl.from(titleRef.current, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: 'power2.out',
    })
      .from(
        subtitleRef.current,
        {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.4'
      )
      .from(
        ctaRef.current?.children!,
        {
          opacity: 0,
          y: 20,
          duration: 0.4,
          stagger: 0.1,
          ease: 'power2.out',
        },
        '-=0.4'
      )
  }, [])

  // Parallax scroll effect for hero content
  useEffect(() => {
    if (!contentRef.current || !sectionRef.current) return
    gsap.to(contentRef.current, {
      y: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
  }, [])

  const handleMouseMove: React.MouseEventHandler<HTMLElement> = (e) => {
    if (!contentRef.current || !sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    gsap.to(contentRef.current, {
      x: x * 10,
      y: y * -10,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Three.js Background */}
      <div className="absolute inset-0 opacity-30">
        <Scene />
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto will-change-transform">
        <h1
          ref={titleRef}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent"
        >
          {siteConfig.name}
        </h1>
        <p ref={subtitleRef} className="text-xl sm:text-2xl text-gray-400 mb-8">
          {siteConfig.title}
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/experience" className="px-6 py-3 rounded-xl bg-primary-500 text-white hover:bg-primary-600 text-lg">
            Experience
          </Link>
          <Link to="/resume" className="px-6 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 text-lg">
            View Resume
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
        <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}

