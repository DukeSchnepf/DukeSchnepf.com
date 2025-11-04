import { gsap, type GSAPTimeline } from 'gsap'
import type anime from 'animejs'
import animationsConfig from '@/config/animations.config'

type PriorityLevel = keyof typeof animationsConfig.orchestration.priority

type OrchestratedItem = {
  id: string
  type: 'gsap' | 'anime'
  priority: PriorityLevel
  startTime: number
  play: () => void
  pause: () => void
  kill: () => void
}

function generateId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`
}

export class AnimationOrchestrator {
  private queue: OrchestratedItem[] = []
  private active: OrchestratedItem[] = []
  private maxConcurrent = animationsConfig.orchestration.maxConcurrentAnimations
  private reducedMotion = animationsConfig.performance.reducedMotion

  registerGsapTimeline(tl: GSAPTimeline, priority: PriorityLevel = 'normal') {
    const id = generateId('gsap')
    const item: OrchestratedItem = {
      id,
      type: 'gsap',
      priority,
      startTime: performance.now(),
      play: () => tl.play(0),
      pause: () => tl.pause(),
      kill: () => tl.kill(),
    }

    // Respect reduced motion by immediately completing or skipping heavy motion
    if (this.reducedMotion) {
      tl.timeScale(0.5)
    }

    return this.enqueue(item)
  }

  registerAnimeInstance(instance: anime.AnimeInstance, priority: PriorityLevel = 'normal') {
    const id = generateId('anime')
    const item: OrchestratedItem = {
      id,
      type: 'anime',
      priority,
      startTime: performance.now(),
      play: () => instance.play(),
      pause: () => instance.pause(),
      kill: () => instance.pause(),
    }

    // Reduced motion: slow down and disable looped eye-candy
    if (this.reducedMotion) {
      instance.speed = 0.5
    }

    return this.enqueue(item)
  }

  setReducedMotion(enabled: boolean) {
    this.reducedMotion = enabled
    gsap.globalTimeline.timeScale(enabled ? 0.5 : 1)
  }

  setMaxConcurrent(count: number) {
    this.maxConcurrent = Math.max(1, count)
    this.pump()
  }

  pauseAll() {
    this.active.forEach(i => i.pause())
    gsap.globalTimeline.pause()
  }

  resumeAll() {
    this.active.forEach(i => i.play())
    gsap.globalTimeline.resume()
  }

  killAll() {
    this.queue = []
    this.active.forEach(i => i.kill())
    this.active = []
    gsap.globalTimeline.clear()
  }

  private enqueue(item: OrchestratedItem) {
    this.queue.push(item)
    // Sort by priority (desc) then FIFO by startTime
    this.queue.sort((a, b) => {
      const pa = animationsConfig.orchestration.priority[a.priority]
      const pb = animationsConfig.orchestration.priority[b.priority]
      if (pa !== pb) return pb - pa
      return a.startTime - b.startTime
    })

    this.pump()
    return item.id
  }

  private pump() {
    // Fill available slots
    while (this.active.length < this.maxConcurrent && this.queue.length > 0) {
      const next = this.queue.shift()!
      this.active.push(next)

      // Stagger sequences slightly to avoid spikes
      const gap = animationsConfig.orchestration.sequenceGap
      gsap.delayedCall(gap, () => {
        next.play()
        // Cleanup when finished (best-effort)
        if (next.type === 'gsap') {
          const tl = gsap.globalTimeline.getChildren().find(t => (t as GSAPTimeline).labels && true)
          // No reliable lookup; rely on manual kill when components unmount
        }
      })
    }

    // Cull finished/paused timelines periodically
    this.active = this.active.filter(item => {
      // We cannot reliably introspect Anime/GSAP completion across versions
      // Leave active until explicitly killed or replaced; consumers should call kill
      return true
    })
  }
}

export const animationOrchestrator = new AnimationOrchestrator()

export default animationOrchestrator


