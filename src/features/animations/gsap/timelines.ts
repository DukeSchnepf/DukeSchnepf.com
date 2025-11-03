/**
 * Advanced GSAP Timeline System
 * 
 * Provides 8+ pre-configured timeline creators for common animation patterns:
 * - Hero animations (text reveals, fade-ins)
 * - Card animations (stagger, hover effects)
 * - Section transitions (slide, fade, scale)
 * - Parallax effects
 * - Morphing animations
 * - Mask reveals
 * - Bounce/elastic animations
 * - Loading sequences
 * 
 * Also includes TimelineOrchestrator for managing multiple timelines
 */

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { animationDuration, animationEasing } from '@/config/animations.config'

gsap.registerPlugin(ScrollTrigger)

const durations = animationDuration
const easings = animationEasing.gsap

/**
 * Hero Timeline - Orchestrates hero section entrance
 * Animates title, subtitle, CTA buttons in sequence
 */
export function createHeroTimeline(elements: {
  title?: HTMLElement | null
  subtitle?: HTMLElement | null
  cta?: HTMLElement | null
  background?: HTMLElement | null
}) {
  const tl = gsap.timeline({
    defaults: {
      ease: easings.smooth,
      duration: durations.normal,
    },
  })

  if (elements.background) {
    tl.from(elements.background, {
      opacity: 0,
      scale: 1.1,
      duration: durations.slow,
    })
  }

  if (elements.title) {
    tl.from(
      elements.title,
      {
        y: 100,
        opacity: 0,
        duration: durations.normal,
        ease: easings.bounce,
      },
      '-=0.5'
    )
  }

  if (elements.subtitle) {
    tl.from(
      elements.subtitle,
      {
        y: 50,
        opacity: 0,
        duration: durations.normal,
      },
      '-=0.3'
    )
  }

  if (elements.cta) {
    tl.from(
      elements.cta,
      {
        y: 30,
        opacity: 0,
        scale: 0.9,
        duration: durations.fast,
        ease: easings.elastic,
      },
      '-=0.2'
    )
  }

  return tl
}

/**
 * Card Stagger Timeline - Animates multiple cards with stagger effect
 */
export function createCardStaggerTimeline(
  cards: HTMLElement[],
  options?: {
    stagger?: number
    from?: 'top' | 'bottom' | 'left' | 'right'
    scale?: boolean
  }
) {
  const { stagger = 0.1, from = 'bottom', scale = true } = options || {}

  const directionMap = {
    top: { y: -100 },
    bottom: { y: 100 },
    left: { x: -100 },
    right: { x: 100 },
  }

  const tl = gsap.timeline({
    defaults: {
      ease: easings.smooth,
      duration: durations.normal,
    },
  })

  tl.from(cards, {
    ...directionMap[from],
    opacity: 0,
    scale: scale ? 0.8 : 1,
    stagger,
    duration: durations.normal,
  })

  return tl
}

/**
 * Section Transition Timeline - Smooth transitions between sections
 */
export function createSectionTransitionTimeline(
  section: HTMLElement,
  type: 'fade' | 'slide' | 'scale' | 'blur' = 'fade'
) {
  const tl = gsap.timeline({
    defaults: {
      ease: easings.smooth,
      duration: durations.normal,
    },
  })

  const transitions = {
    fade: { opacity: 0 },
    slide: { y: 100, opacity: 0 },
    scale: { scale: 0.9, opacity: 0 },
    blur: { filter: 'blur(10px)', opacity: 0 },
  }

  tl.from(section, {
    ...transitions[type],
    duration: durations.normal,
  })

  return tl
}

/**
 * Parallax Timeline - Creates parallax scrolling effects
 */
export function createParallaxTimeline(
  elements: { element: HTMLElement; speed: number }[],
  trigger: HTMLElement
) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
    },
  })

  elements.forEach(({ element, speed }) => {
    tl.to(
      element,
      {
        y: () => window.innerHeight * speed,
        ease: 'none',
      },
      0
    )
  })

  return tl
}

/**
 * Morphing Timeline - Smooth shape/state morphing animations
 */
export function createMorphingTimeline(
  element: HTMLElement,
  states: Array<gsap.TweenVars>
) {
  const tl = gsap.timeline({
    defaults: {
      ease: easings.elastic,
      duration: durations.normal,
    },
    repeat: -1,
    yoyo: true,
  })

  states.forEach(state => {
    tl.to(element, state)
  })

  return tl
}

/**
 * Mask Reveal Timeline - Creates mask/clip-path reveal effects
 */
export function createMaskRevealTimeline(
  element: HTMLElement,
  direction: 'horizontal' | 'vertical' | 'center' = 'horizontal'
) {
  const tl = gsap.timeline({
    defaults: {
      ease: easings.smooth,
      duration: durations.normal,
    },
  })

  const clipPaths = {
    horizontal: {
      from: 'inset(0 100% 0 0)',
      to: 'inset(0 0% 0 0)',
    },
    vertical: {
      from: 'inset(100% 0 0 0)',
      to: 'inset(0% 0 0 0)',
    },
    center: {
      from: 'circle(0% at 50% 50%)',
      to: 'circle(100% at 50% 50%)',
    },
  }

  const { from, to } = clipPaths[direction]

  tl.fromTo(
    element,
    {
      clipPath: from,
    },
    {
      clipPath: to,
      duration: durations.slow,
    }
  )

  return tl
}

/**
 * Bounce Timeline - Elastic bounce animations for attention
 */
export function createBounceTimeline(elements: HTMLElement | HTMLElement[]) {
  const tl = gsap.timeline({
    defaults: {
      ease: easings.bounce,
      duration: durations.fast,
    },
  })

  tl.from(elements, {
    y: -50,
    scale: 0.8,
    opacity: 0,
  }).to(elements, {
    y: 0,
    scale: 1.1,
    duration: durations.fast * 0.5,
  }).to(elements, {
    scale: 1,
    duration: durations.fast * 0.3,
  })

  return tl
}

/**
 * Loading Sequence Timeline - Multi-stage loading animation
 */
export function createLoadingTimeline(elements: {
  spinner?: HTMLElement | null
  progress?: HTMLElement | null
  text?: HTMLElement | null
  container?: HTMLElement | null
}) {
  const tl = gsap.timeline({
    defaults: {
      ease: easings.smooth,
      duration: durations.normal,
    },
  })

  if (elements.spinner) {
    tl.from(elements.spinner, {
      scale: 0,
      rotation: -180,
      opacity: 0,
      duration: durations.fast,
    })

    // Continuous rotation
    gsap.to(elements.spinner, {
      rotation: 360,
      duration: 1,
      repeat: -1,
      ease: 'linear',
    })
  }

  if (elements.progress) {
    tl.from(
      elements.progress,
      {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: durations.slow,
      },
      '-=0.2'
    )
  }

  if (elements.text) {
    tl.from(
      elements.text,
      {
        opacity: 0,
        y: 20,
        duration: durations.fast,
      },
      '-=0.5'
    )
  }

  return tl
}

/**
 * TimelineOrchestrator - Manages multiple timelines with coordination
 */
export class TimelineOrchestrator {
  private timelines: Map<string, gsap.core.Timeline> = new Map()
  private masterTimeline: gsap.core.Timeline

  constructor() {
    this.masterTimeline = gsap.timeline()
  }

  /**
   * Add a timeline with a unique ID
   */
  add(id: string, timeline: gsap.core.Timeline, options?: {
    position?: string | number
    label?: string
  }) {
    this.timelines.set(id, timeline)
    this.masterTimeline.add(timeline, options?.position)

    if (options?.label) {
      this.masterTimeline.addLabel(options.label)
    }

    return this
  }

  /**
   * Play a specific timeline by ID
   */
  play(id?: string) {
    if (id) {
      const tl = this.timelines.get(id)
      tl?.play()
    } else {
      this.masterTimeline.play()
    }
    return this
  }

  /**
   * Pause a specific timeline or all
   */
  pause(id?: string) {
    if (id) {
      const tl = this.timelines.get(id)
      tl?.pause()
    } else {
      this.masterTimeline.pause()
    }
    return this
  }

  /**
   * Seek to a specific label or time
   */
  seek(target: string | number) {
    this.masterTimeline.seek(target)
    return this
  }

  /**
   * Kill a specific timeline or all
   */
  kill(id?: string) {
    if (id) {
      const tl = this.timelines.get(id)
      tl?.kill()
      this.timelines.delete(id)
    } else {
      this.masterTimeline.kill()
      this.timelines.clear()
    }
    return this
  }

  /**
   * Get timeline by ID
   */
  get(id: string) {
    return this.timelines.get(id)
  }

  /**
   * Get the master timeline
   */
  getMaster() {
    return this.masterTimeline
  }

  /**
   * Clear all timelines
   */
  clear() {
    this.timelines.forEach(tl => tl.kill())
    this.timelines.clear()
    this.masterTimeline.clear()
    return this
  }
}

/**
 * Global timeline orchestrator instance
 */
export const timelineOrchestrator = new TimelineOrchestrator()

