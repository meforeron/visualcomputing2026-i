import { Canvas, useLoader } from '@react-three/fiber'
import { OrbitControls, Edges } from '@react-three/drei'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

function Model() {
  const object = useLoader(OBJLoader, '/model.obj')
  const points = []

  object.traverse((child) => {
    if (child.isMesh) {
      child.material.color.set('orange')

      // vertices
      points.push(
        <points key={child.uuid + '-points'} geometry={child.geometry}>
          <pointsMaterial
            color="black"
            size={7}
            sizeAttenuation={false}
          />
        </points>
      )

      // edges
      points.push(
        <Edges key={child.uuid + '-edges'} geometry={child.geometry} color="black" />
      )
    }
  })

  return (
    <>
      <primitive object={object} scale={1} />
      {points}
    </>
  )
}

export default function App() {
  return (
    <Canvas
      style={{ width: '100vw', height: '100vh' }}
      camera={{ position: [10, 5, 5], fov: 50 }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} />

      <Model />
      <OrbitControls />
    </Canvas>
  )
}
