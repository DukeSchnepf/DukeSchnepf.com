/**
 * Three.js Scene Configuration
 * 
 * Centralized configuration for all Three.js rendering, camera, lighting,
 * and performance settings. This ensures consistency across all 3D scenes
 * and makes it easy to optimize for different devices.
 */

import * as THREE from 'three'

// ============================================================================
// RENDERER SETTINGS
// ============================================================================

export const rendererConfig = {
  // Core settings
  antialias: true,
  alpha: true,
  powerPreference: 'high-performance' as const,
  stencil: false,
  depth: true,
  
  // Output settings
  outputColorSpace: THREE.SRGBColorSpace,
  toneMapping: THREE.ACESFilmicToneMapping,
  toneMappingExposure: 1.0,
  
  // Shadow settings
  shadowMap: {
    enabled: true,
    type: THREE.PCFSoftShadowMap,
    autoUpdate: true,
  },
  
  // Pixel ratio limits (prevent rendering at too high resolution)
  pixelRatio: {
    min: 1,
    max: 2,
  },
} as const

// ============================================================================
// CAMERA SETTINGS
// ============================================================================

export const cameraConfig = {
  // Default perspective camera
  perspective: {
    fov: 75,
    near: 0.1,
    far: 1000,
    position: {
      x: 0,
      y: 0,
      z: 5,
    },
  },
  
  // Hero section camera
  hero: {
    fov: 60,
    near: 0.1,
    far: 500,
    position: {
      x: 0,
      y: 0,
      z: 8,
    },
  },
  
  // Projects section camera
  projects: {
    fov: 50,
    near: 0.1,
    far: 300,
    position: {
      x: 0,
      y: 2,
      z: 10,
    },
  },
  
  // About section camera
  about: {
    fov: 65,
    near: 0.1,
    far: 200,
    position: {
      x: 0,
      y: 0,
      z: 6,
    },
  },
} as const

// ============================================================================
// LIGHTING SETTINGS
// ============================================================================

export const lightingConfig = {
  // Ambient light (global illumination)
  ambient: {
    color: 0xffffff,
    intensity: 0.5,
  },
  
  // Main directional light (sun/key light)
  directional: {
    color: 0xffffff,
    intensity: 0.8,
    position: {
      x: 5,
      y: 5,
      z: 5,
    },
    castShadow: true,
    shadow: {
      mapSize: 2048,
      camera: {
        near: 0.5,
        far: 500,
        left: -10,
        right: 10,
        top: 10,
        bottom: -10,
      },
    },
  },
  
  // Point lights (accent lights)
  point: {
    color: 0xffffff,
    intensity: 1,
    distance: 100,
    decay: 2,
  },
  
  // Spot light (focused lighting)
  spot: {
    color: 0xffffff,
    intensity: 1,
    angle: Math.PI / 6,
    penumbra: 0.2,
    decay: 2,
    castShadow: true,
  },
  
  // Hemisphere light (sky/ground lighting)
  hemisphere: {
    skyColor: 0x87ceeb,
    groundColor: 0x222222,
    intensity: 0.6,
  },
} as const

// ============================================================================
// SCENE SETTINGS
// ============================================================================

export const sceneConfig = {
  // Background
  background: {
    color: 0x000000,
    alpha: 0,
  },
  
  // Fog
  fog: {
    enabled: false,
    color: 0x000000,
    near: 10,
    far: 100,
  },
  
  // Environment
  environment: {
    preset: 'sunset' as const, // Options: sunset, dawn, night, warehouse, forest, apartment, studio, city, park, lobby
  },
} as const

// ============================================================================
// PARTICLE SYSTEM SETTINGS
// ============================================================================

export const particleConfig = {
  // Hero particles
  hero: {
    count: 5000,
    size: 0.02,
    sizeAttenuation: true,
    color: 0x00ff88,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
    spread: {
      x: 20,
      y: 20,
      z: 20,
    },
  },
  
  // Background particles
  background: {
    count: 1000,
    size: 0.01,
    sizeAttenuation: true,
    color: 0xffffff,
    opacity: 0.3,
    blending: THREE.AdditiveBlending,
    spread: {
      x: 50,
      y: 50,
      z: 50,
    },
  },
  
  // Interactive particles
  interactive: {
    count: 3000,
    size: 0.015,
    sizeAttenuation: true,
    color: 0x8800ff,
    opacity: 0.5,
    blending: THREE.AdditiveBlending,
    mouseInfluence: 2,
    returnSpeed: 0.02,
  },
} as const

// ============================================================================
// MATERIAL PRESETS
// ============================================================================

export const materialPresets = {
  // Standard material (PBR)
  standard: {
    metalness: 0.5,
    roughness: 0.5,
    envMapIntensity: 1,
  },
  
  // Metallic material
  metallic: {
    metalness: 1,
    roughness: 0.2,
    envMapIntensity: 1.5,
  },
  
  // Matte material
  matte: {
    metalness: 0,
    roughness: 1,
    envMapIntensity: 0.5,
  },
  
  // Glass material
  glass: {
    metalness: 0,
    roughness: 0,
    transparent: true,
    opacity: 0.3,
    transmission: 1,
    thickness: 0.5,
  },
  
  // Holographic material
  holographic: {
    metalness: 0.9,
    roughness: 0.1,
    transparent: true,
    opacity: 0.8,
    emissive: 0x00ff88,
    emissiveIntensity: 0.5,
  },
} as const

// ============================================================================
// PERFORMANCE SETTINGS
// ============================================================================

export const performanceConfig = {
  // Device detection
  mobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ),
  
  // Performance tiers
  quality: {
    low: {
      particleCount: 500,
      shadowMapSize: 512,
      pixelRatio: 1,
      antialias: false,
      postProcessing: false,
    },
    medium: {
      particleCount: 2000,
      shadowMapSize: 1024,
      pixelRatio: 1.5,
      antialias: true,
      postProcessing: true,
    },
    high: {
      particleCount: 5000,
      shadowMapSize: 2048,
      pixelRatio: 2,
      antialias: true,
      postProcessing: true,
    },
  },
  
  // Adaptive performance
  adaptive: {
    enabled: true,
    targetFPS: 60,
    minFPS: 30,
    checkInterval: 1000, // Check FPS every second
    degradeThreshold: 40, // Degrade quality if FPS drops below this
    upgradeThreshold: 55, // Upgrade quality if FPS is above this
  },
  
  // LOD (Level of Detail) settings
  lod: {
    enabled: true,
    distances: [0, 10, 20, 40], // Distance thresholds for LOD levels
  },
  
  // Frustum culling
  frustumCulling: true,
  
  // Lazy loading
  lazyLoad: {
    enabled: true,
    intersectionThreshold: 0.1,
  },
} as const

// ============================================================================
// POST-PROCESSING EFFECTS
// ============================================================================

export const postProcessingConfig = {
  // Bloom effect
  bloom: {
    enabled: true,
    strength: 0.5,
    radius: 0.4,
    threshold: 0.85,
  },
  
  // Depth of field
  dof: {
    enabled: false,
    focusDistance: 5,
    focalLength: 0.02,
    bokehScale: 2,
  },
  
  // Chromatic aberration
  chromaticAberration: {
    enabled: false,
    offset: 0.001,
  },
  
  // Vignette
  vignette: {
    enabled: true,
    darkness: 0.5,
    offset: 0.5,
  },
  
  // Film grain
  noise: {
    enabled: false,
    opacity: 0.1,
  },
  
  // Glitch effect
  glitch: {
    enabled: false,
    strength: 0.1,
  },
} as const

// ============================================================================
// CONTROLS SETTINGS
// ============================================================================

export const controlsConfig = {
  // Orbit controls
  orbit: {
    enabled: false,
    enableDamping: true,
    dampingFactor: 0.05,
    rotateSpeed: 0.5,
    zoomSpeed: 1.0,
    minDistance: 2,
    maxDistance: 20,
    enablePan: false,
  },
  
  // Mouse interaction
  mouse: {
    enabled: true,
    sensitivity: 0.001,
    smoothing: 0.1,
    maxRotation: Math.PI / 4,
  },
  
  // Scroll interaction
  scroll: {
    enabled: true,
    factor: 0.001,
    smoothing: 0.05,
  },
  
  // Touch gestures (mobile)
  touch: {
    enabled: true,
    rotateSpeed: 0.5,
    pinchToZoom: true,
  },
} as const

// ============================================================================
// ASSET LOADING
// ============================================================================

export const assetConfig = {
  // Model paths
  models: {
    hero: '/models/hero-model.glb', // PLACEHOLDER
    gaming: '/models/gaming-set.glb', // PLACEHOLDER
    fitness: '/models/fitness-gym.glb', // PLACEHOLDER
    science: '/models/science-lab.glb', // PLACEHOLDER
  },
  
  // Texture paths
  textures: {
    environment: '/textures/environment.hdr',
    matcap: '/textures/matcap.png',
  },
  
  // Loading settings
  loading: {
    manager: true, // Use LoadingManager
    showProgress: true,
    timeout: 30000, // 30 seconds
  },
  
  // Error handling
  fallbacks: {
    useGeometry: true, // Use placeholder geometry if model fails to load
    defaultGeometry: 'box' as const, // Options: box, sphere, torus, cone
    defaultMaterial: 'standard' as const,
  },
} as const

// ============================================================================
// ANIMATION SETTINGS (THREE.JS SPECIFIC)
// ============================================================================

export const animationConfig = {
  // Object animations
  rotation: {
    speed: 0.001,
    axis: { x: 0, y: 1, z: 0 },
  },
  
  // Float animation
  float: {
    amplitude: 0.2,
    frequency: 0.001,
  },
  
  // Pulse animation
  pulse: {
    scaleMin: 0.95,
    scaleMax: 1.05,
    speed: 0.002,
  },
  
  // Hover states
  hover: {
    scale: 1.1,
    duration: 0.3,
    easing: 'easeOutQuad',
  },
} as const

// ============================================================================
// DEBUGGING
// ============================================================================

export const debugConfig = {
  enabled: import.meta.env.DEV,
  
  // Helpers
  helpers: {
    axes: false,
    grid: false,
    lights: false,
    camera: false,
    stats: true, // Show FPS stats
  },
  
  // Logging
  logging: {
    performance: false,
    interactions: false,
    assetLoading: true,
  },
} as const

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

export const threeUtils = {
  /**
   * Get optimal settings based on device capabilities
   */
  getOptimalSettings: () => {
    const isMobile = performanceConfig.mobile
    const hasHighDPI = window.devicePixelRatio > 1
    
    if (isMobile) {
      return performanceConfig.quality.low
    } else if (hasHighDPI) {
      return performanceConfig.quality.high
    } else {
      return performanceConfig.quality.medium
    }
  },
  
  /**
   * Calculate pixel ratio with limits
   */
  getPixelRatio: () => {
    return Math.min(
      Math.max(
        window.devicePixelRatio,
        rendererConfig.pixelRatio.min
      ),
      rendererConfig.pixelRatio.max
    )
  },
  
  /**
   * Check if WebGL is supported
   */
  isWebGLAvailable: () => {
    try {
      const canvas = document.createElement('canvas')
      return !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      )
    } catch (e) {
      return false
    }
  },
  
  /**
   * Get camera config by scene type
   */
  getCameraConfig: (sceneType: 'hero' | 'projects' | 'about' | 'default' = 'default') => {
    if (sceneType === 'default') return cameraConfig.perspective
    return cameraConfig[sceneType]
  },
}

// ============================================================================
// INITIALIZATION
// ============================================================================

export const initializeThree = () => {
  const isSupported = threeUtils.isWebGLAvailable()
  const settings = threeUtils.getOptimalSettings()
  
  if (!isSupported) {
    console.warn('WebGL is not supported in this browser')
    return {
      isSupported: false,
      settings: null,
    }
  }
  
  return {
    isSupported: true,
    settings,
    isMobile: performanceConfig.mobile,
    pixelRatio: threeUtils.getPixelRatio(),
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

export type QualityLevel = 'low' | 'medium' | 'high'
export type SceneType = 'hero' | 'projects' | 'about' | 'default'
export type MaterialPreset = keyof typeof materialPresets

export default {
  renderer: rendererConfig,
  camera: cameraConfig,
  lighting: lightingConfig,
  scene: sceneConfig,
  particles: particleConfig,
  materials: materialPresets,
  performance: performanceConfig,
  postProcessing: postProcessingConfig,
  controls: controlsConfig,
  assets: assetConfig,
  animation: animationConfig,
  debug: debugConfig,
  utils: threeUtils,
  initialize: initializeThree,
}

