/**
 * Fitness Gym 3D Object
 * 
 * Placeholder 3D fitness-themed objects (dumbbell, kettlebell, etc.)
 * TODO: Replace with actual GLTF model from /models/fitness-gym.glb
 */

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

export interface FitnessGymProps {
  position?: [number, number, number]
  scale?: number
  interactive?: boolean
  onHover?: (hovered: boolean) => void
  onClick?: () => void
}

export function FitnessGym({
  position = [0, 0, 0],
  scale = 1,
  interactive = true,
  onHover,
  onClick,
}: FitnessGymProps) {
  return (
    <Float
      speed={1.2}
      rotationIntensity={0.4}
      floatIntensity={0.5}
      floatingRange={[-0.15, 0.15]}
    >
      <group position={position} scale={scale}>
        <Dumbbell
          position={[0, 0, 0]}
          interactive={interactive}
          onHover={onHover}
          onClick={onClick}
        />
        <Kettlebell position={[2, -0.5, 0]} />
        <YogaMat position={[-1.5, -1, 0]} />
      </group>
    </Float>
  )
}

/**
 * Dumbbell
 */
function Dumbbell({
  position = [0, 0, 0],
  interactive,
  onHover,
  onClick,
}: {
  position?: [number, number, number]
  interactive?: boolean
  onHover?: (hovered: boolean) => void
  onClick?: () => void
}) {
  const groupRef = useRef<THREE.Group>(null!)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (!groupRef.current) return

    // Curl animation (like bicep curl)
    groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.8) * 0.3

    // Hover effect
    const targetScale = hovered ? 1.15 : 1
    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1
    )
  })

  const handlePointerEnter = () => {
    setHovered(true)
    onHover?.(true)
    if (interactive) {
      document.body.style.cursor = 'pointer'
    }
  }

  const handlePointerLeave = () => {
    setHovered(false)
    onHover?.(false)
    document.body.style.cursor = 'auto'
  }

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={[0, 0, Math.PI / 2]}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={onClick}
    >
      {/* Bar/Handle */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.05, 0.05, 2, 16]} />
        <meshStandardMaterial
          color="#71717a"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Left weight plate 1 */}
      <mesh position={[-0.9, 0, 0]} castShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.15, 32]} />
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Left weight plate 2 */}
      <mesh position={[-1.1, 0, 0]} castShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.15, 32]} />
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Right weight plate 1 */}
      <mesh position={[0.9, 0, 0]} castShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.15, 32]} />
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Right weight plate 2 */}
      <mesh position={[1.1, 0, 0]} castShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.15, 32]} />
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Weight markings */}
      {[-1, 1].map((side) => (
        <mesh key={side} position={[side, 0, 0.36]}>
          <circleGeometry args={[0.15, 32]} />
          <meshStandardMaterial
            color="#10b981"
            emissive="#10b981"
            emissiveIntensity={hovered ? 0.8 : 0.3}
          />
        </mesh>
      ))}

      {/* Energy glow when hovered */}
      <pointLight
        position={[0, 0, 0]}
        color="#10b981"
        intensity={hovered ? 1.5 : 0.5}
        distance={3}
      />
    </group>
  )
}

/**
 * Kettlebell
 */
function Kettlebell({ position }: { position: [number, number, number] }) {
  const kettlebellRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (!kettlebellRef.current) return

    // Swing animation
    kettlebellRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 1.2) * 0.4
  })

  return (
    <group ref={kettlebellRef} position={position} scale={0.8}>
      {/* Main bell body */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Flat bottom */}
      <mesh position={[0, -0.35, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.3, 32]} />
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Handle - arc shape */}
      <mesh position={[0, 0.5, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <torusGeometry args={[0.4, 0.08, 16, 32, Math.PI]} />
        <meshStandardMaterial
          color="#334155"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Weight label */}
      <mesh position={[0, 0, 0.52]}>
        <circleGeometry args={[0.2, 32]} />
        <meshStandardMaterial
          color="#ef4444"
          emissive="#ef4444"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Accent light */}
      <pointLight position={[0, 0.5, 0]} color="#ef4444" intensity={0.5} distance={2} />
    </group>
  )
}

/**
 * Yoga Mat (rolled up)
 */
function YogaMat({ position }: { position: [number, number, number] }) {
  const matRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!matRef.current) return

    // Gentle bobbing
    matRef.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 0.6) * 0.05
    matRef.current.rotation.y = state.clock.elapsedTime * 0.1
  })

  return (
    <group position={position} scale={0.7}>
      {/* Rolled mat */}
      <mesh
        ref={matRef}
        rotation={[0, 0, Math.PI / 2]}
        castShadow
        receiveShadow
      >
        <cylinderGeometry args={[0.15, 0.15, 1.5, 32]} />
        <meshStandardMaterial
          color="#8b5cf6"
          metalness={0.1}
          roughness={0.9}
        />
      </mesh>

      {/* Strap */}
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
        <torusGeometry args={[0.17, 0.02, 16, 32]} />
        <meshStandardMaterial
          color="#334155"
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>

      {/* Decorative pattern on mat surface */}
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          position={[0, 0, 0.16]}
          rotation={[0, (i * Math.PI * 2) / 3, Math.PI / 2]}
        >
          <planeGeometry args={[1.4, 0.05]} />
          <meshStandardMaterial
            color="#a78bfa"
            transparent
            opacity={0.5}
          />
        </mesh>
      ))}
    </group>
  )
}

/**
 * Weight Bench (bonus object)
 */
export function WeightBench({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Bench pad */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.2, 0.6]} />
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.2}
          roughness={0.8}
        />
      </mesh>

      {/* Legs */}
      {[
        [-0.6, 0, -0.25],
        [-0.6, 0, 0.25],
        [0.6, 0, -0.25],
        [0.6, 0, 0.25],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.5, 16]} />
          <meshStandardMaterial
            color="#71717a"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  )
}

// Import useState
import { useState } from 'react'

