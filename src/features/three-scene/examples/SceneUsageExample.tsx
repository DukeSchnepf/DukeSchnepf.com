/**
 * Scene Usage Examples
 * 
 * This file demonstrates how to use the Three.js scene system
 * in different contexts throughout the website.
 */

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerformanceMonitor, Stats } from '@react-three/drei'
import {
  HeroScene,
  ProjectsScene,
  AboutScene,
  GamingSet,
  FitnessGym,
  ScienceLab,
} from '../index'
import { useThreeScene } from '../../../hooks/useThreeScene'

/**
 * Example 1: Simple Hero Scene
 * 
 * Basic usage with default settings
 */
export function SimpleHeroExample() {
  return (
    <div className="h-screen w-full relative">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </Canvas>
      
      {/* Overlay content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-6xl font-bold text-white">Welcome</h1>
      </div>
    </div>
  )
}

/**
 * Example 2: Projects Scene with Performance Monitoring
 * 
 * Shows how to integrate performance monitoring and display FPS
 */
export function ProjectsSceneWithMonitoring() {
  const { fps, quality, sceneConfig } = useThreeScene({
    sceneType: 'projects',
    enablePerformanceMonitoring: true,
    onSceneReady: () => console.log('Projects scene ready'),
  })

  return (
    <div className="h-screen w-full relative">
      {/* Performance stats overlay */}
      <div className="absolute top-4 right-4 z-10 bg-black/50 text-white p-4 rounded">
        <p>FPS: {fps}</p>
        <p>Quality: {quality}</p>
        <p>Enabled: {sceneConfig.enabled ? 'Yes' : 'No'}</p>
      </div>

      <Canvas camera={{ position: [0, 2, 10], fov: 50 }}>
        <Suspense fallback={<LoadingFallback />}>
          <PerformanceMonitor
            onIncline={() => console.log('Performance improved')}
            onDecline={() => console.log('Performance degraded')}
          >
            <ProjectsScene />
          </PerformanceMonitor>
          
          {/* Optional: Add debug helpers */}
          {import.meta.env.DEV && <Stats />}
        </Suspense>
      </Canvas>
    </div>
  )
}

/**
 * Example 3: About Scene with Individual Objects
 * 
 * Demonstrates using individual 3D objects instead of a full scene
 */
export function AboutWithObjects() {
  return (
    <div className="h-screen w-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 65 }}>
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} color="#8b5cf6" />

          {/* Individual objects with callbacks */}
          <GamingSet
            position={[-3, 1, 0]}
            interactive
            onHover={(hovered) => console.log('Gaming:', hovered)}
            onClick={() => alert('Gaming is my passion!')}
          />
          
          <FitnessGym
            position={[3, 0, 0]}
            interactive
            onHover={(hovered) => console.log('Fitness:', hovered)}
            onClick={() => alert('Stay healthy!')}
          />
          
          <ScienceLab
            position={[0, -1, 0]}
            interactive
            onHover={(hovered) => console.log('Science:', hovered)}
            onClick={() => alert('Science is amazing!')}
          />

          {/* Optional: Add controls for debugging */}
          {import.meta.env.DEV && <OrbitControls />}
        </Suspense>
      </Canvas>
    </div>
  )
}

/**
 * Example 4: Full About Scene
 * 
 * Uses the complete AboutScene component
 */
export function FullAboutExample() {
  return (
    <div className="h-screen w-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 65 }}>
        <Suspense fallback={<LoadingFallback />}>
          <AboutScene />
        </Suspense>
      </Canvas>
    </div>
  )
}

/**
 * Example 5: Multiple Scenes with Transitions
 * 
 * Shows how to switch between scenes
 */
export function MultiSceneExample() {
  const { changeScene, sceneState } = useThreeScene({
    sceneType: 'hero',
    autoStart: true,
  })

  return (
    <div className="h-screen w-full relative">
      {/* Scene selector */}
      <div className="absolute top-4 left-4 z-10 space-x-2">
        <button
          onClick={() => changeScene('hero')}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Hero
        </button>
        <button
          onClick={() => changeScene('projects')}
          className="px-4 py-2 bg-purple-500 text-white rounded"
        >
          Projects
        </button>
        <button
          onClick={() => changeScene('about')}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          About
        </button>
      </div>

      <Canvas>
        <Suspense fallback={null}>
          {sceneState.currentScene === 'hero' && <HeroScene />}
          {sceneState.currentScene === 'projects' && <ProjectsScene />}
          {sceneState.currentScene === 'about' && <AboutScene />}
        </Suspense>
      </Canvas>
    </div>
  )
}

/**
 * Example 6: Custom Scene with Individual Components
 * 
 * Build your own scene using individual objects
 */
export function CustomScene() {
  return (
    <div className="h-screen w-full">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <Suspense fallback={null}>
          {/* Lighting setup */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <pointLight position={[-5, -5, -5]} color="#ff00ff" intensity={0.5} />

          {/* Mix and match objects */}
          <group>
            <GamingSet position={[-4, 2, 0]} scale={0.8} />
            <GamingSet position={[4, 2, 0]} scale={0.8} />
            <FitnessGym position={[-4, -2, 0]} scale={0.8} />
            <ScienceLab position={[4, -2, 0]} scale={0.8} />
          </group>

          {/* Add your own custom objects */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color="#0ea5e9" metalness={0.8} roughness={0.2} />
          </mesh>
        </Suspense>
      </Canvas>
    </div>
  )
}

/**
 * Loading Fallback Component
 */
function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial wireframe color="#0ea5e9" />
    </mesh>
  )
}

/**
 * Example 7: Scene with Scroll Controls
 * 
 * Integrate with scroll-based animations
 */
export function ScrollControlledScene() {
  return (
    <div className="h-[300vh] w-full">
      <div className="sticky top-0 h-screen">
        <Canvas camera={{ position: [0, 2, 10] }}>
          <Suspense fallback={null}>
            <ProjectsScene />
          </Suspense>
        </Canvas>
      </div>
      
      {/* Scrollable content */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="h-screen flex items-center justify-center">
          <h2 className="text-4xl text-white">Section 1</h2>
        </div>
        <div className="h-screen flex items-center justify-center">
          <h2 className="text-4xl text-white">Section 2</h2>
        </div>
        <div className="h-screen flex items-center justify-center">
          <h2 className="text-4xl text-white">Section 3</h2>
        </div>
      </div>
    </div>
  )
}

/**
 * Example 8: Responsive Scene
 * 
 * Adapt scene based on viewport size
 */
export function ResponsiveScene() {
  const isMobile = window.innerWidth < 768

  return (
    <div className="h-screen w-full">
      <Canvas
        camera={{
          position: isMobile ? [0, 0, 12] : [0, 0, 8],
          fov: isMobile ? 70 : 60,
        }}
      >
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </Canvas>
    </div>
  )
}

// Export all examples for easy access
export const examples = {
  SimpleHeroExample,
  ProjectsSceneWithMonitoring,
  AboutWithObjects,
  FullAboutExample,
  MultiSceneExample,
  CustomScene,
  ScrollControlledScene,
  ResponsiveScene,
}

