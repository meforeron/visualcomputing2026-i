import { Canvas } from '@react-three/fiber'
import { OrbitControls, Center } from '@react-three/drei'
import Model from './components/model'

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />

        
        <Center>
          <Model />
        </Center>

        <OrbitControls />
      </Canvas>
    </div>
  )
}

export default App