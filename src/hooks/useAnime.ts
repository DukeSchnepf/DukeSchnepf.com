/**
 * React Hooks for Anime.js
 * 
 * Custom hooks that integrate Anime.js animations with React lifecycle:
 * - useAnime - Basic animation control
 * - useAnimeTimeline - Timeline management
 * - useAnimeScroll - Scroll-triggered animations
 * - useAnimeHover - Hover state animations
 * - useAnimeCounter - Animated number counting
 */

import { useEffect, useRef, useState, useCallback } from 'react'
import anime, { type AnimeInstance, type AnimeParams } from 'animejs'
import { countNumber } from '@/features/animations/anime/effects'

/**
 * useAnime - Basic animation hook
 * 
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const { ref, play, pause, restart } = useAnime({
 *     scale: [0, 1],
 *     opacity: [0, 1],
 *     duration: 1000,
 *     autoplay: false
 *   })
 *   
 *   return <div ref={ref} onClick={play}>Click me</div>
 * }
 * ```
 */
export function useAnime<T extends HTMLElement = HTMLElement>(
  params: Omit<AnimeParams, 'targets'>,
  dependencies: any[] = []
) {
  const ref = useRef<T>(null)
  const animationRef = useRef<AnimeInstance | null>(null)

  useEffect(() => {
    if (!ref.current) return

    // Create animation
    animationRef.current = anime({
      ...params,
      targets: ref.current,
    })

    // Cleanup on unmount
    return () => {
      if (animationRef.current) {
        animationRef.current.pause()
        animationRef.current = null
      }
    }
  }, [ref.current, ...dependencies])

  const play = useCallback(() => {
    animationRef.current?.play()
  }, [])

  const pause = useCallback(() => {
    animationRef.current?.pause()
  }, [])

  const restart = useCallback(() => {
    animationRef.current?.restart()
  }, [])

  const reverse = useCallback(() => {
    animationRef.current?.reverse()
  }, [])

  const seek = useCallback((progress: number) => {
    if (animationRef.current) {
      animationRef.current.seek(animationRef.current.duration * progress)
    }
  }, [])

  return {
    ref,
    animation: animationRef.current,
    play,
    pause,
    restart,
    reverse,
    seek,
  }
}

/**
 * useAnimeTimeline - Timeline management hook
 * 
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const { timeline, play } = useAnimeTimeline()
 *   
 *   useEffect(() => {
 *     if (!timeline) return
 *     
 *     timeline
 *       .add({ targets: '.box1', translateX: 250, duration: 800 })
 *       .add({ targets: '.box2', translateX: 250, duration: 800 }, '-=400')
 *       .add({ targets: '.box3', translateX: 250, duration: 800 }, '-=400')
 *   }, [timeline])
 *   
 *   return <button onClick={play}>Play Timeline</button>
 * }
 * ```
 */
export function useAnimeTimeline(params?: AnimeParams) {
  const [timeline, setTimeline] = useState<AnimeInstance | null>(null)

  useEffect(() => {
    const tl = anime.timeline({
      autoplay: false,
      ...params,
    })
    
    setTimeline(tl)

    return () => {
      tl.pause()
    }
  }, [])

  const play = useCallback(() => {
    timeline?.play()
  }, [timeline])

  const pause = useCallback(() => {
    timeline?.pause()
  }, [timeline])

  const restart = useCallback(() => {
    timeline?.restart()
  }, [timeline])

  const reverse = useCallback(() => {
    timeline?.reverse()
  }, [timeline])

  const seek = useCallback((progress: number) => {
    if (timeline) {
      timeline.seek(timeline.duration * progress)
    }
  }, [timeline])

  return {
    timeline,
    play,
    pause,
    restart,
    reverse,
    seek,
  }
}

/**
 * useAnimeScroll - Scroll-triggered animations
 * 
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const ref = useAnimeScroll<HTMLDivElement>(
 *     {
 *       opacity: [0, 1],
 *       translateY: [50, 0],
 *       duration: 1000,
 *       easing: 'easeOutExpo'
 *     },
 *     {
 *       threshold: 0.2,
 *       triggerOnce: true
 *     }
 *   )
 *   
 *   return <div ref={ref}>Scroll to reveal</div>
 * }
 * ```
 */
export function useAnimeScroll<T extends HTMLElement = HTMLElement>(
  params: Omit<AnimeParams, 'targets'>,
  options?: {
    threshold?: number
    rootMargin?: string
    triggerOnce?: boolean
  }
) {
  const ref = useRef<T>(null)
  const animationRef = useRef<AnimeInstance | null>(null)
  const hasTriggered = useRef(false)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current
    const threshold = options?.threshold ?? 0.2
    const rootMargin = options?.rootMargin ?? '0px'
    const triggerOnce = options?.triggerOnce ?? false

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Only trigger if not already triggered (when triggerOnce is true)
            if (!triggerOnce || !hasTriggered.current) {
              // Create and play animation
              animationRef.current = anime({
                ...params,
                targets: element,
              })
              hasTriggered.current = true

              // Unobserve if triggerOnce
              if (triggerOnce) {
                observer.unobserve(element)
              }
            }
          }
        })
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
      if (animationRef.current) {
        animationRef.current.pause()
        animationRef.current = null
      }
    }
  }, [ref.current, options?.threshold, options?.rootMargin, options?.triggerOnce])

  return ref
}

/**
 * useAnimeHover - Hover state animations
 * 
 * @example
 * ```tsx
 * const MyButton = () => {
 *   const { ref } = useAnimeHover(
 *     { scale: 1.1, translateY: -4 },    // hover in
 *     { scale: 1, translateY: 0 }        // hover out
 *   )
 *   
 *   return <button ref={ref}>Hover me!</button>
 * }
 * ```
 */
export function useAnimeHover<T extends HTMLElement = HTMLElement>(
  hoverParams: Omit<AnimeParams, 'targets'>,
  leaveParams?: Omit<AnimeParams, 'targets'>
) {
  const ref = useRef<T>(null)
  const hoverAnimationRef = useRef<AnimeInstance | null>(null)
  const leaveAnimationRef = useRef<AnimeInstance | null>(null)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current

    // Create hover in animation (paused)
    hoverAnimationRef.current = anime({
      ...hoverParams,
      targets: element,
      autoplay: false,
    })

    // Create hover out animation (paused) if provided
    if (leaveParams) {
      leaveAnimationRef.current = anime({
        ...leaveParams,
        targets: element,
        autoplay: false,
      })
    }

    const handleMouseEnter = () => {
      leaveAnimationRef.current?.pause()
      hoverAnimationRef.current?.restart()
    }

    const handleMouseLeave = () => {
      hoverAnimationRef.current?.pause()
      if (leaveAnimationRef.current) {
        leaveAnimationRef.current.restart()
      } else {
        // If no leave params, reverse the hover animation
        hoverAnimationRef.current?.reverse()
      }
    }

    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
      hoverAnimationRef.current?.pause()
      leaveAnimationRef.current?.pause()
    }
  }, [ref.current])

  return { ref }
}

/**
 * useAnimeCounter - Animated number counting
 * 
 * @example
 * ```tsx
 * const Stats = () => {
 *   const { ref, count } = useAnimeCounter({
 *     end: 1000,
 *     duration: 2000,
 *     decimals: 0,
 *     prefix: '$',
 *     suffix: '+',
 *     scrollTrigger: true
 *   })
 *   
 *   return <div ref={ref}>{count}</div>
 * }
 * ```
 */
export function useAnimeCounter(options: {
  start?: number
  end: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
  scrollTrigger?: boolean
  threshold?: number
  easing?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState<string>('')
  const animationRef = useRef<AnimeInstance | null>(null)
  const hasTriggered = useRef(false)

  const {
    start = 0,
    end,
    duration = 2000,
    decimals = 0,
    prefix = '',
    suffix = '',
    scrollTrigger = false,
    threshold = 0.2,
    easing = 'easeOutExpo',
  } = options

  const startAnimation = useCallback(() => {
    if (!ref.current || hasTriggered.current) return

    hasTriggered.current = true

    const obj = { value: start }

    animationRef.current = anime({
      targets: obj,
      value: end,
      duration,
      easing,
      round: decimals === 0 ? 1 : Math.pow(10, decimals),
      update: () => {
        const formatted = `${prefix}${obj.value.toFixed(decimals)}${suffix}`
        setCount(formatted)
        if (ref.current) {
          ref.current.textContent = formatted
        }
      },
    })
  }, [start, end, duration, decimals, prefix, suffix, easing])

  useEffect(() => {
    if (!ref.current) return

    // Initialize display
    const initial = `${prefix}${start.toFixed(decimals)}${suffix}`
    setCount(initial)
    if (ref.current) {
      ref.current.textContent = initial
    }

    if (scrollTrigger) {
      // Use intersection observer for scroll trigger
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasTriggered.current) {
              startAnimation()
            }
          })
        },
        { threshold }
      )

      observer.observe(ref.current)

      return () => {
        observer.disconnect()
        if (animationRef.current) {
          animationRef.current.pause()
        }
      }
    } else {
      // Start immediately
      startAnimation()

      return () => {
        if (animationRef.current) {
          animationRef.current.pause()
        }
      }
    }
  }, [scrollTrigger, threshold, startAnimation, start, decimals, prefix, suffix])

  return { ref, count }
}

