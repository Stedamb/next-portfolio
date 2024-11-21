'use client';

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function ThorusObject() {
  const groupRef = useRef(null)
  const thorusRef = useRef(null)

  useFrame((state) => {
    const time = state.clock.elapsedTime
    
    if (groupRef.current && thorusRef.current) {
      // Rotate the entire group
      groupRef.current.rotation.y = time * 0.4
      groupRef.current.rotation.x = Math.sin(time * 0.3) * 0.1
      
      // Rotate the thorus itself on its local axis
      thorusRef.current.rotation.x += 0.01
      thorusRef.current.rotation.z = Math.sin(time * 0.1) * 0.1
    }
  })

  return (
    <group ref={groupRef} rotation={[0.5, 0, 0]}>
      <lineSegments ref={thorusRef}>
        <wireframeGeometry args={[new THREE.TorusGeometry(0.8, 0.2, 16, 32)]} />
        <lineBasicMaterial color="#dd5733" linewidth={1} />
      </lineSegments>
    </group>
  )
}

export default function Thorus() {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        gl={{
          antialias: false,
          powerPreference: 'low-power',
          failIfMajorPerformanceCaveat: true,
        }}
        className="!absolute inset-0"
        dpr={1}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={0.6} />
        
        <ThorusObject />
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
          enableDamping={false}
        />
      </Canvas>
    </div>
  )
}
