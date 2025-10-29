import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const gsapConfig = {
  defaults: {
    duration: 0.6,
    ease: 'power2.out',
  },

  init() {
    // Apply global gsap defaults
    gsap.defaults(this.defaults)
    // Set default ScrollTrigger settings
    ScrollTrigger.config({
      autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
    })
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

