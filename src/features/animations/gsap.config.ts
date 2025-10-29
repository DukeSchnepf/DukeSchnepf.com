import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const gsapConfig = {
  defaults: {
    duration: 0.6,
    ease: 'power2.out',
  },

  init() {
    // Respect reduced motion preferences
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    // Apply global defaults
    gsap.defaults({
      duration: this.defaults.duration,
      ease: this.defaults.ease,
      overwrite: 'auto',
    })

    // Set default ScrollTrigger settings
    ScrollTrigger.config({
      autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
      ignoreMobileResize: true,
    })

    // If reduced motion, minimize or disable animations
    if (prefersReducedMotion) {
      gsap.globalTimeline.timeScale(0.001) // effectively instant
      ScrollTrigger.getAll().forEach((st) => st.disable(false))
      ScrollTrigger.config({
        autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
      })
    }
  },

  createScrollTrigger(trigger: string | Element, options = {}) {
    return ScrollTrigger.create({
      trigger,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
      ...options,
    })
  },
}

