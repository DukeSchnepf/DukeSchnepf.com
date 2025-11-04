/**
 * Gaming Set 3D Object
 * 
 * Placeholder 3D gaming-themed object (controller, headset, etc.)
 * TODO: Replace with actual GLTF model from /models/gaming-set.glb
 */

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

export interface GamingSetProps {
  position?: [number, number, number]
  scale?: number
  interactive?: boolean
  onHover?: (hovered: boolean) => void
  onClick?: () => void
}

export function GamingSet({
  position = [0, 0, 0],
  scale = 1,
  interactive = true,
  onHover,
  onClick,
}: GamingSetProps) {
  return (
    <Float
      speed={1.5}
      rotationIntensity={0.3}
      floatIntensity={0.4}
      floatingRange={[-0.1, 0.1]}
    >
      <group position={position} scale={scale}>
        <Controller
          interactive={interactive}
          onHover={onHover}
          onClick={onClick}
        />
        <Headset position={[2, 0.5, 0]} />
        <Keyboard position={[0, -0.8, 0.5]} />
      </group>
    </Float>
  )
}

/**
 * Gaming Controller
 */
function Controller({
  interactive,
  onHover,
  onClick,
}: {
  interactive?: boolean
  onHover?: (hovered: boolean) => void
  onClick?: () => void
}) {
  const groupRef = useRef<THREE.Group>(null!)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (!groupRef.current) return

    // Gentle idle rotation
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1

    // Hover effect
    const targetScale = hovered ? 1.1 : 1
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
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
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={onClick}
    >
      {/* Main body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.8, 0.3]} />
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>

      {/* Grips */}
      <mesh position={[-0.6, -0.3, 0]} rotation={[0, 0, 0.3]} castShadow>
        <boxGeometry args={[0.3, 0.6, 0.3]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
      <mesh position={[0.6, -0.3, 0]} rotation={[0, 0, -0.3]} castShadow>
        <boxGeometry args={[0.3, 0.6, 0.3]} />
        <meshStandardMaterial color="#334155" />
      </mesh>

      {/* Buttons - ABXY Layout */}
      <Button position={[0.4, 0.15, 0.2]} color="#ef4444" label="A" />
      <Button position={[0.6, 0.25, 0.2]} color="#3b82f6" label="B" />
      <Button position={[0.5, 0.35, 0.2]} color="#f59e0b" label="Y" />
      <Button position={[0.3, 0.25, 0.2]} color="#10b981" label="X" />

      {/* D-pad */}
      <mesh position={[-0.4, 0.15, 0.2]} castShadow>
        <boxGeometry args={[0.3, 0.1, 0.05]} />
        <meshStandardMaterial color="#475569" />
      </mesh>
      <mesh position={[-0.4, 0.15, 0.2]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <boxGeometry args={[0.3, 0.1, 0.05]} />
        <meshStandardMaterial color="#475569" />
      </mesh>

      {/* Analog sticks */}
      <AnalogStick position={[-0.2, -0.1, 0.2]} />
      <AnalogStick position={[0.2, -0.2, 0.2]} />

      {/* LED indicator */}
      <mesh position={[0, 0.3, 0.2]}>
        <cylinderGeometry args={[0.05, 0.05, 0.02, 16]} />
        <meshStandardMaterial
          color="#0ea5e9"
          emissive="#0ea5e9"
          emissiveIntensity={hovered ? 1 : 0.5}
        />
      </mesh>

      {/* Glow effect */}
      <pointLight
        position={[0, 0, 0.5]}
        color="#0ea5e9"
        intensity={hovered ? 1.5 : 0.5}
        distance={2}
      />
    </group>
  )
}

/**
 * Individual button component
 */
function Button({
  position,
  color,
  label: _label,
}: {
  position: [number, number, number]
  color: string
  label: string
}) {
  return (
    <mesh position={position} castShadow>
      <cylinderGeometry args={[0.08, 0.08, 0.05, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.3}
      />
    </mesh>
  )
}

/**
 * Analog stick component
 */
function AnalogStick({ position }: { position: [number, number, number] }) {
  const stickRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!stickRef.current) return

    // Subtle movement
    stickRef.current.rotation.z =
      Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.1
  })

  return (
    <group position={position}>
      {/* Base */}
      <mesh castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.05, 16]} />
        <meshStandardMaterial color="#334155" />
      </mesh>

      {/* Stick */}
      <mesh ref={stickRef} position={[0, 0, 0.08]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.12, 16]} />
        <meshStandardMaterial color="#475569" />
      </mesh>
    </group>
  )
}

/**
 * Gaming Headset
 */
function Headset({ position }: { position: [number, number, number] }) {
  const headsetRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (!headsetRef.current) return
    headsetRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.2
  })

  return (
    <group ref={headsetRef} position={position} scale={0.8}>
      {/* Headband */}
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
        <torusGeometry args={[0.6, 0.05, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Left ear cup */}
      <mesh position={[-0.6, 0, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
        <meshStandardMaterial color="#334155" />
      </mesh>

      {/* Right ear cup */}
      <mesh position={[0.6, 0, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
        <meshStandardMaterial color="#334155" />
      </mesh>

      {/* LED accent */}
      <pointLight position={[0, 0, 0]} color="#8b5cf6" intensity={0.5} distance={1.5} />
    </group>
  )
}

/**
 * Gaming Keyboard (simplified)
 */
function Keyboard({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} scale={0.6}>
      {/* Main body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.5, 0.15, 0.8]} />
        <meshStandardMaterial color="#1e293b" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Keys (simplified grid) */}
      {Array.from({ length: 5 }).map((_, row) =>
        Array.from({ length: 12 }).map((_, col) => (
          <mesh
            key={`${row}-${col}`}
            position={[
              -1.1 + col * 0.2,
              0.1,
              -0.3 + row * 0.15,
            ]}
            castShadow
          >
            <boxGeometry args={[0.15, 0.05, 0.15]} />
            <meshStandardMaterial
              color="#475569"
              emissive="#0ea5e9"
              emissiveIntensity={0.1}
            />
          </mesh>
        ))
      )}

      {/* RGB underglow */}
      <pointLight position={[0, -0.1, 0]} color="#ec4899" intensity={0.3} distance={2} />
    </group>
  )
}

// Import useState
import { useState } from 'react'

