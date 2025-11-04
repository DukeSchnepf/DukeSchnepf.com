/**
 * Custom hook for Three.js scene management
 * 
 * Provides utilities for scene lifecycle, state management, and performance monitoring
 */

import { useEffect, useState, useRef, useCallback } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'
import {
  SceneType,
  SceneConfig,
  useSceneManager,
  usePerformanceMonitor,
  getOptimalSceneConfig,
  cleanupScene,
} from '../features/three-scene/utils/sceneManager'

export interface UseThreeSceneOptions {
  sceneType: SceneType
  autoStart?: boolean
  enablePerformanceMonitoring?: boolean
  onSceneReady?: () => void
  onSceneDispose?: () => void
}

export interface UseThreeSceneReturn {
  sceneConfig: SceneConfig
  sceneState: ReturnType<typeof useSceneManager>['sceneState']
  isReady: boolean
  fps: number
  quality: 'low' | 'medium' | 'high'
  changeScene: (sceneType: SceneType) => void
  updateQuality: (quality: 'low' | 'medium' | 'high') => void
}

/**
 * Hook for managing Three.js scenes with performance monitoring
 */
export function useThreeScene(options: UseThreeSceneOptions): UseThreeSceneReturn {
  const {
    sceneType,
    autoStart = true,
    enablePerformanceMonitoring = true,
    onSceneReady,
    onSceneDispose,
  } = options

  const { scene } = useThree()
  const [isReady, setIsReady] = useState(false)
  const [sceneConfig, setSceneConfig] = useState<SceneConfig>(() =>
    getOptimalSceneConfig(sceneType)
  )

  const { sceneState, setCurrentScene, updateFPS } = useSceneManager(sceneType)

  // Performance monitoring
  const fps = usePerformanceMonitor(
    enablePerformanceMonitoring ? updateFPS : undefined
  )

  // Initialize scene
  useEffect(() => {
    if (!autoStart) return

    const config = getOptimalSceneConfig(sceneType)
    setSceneConfig(config)
    setCurrentScene(sceneType)
    setIsReady(true)
    onSceneReady?.()

    return () => {
      cleanupScene(scene)
      onSceneDispose?.()
    }
  }, [sceneType, autoStart, scene, setCurrentScene, onSceneReady, onSceneDispose])

  // Change scene
  const changeScene = useCallback(
    (newSceneType: SceneType) => {
      setIsReady(false)
      const newConfig = getOptimalSceneConfig(newSceneType)
      setSceneConfig(newConfig)
      setCurrentScene(newSceneType)
      
      // Small delay to allow cleanup
      setTimeout(() => {
        setIsReady(true)
        onSceneReady?.()
      }, 100)
    },
    [setCurrentScene, onSceneReady]
  )

  // Update quality
  const updateQuality = useCallback((quality: 'low' | 'medium' | 'high') => {
    setSceneConfig((prev) => ({
      ...prev,
      quality,
    }))
  }, [])

  return {
    sceneConfig,
    sceneState,
    isReady,
    fps,
    quality: sceneState.quality,
    changeScene,
    updateQuality,
  }
}

/**
 * Hook for managing scene-specific interactions
 */
export function useSceneInteraction() {
  const { camera, raycaster, mouse, gl } = useThree()
  const [hoveredObject, setHoveredObject] = useState<THREE.Object3D | null>(null)
  const [selectedObject, setSelectedObject] = useState<THREE.Object3D | null>(null)

  const onPointerMove = useCallback(
    (event: PointerEvent) => {
      const rect = gl.domElement.getBoundingClientRect()
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
    },
    [gl, mouse]
  )

  const onPointerClick = useCallback(() => {
    if (hoveredObject) {
      setSelectedObject(hoveredObject)
    } else {
      setSelectedObject(null)
    }
  }, [hoveredObject])

  useEffect(() => {
    gl.domElement.addEventListener('pointermove', onPointerMove)
    gl.domElement.addEventListener('click', onPointerClick)

    return () => {
      gl.domElement.removeEventListener('pointermove', onPointerMove)
      gl.domElement.removeEventListener('click', onPointerClick)
    }
  }, [gl, onPointerMove, onPointerClick])

  return {
    hoveredObject,
    selectedObject,
    setHoveredObject,
    setSelectedObject,
  }
}

/**
 * Hook for animating scene objects
 */
export function useSceneAnimation(
  targetRef: React.RefObject<THREE.Object3D>,
  options: {
    rotation?: { x?: number; y?: number; z?: number }
    position?: { x?: number; y?: number; z?: number }
    scale?: number
    speed?: number
  } = {}
) {
  const { rotation, position, scale, speed = 1 } = options

  useEffect(() => {
    if (!targetRef.current) return

    let rafId: number
    const animate = () => {
      if (!targetRef.current) return

      if (rotation) {
        if (rotation.x) targetRef.current.rotation.x += rotation.x * speed
        if (rotation.y) targetRef.current.rotation.y += rotation.y * speed
        if (rotation.z) targetRef.current.rotation.z += rotation.z * speed
      }

      if (position) {
        if (position.x) targetRef.current.position.x += position.x * speed
        if (position.y) targetRef.current.position.y += position.y * speed
        if (position.z) targetRef.current.position.z += position.z * speed
      }

      if (scale !== undefined) {
        const currentScale = targetRef.current.scale.x
        const targetScale = scale
        const diff = (targetScale - currentScale) * 0.1 * speed
        targetRef.current.scale.addScalar(diff)
      }

      rafId = requestAnimationFrame(animate)
    }

    rafId = requestAnimationFrame(animate)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [targetRef, rotation, position, scale, speed])
}

/**
 * Hook for lazy loading 3D models
 */
export function useLazyModel(modelPath: string) {
  const [model, setModel] = useState<THREE.Group | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    setIsLoading(true)
    setError(null)

    // TODO: Implement actual GLTF loading
    // For now, we'll create a placeholder
    const loader = new THREE.ObjectLoader()
    
    // Simulate loading delay
    const timeoutId = setTimeout(() => {
      try {
        // Create placeholder geometry
        const group = new THREE.Group()
        const geometry = new THREE.BoxGeometry(1, 1, 1)
        const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 })
        const mesh = new THREE.Mesh(geometry, material)
        group.add(mesh)

        setModel(group)
        setIsLoading(false)
      } catch (err) {
        setError(err as Error)
        setIsLoading(false)
      }
    }, 500)

    return () => {
      clearTimeout(timeoutId)
      if (model) {
        model.traverse((object) => {
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
      }
    }
  }, [modelPath])

  return { model, isLoading, error }
}

