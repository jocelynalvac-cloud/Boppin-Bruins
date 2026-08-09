import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import './ThreeDPage.css'

// ============================================================
// BOP IT
// ============================================================

function BopIt({ rightHandRef }) {
  const { scene } = useGLTF('/BopIt.glb')

  const bopItRef = useRef()

  // ----------------------------------------------------------
  // Attach Bop It to Michelle's right hand
  // ----------------------------------------------------------

  useFrame(() => {

    if (
      rightHandRef.current &&
      bopItRef.current &&
      bopItRef.current.parent !== rightHandRef.current
    ) {
      rightHandRef.current.add(bopItRef.current)

      // DO NOT CHANGE THESE VALUES
      bopItRef.current.position.set(
        3,
        12,
        -3
      )
    }
  })

  // ----------------------------------------------------------
  // Bop It model
  // ----------------------------------------------------------

  return (
    <group
      ref={bopItRef}

      // DO NOT CHANGE
      scale={100}

      // DO NOT CHANGE
      rotation={[
        Math.PI,
        Math.PI / 10,
        Math.PI / 2
      ]}
    >
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload('/BopIt.glb')

// ============================================================
// MICHELLE
// ============================================================

function Michelle({
  rightHandRef,
  danceMove
}) {

  const { scene } = useGLTF('/Michelle.glb')

  // ==========================================================
  // ARM REFERENCES
  // ==========================================================

  const rightArmRef = useRef()
  const leftArmRef = useRef()

  const neutralRightX = useRef(0)
  const neutralLeftX = useRef(0)

  const neutralRightZ = useRef(0)
  const neutralLeftZ = useRef(0)


  // ==========================================================
  // LEG REFERENCES
  // ==========================================================

  const rightUpLegRef = useRef()
  const leftUpLegRef = useRef()

  const rightLegRef = useRef()
  const leftLegRef = useRef()

  const neutralRightUpLegX = useRef(0)
  const neutralLeftUpLegX = useRef(0)

  const neutralRightUpLegZ = useRef(0)
  const neutralLeftUpLegZ = useRef(0)

  const neutralRightLegX = useRef(0)
  const neutralLeftLegX = useRef(0)

  const neutralRightLegZ = useRef(0)
  const neutralLeftLegZ = useRef(0)


  // ==========================================================
  // LEFT FINGER REFERENCES
  // ==========================================================

  const leftFingerRefs = useRef([])

  const neutralFingerRotations = useRef([])


  // ==========================================================
  // BODY REFERENCES
  // ==========================================================

  const neutralBodyRotationX = useRef(0)
  const neutralBodyRotationY = useRef(0)
  const neutralBodyRotationZ = useRef(0)

  const neutralBodyPositionX = useRef(0)
  const neutralBodyPositionY = useRef(0)
  const neutralBodyPositionZ = useRef(0)

  // Live body targets. Keeping these separate from the current
  // rotations prevents one dance from carrying into another.
  const targetBodyRotationX = useRef(0)
  const targetBodyRotationY = useRef(0)
  const targetBodyRotationZ = useRef(0)

  const targetBodyPositionX = useRef(0)
  const targetBodyPositionY = useRef(0)
  const targetBodyPositionZ = useRef(0)


  // ==========================================================
  // DANCE TIMER
  // ==========================================================

  const danceTime = useRef(0)


  // ==========================================================
  // HELPER: FIND FIRST EXISTING BONE
  // ==========================================================

  const findBone = (names) => {

    for (const name of names) {

      const bone =
        scene.getObjectByName(name)

      if (bone) {
        return bone
      }
    }

    return null
  }


  // ==========================================================
  // FIND MICHELLE BONES
  // ==========================================================

  useEffect(() => {

    // --------------------------------------------------------
    // ARMS
    // --------------------------------------------------------

    const rightArm =
      scene.getObjectByName(
        'mixamorigRightArm'
      )

    const leftArm =
      scene.getObjectByName(
        'mixamorigLeftArm'
      )


    // --------------------------------------------------------
    // HAND
    // --------------------------------------------------------

    const rightHand =
      scene.getObjectByName(
        'mixamorigRightHand'
      )


    // ========================================================
    // RIGHT ARM — NEUTRAL POSITION
    // ========================================================

    if (rightArm) {

      rightArmRef.current =
        rightArm

      // SAME NEUTRAL POSITION AS BEFORE
      rightArm.rotation.x += 0.5

      neutralRightX.current =
        rightArm.rotation.x

      neutralRightZ.current =
        rightArm.rotation.z
    }


    // ========================================================
    // LEFT ARM — NEUTRAL POSITION
    // ========================================================

    if (leftArm) {

      leftArmRef.current =
        leftArm

      // SAME NEUTRAL POSITION AS BEFORE
      leftArm.rotation.x += 0.5

      neutralLeftX.current =
        leftArm.rotation.x

      neutralLeftZ.current =
        leftArm.rotation.z
    }


    // ========================================================
    // RIGHT HAND
    // ========================================================

    if (rightHand) {

      rightHandRef.current =
        rightHand

      console.log(
        'Michelle right hand found:',
        rightHand.name
      )

    } else {

      console.warn(
        'Could not find mixamorigRightHand'
      )
    }


    // ========================================================
    // LEGS
    // ========================================================

    const rightUpLeg =
      findBone([
        'mixamorigRightUpLeg',
        'RightUpLeg'
      ])

    const leftUpLeg =
      findBone([
        'mixamorigLeftUpLeg',
        'LeftUpLeg'
      ])

    const rightLeg =
      findBone([
        'mixamorigRightLeg',
        'RightLeg'
      ])

    const leftLeg =
      findBone([
        'mixamorigLeftLeg',
        'LeftLeg'
      ])


    if (rightUpLeg) {

      rightUpLegRef.current =
        rightUpLeg

      neutralRightUpLegX.current =
        rightUpLeg.rotation.x

      neutralRightUpLegZ.current =
        rightUpLeg.rotation.z
    }


    if (leftUpLeg) {

      leftUpLegRef.current =
        leftUpLeg

      neutralLeftUpLegX.current =
        leftUpLeg.rotation.x

      neutralLeftUpLegZ.current =
        leftUpLeg.rotation.z
    }


    if (rightLeg) {

      rightLegRef.current =
        rightLeg

      neutralRightLegX.current =
        rightLeg.rotation.x

      neutralRightLegZ.current =
        rightLeg.rotation.z
    }


    if (leftLeg) {

      leftLegRef.current =
        leftLeg

      neutralLeftLegX.current =
        leftLeg.rotation.x

      neutralLeftLegZ.current =
        leftLeg.rotation.z
    }


    // ========================================================
    // LEFT FINGERS
    // ========================================================

    const fingerNames = [
      [
        'mixamorigLeftHandIndex1',
        'mixamorigLeftHandIndex2',
        'mixamorigLeftHandIndex3'
      ],
      [
        'mixamorigLeftHandMiddle1',
        'mixamorigLeftHandMiddle2',
        'mixamorigLeftHandMiddle3'
      ],
      [
        'mixamorigLeftHandRing1',
        'mixamorigLeftHandRing2',
        'mixamorigLeftHandRing3'
      ],
      [
        'mixamorigLeftHandPinky1',
        'mixamorigLeftHandPinky2',
        'mixamorigLeftHandPinky3'
      ]
    ]


    const foundFingers = []


    fingerNames.forEach((fingerChain) => {

      fingerChain.forEach((name) => {

        const finger =
          scene.getObjectByName(name)

        if (finger) {
          foundFingers.push(finger)
        }
      })
    })


    leftFingerRefs.current =
      foundFingers

    neutralFingerRotations.current =
      foundFingers.map((finger) => ({
        x: finger.rotation.x,
        y: finger.rotation.y,
        z: finger.rotation.z
      }))


    console.log(
      'Left finger bones found:',
      foundFingers.length
    )


    // ========================================================
    // BODY NEUTRAL POSITION
    // ========================================================

    neutralBodyRotationX.current =
      scene.rotation.x

    neutralBodyRotationY.current =
      scene.rotation.y

    neutralBodyRotationZ.current =
      scene.rotation.z

    neutralBodyPositionX.current =
      scene.position.x

    neutralBodyPositionY.current =
      scene.position.y

    neutralBodyPositionZ.current =
      scene.position.z

  }, [scene, rightHandRef])


  // ==========================================================
  // DANCE ANIMATION
  // ==========================================================

  useFrame((_, delta) => {

    if (
      !rightArmRef.current ||
      !leftArmRef.current
    ) {
      return
    }


    // ========================================================
    // TIMER
    // ========================================================

    if (danceMove !== 0) {

      danceTime.current += delta

    } else {

      danceTime.current = 0
    }


    const t =
      danceTime.current


    // ========================================================
    // START WITH NEUTRAL POSITION
    // ========================================================

    let targetRightX =
      neutralRightX.current

    let targetLeftX =
      neutralLeftX.current

    let targetRightZ =
      neutralRightZ.current

    let targetLeftZ =
      neutralLeftZ.current


    // --------------------------------------------------------
    // LEGS
    // --------------------------------------------------------

    let targetRightUpLegX =
      neutralRightUpLegX.current

    let targetLeftUpLegX =
      neutralLeftUpLegX.current

    let targetRightUpLegZ =
      neutralRightUpLegZ.current

    let targetLeftUpLegZ =
      neutralLeftUpLegZ.current

    let targetRightLegX =
      neutralRightLegX.current

    let targetLeftLegX =
      neutralLeftLegX.current

    let targetRightLegZ =
      neutralRightLegZ.current

    let targetLeftLegZ =
      neutralLeftLegZ.current


    // ========================================================
    // BODY TARGETS
    // ========================================================

    targetBodyRotationX.current =
      neutralBodyRotationX.current

    targetBodyRotationY.current =
      neutralBodyRotationY.current

    targetBodyRotationZ.current =
      neutralBodyRotationZ.current

    targetBodyPositionX.current =
      neutralBodyPositionX.current

    targetBodyPositionY.current =
      neutralBodyPositionY.current

    targetBodyPositionZ.current =
      neutralBodyPositionZ.current


    // ========================================================
    // DANCE 1 — DISCO POINT
    // ========================================================

    if (danceMove === 1) {

      /*
       * Classic alternating disco point.
       *
       * Arms:
       *    ☝️
       *
       * Legs:
       *   step → together → step → together
       *
       * Fingers:
       *   left hand opens/closes rhythmically
       */

      const beat =
        Math.sin(t * 5)

      const pulse =
        Math.abs(
          Math.sin(t * 10)
        )


      // ------------------------------------------------------
      // ARMS
      // ------------------------------------------------------

      if (beat >= 0) {

        targetRightX =
          neutralRightX.current - 2.0

        targetLeftX =
          neutralLeftX.current + 0.3

      } else {

        targetRightX =
          neutralRightX.current + 0.3

        targetLeftX =
          neutralLeftX.current - 2.0
      }


      targetRightZ =
        neutralRightZ.current +
        beat * 0.35

      targetLeftZ =
        neutralLeftZ.current -
        beat * 0.35


      // ------------------------------------------------------
      // LEGS — ALTERNATING STEP
      // ------------------------------------------------------

      targetRightUpLegX =
        neutralRightUpLegX.current +
        beat * 0.25

      targetLeftUpLegX =
        neutralLeftUpLegX.current -
        beat * 0.25


      targetRightUpLegZ =
        neutralRightUpLegZ.current -
        beat * 0.12

      targetLeftUpLegZ =
        neutralLeftUpLegZ.current +
        beat * 0.12


      // Slight knee bend

      targetRightLegX =
        neutralRightLegX.current -
        pulse * 0.18

      targetLeftLegX =
        neutralLeftLegX.current -
        pulse * 0.18


      // ------------------------------------------------------
      // BODY
      // ------------------------------------------------------

      targetBodyRotationZ.current =
        neutralBodyRotationZ.current +
        beat * 0.14

      targetBodyPositionY.current =
        neutralBodyPositionY.current +
        pulse * 0.07
    }


    // ========================================================
    // DANCE 2 — SIDE GROOVE
    // ========================================================

    if (danceMove === 2) {

      /*
       * SIDE GROOVE
       *
       * A relaxed disco weight-transfer:
       * - hips lead the movement
       * - one knee softens while the other leg lengthens
       * - arms swing opposite the hips
       * - torso gently follows the groove
       */

      const sway =
        Math.sin(t * 3.2)

      const oppositeSway =
        -sway

      const grooveBounce =
        Math.max(
          0,
          Math.sin(t * 6.4)
        )

      const weightRight =
        Math.max(0, sway)

      const weightLeft =
        Math.max(0, -sway)


      // ------------------------------------------------------
      // ARMS — OPPOSITE TO THE HIP SWAY
      // ------------------------------------------------------

      targetRightX =
        neutralRightX.current -
        0.55 -
        sway * 0.75

      targetLeftX =
        neutralLeftX.current -
        0.55 +
        sway * 0.75

      targetRightZ =
        neutralRightZ.current +
        sway * 0.48

      targetLeftZ =
        neutralLeftZ.current -
        sway * 0.48


      // ------------------------------------------------------
      // LEGS — REALISTIC WEIGHT TRANSFER
      // ------------------------------------------------------

      // The weighted side bends slightly while the opposite
      // leg stays longer. This creates a more natural groove.
      targetRightUpLegX =
        neutralRightUpLegX.current -
        weightRight * 0.18 +
        weightLeft * 0.06

      targetLeftUpLegX =
        neutralLeftUpLegX.current -
        weightLeft * 0.18 +
        weightRight * 0.06

      targetRightUpLegZ =
        neutralRightUpLegZ.current +
        sway * 0.13

      targetLeftUpLegZ =
        neutralLeftUpLegZ.current +
        sway * 0.13

      targetRightLegX =
        neutralRightLegX.current -
        weightRight * 0.28

      targetLeftLegX =
        neutralLeftLegX.current -
        weightLeft * 0.28

      targetRightLegZ =
        neutralRightLegZ.current -
        sway * 0.06

      targetLeftLegZ =
        neutralLeftLegZ.current -
        sway * 0.06


      // ------------------------------------------------------
      // TORSO + HIPS
      // ------------------------------------------------------

      targetBodyRotationZ.current =
        neutralBodyRotationZ.current +
        sway * 0.16

      targetBodyRotationY.current =
        neutralBodyRotationY.current +
        sway * 0.07

      targetBodyRotationX.current =
        neutralBodyRotationX.current +
        oppositeSway * 0.035

      targetBodyPositionY.current =
        neutralBodyPositionY.current +
        grooveBounce * 0.055
    }


    // ========================================================
    // DANCE 3 — DISCO BOUNCE
    // ========================================================

    if (danceMove === 3) {

      /*
       * DISCO BOUNCE
       *
       * A rhythmic, grounded bounce:
       * - knees compress together
       * - hips rise and fall with the beat
       * - arms pump with alternating timing
       * - torso counter-rotates slightly
       */

      const beat =
        t * 5.5

      const bounce =
        Math.max(
          0,
          Math.sin(beat)
        )

      const alternating =
        Math.sin(beat)

      const alternatingAbs =
        Math.abs(alternating)


      // ------------------------------------------------------
      // ARMS — ALTERNATING PUMPS
      // ------------------------------------------------------

      targetRightX =
        neutralRightX.current -
        (
          0.25 +
          bounce * 1.05 +
          alternatingAbs * 0.20
        )

      targetLeftX =
        neutralLeftX.current -
        (
          0.25 +
          Math.max(0, -alternating) * 0.95
        )

      targetRightZ =
        neutralRightZ.current +
        alternating * 0.30

      targetLeftZ =
        neutralLeftZ.current -
        alternating * 0.30


      // ------------------------------------------------------
      // LEGS — KNEE COMPRESSION + ALTERNATING WEIGHT
      // ------------------------------------------------------

      targetRightUpLegX =
        neutralRightUpLegX.current +
        bounce * 0.16 +
        Math.max(0, alternating) * 0.07

      targetLeftUpLegX =
        neutralLeftUpLegX.current +
        bounce * 0.16 +
        Math.max(0, -alternating) * 0.07

      targetRightLegX =
        neutralRightLegX.current -
        bounce * 0.42 -
        Math.max(0, alternating) * 0.08

      targetLeftLegX =
        neutralLeftLegX.current -
        bounce * 0.42 -
        Math.max(0, -alternating) * 0.08

      targetRightUpLegZ =
        neutralRightUpLegZ.current +
        alternating * 0.09

      targetLeftUpLegZ =
        neutralLeftUpLegZ.current -
        alternating * 0.09

      targetRightLegZ =
        neutralRightLegZ.current -
        alternating * 0.045

      targetLeftLegZ =
        neutralLeftLegZ.current +
        alternating * 0.045


      // ------------------------------------------------------
      // WHOLE BODY — GROUNDED VERTICAL BOUNCE
      // ------------------------------------------------------

      targetBodyPositionY.current =
        neutralBodyPositionY.current +
        bounce * 0.105

      targetBodyRotationX.current =
        neutralBodyRotationX.current -
        bounce * 0.025

      targetBodyRotationY.current =
        neutralBodyRotationY.current +
        alternating * 0.085

      targetBodyRotationZ.current =
        neutralBodyRotationZ.current +
        alternating * 0.055
    }


    // ========================================================
    // LEFT FINGER ANIMATION
    // ========================================================

    if (
      leftFingerRefs.current.length > 0
    ) {

      leftFingerRefs.current.forEach(
        (finger, index) => {

          const neutral =
            neutralFingerRotations.current[index]

          if (!neutral) return


          let fingerCurl = 0
          let fingerWiggle = 0


          // --------------------------------------------------
          // DISCO POINT
          // --------------------------------------------------

          if (danceMove === 1) {

            fingerCurl =
              Math.sin(
                t * 10 + index * 0.5
              ) * 0.15

            fingerWiggle =
              Math.sin(
                t * 8 + index
              ) * 0.08
          }


          // --------------------------------------------------
          // SIDE GROOVE
          // --------------------------------------------------

          if (danceMove === 2) {

            fingerCurl =
              Math.sin(
                t * 3.2 + index * 0.65
              ) * 0.16

            fingerWiggle =
              Math.cos(
                t * 4.2 + index
              ) * 0.08
          }


          // --------------------------------------------------
          // DISCO BOUNCE
          // --------------------------------------------------

          if (danceMove === 3) {

            fingerCurl =
              Math.abs(
                Math.sin(
                  t * 5.5 + index * 0.45
                )
              ) * 0.20

            fingerWiggle =
              Math.sin(
                t * 7 + index
              ) * 0.10
          }


          // --------------------------------------------------
          // Apply finger movement
          // --------------------------------------------------

          const targetX =
            neutral.x + fingerCurl

          const targetY =
            neutral.y + fingerWiggle


          finger.rotation.x =
            THREE.MathUtils.damp(
              finger.rotation.x,
              targetX,
              10,
              delta
            )


          finger.rotation.y =
            THREE.MathUtils.damp(
              finger.rotation.y,
              targetY,
              10,
              delta
            )
        }
      )
    }


    // ========================================================
    // RETURN EVERYTHING TO NEUTRAL
    // ========================================================

    if (danceMove === 0) {

      // ------------------------------------------------------
      // ARMS
      // ------------------------------------------------------

      rightArmRef.current.rotation.x =
        THREE.MathUtils.damp(
          rightArmRef.current.rotation.x,
          neutralRightX.current,
          10,
          delta
        )

      leftArmRef.current.rotation.x =
        THREE.MathUtils.damp(
          leftArmRef.current.rotation.x,
          neutralLeftX.current,
          10,
          delta
        )

      rightArmRef.current.rotation.z =
        THREE.MathUtils.damp(
          rightArmRef.current.rotation.z,
          neutralRightZ.current,
          10,
          delta
        )

      leftArmRef.current.rotation.z =
        THREE.MathUtils.damp(
          leftArmRef.current.rotation.z,
          neutralLeftZ.current,
          10,
          delta
        )


      // ------------------------------------------------------
      // LEGS
      // ------------------------------------------------------

      if (rightUpLegRef.current) {

        rightUpLegRef.current.rotation.x =
          THREE.MathUtils.damp(
            rightUpLegRef.current.rotation.x,
            neutralRightUpLegX.current,
            10,
            delta
          )

        rightUpLegRef.current.rotation.z =
          THREE.MathUtils.damp(
            rightUpLegRef.current.rotation.z,
            neutralRightUpLegZ.current,
            10,
            delta
          )
      }


      if (leftUpLegRef.current) {

        leftUpLegRef.current.rotation.x =
          THREE.MathUtils.damp(
            leftUpLegRef.current.rotation.x,
            neutralLeftUpLegX.current,
            10,
            delta
          )

        leftUpLegRef.current.rotation.z =
          THREE.MathUtils.damp(
            leftUpLegRef.current.rotation.z,
            neutralLeftUpLegZ.current,
            10,
            delta
          )
      }


      if (rightLegRef.current) {

        rightLegRef.current.rotation.x =
          THREE.MathUtils.damp(
            rightLegRef.current.rotation.x,
            neutralRightLegX.current,
            10,
            delta
          )

        rightLegRef.current.rotation.z =
          THREE.MathUtils.damp(
            rightLegRef.current.rotation.z,
            neutralRightLegZ.current,
            10,
            delta
          )
      }


      if (leftLegRef.current) {

        leftLegRef.current.rotation.x =
          THREE.MathUtils.damp(
            leftLegRef.current.rotation.x,
            neutralLeftLegX.current,
            10,
            delta
          )

        leftLegRef.current.rotation.z =
          THREE.MathUtils.damp(
            leftLegRef.current.rotation.z,
            neutralLeftLegZ.current,
            10,
            delta
          )
      }


      // ------------------------------------------------------
      // LEFT FINGERS
      // ------------------------------------------------------

      leftFingerRefs.current.forEach(
        (finger, index) => {

          const neutral =
            neutralFingerRotations.current[index]

          if (!neutral) return


          finger.rotation.x =
            THREE.MathUtils.damp(
              finger.rotation.x,
              neutral.x,
              10,
              delta
            )

          finger.rotation.y =
            THREE.MathUtils.damp(
              finger.rotation.y,
              neutral.y,
              10,
              delta
            )

          finger.rotation.z =
            THREE.MathUtils.damp(
              finger.rotation.z,
              neutral.z,
              10,
              delta
            )
        }
      )


      // Body reset is handled by the shared target values below.
    }


    // ========================================================
    // APPLY ARM ANIMATION
    // ========================================================

    rightArmRef.current.rotation.x =
      THREE.MathUtils.damp(
        rightArmRef.current.rotation.x,
        targetRightX,
        8,
        delta
      )

    rightArmRef.current.rotation.z =
      THREE.MathUtils.damp(
        rightArmRef.current.rotation.z,
        targetRightZ,
        8,
        delta
      )


    leftArmRef.current.rotation.x =
      THREE.MathUtils.damp(
        leftArmRef.current.rotation.x,
        targetLeftX,
        8,
        delta
      )

    leftArmRef.current.rotation.z =
      THREE.MathUtils.damp(
        leftArmRef.current.rotation.z,
        targetLeftZ,
        8,
        delta
      )


    // ========================================================
    // APPLY LEG ANIMATION
    // ========================================================

    if (rightUpLegRef.current) {

      rightUpLegRef.current.rotation.x =
        THREE.MathUtils.damp(
          rightUpLegRef.current.rotation.x,
          targetRightUpLegX,
          7,
          delta
        )

      rightUpLegRef.current.rotation.z =
        THREE.MathUtils.damp(
          rightUpLegRef.current.rotation.z,
          targetRightUpLegZ,
          7,
          delta
        )
    }


    if (leftUpLegRef.current) {

      leftUpLegRef.current.rotation.x =
        THREE.MathUtils.damp(
          leftUpLegRef.current.rotation.x,
          targetLeftUpLegX,
          7,
          delta
        )

      leftUpLegRef.current.rotation.z =
        THREE.MathUtils.damp(
          leftUpLegRef.current.rotation.z,
          targetLeftUpLegZ,
          7,
          delta
        )
    }


    if (rightLegRef.current) {

      rightLegRef.current.rotation.x =
        THREE.MathUtils.damp(
          rightLegRef.current.rotation.x,
          targetRightLegX,
          7,
          delta
        )

      rightLegRef.current.rotation.z =
        THREE.MathUtils.damp(
          rightLegRef.current.rotation.z,
          targetRightLegZ,
          7,
          delta
        )
    }


    if (leftLegRef.current) {

      leftLegRef.current.rotation.x =
        THREE.MathUtils.damp(
          leftLegRef.current.rotation.x,
          targetLeftLegX,
          7,
          delta
        )

      leftLegRef.current.rotation.z =
        THREE.MathUtils.damp(
          leftLegRef.current.rotation.z,
          targetLeftLegZ,
          7,
          delta
        )
    }


    // ========================================================
    // APPLY BODY ANIMATION
    // ========================================================

    scene.rotation.x =
      THREE.MathUtils.damp(
        scene.rotation.x,
        targetBodyRotationX.current,
        7,
        delta
      )

    scene.rotation.y =
      THREE.MathUtils.damp(
        scene.rotation.y,
        targetBodyRotationY.current,
        7,
        delta
      )

    scene.rotation.z =
      THREE.MathUtils.damp(
        scene.rotation.z,
        targetBodyRotationZ.current,
        7,
        delta
      )

    scene.position.x =
      THREE.MathUtils.damp(
        scene.position.x,
        targetBodyPositionX.current,
        8,
        delta
      )

    scene.position.y =
      THREE.MathUtils.damp(
        scene.position.y,
        targetBodyPositionY.current,
        8,
        delta
      )

    scene.position.z =
      THREE.MathUtils.damp(
        scene.position.z,
        targetBodyPositionZ.current,
        8,
        delta
      )
  })


  // ==========================================================
  // HIDE UNWANTED CUBE
  // ==========================================================

  useEffect(() => {

    scene.traverse((child) => {

      if (child.name === 'Cube') {
        child.visible = false
      }

    })

  }, [scene])


  // ==========================================================
  // MICHELLE MODEL
  // ==========================================================

  return (
    <primitive
      object={scene}
      scale={4}
      position={[0, -4, 0]}
    />
  )
}

useGLTF.preload('/Michelle.glb')

// ============================================================
// MAIN PAGE
// ============================================================

export default function ThreeDPage() {

  const [danceMove, setDanceMove] =
    useState(0)

  const rightHandRef =
    useRef()

  const danceTimeoutRef =
    useRef(null)


  // ==========================================================
  // TRIGGER DANCE
  // ==========================================================

  const triggerDance = (move) => {

    if (danceTimeoutRef.current) {
      clearTimeout(
        danceTimeoutRef.current
      )
    }

    setDanceMove(move)

    danceTimeoutRef.current =
      setTimeout(() => {
        setDanceMove(0)
      }, 3500)
  }


  // ==========================================================
  // CLEANUP
  // ==========================================================

  useEffect(() => {

    return () => {

      if (danceTimeoutRef.current) {
        clearTimeout(
          danceTimeoutRef.current
        )
      }

    }

  }, [])


  // ==========================================================
  // PAGE
  // ==========================================================

  return (
    <div className={`three-d-page dance-state-${danceMove}`}>

      {/* ==================================================
          DISCO BACKGROUND
         ================================================== */}

      <div
        className="disco-background"
        aria-hidden="true"
      >
        <div className="disco-ball" />

        <div className="light-beam beam-one" />
        <div className="light-beam beam-two" />
        <div className="light-beam beam-three" />
      </div>


      <h1 className="page-title">
        READY TO DANCE
      </h1>


      <div className="three-d-canvas">

        <Canvas
          camera={{
            position: [0, 1, 6]
          }}
        >

          <ambientLight
            intensity={1}
          />

          <directionalLight
            position={[5, 5, 5]}
            intensity={2}
          />


          <Michelle
            rightHandRef={rightHandRef}
            danceMove={danceMove}
          />


          <BopIt
            rightHandRef={rightHandRef}
          />

        </Canvas>


        {/* ==================================================
            DANCE CONTROLS
           ================================================== */}

        <div className="dance-controls">

          <button
            className={`control-button disco-point ${danceMove === 1 ? "active" : ""}`}
            onClick={() => triggerDance(1)}
          >
            DISCO POINT
          </button>


          <button
            className={`control-button side-groove ${danceMove === 2 ? "active" : ""}`}
            onClick={() => triggerDance(2)}
          >
            SIDE GROOVE
          </button>


          <button
            className={`control-button disco-bounce ${danceMove === 3 ? "active" : ""}`}
            onClick={() => triggerDance(3)}
          >
            DISCO BOUNCE
          </button>

        </div>

      </div>

    </div>
  )
}