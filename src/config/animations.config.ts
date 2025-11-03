/**
 * Centralized Animation Configuration
 * 
 * This config file serves as the single source of truth for all animation settings
 * across GSAP, Anime.js, and CSS animations. It ensures consistency and makes it
 * easy to adjust timing, easing, and behavior globally.
 */

import { gsap } from 'gsap'

// ============================================================================
// TIMING & DURATION
// ============================================================================

export const animationDuration = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.3,
  base: 0.4,
  slow: 0.6,
  slower: 0.8,
  slowest: 1.0,
  section: 1.2,
  hero: 1.5,
} as const

// ============================================================================
// EASING FUNCTIONS
// ============================================================================

export const animationEasing = {
  // GSAP Easings
  gsap: {
    default: 'power2.out',
    smooth: 'power1.inOut',
    snappy: 'power3.out',
    bounce: 'back.out(1.7)',
    elastic: 'elastic.out(1, 0.5)',
    strong: 'power4.out',
    hero: 'expo.out',
    scroll: 'none', // Linear for scroll-triggered animations
  },
  
  // Anime.js Easings
  anime: {
    default: 'easeOutQuad',
    smooth: 'easeInOutQuad',
    snappy: 'easeOutCubic',
    bounce: 'easeOutBack',
    elastic: 'easeOutElastic',
    spring: 'spring(1, 80, 10, 0)',
  },
  
  // CSS Cubic Bezier
  css: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    smooth: 'cubic-bezier(0.4, 0, 0.6, 1)',
    snappy: 'cubic-bezier(0.4, 0, 0.1, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
} as const

// ============================================================================
// STAGGER SETTINGS
// ============================================================================

export const staggerSettings = {
  quick: 0.05,
  normal: 0.1,
  slow: 0.15,
  dramatic: 0.2,
  
  // For grids
  grid: {
    amount: 0.5,
    from: 'start' as const,
    axis: null,
  },
  
  // For text reveals
  text: {
    amount: 0.03,
    from: 'start' as const,
  },
} as const

// ============================================================================
// SCROLL TRIGGER SETTINGS
// ============================================================================

export const scrollTriggerDefaults = {
  start: 'top 80%',
  end: 'bottom 20%',
  toggleActions: 'play none none reverse',
  markers: false, // Set to true for debugging
  scrub: false,
} as const

export const scrollTriggerPresets = {
  fadeIn: {
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none reverse',
  },
  
  parallax: {
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
  },
  
  pinSection: {
    start: 'top top',
    end: '+=100%',
    pin: true,
    scrub: 1,
  },
  
  hero: {
    start: 'top top',
    end: 'bottom top',
    scrub: 1,
  },
  
  snap: {
    start: 'top top',
    end: 'bottom bottom',
    snap: {
      snapTo: 1,
      duration: 0.5,
      ease: 'power1.inOut',
    },
  },
} as const

// ============================================================================
// ANIMATION PRESETS
// ============================================================================

export const animationPresets = {
  // Fade animations
  fade: {
    in: {
      opacity: 0,
      duration: animationDuration.normal,
      ease: animationEasing.gsap.default,
    },
    out: {
      opacity: 0,
      duration: animationDuration.fast,
      ease: animationEasing.gsap.default,
    },
  },
  
  // Slide animations
  slide: {
    up: {
      y: 50,
      opacity: 0,
      duration: animationDuration.slow,
      ease: animationEasing.gsap.smooth,
    },
    down: {
      y: -50,
      opacity: 0,
      duration: animationDuration.slow,
      ease: animationEasing.gsap.smooth,
    },
    left: {
      x: 50,
      opacity: 0,
      duration: animationDuration.slow,
      ease: animationEasing.gsap.smooth,
    },
    right: {
      x: -50,
      opacity: 0,
      duration: animationDuration.slow,
      ease: animationEasing.gsap.smooth,
    },
  },
  
  // Scale animations
  scale: {
    in: {
      scale: 0.8,
      opacity: 0,
      duration: animationDuration.base,
      ease: animationEasing.gsap.bounce,
    },
    out: {
      scale: 0.8,
      opacity: 0,
      duration: animationDuration.fast,
      ease: animationEasing.gsap.default,
    },
    pop: {
      scale: 0,
      opacity: 0,
      duration: animationDuration.base,
      ease: animationEasing.gsap.elastic,
    },
  },
  
  // Rotation animations
  rotate: {
    in: {
      rotation: -5,
      opacity: 0,
      duration: animationDuration.slow,
      ease: animationEasing.gsap.default,
    },
    flip: {
      rotationY: 180,
      duration: animationDuration.slower,
      ease: animationEasing.gsap.smooth,
    },
  },
  
  // Text animations
  text: {
    fadeIn: {
      opacity: 0,
      y: 20,
      duration: animationDuration.slow,
      ease: animationEasing.gsap.default,
      stagger: staggerSettings.text.amount,
    },
    slideUp: {
      y: 100,
      opacity: 0,
      duration: animationDuration.slower,
      ease: animationEasing.gsap.hero,
      stagger: staggerSettings.text.amount,
    },
    reveal: {
      y: '100%',
      duration: animationDuration.slower,
      ease: animationEasing.gsap.hero,
      stagger: staggerSettings.text.amount,
    },
  },
  
  // Hero specific
  hero: {
    title: {
      y: 100,
      opacity: 0,
      duration: animationDuration.hero,
      ease: animationEasing.gsap.hero,
    },
    subtitle: {
      y: 50,
      opacity: 0,
      duration: animationDuration.section,
      ease: animationEasing.gsap.default,
    },
    cta: {
      scale: 0.9,
      opacity: 0,
      duration: animationDuration.slow,
      ease: animationEasing.gsap.bounce,
    },
  },
  
  // Card animations
  card: {
    hover: {
      y: -10,
      duration: animationDuration.normal,
      ease: animationEasing.gsap.default,
    },
    tilt: {
      duration: animationDuration.fast,
      ease: animationEasing.gsap.smooth,
    },
  },
} as const

// ============================================================================
// PERFORMANCE SETTINGS
// ============================================================================

export const performanceConfig = {
  // Reduce animations on low-end devices
  reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  
  // Target FPS
  targetFPS: 60,
  
  // RAF throttle (milliseconds between animation updates)
  rafThrottle: 16, // ~60fps
  
  // Lazy load threshold
  lazyLoadThreshold: 0.1,
  
  // Enable GPU acceleration
  force3D: true,
  
  // Automatic cleanup
  autoKill: true,
} as const

// ============================================================================
// ANIMATION ORCHESTRATION
// ============================================================================

export const orchestrationConfig = {
  // Queue management
  maxConcurrentAnimations: 5,
  
  // Priority levels
  priority: {
    critical: 3, // Hero, page transitions
    high: 2,     // Section reveals, important interactions
    normal: 1,   // General animations
    low: 0,      // Background effects, particles
  },
  
  // Timing between sequences
  sequenceGap: 0.2,
  
  // Global animation state
  globalDelay: 0.1, // Small delay before starting animations
} as const

// ============================================================================
// THREE.JS ANIMATION SETTINGS
// ============================================================================

export const threeAnimationConfig = {
  // Camera movement
  camera: {
    moveSpeed: 0.05,
    rotationSpeed: 0.02,
    dampingFactor: 0.05,
    zoomSpeed: 0.5,
  },
  
  // Particle animations
  particles: {
    floatSpeed: 0.001,
    mouseInfluence: 0.1,
    returnSpeed: 0.02,
    waveAmplitude: 0.5,
    waveFrequency: 0.001,
  },
  
  // Object animations
  objects: {
    hoverScale: 1.1,
    rotationSpeed: 0.01,
    floatAmplitude: 0.2,
    floatSpeed: 0.002,
  },
} as const

// ============================================================================
// PAGE TRANSITION SETTINGS
// ============================================================================

export const pageTransitionConfig = {
  duration: animationDuration.slower,
  ease: animationEasing.gsap.smooth,
  
  types: {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    slide: {
      initial: { x: '100%', opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: '-100%', opacity: 0 },
    },
    scale: {
      initial: { scale: 0.8, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 1.2, opacity: 0 },
    },
  },
} as const

// ============================================================================
// INITIALIZATION FUNCTION
// ============================================================================

export const initializeAnimations = () => {
  // Set GSAP defaults
  gsap.defaults({
    duration: animationDuration.normal,
    ease: animationEasing.gsap.default,
  })
  
  // Configure GSAP for performance
  gsap.config({
    force3D: performanceConfig.force3D,
    nullTargetWarn: false
  })
  
  // If reduced motion is preferred, adjust settings
  if (performanceConfig.reducedMotion) {
    gsap.globalTimeline.timeScale(0.5) // Slow down all animations
  }
  
  return {
    isReady: true,
    reducedMotion: performanceConfig.reducedMotion,
  }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

export const animationUtils = {
  /**
   * Get animation duration based on element count (for staggers)
   */
  getDurationForCount: (count: number, baseStagger = staggerSettings.normal) => {
    return animationDuration.base + (count * baseStagger)
  },
  
  /**
   * Calculate optimal stagger based on element count
   */
  getOptimalStagger: (count: number) => {
    if (count <= 5) return staggerSettings.normal
    if (count <= 10) return staggerSettings.quick
    return staggerSettings.quick / 2
  },
  
  /**
   * Check if animations should be reduced
   */
  shouldReduceMotion: () => {
    return performanceConfig.reducedMotion
  },
  
  /**
   * Get adjusted duration for reduced motion
   */
  getAdjustedDuration: (duration: number) => {
    return performanceConfig.reducedMotion ? duration * 0.5 : duration
  },
}

// ============================================================================
// EXPORTS
// ============================================================================

export type AnimationPreset = keyof typeof animationPresets
export type EasingType = keyof typeof animationEasing.gsap
export type DurationType = keyof typeof animationDuration

export default {
  duration: animationDuration,
  easing: animationEasing,
  stagger: staggerSettings,
  scrollTrigger: scrollTriggerDefaults,
  scrollPresets: scrollTriggerPresets,
  presets: animationPresets,
  performance: performanceConfig,
  orchestration: orchestrationConfig,
  threeAnimation: threeAnimationConfig,
  pageTransition: pageTransitionConfig,
  initialize: initializeAnimations,
  utils: animationUtils,
}

