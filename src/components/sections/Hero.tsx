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
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()
    
    // Split title into characters for animation
    if (titleRef.current) {
      const text = titleRef.current.textContent || ''
      titleRef.current.innerHTML = text
        .split('')
        .map((char) => `<span class="char" style="display: inline-block;">${char === ' ' ? '&nbsp;' : char}</span>`)
        .join('')
      
      tl.from(titleRef.current.querySelectorAll('.char'), {
        opacity: 0,
        y: 50,
        rotationX: -90,
        duration: 0.8,
        ease: 'back.out(1.7)',
        stagger: 0.03,
      })
    }
    
    tl.from(
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
          scale: 0.8,
          y: 20,
          duration: 0.5,
          stagger: 0.15,
          ease: 'back.out(1.7)',
        },
        '-=0.3'
      )
      .from(
        scrollIndicatorRef.current,
        {
          opacity: 0,
          y: -20,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.3'
      )

    // Add parallax effect to content on scroll
    if (sectionRef.current) {
      gsap.to(titleRef.current, {
        y: 100,
        opacity: 0.5,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      gsap.to(subtitleRef.current, {
        y: 80,
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      gsap.to(ctaRef.current, {
        y: 60,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }

    // Continuous animation for scroll indicator
    gsap.to(scrollIndicatorRef.current, {
      y: 10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    })
  }, [])

  return (
    <section ref={sectionRef} id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Three.js Background */}
      <div className="absolute inset-0 opacity-30">
        <Scene />
      </div>

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1
          ref={titleRef}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent"
        >
          {siteConfig.name}
        </h1>
        <p ref={subtitleRef} className="text-xl sm:text-2xl text-gray-300 mb-10">
          {siteConfig.title}
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            to="/experience" 
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:from-primary-600 hover:to-secondary-600 text-lg font-medium shadow-lg hover:shadow-xl hover:shadow-primary-500/50 transition-all duration-300"
          >
            View Experience
          </Link>
          <Link 
            to="/resume" 
            className="px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 text-lg font-medium border border-white/20 transition-all duration-300"
          >
            Download Resume
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div ref={scrollIndicatorRef} className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-gray-400 text-sm">Scroll to explore</span>
          <svg className="w-6 h-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}

