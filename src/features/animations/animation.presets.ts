import { gsap } from 'gsap'

/**
 * Legacy animation presets - kept for backward compatibility
 * For more advanced animations, use the new GSAP utilities from @/features/animations/gsap
 */

export const animationPresets = {
  fadeIn: (targets: string | Element, options = {}) => {
    return gsap.from(targets, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      ...options,
    })
  },

  slideUp: (targets: string | Element, options = {}) => {
    return gsap.from(targets, {
      y: 50,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      ...options,
    })
  },

  stagger: (targets: string | Element, options = {}) => {
    return gsap.from(targets, {
      opacity: 0,
      y: 30,
      duration: 0.5,
      ease: 'power2.out',
      stagger: 0.1,
      ...options,
    })
  },

  scaleIn: (targets: string | Element, options = {}) => {
    return gsap.from(targets, {
      scale: 0.8,
      opacity: 0,
      duration: 0.4,
      ease: 'back.out(1.7)',
      ...options,
    })
  },
}

export const scrollAnimations = {
  fadeInOnScroll: (targets: string | Element) => {
    return gsap.to(targets, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: targets,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    })
  },
}

// Re-export new GSAP utilities for convenience
export * from './gsap'

