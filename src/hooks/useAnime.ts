/**
 * useAnime Hook
 * 
 * React hook for easy Anime.js integration
 * Handles lifecycle, cleanup, and provides utilities
 */

import { useEffect, useRef, useCallback } from 'react'
import anime, { type AnimeInstance, type AnimeParams } from 'animejs'

export interface UseAnimeOptions extends AnimeParams {
  /**
   * Auto-play animation on mount
   */
  autoplay?: boolean
  
  /**
   * Dependencies array for re-running animation
   */
  deps?: React.DependencyList
}

/**
 * Hook for creating and managing Anime.js animations
 */
export function useAnime<T extends HTMLElement = HTMLElement>(
  options?: UseAnimeOptions
) {
  const elementRef = useRef<T>(null)
  const animationRef = useRef<AnimeInstance | null>(null)

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

  const seek = useCallback((time: number) => {
    animationRef.current?.seek(time)
  }, [])

  useEffect(() => {
    if (!elementRef.current || !options) return

    const { autoplay = true, deps, ...animeOptions } = options

    // Create animation
    animationRef.current = anime({
      targets: elementRef.current,
      autoplay,
      ...animeOptions,
    })

    // Cleanup
    return () => {
      if (animationRef.current) {
        animationRef.current.pause()
        animationRef.current = null
      }
    }
  }, options?.deps || [])

  return {
    ref: elementRef,
    animation: animationRef.current,
    play,
    pause,
    restart,
    reverse,
    seek,
  }
}

/**
 * Hook for creating timeline animations
 */
export function useAnimeTimeline(
  timelineOptions?: AnimeParams,
  deps?: React.DependencyList
) {
  const timelineRef = useRef<ReturnType<typeof anime.timeline> | null>(null)

  useEffect(() => {
    timelineRef.current = anime.timeline(timelineOptions)

    return () => {
      if (timelineRef.current) {
        // @ts-ignore - timeline doesn't have pause but animation does
        timelineRef.current.pause?.()
        timelineRef.current = null
      }
    }
  }, deps || [])

  const add = useCallback((params: AnimeParams, offset?: string | number) => {
    return timelineRef.current?.add(params, offset)
  }, [])

  const play = useCallback(() => {
    // @ts-ignore
    timelineRef.current?.play?.()
  }, [])

  const pause = useCallback(() => {
    // @ts-ignore
    timelineRef.current?.pause?.()
  }, [])

  const restart = useCallback(() => {
    // @ts-ignore
    timelineRef.current?.restart?.()
  }, [])

  return {
    timeline: timelineRef.current,
    add,
    play,
    pause,
    restart,
  }
}

/**
 * Hook for scroll-triggered animations
 */
export function useAnimeScroll<T extends HTMLElement = HTMLElement>(
  animation: (element: T) => AnimeParams,
  options?: {
    threshold?: number
    rootMargin?: string
    once?: boolean
  }
) {
  const elementRef = useRef<T>(null)
  const animationRef = useRef<AnimeInstance | null>(null)
  const hasPlayedRef = useRef(false)

  useEffect(() => {
    if (!elementRef.current) return

    const element = elementRef.current
    const { threshold = 0.5, rootMargin = '0px', once = true } = options || {}

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!hasPlayedRef.current || !once) {
              const animationParams = animation(element)
              animationRef.current = anime({
                targets: element,
                ...animationParams,
              })
              hasPlayedRef.current = true
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
  }, [animation, options?.threshold, options?.rootMargin, options?.once])

  return {
    ref: elementRef,
    animation: animationRef.current,
  }
}

/**
 * Hook for hover animations
 */
export function useAnimeHover<T extends HTMLElement = HTMLElement>(
  hoverAnimation: AnimeParams,
  leaveAnimation?: AnimeParams
) {
  const elementRef = useRef<T>(null)
  const hoverInstanceRef = useRef<AnimeInstance | null>(null)
  const leaveInstanceRef = useRef<AnimeInstance | null>(null)

  useEffect(() => {
    if (!elementRef.current) return

    const element = elementRef.current

    const handleMouseEnter = () => {
      if (leaveInstanceRef.current) {
        leaveInstanceRef.current.pause()
      }

      hoverInstanceRef.current = anime({
        targets: element,
        ...hoverAnimation,
      })
    }

    const handleMouseLeave = () => {
      if (hoverInstanceRef.current) {
        hoverInstanceRef.current.pause()
      }

      if (leaveAnimation) {
        leaveInstanceRef.current = anime({
          targets: element,
          ...leaveAnimation,
        })
      } else {
        // Reverse hover animation
        hoverInstanceRef.current?.reverse()
      }
    }

    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)

      if (hoverInstanceRef.current) {
        hoverInstanceRef.current.pause()
      }
      if (leaveInstanceRef.current) {
        leaveInstanceRef.current.pause()
      }
    }
  }, [hoverAnimation, leaveAnimation])

  return {
    ref: elementRef,
  }
}

/**
 * Hook for number counter animation
 */
export function useAnimeCounter(
  end: number,
  options?: {
    start?: number
    duration?: number
    decimals?: number
    prefix?: string
    suffix?: string
    autoplay?: boolean
  }
) {
  const elementRef = useRef<HTMLElement>(null)
  const animationRef = useRef<AnimeInstance | null>(null)

  const animate = useCallback(() => {
    if (!elementRef.current) return

    const {
      start = 0,
      duration = 2000,
      decimals = 0,
      prefix = '',
      suffix = '',
    } = options || {}

    const obj = { value: start }

    animationRef.current = anime({
      targets: obj,
      value: end,
      duration,
      easing: 'easeOutExpo',
      round: decimals === 0 ? 1 : Math.pow(10, decimals),
      update: () => {
        if (elementRef.current) {
          elementRef.current.textContent = `${prefix}${obj.value.toFixed(decimals)}${suffix}`
        }
      },
    })
  }, [end, options])

  useEffect(() => {
    if (options?.autoplay !== false) {
      animate()
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.pause()
        animationRef.current = null
      }
    }
  }, [animate, options?.autoplay])

  return {
    ref: elementRef,
    animate,
  }
}

export default useAnime

