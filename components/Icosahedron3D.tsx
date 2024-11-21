'use client';

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function Icosahedron() {
  const meshRef = useRef(null)
  const wireframeRef = useRef(null)

  useFrame((state) => {
    const time = state.clock.elapsedTime
    
    if (meshRef.current && wireframeRef.current) {
      // Smooth rotation
      meshRef.current.rotation.y = time * 0.3
      meshRef.current.rotation.x = Math.sin(time * 0.2) * 0.2
      wireframeRef.current.rotation.copy(meshRef.current.rotation)
      
      // Floating motion
      meshRef.current.position.y = 0.25 + Math.sin(time) * 0.1
      wireframeRef.current.position.copy(meshRef.current.position)
    }
  })

  return (
    <group>
      {/* Solid icosahedron */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.2, 0]} />
        <meshPhysicalMaterial
          color="#22c55e"
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.1}
          envMapIntensity={1}
        />
      </mesh>
      
      {/* Wireframe icosahedron */}
      <lineSegments ref={wireframeRef}>
        <wireframeGeometry args={[new THREE.IcosahedronGeometry(1.2, 0)]} />
        <lineBasicMaterial color="#22c55e" linewidth={2} />
      </lineSegments>
    </group>
  )
}

export default function Icosahedron3D() {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true }}
        className="!absolute inset-0"
      >
        {/* Cool lighting setup */}
        <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.25}
          penumbra={1}
          intensity={1}
          castShadow
        />
        <pointLight position={[-10, -10, -10]} intensity={0.9} />
        
        <Icosahedron />
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
        <Environment preset="sunset" />
      </Canvas>
    </div>
  )
}
