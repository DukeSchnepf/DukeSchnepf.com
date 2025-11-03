/**
 * Science Lab 3D Object
 * 
 * Placeholder 3D science-themed objects (beaker, microscope, DNA, etc.)
 * TODO: Replace with actual GLTF model from /models/science-lab.glb
 */

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

export interface ScienceLabProps {
  position?: [number, number, number]
  scale?: number
  interactive?: boolean
  onHover?: (hovered: boolean) => void
  onClick?: () => void
}

export function ScienceLab({
  position = [0, 0, 0],
  scale = 1,
  interactive = true,
  onHover,
  onClick,
}: ScienceLabProps) {
  return (
    <Float
      speed={1.3}
      rotationIntensity={0.6}
      floatIntensity={0.4}
      floatingRange={[-0.12, 0.12]}
    >
      <group position={position} scale={scale}>
        <Beaker
          position={[0, 0, 0]}
          interactive={interactive}
          onHover={onHover}
          onClick={onClick}
        />
        <Microscope position={[2, -0.5, 0]} />
        <DNAHelix position={[-2, 0, 0]} />
        <TestTubeRack position={[0, -1, 0.5]} />
      </group>
    </Float>
  )
}

/**
 * Beaker with bubbling liquid
 */
function Beaker({
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
  const liquidRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHovered] = useState(false)

  // Generate bubble data
  const bubbles = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 0.6,
      z: (Math.random() - 0.5) * 0.6,
      speed: 0.3 + Math.random() * 0.4,
      size: 0.03 + Math.random() * 0.05,
      offset: Math.random() * Math.PI * 2,
    }))
  }, [])

  useFrame((state) => {
    if (!liquidRef.current) return

    // Bubbling liquid effect
    const time = state.clock.elapsedTime
    liquidRef.current.position.y = -0.4 + Math.sin(time * 2) * 0.05
    liquidRef.current.scale.y = 1 + Math.sin(time * 3) * 0.1

    // Rotate beaker slightly on hover
    if (groupRef.current) {
      const targetRotation = hovered ? 0.1 : 0
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        targetRotation,
        0.1
      )
    }
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
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={onClick}
    >
      {/* Glass container */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.4, 0.5, 1.2, 32, 1, true]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.25}
          roughness={0.05}
          metalness={0.05}
          transmission={0.95}
          thickness={0.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Liquid inside */}
      <mesh ref={liquidRef} position={[0, -0.4, 0]}>
        <cylinderGeometry args={[0.38, 0.48, 0.8, 32]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={hovered ? 0.6 : 0.3}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Bubbles */}
      <Bubbles bubbles={bubbles} />

      {/* Measurement markings */}
      {[0.2, 0, -0.2].map((y, i) => (
        <mesh key={i} position={[0, y, 0.42]} rotation={[0, 0, 0]}>
          <planeGeometry args={[0.6, 0.02]} />
          <meshBasicMaterial
            color="#64748b"
            transparent
            opacity={0.4}
          />
        </mesh>
      ))}

      {/* Base */}
      <mesh position={[0, -0.7, 0]} castShadow>
        <cylinderGeometry args={[0.52, 0.52, 0.1, 32]} />
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Glow effect */}
      <pointLight
        position={[0, -0.2, 0]}
        color="#8b5cf6"
        intensity={hovered ? 2 : 1}
        distance={3}
      />
    </group>
  )
}

/**
 * Animated bubbles
 */
function Bubbles({
  bubbles,
}: {
  bubbles: Array<{
    id: number
    x: number
    z: number
    speed: number
    size: number
    offset: number
  }>
}) {
  const bubblesRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (!bubblesRef.current) return

    bubblesRef.current.children.forEach((bubble, i) => {
      const data = bubbles[i]
      const time = state.clock.elapsedTime * data.speed + data.offset

      // Rising motion
      bubble.position.y = ((time % 2.5) - 1.2) * 0.5

      // Slight horizontal drift
      bubble.position.x = data.x + Math.sin(time * 2) * 0.08
      bubble.position.z = data.z + Math.cos(time * 2) * 0.08

      // Fade out at top
      const material = (bubble as THREE.Mesh).material as THREE.MeshStandardMaterial
      const fadeProgress = (bubble.position.y + 0.6) / 0.6
      material.opacity = Math.max(0, 1 - fadeProgress)
    })
  })

  return (
    <group ref={bubblesRef}>
      {bubbles.map((bubble) => (
        <mesh key={bubble.id} position={[bubble.x, -0.6, bubble.z]}>
          <sphereGeometry args={[bubble.size, 12, 12]} />
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={0.7}
            emissive="#c4b5fd"
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
    </group>
  )
}

/**
 * Microscope
 */
function Microscope({ position }: { position: [number, number, number] }) {
  const microscopeRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (!microscopeRef.current) return

    // Subtle rotation
    microscopeRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
  })

  return (
    <group ref={microscopeRef} position={position} scale={0.7}>
      {/* Base */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.5, 0.5, 0.1, 32]} />
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Arm */}
      <mesh position={[0, 0.5, 0]} rotation={[0.3, 0, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 1, 16]} />
        <meshStandardMaterial
          color="#334155"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Eyepiece */}
      <mesh position={[0, 1, -0.15]} rotation={[0.3, 0, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.08, 0.3, 16]} />
        <meshStandardMaterial color="#475569" />
      </mesh>

      {/* Objective lenses */}
      <group position={[0, 0.3, 0.3]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.15, 0.1, 0.2, 16]} />
          <meshStandardMaterial
            color="#71717a"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        
        {/* Lens */}
        <mesh position={[0, -0.15, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.05, 16]} />
          <meshPhysicalMaterial
            color="#0ea5e9"
            transparent
            opacity={0.7}
            transmission={0.8}
            roughness={0}
            metalness={0.1}
          />
        </mesh>
      </group>

      {/* Stage (where slide goes) */}
      <mesh position={[0, 0.2, 0.3]} castShadow>
        <boxGeometry args={[0.6, 0.05, 0.4]} />
        <meshStandardMaterial color="#334155" />
      </mesh>

      {/* Focus knobs */}
      {[-0.2, 0.2].map((x, i) => (
        <mesh key={i} position={[x, 0.5, 0.1]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.05, 16]} />
          <meshStandardMaterial color="#64748b" />
        </mesh>
      ))}

      {/* LED light */}
      <mesh position={[0, 0.05, 0.3]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial
          color="#f59e0b"
          emissive="#f59e0b"
          emissiveIntensity={1}
        />
      </mesh>
      <pointLight position={[0, 0.05, 0.3]} color="#f59e0b" intensity={0.5} distance={1.5} />
    </group>
  )
}

/**
 * DNA Double Helix
 */
function DNAHelix({ position }: { position: [number, number, number] }) {
  const helixRef = useRef<THREE.Group>(null!)

  // Generate helix structure
  const helixData = useMemo(() => {
    const pairs = 20
    const data = []

    for (let i = 0; i < pairs; i++) {
      const angle = (i / pairs) * Math.PI * 4
      const y = (i / pairs) * 2 - 1
      data.push({
        angle,
        y,
        color1: '#0ea5e9',
        color2: '#8b5cf6',
      })
    }

    return data
  }, [])

  useFrame((state) => {
    if (!helixRef.current) return

    // Continuous rotation
    helixRef.current.rotation.y = state.clock.elapsedTime * 0.5
  })

  return (
    <group ref={helixRef} position={position} scale={0.8}>
      {/* Helix strands and base pairs */}
      {helixData.map((data, i) => (
        <group key={i} position={[0, data.y, 0]}>
          {/* Base pair connectors */}
          <mesh rotation={[0, data.angle, Math.PI / 2]}>
            <cylinderGeometry args={[0.02, 0.02, 0.6, 8]} />
            <meshStandardMaterial
              color="#64748b"
              emissive="#64748b"
              emissiveIntensity={0.2}
            />
          </mesh>

          {/* Nucleotide 1 */}
          <mesh position={[Math.cos(data.angle) * 0.3, 0, Math.sin(data.angle) * 0.3]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial
              color={data.color1}
              emissive={data.color1}
              emissiveIntensity={0.4}
            />
          </mesh>

          {/* Nucleotide 2 */}
          <mesh position={[Math.cos(data.angle + Math.PI) * 0.3, 0, Math.sin(data.angle + Math.PI) * 0.3]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial
              color={data.color2}
              emissive={data.color2}
              emissiveIntensity={0.4}
            />
          </mesh>
        </group>
      ))}

      {/* Glowing core */}
      <pointLight position={[0, 0, 0]} color="#ffffff" intensity={0.3} distance={2} />
    </group>
  )
}

/**
 * Test Tube Rack
 */
function TestTubeRack({ position }: { position: [number, number, number] }) {
  const colors = ['#ef4444', '#f59e0b', '#10b981', '#0ea5e9', '#8b5cf6']

  return (
    <group position={position} scale={0.6}>
      {/* Rack base */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[1.5, 0.1, 0.5]} />
        <meshStandardMaterial
          color="#334155"
          metalness={0.5}
          roughness={0.5}
        />
      </mesh>

      {/* Test tubes */}
      {colors.map((color, i) => (
        <TestTube
          key={i}
          position={[-0.6 + i * 0.3, 0.4, 0]}
          color={color}
        />
      ))}
    </group>
  )
}

/**
 * Individual test tube
 */
function TestTube({
  position,
  color,
}: {
  position: [number, number, number]
  color: string
}) {
  const tubeRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (!tubeRef.current) return

    // Gentle bobbing
    tubeRef.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.02
  })

  return (
    <group ref={tubeRef} position={position}>
      {/* Glass tube */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.6, 16]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.3}
          roughness={0.1}
          metalness={0.1}
          transmission={0.9}
        />
      </mesh>

      {/* Liquid inside */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.075, 0.075, 0.4, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Cork/stopper */}
      <mesh position={[0, 0.32, 0]} castShadow>
        <cylinderGeometry args={[0.085, 0.08, 0.08, 16]} />
        <meshStandardMaterial
          color="#92400e"
          roughness={0.9}
        />
      </mesh>

      {/* Glow */}
      <pointLight position={[0, -0.2, 0]} color={color} intensity={0.3} distance={0.5} />
    </group>
  )
}

// Import useState
import { useState } from 'react'

