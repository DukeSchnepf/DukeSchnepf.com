import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { RoundedBox, Text, Float } from '@react-three/drei'
import { useScroll } from '@react-three/drei'
import * as THREE from 'three'
import { cameraConfig } from '../../../config/three.config'

interface ProjectCardProps {
  position: [number, number, number]
  index: number
  title: string
  color: string
}

export function ProjectsScene() {
  const scroll = useScroll()
  
  // Project card data (placeholder)
  const projects = useMemo(() => [
    { title: 'Project 1', color: '#0ea5e9', position: [-3, 2, 0] as [number, number, number] },
    { title: 'Project 2', color: '#8b5cf6', position: [0, 2, 0] as [number, number, number] },
    { title: 'Project 3', color: '#f59e0b', position: [3, 2, 0] as [number, number, number] },
    { title: 'Project 4', color: '#10b981', position: [-3, -1, 0] as [number, number, number] },
    { title: 'Project 5', color: '#ef4444', position: [0, -1, 0] as [number, number, number] },
    { title: 'Project 6', color: '#ec4899', position: [3, -1, 0] as [number, number, number] },
  ], [])
  
  return (
    <group>
      {/* Ambient background */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} />
      
      {/* Project cards in 3D grid */}
      {projects.map((project, index) => (
        <ProjectCard
          key={index}
          position={project.position}
          index={index}
          title={project.title}
          color={project.color}
        />
      ))}
      
      {/* Background elements */}
      <BackgroundGrid />
    </group>
  )
}

/**
 * Individual project card with 3D effects
 */
function ProjectCard({ position, index, title, color }: ProjectCardProps) {
  const meshRef = useRef<THREE.Group>(null!)
  const [hovered, setHovered] = useState(false)
  const scroll = useScroll()
  
  useFrame((state) => {
    if (!meshRef.current) return
    
    // Scroll-based reveal animation
    const scrollProgress = scroll?.offset || 0
    const targetY = position[1] + Math.sin(scrollProgress * Math.PI * 2 + index) * 0.5
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      targetY,
      0.1
    )
    
    // Hover effect
    const targetScale = hovered ? 1.1 : 1
    meshRef.current.scale.setScalar(
      THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1)
    )
    
    // Gentle rotation
    meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3 + index) * 0.1
  })
  
  return (
    <group
      ref={meshRef}
      position={position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <RoundedBox args={[2, 2.5, 0.2]} radius={0.1} smoothness={4}>
        <meshStandardMaterial
          color={color}
          metalness={0.5}
          roughness={0.3}
          emissive={color}
          emissiveIntensity={hovered ? 0.3 : 0.1}
        />
      </RoundedBox>
      
      {/* Project title */}
      <Text
        position={[0, 0, 0.15]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {title}
      </Text>
      
      {/* Interactive overlay on hover */}
      {hovered && (
        <mesh position={[0, 0, 0.11]}>
          <planeGeometry args={[1.9, 2.4]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  )
}

/**
 * Animated background grid
 */
function BackgroundGrid() {
  const gridRef = useRef<THREE.Group>(null!)
  
  useFrame((state) => {
    if (!gridRef.current) return
    
    gridRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05
    gridRef.current.position.z = -5 + Math.sin(state.clock.elapsedTime * 0.2) * 0.5
  })
  
  const lines = useMemo(() => {
    const linePositions: [number, number, number][] = []
    const gridSize = 20
    const spacing = 2
    
    for (let i = -gridSize / 2; i <= gridSize / 2; i++) {
      linePositions.push([i * spacing, 0, 0])
    }
    
    return linePositions
  }, [])
  
  return (
    <group ref={gridRef}>
      {lines.map((pos, i) => (
        <mesh key={i} position={pos} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.02, 20]} />
          <meshBasicMaterial
            color="#0ea5e9"
            transparent
            opacity={0.1}
          />
        </mesh>
      ))}
      {lines.map((pos, i) => (
        <mesh key={`h-${i}`} position={[0, pos[0], 0]} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
          <planeGeometry args={[0.02, 20]} />
          <meshBasicMaterial
            color="#0ea5e9"
            transparent
            opacity={0.1}
          />
        </mesh>
      ))}
    </group>
  )
}

// Import useState at the top
import { useState } from 'react'

