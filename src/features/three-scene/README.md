# Three.js Scene System

This directory contains a comprehensive Three.js scene management system for the personal website, including specialized scenes, reusable 3D objects, and performance optimization utilities.

## Directory Structure

```
three-scene/
├── scenes/              # Specialized scene components
│   ├── HeroScene.tsx    # Hero section with interactive particles
│   ├── ProjectsScene.tsx # Projects section with 3D cards
│   └── AboutScene.tsx   # About section with floating objects
├── objects/             # Reusable 3D object components
│   ├── GamingSet.tsx    # Gaming-themed objects (controller, headset, keyboard)
│   ├── FitnessGym.tsx   # Fitness-themed objects (dumbbell, kettlebell, mat)
│   └── ScienceLab.tsx   # Science-themed objects (beaker, microscope, DNA)
├── utils/               # Scene management utilities
│   └── sceneManager.ts  # Scene lifecycle and performance management
├── Background.tsx       # Original background scene
├── Scene.tsx            # Main scene wrapper component
└── index.ts             # Barrel exports
```

## Features

### 🎬 Specialized Scenes

#### HeroScene
- Interactive particle field that responds to mouse movement
- Central animated geometry with distortion effects
- Dynamic accent lighting
- Smooth floating animations

#### ProjectsScene
- 3D project cards in a grid layout
- Scroll-based reveal animations
- Hover interactions with scale effects
- Animated background grid

#### AboutScene
- Floating 3D objects representing personal interests:
  - Gaming Controller (with interactive buttons and LED effects)
  - Dumbbell (with weight plates and glow effects)
  - Science Beaker (with bubbling liquid animation)
- Orbital particle system
- Atmospheric background sphere

### 🎮 3D Objects Library

All 3D objects are placeholder components with fallback geometries:

#### GamingSet
- Gaming Controller with ABXY buttons, D-pad, and analog sticks
- Gaming Headset with ear cups and headband
- Mechanical Keyboard with RGB underglow
- **TODO**: Replace with GLTF model from `/models/gaming-set.glb`

#### FitnessGym
- Dumbbell with adjustable weight plates
- Kettlebell with swing animation
- Yoga Mat (rolled up)
- Weight Bench (bonus component)
- **TODO**: Replace with GLTF model from `/models/fitness-gym.glb`

#### ScienceLab
- Beaker with bubbling liquid and measurements
- Microscope with objective lenses and LED light
- DNA Double Helix with rotating animation
- Test Tube Rack with colored liquids
- **TODO**: Replace with GLTF model from `/models/science-lab.glb`

### ⚙️ Scene Management

The `sceneManager.ts` utility provides:

- **Performance Monitoring**: FPS tracking and adaptive quality adjustment
- **Scene Transitions**: Fade, slide, and zoom transitions between scenes
- **Device Detection**: Automatic optimization based on device capabilities
- **Lifecycle Management**: Scene initialization, cleanup, and state management

### 🎣 Custom Hooks

#### `useThreeScene`
Complete scene lifecycle management with performance monitoring:

```tsx
import { useThreeScene } from '@/hooks/useThreeScene'

function MyComponent() {
  const { sceneConfig, isReady, fps, quality, changeScene, updateQuality } = useThreeScene({
    sceneType: 'hero',
    autoStart: true,
    enablePerformanceMonitoring: true,
    onSceneReady: () => console.log('Scene ready!'),
  })
  
  return <div>FPS: {fps}, Quality: {quality}</div>
}
```

#### `useSceneInteraction`
Manage user interactions with 3D objects:

```tsx
import { useSceneInteraction } from '@/hooks/useThreeScene'

function InteractiveScene() {
  const { hoveredObject, selectedObject, setHoveredObject } = useSceneInteraction()
  
  return <>{/* Your 3D scene */}</>
}
```

#### `useSceneAnimation`
Animate 3D objects with ease:

```tsx
import { useSceneAnimation } from '@/hooks/useThreeScene'
import { useRef } from 'react'

function AnimatedObject() {
  const meshRef = useRef()
  
  useSceneAnimation(meshRef, {
    rotation: { y: 0.01 },
    speed: 1,
  })
  
  return <mesh ref={meshRef}>...</mesh>
}
```

#### `useLazyModel`
Lazy load 3D models with fallbacks:

```tsx
import { useLazyModel } from '@/hooks/useThreeScene'

function ModelLoader() {
  const { model, isLoading, error } = useLazyModel('/models/my-model.glb')
  
  if (isLoading) return <Loader />
  if (error) return <Fallback />
  
  return <primitive object={model} />
}
```

## Usage Examples

### Basic Scene Setup

```tsx
import { Canvas } from '@react-three/fiber'
import { HeroScene } from '@/features/three-scene'

function Hero() {
  return (
    <div className="h-screen w-full">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <HeroScene />
      </Canvas>
    </div>
  )
}
```

### Using 3D Objects

```tsx
import { Canvas } from '@react-three/fiber'
import { GamingSet, FitnessGym, ScienceLab } from '@/features/three-scene'

function AboutSection() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} />
      
      <GamingSet position={[-3, 0, 0]} interactive />
      <FitnessGym position={[0, 0, 0]} interactive />
      <ScienceLab position={[3, 0, 0]} interactive />
    </Canvas>
  )
}
```

### Advanced Scene with Performance Monitoring

```tsx
import { Canvas } from '@react-three/fiber'
import { PerformanceMonitor } from '@react-three/drei'
import { ProjectsScene } from '@/features/three-scene'
import { useThreeScene } from '@/hooks/useThreeScene'

function Projects() {
  const { fps, quality } = useThreeScene({
    sceneType: 'projects',
    enablePerformanceMonitoring: true,
  })

  return (
    <div>
      <div className="stats">FPS: {fps} | Quality: {quality}</div>
      <Canvas>
        <PerformanceMonitor 
          onIncline={() => console.log('Performance improved')}
          onDecline={() => console.log('Performance degraded')}
        >
          <ProjectsScene />
        </PerformanceMonitor>
      </Canvas>
    </div>
  )
}
```

## Configuration

All scenes use centralized configuration from `src/config/three.config.ts`:

- Camera settings per scene type
- Particle system configurations
- Material presets
- Performance tiers (low, medium, high)
- Post-processing effects
- Controls settings

## Performance Optimization

The system includes several optimization strategies:

1. **Adaptive Quality**: Automatically adjusts quality based on FPS
2. **LOD (Level of Detail)**: Distance-based quality reduction
3. **Frustum Culling**: Only render visible objects
4. **Lazy Loading**: Load 3D models on demand
5. **Device Detection**: Optimize for mobile vs desktop
6. **Code Splitting**: Separate chunks for animation libraries

## Accessibility

- Respects `prefers-reduced-motion` for animations
- Keyboard navigation support for interactive elements
- ARIA labels for screen readers
- Graceful degradation when WebGL is unavailable

## Browser Support

- Modern browsers with WebGL support
- Fallback UI for browsers without WebGL
- Mobile-optimized versions with reduced quality

## Next Steps

1. **Replace Placeholder Models**: Add actual GLTF/GLB models to `/public/models/`
2. **Optimize Textures**: Add compressed textures for better performance
3. **Add Post-Processing**: Implement bloom, DOF, and other effects
4. **Create More Scenes**: Add scenes for other sections (Contact, Skills, etc.)
5. **Enhance Interactions**: Add more complex user interactions and animations

## Troubleshooting

### Scene not rendering
- Check WebGL support: Open DevTools and look for WebGL errors
- Verify camera position and FOV settings
- Ensure lights are properly configured

### Poor performance
- Reduce particle count in `three.config.ts`
- Disable shadows: Set `shadowsEnabled: false`
- Lower quality: Force 'low' quality mode
- Check for memory leaks: Use Chrome DevTools Performance tab

### Models not loading
- Verify model paths in `assetConfig`
- Check browser console for loading errors
- Ensure models are in correct format (GLTF/GLB)
- Use fallback geometries if models fail to load

## Dependencies

- `three` - Three.js library
- `@react-three/fiber` - React renderer for Three.js
- `@react-three/drei` - Useful helpers for React Three Fiber
- `@react-three/postprocessing` - Post-processing effects (optional)

## Contributing

When adding new scenes or objects:

1. Follow the existing component structure
2. Add TypeScript types for all props
3. Include performance optimizations (memoization, cleanup)
4. Add comments and documentation
5. Test on both desktop and mobile
6. Respect accessibility preferences

## License

Part of the Personal Website project.

