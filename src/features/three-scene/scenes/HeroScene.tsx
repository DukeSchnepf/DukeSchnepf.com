import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { particleConfig, animationConfig } from '../../../config/three.config'

export function HeroScene() {
  return (
    <>
      {/* Interactive particle field */}
      <InteractiveParticles />
      
      {/* Central animated geometry */}
      <Float
        speed={2}
        rotationIntensity={0.5}
        floatIntensity={0.5}
        floatingRange={[-0.1, 0.1]}
      >
        <CentralGeometry />
      </Float>
      
      {/* Accent lights */}
      <AccentLights />
    </>
  )
}

/**
 * Interactive particle field that responds to mouse movement
 */
function InteractiveParticles() {
  const particlesRef = useRef<THREE.Points>(null!)
  const { mouse } = useThree()
  
  // Generate particle positions
  const { positions, velocities } = useMemo(() => {
    const config = particleConfig.hero
    const positions = new Float32Array(config.count * 3)
    const velocities = new Float32Array(config.count * 3)
    
    for (let i = 0; i < config.count; i++) {
      const i3 = i * 3
      // Random position within spread
      positions[i3] = (Math.random() - 0.5) * config.spread.x
      positions[i3 + 1] = (Math.random() - 0.5) * config.spread.y
      positions[i3 + 2] = (Math.random() - 0.5) * config.spread.z
      
      // Random velocity for organic movement
      velocities[i3] = (Math.random() - 0.5) * 0.02
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02
    }
    
    return { positions, velocities }
  }, [])
  
  // Animate particles with mouse interaction
  useFrame((state) => {
    if (!particlesRef.current) return
    
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
    const time = state.clock.elapsedTime
    
    for (let i = 0; i < positions.length; i += 3) {
      // Base wave motion
      positions[i + 1] += Math.sin(time + positions[i]) * 0.001
      
      // Mouse influence
      const dx = mouse.x * 5 - positions[i]
      const dy = mouse.y * 5 - positions[i + 1]
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      if (distance < 2) {
        const force = (2 - distance) * 0.02
        positions[i] += dx * force
        positions[i + 1] += dy * force
      }
      
      // Add organic drift
      positions[i] += velocities[i]
      positions[i + 1] += velocities[i + 1]
      positions[i + 2] += velocities[i + 2]
      
      // Boundary wrapping
      const spread = particleConfig.hero.spread
      if (Math.abs(positions[i]) > spread.x / 2) positions[i] *= -0.9
      if (Math.abs(positions[i + 1]) > spread.y / 2) positions[i + 1] *= -0.9
      if (Math.abs(positions[i + 2]) > spread.z / 2) positions[i + 2] *= -0.9
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true
  })
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={particleConfig.hero.size}
        sizeAttenuation={particleConfig.hero.sizeAttenuation}
        color={particleConfig.hero.color}
        transparent
        opacity={particleConfig.hero.opacity}
        blending={particleConfig.hero.blending}
        depthWrite={false}
      />
    </points>
  )
}

/**
 * Central animated geometry - main visual focus
 */
function CentralGeometry() {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    if (!meshRef.current) return
    
    // Continuous rotation
    meshRef.current.rotation.x = state.clock.elapsedTime * animationConfig.rotation.speed * 50
    meshRef.current.rotation.y = state.clock.elapsedTime * animationConfig.rotation.speed * 70
    
    // Pulse effect
    const pulse = Math.sin(state.clock.elapsedTime * animationConfig.pulse.speed * 500) * 0.1 + 1
    meshRef.current.scale.setScalar(pulse)
  })
  
  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <icosahedronGeometry args={[1.5, 1]} />
      <MeshDistortMaterial
        color="#0ea5e9"
        emissive="#0ea5e9"
        emissiveIntensity={0.4}
        metalness={0.8}
        roughness={0.2}
        distort={0.3}
        speed={2}
      />
    </mesh>
  )
}

/**
 * Accent lights for dramatic effect
 */
function AccentLights() {
  const light1Ref = useRef<THREE.PointLight>(null!)
  const light2Ref = useRef<THREE.PointLight>(null!)
  
  useFrame((state) => {
    const time = state.clock.elapsedTime
    
    if (light1Ref.current) {
      light1Ref.current.position.x = Math.sin(time * 0.5) * 5
      light1Ref.current.position.z = Math.cos(time * 0.5) * 5
      light1Ref.current.intensity = Math.sin(time * 2) * 0.5 + 1
    }
    
    if (light2Ref.current) {
      light2Ref.current.position.x = Math.sin(time * 0.7 + Math.PI) * 5
      light2Ref.current.position.z = Math.cos(time * 0.7 + Math.PI) * 5
      light2Ref.current.intensity = Math.cos(time * 1.5) * 0.5 + 1
    }
  })
  
  return (
    <>
      <pointLight
        ref={light1Ref}
        color="#0ea5e9"
        intensity={1}
        distance={10}
        decay={2}
      />
      <pointLight
        ref={light2Ref}
        color="#8b5cf6"
        intensity={1}
        distance={10}
        decay={2}
      />
    </>
  )
}

