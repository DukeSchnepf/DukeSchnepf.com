import { useRef, useEffect, useCallback } from 'react'
import gsap from 'gsap'

interface SpringConfig {
  stiffness?: number
  damping?: number
  mass?: number
}

interface SpringValues {
  x: number
  y: number
}

interface UseGSAPSpringReturn {
  /** Current spring values */
  values: React.MutableRefObject<SpringValues>
  /** Set target values for spring animation */
  setTarget: (x: number, y: number) => void
  /** Reset to origin (0, 0) */
  reset: () => void
  /** Get current interpolated values */
  get: () => SpringValues
}

/**
 * Convert spring config to GSAP duration/ease
 * Higher stiffness = faster, higher damping = less bounce
 */
function springToGSAP(config: SpringConfig): { duration: number; ease: string } {
  const { stiffness = 500, damping = 100 } = config
  
  // Convert spring physics to approximate GSAP values
  // Duration inversely proportional to stiffness
  const duration = Math.max(0.1, 1 / (stiffness / 100))
  
  // Damping ratio determines overshoot
  // damping < stiffness/4 = underdamped (bouncy)
  // damping = stiffness/4 = critically damped
  // damping > stiffness/4 = overdamped
  const dampingRatio = damping / (2 * Math.sqrt(stiffness))
  
  let ease: string
  if (dampingRatio < 0.7) {
    // Underdamped - bouncy
    ease = `elastic.out(1, ${0.3 + dampingRatio * 0.4})`
  } else if (dampingRatio < 1) {
    // Slightly underdamped
    ease = `back.out(${1.2 - dampingRatio * 0.5})`
  } else {
    // Critically damped or overdamped
    ease = 'power2.out'
  }
  
  return { duration, ease }
}

/**
 * useGSAPSpring - Spring physics using GSAP's quickTo
 * Replaces Framer Motion's useSpring/useMotionValue pattern
 * 
 * @param config - Spring configuration (stiffness, damping, mass)
 */
export function useGSAPSpring(config: SpringConfig = {}): UseGSAPSpringReturn {
  const values = useRef<SpringValues>({ x: 0, y: 0 })
  const targetRef = useRef<SpringValues>({ x: 0, y: 0 })
  const quickToX = useRef<gsap.QuickToFunc | null>(null)
  const quickToY = useRef<gsap.QuickToFunc | null>(null)
  const dummyRef = useRef({ x: 0, y: 0 })

  const { duration, ease } = springToGSAP(config)

  useEffect(() => {
    // Create quickTo functions for smooth interpolation
    quickToX.current = gsap.quickTo(dummyRef.current, 'x', {
      duration,
      ease,
      onUpdate: () => {
        values.current.x = dummyRef.current.x
      },
    })
    
    quickToY.current = gsap.quickTo(dummyRef.current, 'y', {
      duration,
      ease,
      onUpdate: () => {
        values.current.y = dummyRef.current.y
      },
    })

    return () => {
      gsap.killTweensOf(dummyRef.current)
    }
  }, [duration, ease])

  const setTarget = useCallback((x: number, y: number) => {
    targetRef.current = { x, y }
    quickToX.current?.(x)
    quickToY.current?.(y)
  }, [])

  const reset = useCallback(() => {
    setTarget(0, 0)
  }, [setTarget])

  const get = useCallback(() => ({ ...values.current }), [])

  return {
    values,
    setTarget,
    reset,
    get,
  }
}

/**
 * useGSAPSpringElement - Apply spring physics directly to an element's transform
 * More performant for direct element manipulation
 */
export function useGSAPSpringElement<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  config: SpringConfig = {}
) {
  const quickToX = useRef<gsap.QuickToFunc | null>(null)
  const quickToY = useRef<gsap.QuickToFunc | null>(null)
  const quickToRotateX = useRef<gsap.QuickToFunc | null>(null)
  const quickToRotateY = useRef<gsap.QuickToFunc | null>(null)

  const { duration, ease } = springToGSAP(config)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    quickToX.current = gsap.quickTo(el, 'x', { duration, ease })
    quickToY.current = gsap.quickTo(el, 'y', { duration, ease })
    quickToRotateX.current = gsap.quickTo(el, 'rotateX', { duration, ease })
    quickToRotateY.current = gsap.quickTo(el, 'rotateY', { duration, ease })

    return () => {
      gsap.killTweensOf(el)
    }
  }, [ref, duration, ease])

  const setPosition = useCallback((x: number, y: number) => {
    quickToX.current?.(x)
    quickToY.current?.(y)
  }, [])

  const setRotation = useCallback((rotateX: number, rotateY: number) => {
    quickToRotateX.current?.(rotateX)
    quickToRotateY.current?.(rotateY)
  }, [])

  const reset = useCallback(() => {
    quickToX.current?.(0)
    quickToY.current?.(0)
    quickToRotateX.current?.(0)
    quickToRotateY.current?.(0)
  }, [])

  return {
    setPosition,
    setRotation,
    reset,
  }
}

export default useGSAPSpring

