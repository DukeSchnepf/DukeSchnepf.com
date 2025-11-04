/**
 * GSAP Text Animation System
 * 
 * Provides 10+ text animation effects:
 * - Text reveals (fade, slide, clip)
 * - Typing/typewriter effects
 * - Glitch effects
 * - Scramble/decode effects
 * - Wave animations
 * - Split text animations (chars, words, lines)
 * - Gradient text animations
 * - And more...
 */

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { animationDuration, animationEasing } from '@/config/animations.config'

gsap.registerPlugin(ScrollTrigger)

const durations = animationDuration; const easings = animationEasing.gsap

/**
 * Split text into spans for character-by-character animation
 */
function splitText(element: HTMLElement, type: 'chars' | 'words' | 'lines' = 'chars') {
  const text = element.textContent || ''
  element.innerHTML = ''

  if (type === 'chars') {
    const chars = text.split('')
    chars.forEach(char => {
      const span = document.createElement('span')
      span.textContent = char === ' ' ? '\u00A0' : char
      span.style.display = 'inline-block'
      element.appendChild(span)
    })
    return Array.from(element.children) as HTMLElement[]
  }

  if (type === 'words') {
    const words = text.split(' ')
    words.forEach((word, i) => {
      const span = document.createElement('span')
      span.textContent = word
      span.style.display = 'inline-block'
      element.appendChild(span)
      if (i < words.length - 1) {
        element.appendChild(document.createTextNode(' '))
      }
    })
    return Array.from(element.querySelectorAll('span')) as HTMLElement[]
  }

  // Lines
  const lines = text.split('\n')
  lines.forEach(line => {
    const div = document.createElement('div')
    div.textContent = line
    element.appendChild(div)
  })
  return Array.from(element.children) as HTMLElement[]
}

/**
 * Typewriter Effect - Characters appear one by one
 */
export function typewriter(
  element: HTMLElement,
  options?: {
    speed?: number
    cursor?: boolean
    onComplete?: () => void
  }
) {
  const speed = options?.speed || 0.05
  const showCursor = options?.cursor !== false

  const chars = splitText(element, 'chars')
  
  // Add cursor
  let cursor: HTMLElement | null = null
  if (showCursor) {
    cursor = document.createElement('span')
    cursor.textContent = '|'
    cursor.style.display = 'inline-block'
    cursor.className = 'typewriter-cursor'
    element.appendChild(cursor)

    // Blink cursor
    gsap.to(cursor, {
      opacity: 0,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    })
  }

  const tl = gsap.timeline({
    onComplete: () => {
      if (cursor) {
        gsap.killTweensOf(cursor)
        cursor.style.opacity = '0'
      }
      options?.onComplete?.()
    },
  })

  tl.from(chars, {
    opacity: 0,
    duration: speed,
    stagger: speed,
    ease: 'none',
  })

  return tl
}

/**
 * Glitch Effect - Distorted/glitchy text appearance
 */
export function glitch(
  element: HTMLElement,
  options?: {
    duration?: number
    intensity?: number
  }
) {
  const duration = options?.duration || durations.fast
  const intensity = options?.intensity || 10

  const tl = gsap.timeline({ repeat: 2, repeatDelay: 0.1 })

  tl.to(element, {
    x: () => gsap.utils.random(-intensity, intensity),
    y: () => gsap.utils.random(-intensity, intensity),
    skewX: () => gsap.utils.random(-10, 10),
    duration: 0.05,
    ease: 'none',
  })
    .to(element, {
      x: () => gsap.utils.random(-intensity, intensity),
      y: () => gsap.utils.random(-intensity, intensity),
      skewX: () => gsap.utils.random(-10, 10),
      duration: 0.05,
      ease: 'none',
    })
    .to(element, {
      x: 0,
      y: 0,
      skewX: 0,
      duration: duration,
      ease: easings.smooth,
    })

  return tl
}

/**
 * Scramble/Decode Effect - Text decodes from random characters
 */
export function scramble(
  element: HTMLElement,
  options?: {
    duration?: number
    chars?: string
    onComplete?: () => void
  }
) {
  const duration = options?.duration || durations.slow
  const chars = options?.chars || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
  const originalText = element.textContent || ''
  const length = originalText.length

  const obj = { progress: 0 }

  return gsap.to(obj, {
    progress: 1,
    duration,
    ease: easings.smooth,
    onUpdate: () => {
      let result = ''
      for (let i = 0; i < length; i++) {
        if (i < obj.progress * length) {
          result += originalText[i]
        } else {
          result += chars[Math.floor(Math.random() * chars.length)]
        }
      }
      element.textContent = result
    },
    onComplete: () => {
      element.textContent = originalText
      options?.onComplete?.()
    },
  })
}

/**
 * Wave Animation - Text waves/bounces character by character
 */
export function wave(
  element: HTMLElement,
  options?: {
    distance?: number
    stagger?: number
    repeat?: boolean
  }
) {
  const distance = options?.distance || 20
  const stagger = options?.stagger || 0.05
  const repeat = options?.repeat !== false

  const chars = splitText(element, 'chars')

  return gsap.to(chars, {
    y: -distance,
    duration: durations.fast,
    stagger,
    repeat: repeat ? -1 : 0,
    yoyo: true,
    ease: easings.smooth,
  })
}

/**
 * Fade In Characters - Characters fade in one by one
 */
export function fadeInChars(
  element: HTMLElement,
  options?: {
    stagger?: number
    from?: 'left' | 'right' | 'random'
  }
) {
  const stagger = options?.stagger || 0.03
  const from = options?.from || 'left'

  const chars = splitText(element, 'chars')

  if (from === 'random') {
    gsap.utils.shuffle(chars)
  } else if (from === 'right') {
    chars.reverse()
  }

  return gsap.from(chars, {
    opacity: 0,
    y: 20,
    duration: durations.fast,
    stagger,
    ease: easings.smooth,
  })
}

/**
 * Slide In Words - Words slide in one by one
 */
export function slideInWords(
  element: HTMLElement,
  options?: {
    direction?: 'up' | 'down' | 'left' | 'right'
    stagger?: number
    distance?: number
  }
) {
  const direction = options?.direction || 'up'
  const stagger = options?.stagger || 0.1
  const distance = options?.distance || 50

  const words = splitText(element, 'words')

  const directionMap = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  }

  return gsap.from(words, {
    ...directionMap[direction],
    opacity: 0,
    duration: durations.normal,
    stagger,
    ease: easings.smooth,
  })
}

/**
 * Clip Path Reveal - Text reveals with clip-path animation
 */
export function clipReveal(
  element: HTMLElement,
  options?: {
    direction?: 'left' | 'right' | 'top' | 'bottom'
    duration?: number
  }
) {
  const direction = options?.direction || 'right'
  const duration = options?.duration || durations.normal

  const clipPaths = {
    left: { from: 'inset(0 0 0 100%)', to: 'inset(0 0 0 0)' },
    right: { from: 'inset(0 100% 0 0)', to: 'inset(0 0 0 0)' },
    top: { from: 'inset(0 0 100% 0)', to: 'inset(0 0 0 0)' },
    bottom: { from: 'inset(100% 0 0 0)', to: 'inset(0 0 0 0)' },
  }

  const { from, to } = clipPaths[direction]

  return gsap.fromTo(
    element,
    { clipPath: from },
    {
      clipPath: to,
      duration,
      ease: easings.smooth,
    }
  )
}

/**
 * Gradient Animation - Animates text gradient colors
 */
export function gradientAnimation(
  element: HTMLElement,
  options?: {
    colors?: string[]
    duration?: number
    repeat?: boolean
  }
) {
  const colors = options?.colors || ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4']
  const duration = options?.duration || durations.slow
  const repeat = options?.repeat !== false

  // Create gradient
  element.style.backgroundImage = `linear-gradient(90deg, ${colors.join(', ')})`
  element.style.backgroundClip = 'text'
  element.style.webkitBackgroundClip = 'text'
  element.style.color = 'transparent'
  element.style.backgroundSize = '200% 100%'

  return gsap.to(element, {
    backgroundPosition: '200% 0',
    duration,
    ease: 'none',
    repeat: repeat ? -1 : 0,
  })
}

/**
 * Split and Rotate - Characters rotate into view
 */
export function rotateInChars(
  element: HTMLElement,
  options?: {
    stagger?: number
    degrees?: number
  }
) {
  const stagger = options?.stagger || 0.03
  const degrees = options?.degrees || 180

  const chars = splitText(element, 'chars')

  return gsap.from(chars, {
    rotationX: degrees,
    opacity: 0,
    transformOrigin: '50% 50%',
    duration: durations.normal,
    stagger,
    ease: easings.smooth,
  })
}

/**
 * Flicker Effect - Text flickers like old light bulb
 */
export function flicker(
  element: HTMLElement,
  options?: {
    duration?: number
    intensity?: number
  }
) {
  const duration = options?.duration || 0.05
  const intensity = options?.intensity || 0.3

  const tl = gsap.timeline({ repeat: 5, repeatDelay: 0.05 })

  for (let i = 0; i < 3; i++) {
    tl.to(element, {
      opacity: intensity,
      duration,
      ease: 'none',
    }).to(element, {
      opacity: 1,
      duration,
      ease: 'none',
    })
  }

  return tl
}

/**
 * Text Blur In - Text comes into focus
 */
export function blurIn(
  element: HTMLElement,
  options?: {
    duration?: number
    amount?: number
  }
) {
  const duration = options?.duration || durations.normal
  const amount = options?.amount || 20

  return gsap.from(element, {
    filter: `blur(${amount}px)`,
    opacity: 0,
    duration,
    ease: easings.smooth,
  })
}

/**
 * Elastic Text - Text bounces elastically
 */
export function elastic(
  element: HTMLElement,
  options?: {
    scale?: number
    duration?: number
  }
) {
  const scale = options?.scale || 0.5
  const duration = options?.duration || durations.normal

  return gsap.from(element, {
    scale,
    duration,
    ease: easings.elastic,
  })
}

/**
 * Scroll-triggered text reveal
 */
export function scrollReveal(
  element: HTMLElement,
  options?: {
    type?: 'fade' | 'slide' | 'chars' | 'words'
    trigger?: HTMLElement | string
    start?: string
    once?: boolean
  }
) {
  const type = options?.type || 'fade'

  const animations = {
    fade: () => fadeInChars(element),
    slide: () => slideInWords(element),
    chars: () => fadeInChars(element, { stagger: 0.02 }),
    words: () => slideInWords(element, { stagger: 0.08 }),
  }

  return animations[type]()
}

/**
 * Utility: Clear split text (restore original)
 */
export function clearSplitText(element: HTMLElement, originalText: string) {
  element.innerHTML = originalText
}




