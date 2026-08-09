import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import './ThreeDPage.css'

function BopIt() {
  return (
    <group 
      position={[1.6, -0.5, 0.5]}
      scale={0.45}
      rotation={[0, -1.5, -0.5]}
    >
      
      {/* Main Bop It body */}
      <mesh>
        <boxGeometry args={[0.9, 2.8, 0.55]} />
        <meshStandardMaterial color="#6f42c1" />
      </mesh>
      
      {/* Top Section */}
      <mesh position={[0, 1.55, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.35, 32]} />
        <meshStandardMaterial color="#6f42c1" />
      </mesh>

      {/* Bottom Section */}
      <mesh position={[0, -1.55, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.35, 32]} />
        <meshStandardMaterial color="#6f42c1" />
      </mesh>
      
      {/* Twist Handle */}
      <group 
        position={[0.65, 2.5, 0.1]}
        rotation={[0, 0, Math.PI]}
      >
        <mesh>
          <cylinderGeometry args={[0.18, 0.18, 0.85, 32]} />
          <meshStandardMaterial 
            color="#f5c400" 
            metalness={0.35}
            roughness={0.1}
          />
        </mesh>
      </group>
      {/* BOP button */}
      <mesh 
        position={[0, 0.35, 0.32]}
        rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 0.12, 32]} />
        <meshStandardMaterial 
          color="#eeeeee" 
          metalness={0.7}
          roughness={0.25}
        />
      </mesh>

      {/* Pull Handle */}
      <group 
        position={[0.1, -2.0, 0]}
        rotation={[0, 0, Math.PI]}
      >
        <mesh>
          <sphereGeometry args={[0.28, 32, 32]} />
          <meshStandardMaterial 
            color="#168de2" 
            metalness={0.3}
            roughness={0.05}
          />
        </mesh>
      </group>

    </group>
  )
}


function Michelle({ isBopping }) {
  const { scene } = useGLTF('/Michelle.glb')

  const rightArmRef = useRef()
  const leftArmRef = useRef()

  const neutralRightX = useRef(0)
  const neutralLeftX = useRef(0)

  useEffect(() => {
    const rightArm =
      scene.getObjectByName('mixamorigRightArm')

    const leftArm =
      scene.getObjectByName('mixamorigLeftArm')

    if (rightArm) {
      rightArm.rotation.x += 0.5
      rightArmRef.current = rightArm

      neutralRightX.current = rightArm.rotation.x
    }

    if (leftArm) {
      leftArm.rotation.x += 0.5
      leftArmRef.current = leftArm

      neutralLeftX.current = leftArm.rotation.x
    }
  }, [scene])

  useFrame((_, delta) => {
    if (!rightArmRef.current) return

    // Move the right arm upward when BOP is pressed
    const targetRightX = isBopping
      ? neutralRightX.current - 0.8
      : neutralRightX.current

    rightArmRef.current.rotation.x = THREE.MathUtils.damp(
      rightArmRef.current.rotation.x,
      targetRightX,
      12,
      delta
    )
  })

  scene.traverse((child) => {
    if (child.name === 'Cube') {
      child.visible = false
    }
  })

  return (
    <primitive
      object={scene}
      scale={4}
      position={[0, -4, 0]}
    />
  )
}

export default function ThreeDPage() {
  const [isBopping, setIsBopping] = useState(false)
  return (
    <div className="three-d-page">
      <h1>3D Bop It Experience</h1>

      <div className="three-d-canvas">
        <Canvas camera={{ position: [0, 1, 6] }}>
          <ambientLight intensity={1} />

          <directionalLight
            position={[5, 5, 5]}
            intensity={2}
          />

          <Michelle isBopping={isBopping} />
          <BopIt/>
        </Canvas>

        <button
          onClick={() => {
            setIsBopping(true)

            setTimeout(() => {
              setIsBopping(false)
            }, 250)
          }}
        >
          BOP IT
        </button>
        
      </div>
    </div>
  )
}