/**
 * Anime.js Effects
 * 
 * Advanced effects including:
 * - Particle trail effects
 * - SVG path animations
 * - Number counting animations
 * - Morphing effects
 * - Wave animations
 */

import anime, { type AnimeParams } from 'animejs'
import animationsConfig from '@/config/animations.config'

const { durations, easings } = animationsConfig.anime

/**
 * Particle Trail - Creates following particle effect
 */
export class ParticleTrail {
  private particles: HTMLElement[] = []
  private maxParticles: number
  private container: HTMLElement

  constructor(container: HTMLElement, options?: { max?: number; color?: string; size?: number }) {
    this.container = container
    this.maxParticles = options?.max || 20
    this.container.style.position = 'relative'
  }

  createParticle(x: number, y: number, options?: { color?: string; size?: number }) {
    const particle = document.createElement('div')
    particle.style.position = 'absolute'
    particle.style.left = `${x}px`
    particle.style.top = `${y}px`
    particle.style.width = `${options?.size || 8}px`
    particle.style.height = `${options?.size || 8}px`
    particle.style.borderRadius = '50%'
    particle.style.backgroundColor = options?.color || '#3b82f6'
    particle.style.pointerEvents = 'none'
    particle.style.zIndex = '9999'

    this.container.appendChild(particle)
    this.particles.push(particle)

    // Animate and remove
    anime({
      targets: particle,
      scale: [1, 0],
      opacity: [0.8, 0],
      duration: durations.slow,
      easing: easings.smooth,
      complete: () => {
        particle.remove()
        this.particles = this.particles.filter(p => p !== particle)
      },
    })

    // Limit particles
    if (this.particles.length > this.maxParticles) {
      const oldest = this.particles.shift()
      oldest?.remove()
    }
  }

  clear() {
    this.particles.forEach(p => p.remove())
    this.particles = []
  }
}

/**
 * Number Counter - Animates number from start to end
 */
export function countNumber(
  element: HTMLElement,
  options?: {
    from?: number
    to?: number
    duration?: number
    decimals?: number
    prefix?: string
    suffix?: string
    easing?: string
  }
) {
  const from = options?.from || 0
  const to = options?.to || parseFloat(element.textContent || '0')
  const decimals = options?.decimals || 0
  const prefix = options?.prefix || ''
  const suffix = options?.suffix || ''

  const obj = { value: from }

  return anime({
    targets: obj,
    value: to,
    duration: options?.duration || durations.slow,
    easing: options?.easing || easings.smooth,
    round: decimals === 0 ? 1 : Math.pow(10, decimals),
    update: () => {
      element.textContent = `${prefix}${obj.value.toFixed(decimals)}${suffix}`
    },
  })
}

/**
 * SVG Draw - Animates SVG path stroke
 */
export function drawPath(path: SVGPathElement | string, options?: { duration?: number; easing?: string }) {
  const pathElement = typeof path === 'string' ? document.querySelector<SVGPathElement>(path) : path
  
  if (!pathElement) return null

  const length = pathElement.getTotalLength()

  pathElement.style.strokeDasharray = `${length}`
  pathElement.style.strokeDashoffset = `${length}`

  return anime({
    targets: pathElement,
    strokeDashoffset: [length, 0],
    duration: options?.duration || durations.slow,
    easing: options?.easing || easings.smooth,
  })
}

/**
 * SVG Morph - Morphs between SVG paths
 */
export function morphPath(
  path: SVGPathElement | string,
  toPath: string,
  options?: { duration?: number; easing?: string }
) {
  return anime({
    targets: path,
    d: toPath,
    duration: options?.duration || durations.normal,
    easing: options?.easing || easings.smooth,
  })
}

/**
 * Wave Effect - Creates wave animation on elements
 */
export function waveEffect(
  elements: HTMLElement[] | string,
  options?: {
    amplitude?: number
    frequency?: number
    duration?: number
  }
) {
  const amplitude = options?.amplitude || 20
  const frequency = options?.frequency || 2

  return anime({
    targets: elements,
    translateY: (_el: any, i: number) => {
      return amplitude * Math.sin((i / frequency) * Math.PI)
    },
    duration: options?.duration || durations.normal,
    easing: 'easeInOutSine',
    loop: true,
    direction: 'alternate',
  })
}

/**
 * Particle Burst - Particles explode from center
 */
export function particleBurst(
  container: HTMLElement,
  x: number,
  y: number,
  options?: {
    count?: number
    colors?: string[]
    size?: number
    speed?: number
  }
) {
  const count = options?.count || 12
  const colors = options?.colors || ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b']
  const size = options?.size || 8
  const speed = options?.speed || 100

  const particles: HTMLElement[] = []

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div')
    particle.style.position = 'absolute'
    particle.style.left = `${x}px`
    particle.style.top = `${y}px`
    particle.style.width = `${size}px`
    particle.style.height = `${size}px`
    particle.style.borderRadius = '50%'
    particle.style.backgroundColor = colors[i % colors.length]
    particle.style.pointerEvents = 'none'

    container.appendChild(particle)
    particles.push(particle)

    const angle = (i / count) * Math.PI * 2
    const tx = Math.cos(angle) * speed
    const ty = Math.sin(angle) * speed

    anime({
      targets: particle,
      translateX: tx,
      translateY: ty,
      scale: [1, 0],
      opacity: [1, 0],
      duration: durations.slow,
      easing: easings.smooth,
      complete: () => particle.remove(),
    })
  }

  return particles
}

/**
 * Text Shuffle - Randomly shuffles characters before settling
 */
export function shuffleText(
  element: HTMLElement,
  options?: {
    duration?: number
    chars?: string
  }
) {
  const originalText = element.textContent || ''
  const chars = options?.chars || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const duration = options?.duration || durations.slow

  const obj = { progress: 0 }

  return anime({
    targets: obj,
    progress: 1,
    duration,
    easing: easings.smooth,
    update: () => {
      let result = ''
      for (let i = 0; i < originalText.length; i++) {
        if (Math.random() > obj.progress) {
          result += chars[Math.floor(Math.random() * chars.length)]
        } else {
          result += originalText[i]
        }
      }
      element.textContent = result
    },
    complete: () => {
      element.textContent = originalText
    },
  })
}

/**
 * Ripple Multiple - Multiple expanding circles
 */
export function rippleMultiple(
  container: HTMLElement,
  x: number,
  y: number,
  options?: {
    count?: number
    color?: string
    delay?: number
  }
) {
  const count = options?.count || 3
  const color = options?.color || 'rgba(59, 130, 246, 0.3)'
  const delay = options?.delay || 200

  container.style.position = 'relative'
  container.style.overflow = 'hidden'

  for (let i = 0; i < count; i++) {
    const ripple = document.createElement('span')
    ripple.style.position = 'absolute'
    ripple.style.borderRadius = '50%'
    ripple.style.border = `2px solid ${color}`
    ripple.style.width = '20px'
    ripple.style.height = '20px'
    ripple.style.left = `${x - 10}px`
    ripple.style.top = `${y - 10}px`
    ripple.style.pointerEvents = 'none'

    container.appendChild(ripple)

    anime({
      targets: ripple,
      scale: [0, 4],
      opacity: [0.8, 0],
      duration: durations.slow,
      easing: easings.smooth,
      delay: i * delay,
      complete: () => ripple.remove(),
    })
  }
}

/**
 * Glow Pulse - Pulsing glow effect
 */
export function glowPulse(
  element: HTMLElement | string,
  options?: {
    color?: string
    intensity?: number
  }
) {
  const color = options?.color || '59, 130, 246'
  const intensity = options?.intensity || 20

  return anime({
    targets: element,
    boxShadow: [
      `0 0 5px rgba(${color}, 0.5)`,
      `0 0 ${intensity}px rgba(${color}, 0.8)`,
      `0 0 5px rgba(${color}, 0.5)`,
    ],
    duration: durations.slow,
    easing: 'easeInOutSine',
    loop: true,
  })
}

/**
 * Typewriter Effect - Characters appear one by one
 */
export function typewriter(
  element: HTMLElement,
  options?: {
    speed?: number
    cursor?: boolean
  }
) {
  const text = element.textContent || ''
  const speed = options?.speed || 50
  const showCursor = options?.cursor !== false

  element.textContent = ''

  let cursor: HTMLElement | null = null
  if (showCursor) {
    cursor = document.createElement('span')
    cursor.textContent = '|'
    cursor.style.display = 'inline-block'
    element.appendChild(cursor)

    anime({
      targets: cursor,
      opacity: [1, 0],
      duration: 500,
      easing: 'easeInOutSine',
      loop: true,
    })
  }

  const obj = { index: 0 }

  return anime({
    targets: obj,
    index: text.length,
    duration: text.length * speed,
    easing: 'linear',
    round: 1,
    update: () => {
      const currentText = text.substring(0, obj.index)
      if (cursor) {
        element.textContent = currentText
        element.appendChild(cursor)
      } else {
        element.textContent = currentText
      }
    },
    complete: () => {
      if (cursor) {
        cursor.remove()
      }
    },
  })
}

/**
 * Confetti - Celebration particle effect
 */
export function confetti(
  container: HTMLElement,
  options?: {
    count?: number
    colors?: string[]
    duration?: number
  }
) {
  const count = options?.count || 50
  const colors = options?.colors || ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981']
  const duration = options?.duration || 3000

  container.style.position = 'relative'

  for (let i = 0; i < count; i++) {
    const confetto = document.createElement('div')
    confetto.style.position = 'absolute'
    confetto.style.width = '10px'
    confetto.style.height = '10px'
    confetto.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
    confetto.style.left = `${Math.random() * 100}%`
    confetto.style.top = '-20px'
    confetto.style.pointerEvents = 'none'

    container.appendChild(confetto)

    anime({
      targets: confetto,
      translateY: container.offsetHeight + 40,
      translateX: anime.random(-100, 100),
      rotate: anime.random(-360, 360),
      opacity: [1, 0],
      duration: duration + anime.random(-500, 500),
      easing: 'easeInQuad',
      complete: () => confetto.remove(),
    })
  }
}

/**
 * Magnetic Effect - Element follows mouse
 */
export function magneticEffect(
  element: HTMLElement,
  mouseX: number,
  mouseY: number,
  options?: {
    strength?: number
    maxDistance?: number
  }
) {
  const strength = options?.strength || 0.3
  const maxDistance = options?.maxDistance || 100

  const rect = element.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  const distanceX = mouseX - centerX
  const distanceY = mouseY - centerY
  const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

  if (distance < maxDistance) {
    const translateX = distanceX * strength
    const translateY = distanceY * strength

    return anime({
      targets: element,
      translateX,
      translateY,
      duration: durations.fast,
      easing: easings.smooth,
    })
  } else {
    return anime({
      targets: element,
      translateX: 0,
      translateY: 0,
      duration: durations.fast,
      easing: easings.smooth,
    })
  }
}

/**
 * Glitch Effect - Digital glitch animation
 */
export function glitch(
  element: HTMLElement | string,
  options?: {
    intensity?: number
    duration?: number
  }
) {
  const intensity = options?.intensity || 10

  return anime.timeline({ loop: 3 })
    .add({
      targets: element,
      translateX: anime.random(-intensity, intensity),
      translateY: anime.random(-intensity, intensity),
      duration: 50,
      easing: 'linear',
    })
    .add({
      targets: element,
      translateX: anime.random(-intensity, intensity),
      translateY: anime.random(-intensity, intensity),
      duration: 50,
      easing: 'linear',
    })
    .add({
      targets: element,
      translateX: 0,
      translateY: 0,
      duration: options?.duration || durations.normal,
      easing: easings.smooth,
    })
}

