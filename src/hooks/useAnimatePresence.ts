import { useState, useRef, useEffect, useCallback, RefObject } from 'react'
import gsap from 'gsap'
import { animationDuration, animationEasing } from '@/config/animations.config'

interface AnimatePresenceOptions {
  enter?: gsap.TweenVars
  exit?: gsap.TweenVars
  duration?: number
  ease?: string
  exitEase?: string
  onEnterComplete?: () => void
  onExitComplete?: () => void
}

interface AnimatePresenceReturn {
  /** Whether the element should be rendered in the DOM */
  shouldRender: boolean
  /** Ref to attach to the animating element */
  ref: RefObject<HTMLDivElement | null>
  /** Manually trigger exit animation */
  triggerExit: () => Promise<void>
  /** Current animation state */
  state: 'entering' | 'entered' | 'exiting' | 'exited'
}

const defaultEnter: gsap.TweenVars = {
  opacity: 1,
  scale: 1,
  y: 0,
  x: 0,
}

const defaultExit: gsap.TweenVars = {
  opacity: 0,
  scale: 0.95,
  y: 20,
}

const defaultInitial: gsap.TweenVars = {
  opacity: 0,
  scale: 0.95,
  y: 20,
}

/**
 * useAnimatePresence - GSAP-based replacement for Framer Motion's AnimatePresence
 * Handles enter/exit animations with proper unmounting after exit completes
 * 
 * @param isOpen - Boolean controlling visibility
 * @param options - Animation configuration
 */
export function useAnimatePresence(
  isOpen: boolean,
  options: AnimatePresenceOptions = {}
): AnimatePresenceReturn {
  const {
    enter = defaultEnter,
    exit = defaultExit,
    duration = animationDuration.normal,
    ease = animationEasing.gsap.default,
    exitEase,
    onEnterComplete,
    onExitComplete,
  } = options

  const ref = useRef<HTMLDivElement | null>(null)
  const [shouldRender, setShouldRender] = useState(isOpen)
  const [state, setState] = useState<'entering' | 'entered' | 'exiting' | 'exited'>(
    isOpen ? 'entering' : 'exited'
  )
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  // Handle enter animation
  useEffect(() => {
    if (isOpen && !shouldRender) {
      setShouldRender(true)
      setState('entering')
    }
  }, [isOpen, shouldRender])

  // Run animations when shouldRender changes
  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Kill any existing animation
    if (tweenRef.current) {
      tweenRef.current.kill()
    }

    if (isOpen && shouldRender) {
      // Enter animation
      gsap.set(el, defaultInitial)
      tweenRef.current = gsap.to(el, {
        ...enter,
        duration,
        ease,
        onComplete: () => {
          setState('entered')
          onEnterComplete?.()
        },
      })
    } else if (!isOpen && shouldRender) {
      // Exit animation
      setState('exiting')
      tweenRef.current = gsap.to(el, {
        ...exit,
        duration,
        ease: exitEase || ease,
        onComplete: () => {
          setShouldRender(false)
          setState('exited')
          onExitComplete?.()
        },
      })
    }

    return () => {
      if (tweenRef.current) {
        tweenRef.current.kill()
      }
    }
  }, [isOpen, shouldRender, enter, exit, duration, ease, exitEase, onEnterComplete, onExitComplete])

  const triggerExit = useCallback((): Promise<void> => {
    return new Promise((resolve) => {
      const el = ref.current
      if (!el) {
        resolve()
        return
      }

      if (tweenRef.current) {
        tweenRef.current.kill()
      }

      setState('exiting')
      tweenRef.current = gsap.to(el, {
        ...exit,
        duration,
        ease: exitEase || ease,
        onComplete: () => {
          setShouldRender(false)
          setState('exited')
          onExitComplete?.()
          resolve()
        },
      })
    })
  }, [exit, duration, ease, exitEase, onExitComplete])

  return {
    shouldRender,
    ref,
    triggerExit,
    state,
  }
}

/**
 * useAnimatePresenceGroup - For animating lists with enter/exit
 * Similar to AnimatePresence mode="wait"
 */
export function useCarouselTransition<T>(
  items: T[],
  currentIndex: number,
  options: {
    duration?: number
    ease?: string
  } = {}
) {
  const { duration = animationDuration.normal, ease = animationEasing.gsap.default } = options
  
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [displayIndex, setDisplayIndex] = useState(currentIndex)
  const [isAnimating, setIsAnimating] = useState(false)
  const prevIndexRef = useRef(currentIndex)

  useEffect(() => {
    if (currentIndex === prevIndexRef.current) return
    
    const container = containerRef.current
    if (!container) {
      setDisplayIndex(currentIndex)
      prevIndexRef.current = currentIndex
      return
    }

    const direction = currentIndex > prevIndexRef.current ? 1 : -1
    setIsAnimating(true)

    // Exit animation
    gsap.to(container, {
      opacity: 0,
      x: -20 * direction,
      duration: duration / 2,
      ease,
      onComplete: () => {
        setDisplayIndex(currentIndex)
        
        // Set initial position for enter
        gsap.set(container, { x: 20 * direction, opacity: 0 })
        
        // Enter animation
        gsap.to(container, {
          opacity: 1,
          x: 0,
          duration: duration / 2,
          ease,
          onComplete: () => {
            setIsAnimating(false)
          },
        })
      },
    })

    prevIndexRef.current = currentIndex
  }, [currentIndex, duration, ease])

  return {
    containerRef,
    displayIndex,
    isAnimating,
    currentItem: items[displayIndex],
  }
}

export default useAnimatePresence

