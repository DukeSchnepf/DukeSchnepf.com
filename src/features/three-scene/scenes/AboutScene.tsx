import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

export function AboutScene() {
  return (
    <group>
      {/* Lighting setup */}
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
      
      {/* Floating 3D objects representing interests */}
      <Float
        speed={1.5}
        rotationIntensity={0.5}
        floatIntensity={0.5}
        floatingRange={[-0.1, 0.1]}
      >
        <GamingController position={[-3, 1, 0]} />
      </Float>
      
      <Float
        speed={1.8}
        rotationIntensity={0.4}
        floatIntensity={0.6}
        floatingRange={[-0.15, 0.15]}
      >
        <FitnessDumbbell position={[3, 0.5, 0]} />
      </Float>
      
      <Float
        speed={1.3}
        rotationIntensity={0.6}
        floatIntensity={0.4}
        floatingRange={[-0.12, 0.12]}
      >
        <ScienceBeaker position={[0, -1, 0]} />
      </Float>
      
      {/* Orbital particles */}
      <OrbitalParticles />
      
      {/* Background atmosphere */}
      <BackgroundSphere />
    </group>
  )
}

/**
 * Gaming Controller - Placeholder 3D geometry
 * TODO: Replace with actual GLTF model from /models/gaming-controller.glb
 */
function GamingController({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null!)
  const { mouse } = useThree()
  
  useFrame(() => {
    if (!groupRef.current) return
    
    // Mouse interaction - follow cursor
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouse.y * 0.3,
      0.05
    )
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouse.x * 0.3,
      0.05
    )
  })
  
  return (
    <group ref={groupRef} position={position}>
      {/* Main body */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[1.5, 0.8, 0.3]} />
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>
      
      {/* Buttons */}
      <mesh position={[0.3, 0.1, 0.2]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.05, 16]} />
        <meshStandardMaterial
          color="#ef4444"
          emissive="#ef4444"
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh position={[0.5, 0.1, 0.2]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.05, 16]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Analog sticks */}
      <mesh position={[-0.4, 0, 0.2]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
        <meshStandardMaterial color="#475569" />
      </mesh>
      
      {/* Glow effect */}
      <pointLight position={[0, 0, 0.5]} color="#0ea5e9" intensity={1} distance={2} />
    </group>
  )
}

/**
 * Fitness Dumbbell - Placeholder 3D geometry
 * TODO: Replace with actual GLTF model from /models/fitness-dumbbell.glb
 */
function FitnessDumbbell({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null!)
  
  useFrame((state) => {
    if (!groupRef.current) return
    
    // Slow rotation
    groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
  })
  
  return (
    <group ref={groupRef} position={position}>
      {/* Bar */}
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 2, 16]} />
        <meshStandardMaterial
          color="#71717a"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* Left weight */}
      <mesh position={[-1, 0, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.3, 16]} />
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      
      {/* Right weight */}
      <mesh position={[1, 0, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.3, 16]} />
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      
      {/* Energy glow */}
      <pointLight position={[0, 0, 0]} color="#10b981" intensity={0.8} distance={2.5} />
    </group>
  )
}

/**
 * Science Beaker - Placeholder 3D geometry
 * TODO: Replace with actual GLTF model from /models/science-beaker.glb
 */
function ScienceBeaker({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null!)
  const liquidRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    if (!liquidRef.current) return
    
    // Bubbling liquid effect
    const time = state.clock.elapsedTime
    liquidRef.current.position.y = -0.3 + Math.sin(time * 2) * 0.05
    liquidRef.current.scale.y = 1 + Math.sin(time * 3) * 0.1
  })
  
  return (
    <group ref={groupRef} position={position}>
      {/* Glass container */}
      <mesh castShadow>
        <cylinderGeometry args={[0.4, 0.5, 1.2, 16, 1, true]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.3}
          roughness={0.1}
          metalness={0.1}
          transmission={0.9}
          thickness={0.5}
        />
      </mesh>
      
      {/* Liquid inside */}
      <mesh ref={liquidRef} position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.38, 0.48, 0.8, 16]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={0.4}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Bubbles */}
      <Bubbles />
      
      {/* Base */}
      <mesh position={[0, -0.7, 0]} castShadow>
        <cylinderGeometry args={[0.5, 0.5, 0.1, 16]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Glow effect */}
      <pointLight position={[0, 0, 0]} color="#8b5cf6" intensity={1.5} distance={3} />
    </group>
  )
}

/**
 * Animated bubbles inside the beaker
 */
function Bubbles() {
  const bubblesRef = useRef<THREE.Group>(null!)
  
  // Generate bubble data
  const bubbles = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 0.6,
      z: (Math.random() - 0.5) * 0.6,
      speed: 0.3 + Math.random() * 0.3,
      size: 0.03 + Math.random() * 0.05,
      offset: Math.random() * Math.PI * 2,
    }))
  }, [])
  
  useFrame((state) => {
    if (!bubblesRef.current) return
    
    bubblesRef.current.children.forEach((bubble, i) => {
      const data = bubbles[i]
      const time = state.clock.elapsedTime * data.speed + data.offset
      
      // Rising motion
      bubble.position.y = ((time % 2) - 1) * 0.5
      
      // Slight horizontal drift
      bubble.position.x = data.x + Math.sin(time * 2) * 0.1
      bubble.position.z = data.z + Math.cos(time * 2) * 0.1
      
      // Fade out at top
      const material = (bubble as THREE.Mesh).material as THREE.MeshStandardMaterial
      material.opacity = 1 - (bubble.position.y + 0.5)
    })
  })
  
  return (
    <group ref={bubblesRef}>
      {bubbles.map((bubble) => (
        <mesh key={bubble.id} position={[bubble.x, -0.5, bubble.z]}>
          <sphereGeometry args={[bubble.size, 8, 8]} />
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={0.6}
            emissive="#8b5cf6"
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  )
}

/**
 * Orbital particles around the scene
 */
function OrbitalParticles() {
  const particlesRef = useRef<THREE.Points>(null!)
  
  const positions = useMemo(() => {
    const count = 100
    const positions = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const radius = 5 + Math.random() * 3
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = radius * Math.cos(phi)
    }
    
    return positions
  }, [])
  
  useFrame((state) => {
    if (!particlesRef.current) return
    
    particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05
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
        size={0.03}
        color="#0ea5e9"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/**
 * Background atmosphere sphere
 */
function BackgroundSphere() {
  return (
    <mesh>
      <sphereGeometry args={[15, 32, 32]} />
      <meshBasicMaterial
        color="#0f172a"
        side={THREE.BackSide}
        transparent
        opacity={0.8}
      />
    </mesh>
  )
}

