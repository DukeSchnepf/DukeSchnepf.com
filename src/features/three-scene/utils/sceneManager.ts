/**
 * Scene Manager Utilities
 * 
 * Manages scene transitions, lifecycle, and state for Three.js scenes
 */

import { useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'

export type SceneType = 'hero' | 'projects' | 'about' | 'default'

export interface SceneConfig {
  type: SceneType
  enabled: boolean
  quality: 'low' | 'medium' | 'high'
  performance: {
    targetFPS: number
    particleCount: number
    shadowsEnabled: boolean
  }
}

/**
 * Default scene configurations
 */
export const defaultSceneConfigs: Record<SceneType, SceneConfig> = {
  hero: {
    type: 'hero',
    enabled: true,
    quality: 'high',
    performance: {
      targetFPS: 60,
      particleCount: 5000,
      shadowsEnabled: true,
    },
  },
  projects: {
    type: 'projects',
    enabled: true,
    quality: 'medium',
    performance: {
      targetFPS: 60,
      particleCount: 1000,
      shadowsEnabled: true,
    },
  },
  about: {
    type: 'about',
    enabled: true,
    quality: 'high',
    performance: {
      targetFPS: 60,
      particleCount: 100,
      shadowsEnabled: true,
    },
  },
  default: {
    type: 'default',
    enabled: true,
    quality: 'medium',
    performance: {
      targetFPS: 60,
      particleCount: 20,
      shadowsEnabled: false,
    },
  },
}

/**
 * Scene state management
 */
export interface SceneState {
  currentScene: SceneType
  isLoading: boolean
  fps: number
  quality: 'low' | 'medium' | 'high'
}

/**
 * Hook to manage scene state and transitions
 */
export function useSceneManager(initialScene: SceneType = 'default') {
  const sceneState = useRef<SceneState>({
    currentScene: initialScene,
    isLoading: false,
    fps: 60,
    quality: 'high',
  })

  const setCurrentScene = useCallback((sceneType: SceneType) => {
    sceneState.current.currentScene = sceneType
  }, [])

  const setLoading = useCallback((loading: boolean) => {
    sceneState.current.isLoading = loading
  }, [])

  const updateFPS = useCallback((fps: number) => {
    sceneState.current.fps = fps
    
    // Auto-adjust quality based on FPS
    if (fps < 30 && sceneState.current.quality === 'high') {
      sceneState.current.quality = 'medium'
    } else if (fps < 20 && sceneState.current.quality === 'medium') {
      sceneState.current.quality = 'low'
    } else if (fps > 55 && sceneState.current.quality === 'low') {
      sceneState.current.quality = 'medium'
    } else if (fps > 58 && sceneState.current.quality === 'medium') {
      sceneState.current.quality = 'high'
    }
  }, [])

  return {
    sceneState: sceneState.current,
    setCurrentScene,
    setLoading,
    updateFPS,
  }
}

/**
 * Hook to track FPS and performance
 */
export function usePerformanceMonitor(onFPSChange?: (fps: number) => void) {
  const frameTimesRef = useRef<number[]>([])
  const lastTimeRef = useRef<number>(performance.now())
  const fpsRef = useRef<number>(60)

  const measureFPS = useCallback(() => {
    const now = performance.now()
    const delta = now - lastTimeRef.current
    lastTimeRef.current = now

    // Keep last 60 frame times
    frameTimesRef.current.push(delta)
    if (frameTimesRef.current.length > 60) {
      frameTimesRef.current.shift()
    }

    // Calculate average FPS
    const avgFrameTime =
      frameTimesRef.current.reduce((a, b) => a + b, 0) / frameTimesRef.current.length
    const fps = Math.round(1000 / avgFrameTime)

    if (fps !== fpsRef.current) {
      fpsRef.current = fps
      onFPSChange?.(fps)
    }

    return fps
  }, [onFPSChange])

  useEffect(() => {
    let rafId: number

    const loop = () => {
      measureFPS()
      rafId = requestAnimationFrame(loop)
    }

    rafId = requestAnimationFrame(loop)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [measureFPS])

  return fpsRef.current
}

/**
 * Scene transition utilities
 */
export class SceneTransition {
  private static instance: SceneTransition
  private currentScene: THREE.Scene | null = null
  private nextScene: THREE.Scene | null = null
  private isTransitioning = false

  static getInstance(): SceneTransition {
    if (!SceneTransition.instance) {
      SceneTransition.instance = new SceneTransition()
    }
    return SceneTransition.instance
  }

  /**
   * Transition from current scene to next scene
   */
  async transition(
    from: THREE.Scene,
    to: THREE.Scene,
    duration: number = 1000,
    type: 'fade' | 'slide' | 'zoom' = 'fade'
  ): Promise<void> {
    if (this.isTransitioning) {
      console.warn('Scene transition already in progress')
      return
    }

    this.isTransitioning = true
    this.currentScene = from
    this.nextScene = to

    return new Promise((resolve) => {
      const startTime = Date.now()

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)

        switch (type) {
          case 'fade':
            this.fadeScenes(progress);
            break;
          case 'slide':
            this.slideScenes(progress);
            break;
          case 'zoom':
            this.zoomScenes(progress);
            break;
        }

        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          this.isTransitioning = false
          resolve()
        }
      }

      animate()
    })
  }

  private fadeScenes(progress: number): void {
    // Fade out current scene
    if (this.currentScene) {
      this.currentScene.traverse((object) => {
        if ('material' in object) {
          const mesh = object as THREE.Mesh
          if (mesh.material && 'opacity' in mesh.material) {
            const material = mesh.material as THREE.Material & { opacity: number }
            material.opacity = 1 - progress
          }
        }
      })
    }

    // Fade in next scene
    if (this.nextScene) {
      this.nextScene.traverse((object) => {
        if ('material' in object) {
          const mesh = object as THREE.Mesh
          if (mesh.material && 'opacity' in mesh.material) {
            const material = mesh.material as THREE.Material & { opacity: number }
            material.opacity = progress
          }
        }
      })
    }
  }

  private slideScenes(progress: number): void {
    const distance = 10
    
    if (this.currentScene) {
      this.currentScene.position.x = -distance * progress
    }
    
    if (this.nextScene) {
      this.nextScene.position.x = distance * (1 - progress)
    }
  }

  private zoomScenes(progress: number): void {
    const scale = 1 + progress
    
    if (this.currentScene) {
      this.currentScene.scale.setScalar(scale)
    }
    
    if (this.nextScene) {
      this.nextScene.scale.setScalar(2 - scale)
    }
  }
}

/**
 * Utility to check if WebGL is available
 */
export function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch (e) {
    return false
  }
}

/**
 * Get optimal scene config based on device capabilities
 */
export function getOptimalSceneConfig(sceneType: SceneType): SceneConfig {
  const baseConfig = { ...defaultSceneConfigs[sceneType] }
  
  // Detect device capabilities
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
  const hasHighDPI = window.devicePixelRatio > 1
  const hasGPU = isWebGLAvailable()

  if (!hasGPU) {
    baseConfig.enabled = false
    return baseConfig
  }

  if (isMobile) {
    baseConfig.quality = 'low'
    baseConfig.performance.particleCount = Math.floor(
      baseConfig.performance.particleCount / 5
    )
    baseConfig.performance.shadowsEnabled = false
  } else if (!hasHighDPI) {
    baseConfig.quality = 'medium'
    baseConfig.performance.particleCount = Math.floor(
      baseConfig.performance.particleCount / 2
    )
  }

  return baseConfig
}

/**
 * Scene cleanup utility
 */
export function cleanupScene(scene: THREE.Scene): void {
  scene.traverse((object) => {
    if ('geometry' in object) {
      const mesh = object as THREE.Mesh
      mesh.geometry?.dispose()
    }

    if ('material' in object) {
      const mesh = object as THREE.Mesh
      const material = mesh.material

      if (Array.isArray(material)) {
        material.forEach((mat) => mat?.dispose())
      } else if (material) {
        material.dispose()
      }
    }
  })

  scene.clear()
}

