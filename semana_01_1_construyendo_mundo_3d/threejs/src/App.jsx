import * as THREE from 'three'
import { Canvas, useLoader } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

function Cono() {
  const obj = useLoader(OBJLoader, '/1.obj')

  return (
    <group scale={0.5}>
      {obj.children.map((child, i) => {
        if (!child.isMesh) return null

        
        const edges = new THREE.EdgesGeometry(child.geometry)

        return (
          <group key={i}>
            {/* Caras */}
            <mesh geometry={child.geometry}>
              <meshStandardMaterial color="orange" />
            </mesh>

            {/* Aristas */}
            <lineSegments geometry={edges}>
              <lineBasicMaterial color="black" linewidth={2} />
            </lineSegments>

            {/* Vértices */}
            <points geometry={child.geometry}>
              <pointsMaterial size={0.09} color="red" />
            </points>
          </group>
        )
      })}
    </group>
  )
}


export default function App() {
  return (
    <Canvas camera={{ position: [3, 3, 3] }}>
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} />
      <Cono />
      <OrbitControls />
    </Canvas>
  )
}
