/**
 * Anime.js Micro-Interactions
 * 
 * Lightweight animations for:
 * - Button interactions (hover, click, ripple)
 * - Card effects (tilt, lift, flip)
 * - Badge animations (pulse, bounce, shake)
 * - Icon animations (spin, wiggle, pop)
 * - Form field interactions
 */

import anime, { type AnimeParams } from 'animejs'
import { animationDuration, animationEasing } from '@/config/animations.config'

const durations = animationDuration
const easings = animationEasing.anime

/**
 * Button Hover Effect - Scale and lift on hover
 */
export function buttonHover(element: HTMLElement | string) {
  return anime({
    targets: element,
    scale: 1.05,
    translateY: -2,
    duration: durations.fast,
    easing: easings.smooth,
    autoplay: false,
  })
}

/**
 * Button Click - Quick press and release
 */
export function buttonClick(element: HTMLElement | string) {
  return anime({
    targets: element,
    scale: [1, 0.95, 1],
    duration: durations.fast,
    easing: easings.spring,
  })
}

/**
 * Ripple Effect - Creates expanding circle on click
 */
export function ripple(
  container: HTMLElement,
  x: number,
  y: number,
  options?: { color?: string; duration?: number }
) {
  const ripple = document.createElement('span')
  ripple.style.position = 'absolute'
  ripple.style.borderRadius = '50%'
  ripple.style.backgroundColor = options?.color || 'rgba(255, 255, 255, 0.6)'
  ripple.style.width = '20px'
  ripple.style.height = '20px'
  ripple.style.left = `${x - 10}px`
  ripple.style.top = `${y - 10}px`
  ripple.style.pointerEvents = 'none'

  container.style.position = 'relative'
  container.style.overflow = 'hidden'
  container.appendChild(ripple)

  return anime({
    targets: ripple,
    scale: [0, 3],
    opacity: [0.6, 0],
    duration: options?.duration || durations.normal,
    easing: easings.smooth,
    complete: () => ripple.remove(),
  })
}

/**
 * Card Lift - Subtle elevation on hover
 */
export function cardLift(element: HTMLElement | string) {
  return anime({
    targets: element,
    translateY: -8,
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
    duration: durations.normal,
    easing: easings.smooth,
    autoplay: false,
  })
}

/**
 * Card Tilt - 3D tilt effect based on mouse position
 */
export function cardTilt(
  element: HTMLElement,
  mouseX: number,
  mouseY: number,
  options?: { intensity?: number }
) {
  const intensity = options?.intensity || 10
  const rect = element.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  const rotateX = ((mouseY - centerY) / rect.height) * intensity
  const rotateY = ((mouseX - centerX) / rect.width) * intensity

  return anime({
    targets: element,
    rotateX: -rotateX,
    rotateY: rotateY,
    duration: durations.fast,
    easing: easings.smooth,
  })
}

/**
 * Badge Pulse - Attention-grabbing pulse animation
 */
export function badgePulse(element: HTMLElement | string) {
  return anime({
    targets: element,
    scale: [1, 1.1, 1],
    duration: durations.normal,
    easing: easings.smooth,
    loop: true,
  })
}

/**
 * Badge Bounce - Elastic bounce animation
 */
export function badgeBounce(element: HTMLElement | string) {
  return anime({
    targets: element,
    translateY: [0, -10, 0],
    duration: durations.normal,
    easing: easings.spring,
    loop: true,
  })
}

/**
 * Shake Animation - Horizontal shake for errors/alerts
 */
export function shake(element: HTMLElement | string, options?: { intensity?: number }) {
  const intensity = options?.intensity || 10

  return anime({
    targets: element,
    translateX: [0, -intensity, intensity, -intensity, intensity, 0],
    duration: durations.fast,
    easing: 'easeInOutSine',
  })
}

/**
 * Icon Spin - Smooth rotation animation
 */
export function iconSpin(element: HTMLElement | string, options?: { duration?: number }) {
  return anime({
    targets: element,
    rotate: '1turn',
    duration: options?.duration || durations.slow,
    easing: 'linear',
    loop: true,
  })
}

/**
 * Icon Wiggle - Playful wiggle animation
 */
export function iconWiggle(element: HTMLElement | string) {
  return anime({
    targets: element,
    rotate: [-5, 5, -5, 5, 0],
    duration: durations.fast,
    easing: easings.spring,
  })
}

/**
 * Icon Pop - Quick scale animation
 */
export function iconPop(element: HTMLElement | string) {
  return anime({
    targets: element,
    scale: [1, 1.3, 1],
    duration: durations.fast,
    easing: easings.spring,
  })
}

/**
 * Input Focus - Highlight input on focus
 */
export function inputFocus(element: HTMLElement | string) {
  return anime({
    targets: element,
    scale: 1.02,
    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.5)',
    duration: durations.fast,
    easing: easings.smooth,
    autoplay: false,
  })
}

/**
 * Input Error - Shake and highlight for validation errors
 */
export function inputError(element: HTMLElement | string) {
  return anime.timeline()
    .add({
      targets: element,
      translateX: [-10, 10, -10, 10, 0],
      duration: durations.fast,
      easing: 'easeInOutSine',
    })
    .add({
      targets: element,
      boxShadow: '0 0 0 2px rgba(239, 68, 68, 0.5)',
      duration: durations.fast,
      easing: easings.smooth,
    }, '-=200')
}

/**
 * Loading Spinner - Continuous rotation
 */
export function loadingSpinner(element: HTMLElement | string) {
  return anime({
    targets: element,
    rotate: '1turn',
    duration: 1000,
    easing: 'linear',
    loop: true,
  })
}

/**
 * Stagger In - Elements appear one by one
 */
export function staggerIn(
  elements: HTMLElement[] | string,
  options?: { delay?: number; from?: 'left' | 'right' | 'top' | 'bottom' }
) {
  const delay = options?.delay || 50
  const from = options?.from || 'bottom'

  const translateProps = {
    left: { translateX: [-50, 0] },
    right: { translateX: [50, 0] },
    top: { translateY: [-50, 0] },
    bottom: { translateY: [50, 0] },
  }

  return anime({
    targets: elements,
    opacity: [0, 1],
    ...translateProps[from],
    duration: durations.normal,
    easing: easings.smooth,
    delay: anime.stagger(delay),
  })
}

/**
 * Flip Card - 3D card flip animation
 */
export function flipCard(element: HTMLElement | string, options?: { direction?: 'horizontal' | 'vertical' }) {
  const direction = options?.direction || 'horizontal'
  const axis = direction === 'horizontal' ? 'rotateY' : 'rotateX'

  return anime({
    targets: element,
    [axis]: [0, 180],
    duration: durations.normal,
    easing: easings.smooth,
  })
}

/**
 * Morph Shape - Smooth SVG path morphing
 */
export function morphShape(element: HTMLElement | string, toPath: string) {
  return anime({
    targets: element,
    d: toPath,
    duration: durations.normal,
    easing: easings.smooth,
  })
}

/**
 * Elastic Scale - Bouncy scale effect
 */
export function elasticScale(element: HTMLElement | string, scale: number = 1.2) {
  return anime({
    targets: element,
    scale: [1, scale, 1],
    duration: durations.normal,
    easing: easings.spring,
  })
}

/**
 * Fade In Up - Element fades in and moves up
 */
export function fadeInUp(element: HTMLElement | string, options?: { distance?: number }) {
  const distance = options?.distance || 30

  return anime({
    targets: element,
    opacity: [0, 1],
    translateY: [distance, 0],
    duration: durations.normal,
    easing: easings.smooth,
  })
}

/**
 * Slide In - Element slides in from direction
 */
export function slideIn(
  element: HTMLElement | string,
  options?: { from?: 'left' | 'right' | 'top' | 'bottom'; distance?: number }
) {
  const from = options?.from || 'right'
  const distance = options?.distance || 100

  const props = {
    left: { translateX: [-distance, 0] },
    right: { translateX: [distance, 0] },
    top: { translateY: [-distance, 0] },
    bottom: { translateY: [distance, 0] },
  }

  return anime({
    targets: element,
    opacity: [0, 1],
    ...props[from],
    duration: durations.normal,
    easing: easings.smooth,
  })
}

/**
 * Progress Bar - Animate progress bar fill
 */
export function progressBar(element: HTMLElement | string, progress: number) {
  return anime({
    targets: element,
    width: `${progress}%`,
    duration: durations.slow,
    easing: easings.smooth,
  })
}

/**
 * Attention Seeker - Combined effects to grab attention
 */
export function attentionSeeker(element: HTMLElement | string) {
  return anime.timeline({ loop: 2 })
    .add({
      targets: element,
      scale: [1, 1.1],
      duration: durations.fast,
      easing: easings.smooth,
    })
    .add({
      targets: element,
      rotate: [-5, 5, -5, 5, 0],
      duration: durations.fast,
      easing: 'easeInOutSine',
    })
    .add({
      targets: element,
      scale: [1.1, 1],
      duration: durations.fast,
      easing: easings.smooth,
    })
}

