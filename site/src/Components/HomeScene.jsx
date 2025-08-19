import React, { useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { useSpring, a } from '@react-spring/three'
import { useGesture } from '@use-gesture/react'

function ThrowCube({pos=[0,0,0]}) {
  const { size, viewport } = useThree()
  const aspect = size.width / viewport.width

  // Define simple bounds relative to viewport
  const limitX = viewport.width / 2 - 1   // 1 is half box size
  const limitY = viewport.height / 2 - 1
  const speed = 100;

  // Helper clamp function
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

  const [spring, api] = useSpring(() => ({
    scale: [1, 1, 1],
    position: pos,
    rotation: [0, 0, 0],
    config: { mass: 1, tension: 200, friction: 10 },
  }))

  const bind = useGesture({
    onDrag: ({ offset: [x, y], velocity: [vx, vy], direction: [dx, dy], last }) => {
      if (!last) {
        // While dragging → follow exactly
        api.start({
          position: [
            clamp(x / aspect, -limitX, limitX),
            clamp(-y / aspect, -limitY, limitY),
            0,
          ],
          rotation: [y / aspect, x / aspect, 0]
        })
      } else {
        // On release → fling with velocity but clamp position
        const targetX = clamp((x + vx * dx * speed) / aspect, -limitX, limitX)
        const targetY = clamp((-y + vy * -dy * speed) / aspect, -limitY, limitY)

        api.start({
          position: [targetX, targetY, 0],
          rotation: [y / aspect, x / aspect, 0],
          immediate: false,
          config: { mass: 0.1, tension: 10, friction: 5 },
        })
      }
    },
    onHover: ({ hovering }) =>
      api.start({ scale: hovering ? [1.2, 1.2, 1.2] : [1, 1, 1] })
  })

  // Initial random throw
  useEffect(() => {
    const timeout = setTimeout(() => {
      const throwSpeed = 0.5 * (Math.random() + 1) * 2500;
      const randX = (Math.random() - 0.5) * throwSpeed
      const randY = (Math.random() - 0.5) * throwSpeed
  
      const targetX = clamp(randX / aspect, -limitX, limitX)
      const targetY = clamp(randY / aspect, -limitY, limitY)
  
      api.start({
        position: [targetX, targetY, 0],
        rotation: [randY / aspect, randX / aspect, 0],
        immediate: false, // set to false so it's animated, not instant
        config: { mass: 0.1, tension: 10, friction: 5 },
      })
    }, 10)
  
    return () => clearTimeout(timeout) // cleanup on unmount
  }, [])
  
  return (
    <a.mesh {...spring} {...bind()}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'white'} />
    </a.mesh>
  )
}

export default function HomeScene() {
  return (
    <div className="absolute z-20 w-full h-full">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight
          position={[-10, -10, -10]}
          decay={0}
          intensity={Math.PI}
        />
        <ThrowCube />
      </Canvas>
    </div>
  )
}