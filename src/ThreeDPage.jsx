import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import './ThreeDPage.css'
import {usePico} from './PicoContext'


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
  //from PicoContext, consume modelStatus and connectPico
  const {modelStatus, setModelStatus, connectPico, switchStatus, isConnected} = usePico()

  //react to chages in modelStatus from serial messages
  useEffect(() => {
    //again, change to song name if needed
    if (modelStatus ==='PLAYING') {
      setIsBopping(true)

      const timer = setTimeout(() => {
        setIsBopping(false)
      }, 250)
      setModelStatus('')
    }
  }, [modelStatus, setModelStatus])

  //I moved my code here so that it also displays visual effect in one page
  const activeEffects = Object.values(switchStatus)
  .filter((cls) => cls !== 'idle')
  .join(' ') || 'idle'

  //helper code so that button handles both connection and animation
  const handleButtonClick = () => {
    if (!isConnected){
      connectPico()
    }
    setIsBopping(true)
    const timer = setTimeout(() => {
      setIsBopping(false)
    }, 250)
  }

  return (
    <div className={`three-d-page ${activeEffects}`}>
      <h1>3D Bop It Experience</h1>

      <div className="three-d-canvas">
        <Canvas camera={{ position: [0, 1, 6] }}>
          <ambientLight intensity={1} />

          <directionalLight
            position={[5, 5, 5]}
            intensity={2}
          />

          <Michelle isBopping={isBopping} />
        </Canvas>
        {/*This is your original code 

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
        */}
        <button onClick={handleButtonClick}>BOP IT
        </button>
        
      </div>
    </div>
  )
}