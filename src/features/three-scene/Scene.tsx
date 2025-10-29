import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerformanceMonitor, ScrollControls } from '@react-three/drei'
import { Background } from './Background'

export function Scene() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <PerformanceMonitor onIncline={() => {}} onDecline={() => {}} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Background />
          <ScrollControls damping={0.25} distance={1} pages={3}>
            <group />
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  )
}

