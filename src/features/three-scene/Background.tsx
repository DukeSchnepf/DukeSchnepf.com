import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Background() {
  const meshRef = useRef<THREE.Mesh>(null!)

  // Generate particle positions once to avoid re-randomizing every render
  const particlePositions = useMemo<[
    number,
    number,
    number
  ][]>(() =>
    Array.from({ length: 20 }, () => [
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
    ]),
  [])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })

  return (
    <>
      {/* Animated geometric shapes */}
      <mesh ref={meshRef} position={[0, 0, -2]}>
        <torusGeometry args={[2, 0.3, 16, 100]} />
        <meshStandardMaterial
          color="#0ea5e9"
          emissive="#0ea5e9"
          emissiveIntensity={0.2}
          wireframe
        />
      </mesh>

      {/* Additional particles/spheres */}
      {particlePositions.map((position, i) => (
        <Particle key={i} position={position} />
      ))}
    </>
  )
}

function Particle({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial
        color="#38bdf8"
        emissive="#38bdf8"
        emissiveIntensity={0.5}
      />
    </mesh>
  )
}

