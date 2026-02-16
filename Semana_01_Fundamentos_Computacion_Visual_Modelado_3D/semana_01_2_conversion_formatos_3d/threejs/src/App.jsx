import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useState } from 'react'
import Model from './Model'

export default function App() {
  const [format, setFormat] = useState('obj')
  const [modelInfo, setModelInfo] = useState({ vertices: 0, faces: 0 })

  const buttonStyle = {
    margin: '5px',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    background: '#4CAF50',
    color: 'white',
    cursor: 'pointer',
    fontWeight: 'bold'
  }

  const activeButtonStyle = {
    ...buttonStyle,
    background: '#45a049'
  }

  return (
    <>
      <div style={{ 
        position: 'absolute', 
        top: 20, 
        left: 20, 
        zIndex: 1,
        background: 'rgba(0,0,0,0.8)',
        padding: '15px',
        borderRadius: '10px',
        color: 'white'
      }}>
        <h3>Formatos 3D</h3>
        <div style={{ margin: '10px 0' }}>
          <button 
            style={format === 'obj' ? activeButtonStyle : buttonStyle}
            onClick={() => setFormat('obj')}
          >
            OBJ
          </button>
          <button 
            style={format === 'stl' ? activeButtonStyle : buttonStyle}
            onClick={() => setFormat('stl')}
          >
            STL
          </button>
          <button 
            style={format === 'gltf' ? activeButtonStyle : buttonStyle}
            onClick={() => setFormat('gltf')}
          >
            GLTF
          </button>
        </div>
        
        {/* info */}
        <div style={{ 
          background: 'rgba(255,255,255,0.1)', 
          padding: '10px', 
          borderRadius: '5px',
          fontSize: '14px'
        }}>
          <p><strong>Formato:</strong> {format.toUpperCase()}</p>
          <p><strong>Vértices:</strong> {modelInfo.vertices}</p>
          <p><strong>Caras:</strong> {modelInfo.faces}</p>
        </div>
      </div>

      <Canvas 
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ 
          width: '100vw', 
          height: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} />

        <Model format={format} onModelLoad={setModelInfo} />

        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
        />
      </Canvas>
    </>
  )
}