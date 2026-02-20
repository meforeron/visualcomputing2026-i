import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useControls } from 'leva'
import './App.css'

function HierarchicalScene() {
  // Father (Level 1) controls
  const { 
    fatherRotationX, 
    fatherRotationY, 
    fatherRotationZ,
    fatherPositionX,
    fatherPositionY,
    fatherPositionZ
  } = useControls('Father Controls', {
    fatherRotationX: { value: 0, min: 0, max: Math.PI * 2, step: 0.1 },
    fatherRotationY: { value: 0, min: 0, max: Math.PI * 2, step: 0.1 },
    fatherRotationZ: { value: 0, min: 0, max: Math.PI * 2, step: 0.1 },
    fatherPositionX: { value: 0, min: -5, max: 5, step: 0.1 },
    fatherPositionY: { value: 0, min: -5, max: 5, step: 0.1 },
    fatherPositionZ: { value: 0, min: -5, max: 5, step: 0.1 }
  })

  // Son (Level 2) controls
  const {
    sonRotationY,
    sonPositionX
  } = useControls('Son Controls', {
    sonRotationY: { value: 0, min: 0, max: Math.PI * 2, step: 0.1 },
    sonPositionX: { value: 2, min: -3, max: 3, step: 0.1 }
  })

  return (
    <>
      {/* Father Group - Level 1 */}
      <group 
        position={[fatherPositionX, fatherPositionY, fatherPositionZ]}
        rotation={[fatherRotationX, fatherRotationY, fatherRotationZ]}
      >
        {/* Father Object - Blue Cylinder */}
        <mesh>
          <cylinderGeometry args={[1, 1, 3]} />
          <meshStandardMaterial color="blue" />
        </mesh>

        {/* Son Group - Level 2 */}
        <group 
          position={[sonPositionX, 0, 0]}
          rotation={[0, sonRotationY, 0]}
        >
          {/* Son Object - Red Cube */}
          <mesh>
            <boxGeometry args={[1.5, 1.5, 1.5]} />
            <meshStandardMaterial color="red" />
          </mesh>

          {/* Grandson Object - Level 3 - Yellow Sphere */}
          <mesh 
            position={[1.5, 1.5, 0]}
          >
            <sphereGeometry args={[0.5]} />
            <meshStandardMaterial color="yellow" />
          </mesh>
        </group>
      </group>
    </>
  )
}

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [8, 8, 8] }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        <HierarchicalScene />
        
        <OrbitControls />
      </Canvas>
    </div>
  )
}

export default App