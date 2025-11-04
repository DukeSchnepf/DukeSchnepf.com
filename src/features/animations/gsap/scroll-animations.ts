/**
 * GSAP Scroll-Driven Animations
 * 
 * Provides 15+ scroll animation functions using ScrollTrigger:
 * - Fade animations (in, out, up, down)
 * - Slide animations (all directions)
 * - Scale animations (zoom in/out)
 * - Rotate animations
 * - Parallax effects
 * - Pin/sticky sections
 * - Horizontal scroll sections
 * - Progress indicators
 * - And more...
 */

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import animationsConfig from '@/config/animations.config'

gsap.registerPlugin(ScrollTrigger)

const { durations, easings } = animationsConfig.gsap

export type ScrollAnimationOptions = {
  trigger?: HTMLElement | string
  start?: string
  end?: string
  scrub?: boolean | number
  pin?: boolean
  markers?: boolean
  toggleActions?: string
  once?: boolean
}

/**
 * Fade In on Scroll
 */
export function fadeIn(
  element: HTMLElement | string,
  options?: ScrollAnimationOptions
) {
  return gsap.from(element, {
    opacity: 0,
    duration: durations.normal,
    ease: easings.smooth,
    scrollTrigger: {
      trigger: options?.trigger || element,
      start: options?.start || 'top 80%',
      end: options?.end || 'top 20%',
      toggleActions: options?.toggleActions || 'play none none reverse',
      markers: options?.markers,
      once: options?.once,
    },
  })
}

/**
 * Fade In from Bottom
 */
export function fadeInUp(
  element: HTMLElement | string,
  options?: ScrollAnimationOptions & { distance?: number }
) {
  const distance = options?.distance || 100

  return gsap.from(element, {
    opacity: 0,
    y: distance,
    duration: durations.normal,
    ease: easings.smooth,
    scrollTrigger: {
      trigger: options?.trigger || element,
      start: options?.start || 'top 80%',
      toggleActions: options?.toggleActions || 'play none none reverse',
      markers: options?.markers,
      once: options?.once,
    },
  })
}

/**
 * Fade In from Top
 */
export function fadeInDown(
  element: HTMLElement | string,
  options?: ScrollAnimationOptions & { distance?: number }
) {
  const distance = options?.distance || 100

  return gsap.from(element, {
    opacity: 0,
    y: -distance,
    duration: durations.normal,
    ease: easings.smooth,
    scrollTrigger: {
      trigger: options?.trigger || element,
      start: options?.start || 'top 80%',
      toggleActions: options?.toggleActions || 'play none none reverse',
      markers: options?.markers,
      once: options?.once,
    },
  })
}

/**
 * Fade In from Left
 */
export function fadeInLeft(
  element: HTMLElement | string,
  options?: ScrollAnimationOptions & { distance?: number }
) {
  const distance = options?.distance || 100

  return gsap.from(element, {
    opacity: 0,
    x: -distance,
    duration: durations.normal,
    ease: easings.smooth,
    scrollTrigger: {
      trigger: options?.trigger || element,
      start: options?.start || 'top 80%',
      toggleActions: options?.toggleActions || 'play none none reverse',
      markers: options?.markers,
      once: options?.once,
    },
  })
}

/**
 * Fade In from Right
 */
export function fadeInRight(
  element: HTMLElement | string,
  options?: ScrollAnimationOptions & { distance?: number }
) {
  const distance = options?.distance || 100

  return gsap.from(element, {
    opacity: 0,
    x: distance,
    duration: durations.normal,
    ease: easings.smooth,
    scrollTrigger: {
      trigger: options?.trigger || element,
      start: options?.start || 'top 80%',
      toggleActions: options?.toggleActions || 'play none none reverse',
      markers: options?.markers,
      once: options?.once,
    },
  })
}

/**
 * Scale In (Zoom In)
 */
export function scaleIn(
  element: HTMLElement | string,
  options?: ScrollAnimationOptions & { from?: number }
) {
  const from = options?.from || 0.5

  return gsap.from(element, {
    scale: from,
    opacity: 0,
    duration: durations.normal,
    ease: easings.smooth,
    scrollTrigger: {
      trigger: options?.trigger || element,
      start: options?.start || 'top 80%',
      toggleActions: options?.toggleActions || 'play none none reverse',
      markers: options?.markers,
      once: options?.once,
    },
  })
}

/**
 * Scale Out (Zoom Out)
 */
export function scaleOut(
  element: HTMLElement | string,
  options?: ScrollAnimationOptions & { from?: number }
) {
  const from = options?.from || 1.5

  return gsap.from(element, {
    scale: from,
    opacity: 0,
    duration: durations.normal,
    ease: easings.smooth,
    scrollTrigger: {
      trigger: options?.trigger || element,
      start: options?.start || 'top 80%',
      toggleActions: options?.toggleActions || 'play none none reverse',
      markers: options?.markers,
      once: options?.once,
    },
  })
}

/**
 * Rotate In
 */
export function rotateIn(
  element: HTMLElement | string,
  options?: ScrollAnimationOptions & { degrees?: number }
) {
  const degrees = options?.degrees || 180

  return gsap.from(element, {
    rotation: degrees,
    opacity: 0,
    duration: durations.normal,
    ease: easings.smooth,
    scrollTrigger: {
      trigger: options?.trigger || element,
      start: options?.start || 'top 80%',
      toggleActions: options?.toggleActions || 'play none none reverse',
      markers: options?.markers,
      once: options?.once,
    },
  })
}

/**
 * Stagger Animation - Animate multiple elements with delay
 */
export function staggerAnimation(
  elements: HTMLElement[] | string,
  options?: ScrollAnimationOptions & {
    stagger?: number
    from?: gsap.TweenVars
  }
) {
  const stagger = options?.stagger || 0.1
  const from = options?.from || { opacity: 0, y: 50 }

  return gsap.from(elements, {
    ...from,
    duration: durations.normal,
    ease: easings.smooth,
    stagger,
    scrollTrigger: {
      trigger: options?.trigger || elements,
      start: options?.start || 'top 80%',
      toggleActions: options?.toggleActions || 'play none none reverse',
      markers: options?.markers,
      once: options?.once,
    },
  })
}

/**
 * Parallax Effect - Element moves at different speed than scroll
 */
export function parallax(
  element: HTMLElement | string,
  options?: ScrollAnimationOptions & { speed?: number; direction?: 'up' | 'down' }
) {
  const speed = options?.speed || 0.5
  const direction = options?.direction || 'up'
  const multiplier = direction === 'up' ? -1 : 1

  return gsap.to(element, {
    y: () => window.innerHeight * speed * multiplier,
    ease: 'none',
    scrollTrigger: {
      trigger: options?.trigger || element,
      start: options?.start || 'top bottom',
      end: options?.end || 'bottom top',
      scrub: options?.scrub !== undefined ? options.scrub : true,
      markers: options?.markers,
    },
  })
}

/**
 * Pin Section - Pin element during scroll
 */
export function pinSection(
  element: HTMLElement | string,
  options?: ScrollAnimationOptions & { duration?: string }
) {
  return ScrollTrigger.create({
    trigger: element,
    start: options?.start || 'top top',
    end: options?.end || `+=${options?.duration || '100%'}`,
    pin: true,
    pinSpacing: true,
    markers: options?.markers,
  })
}

/**
 * Horizontal Scroll Section
 */
export function horizontalScroll(
  container: HTMLElement | string,
  panels: HTMLElement[] | string,
  options?: ScrollAnimationOptions
) {
  const panelsArray = typeof panels === 'string' 
    ? gsap.utils.toArray<HTMLElement>(panels)
    : panels

  return gsap.to(panelsArray, {
    xPercent: -100 * (panelsArray.length - 1),
    ease: 'none',
    scrollTrigger: {
      trigger: container,
      pin: true,
      scrub: 1,
      snap: 1 / (panelsArray.length - 1),
      end: () => `+=${(typeof container === 'string' 
        ? document.querySelector<HTMLElement>(container)
        : container)?.offsetWidth || 0}`,
      markers: options?.markers,
    },
  })
}

/**
 * Progress Indicator - Updates element based on scroll progress
 */
export function scrollProgress(
  element: HTMLElement | string,
  options?: ScrollAnimationOptions & { property?: string }
) {
  const property = options?.property || 'scaleX'

  return gsap.to(element, {
    [property]: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: options?.trigger || document.body,
      start: options?.start || 'top top',
      end: options?.end || 'bottom bottom',
      scrub: true,
      markers: options?.markers,
    },
  })
}

/**
 * Reveal Text Line by Line
 */
export function revealText(
  element: HTMLElement | string,
  options?: ScrollAnimationOptions
) {
  return gsap.from(element, {
    opacity: 0,
    y: 20,
    duration: durations.normal,
    ease: easings.smooth,
    stagger: 0.05,
    scrollTrigger: {
      trigger: options?.trigger || element,
      start: options?.start || 'top 80%',
      toggleActions: options?.toggleActions || 'play none none reverse',
      markers: options?.markers,
      once: options?.once,
    },
  })
}

/**
 * Blur to Focus
 */
export function blurToFocus(
  element: HTMLElement | string,
  options?: ScrollAnimationOptions
) {
  return gsap.from(element, {
    filter: 'blur(10px)',
    opacity: 0.5,
    duration: durations.normal,
    ease: easings.smooth,
    scrollTrigger: {
      trigger: options?.trigger || element,
      start: options?.start || 'top 80%',
      toggleActions: options?.toggleActions || 'play none none reverse',
      markers: options?.markers,
      once: options?.once,
    },
  })
}

/**
 * Counter Animation - Animate numbers on scroll
 */
export function animateCounter(
  element: HTMLElement,
  options?: ScrollAnimationOptions & { 
    from?: number
    to?: number
    duration?: number
    formatter?: (value: number) => string
  }
) {
  const from = options?.from || 0
  const to = options?.to || parseFloat(element.textContent || '0')
  const formatter = options?.formatter || ((val: number) => Math.round(val).toString())

  const obj = { value: from }

  return gsap.to(obj, {
    value: to,
    duration: options?.duration || durations.slow,
    ease: easings.smooth,
    onUpdate: () => {
      element.textContent = formatter(obj.value)
    },
    scrollTrigger: {
      trigger: options?.trigger || element,
      start: options?.start || 'top 80%',
      toggleActions: options?.toggleActions || 'play none none none',
      markers: options?.markers,
      once: true,
    },
  })
}

/**
 * Clip Path Reveal
 */
export function clipPathReveal(
  element: HTMLElement | string,
  options?: ScrollAnimationOptions & { 
    direction?: 'left' | 'right' | 'top' | 'bottom' | 'center'
  }
) {
  const direction = options?.direction || 'right'

  const clipPaths = {
    left: { from: 'inset(0 0 0 100%)', to: 'inset(0 0 0 0)' },
    right: { from: 'inset(0 100% 0 0)', to: 'inset(0 0 0 0)' },
    top: { from: 'inset(0 0 100% 0)', to: 'inset(0 0 0 0)' },
    bottom: { from: 'inset(100% 0 0 0)', to: 'inset(0 0 0 0)' },
    center: { from: 'circle(0% at 50% 50%)', to: 'circle(100% at 50% 50%)' },
  }

  const { from, to } = clipPaths[direction]

  return gsap.fromTo(
    element,
    { clipPath: from },
    {
      clipPath: to,
      duration: durations.normal,
      ease: easings.smooth,
      scrollTrigger: {
        trigger: options?.trigger || element,
        start: options?.start || 'top 80%',
        toggleActions: options?.toggleActions || 'play none none reverse',
        markers: options?.markers,
        once: options?.once,
      },
    }
  )
}

/**
 * Utility: Batch scroll animations for multiple elements
 */
export function batchScrollAnimation(
  selector: string,
  animation: (element: HTMLElement) => gsap.core.Tween | ScrollTrigger,
  options?: { 
    interval?: number
    batchMax?: number
  }
) {
  return ScrollTrigger.batch(selector, {
    interval: options?.interval || 0.1,
    batchMax: options?.batchMax || 3,
    onEnter: (batch) => batch.forEach((el) => animation(el as HTMLElement)),
  })
}

/**
 * Utility: Kill all ScrollTriggers
 */
export function killAllScrollTriggers() {
  ScrollTrigger.getAll().forEach(st => st.kill())
}

/**
 * Utility: Refresh ScrollTrigger (call after layout changes)
 */
export function refreshScrollTrigger() {
  ScrollTrigger.refresh()
}

