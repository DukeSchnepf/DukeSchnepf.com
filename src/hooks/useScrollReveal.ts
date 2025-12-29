import { useRef, useEffect, RefObject } from 'react'
import gsap from 'gsap'
import { animationDuration, animationEasing, staggerSettings } from '@/config/animations.config'

type AnimationType = 'fade' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale'

interface ScrollRevealOptions {
  animation?: AnimationType
  duration?: number
  stagger?: number
  delay?: number
  ease?: string
  once?: boolean
  start?: string
  end?: string
  markers?: boolean
}

const animationPresets: Record<AnimationType, gsap.TweenVars> = {
  fade: {
    opacity: 0,
  },
  slideUp: {
    opacity: 0,
    y: 50,
  },
  slideDown: {
    opacity: 0,
    y: -50,
  },
  slideLeft: {
    opacity: 0,
    x: 50,
  },
  slideRight: {
    opacity: 0,
    x: -50,
  },
  scale: {
    opacity: 0,
    scale: 0.8,
  },
}

/**
 * useScrollReveal - GSAP ScrollTrigger-based reveal animations
 * Replaces Framer Motion's whileInView pattern
 * 
 * @param containerRef - Reference to the container element
 * @param selector - CSS selector for elements to animate (optional, animates container if not provided)
 * @param options - Animation configuration options
 */
export function useScrollReveal<T extends HTMLElement>(
  containerRef: RefObject<T | null>,
  selector?: string,
  options: ScrollRevealOptions = {}
) {
  const {
    animation = 'slideUp',
    duration = animationDuration.slow,
    stagger = staggerSettings.normal,
    delay = 0,
    ease = animationEasing.gsap.default,
    once = true,
    start = 'top 80%',
    end = 'bottom 20%',
    markers = false,
  } = options

  const tweenRef = useRef<gsap.core.Tween | gsap.core.Timeline | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const targets = selector ? container.querySelectorAll(selector) : container
    const fromVars = animationPresets[animation]

    if (!targets || (targets instanceof NodeList && targets.length === 0)) return

    const ctx = gsap.context(() => {
      tweenRef.current = gsap.from(targets, {
        ...fromVars,
        duration,
        delay,
        ease,
        stagger: selector ? stagger : 0,
        scrollTrigger: {
          trigger: container,
          start,
          end,
          toggleActions: once ? 'play none none none' : 'play none none reverse',
          markers,
        },
      })
    }, container)

    return () => {
      ctx.revert()
    }
  }, [containerRef, selector, animation, duration, stagger, delay, ease, once, start, end, markers])

  return tweenRef
}

/**
 * useScrollRevealTimeline - For complex staggered sequences
 * Returns a timeline ref that can be extended
 */
export function useScrollRevealTimeline<T extends HTMLElement>(
  containerRef: RefObject<T | null>,
  options: Omit<ScrollRevealOptions, 'stagger'> & { onReady?: (tl: gsap.core.Timeline) => void } = {}
) {
  const {
    once = true,
    start = 'top 80%',
    end = 'bottom 20%',
    markers = false,
    onReady,
  } = options

  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const ctx = gsap.context(() => {
      timelineRef.current = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start,
          end,
          toggleActions: once ? 'play none none none' : 'play none none reverse',
          markers,
        },
      })

      if (onReady && timelineRef.current) {
        onReady(timelineRef.current)
      }
    }, container)

    return () => {
      ctx.revert()
    }
  }, [containerRef, once, start, end, markers, onReady])

  return timelineRef
}

export default useScrollReveal

