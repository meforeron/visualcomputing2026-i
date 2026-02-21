import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Grid } from '@react-three/drei'
import './App.css'

function AnimatedObject({ trajectory }) {
  const meshRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.elapsedTime

    // Traslación 
    if (trajectory === 'circular') {
      const radius = 3
      meshRef.current.position.x = Math.cos(t) * radius
      meshRef.current.position.z = Math.sin(t) * radius
      meshRef.current.position.y = 0
    } else {
      // senoidal
      meshRef.current.position.x = (t % 12) - 6
      meshRef.current.position.y = Math.sin(t * 2) * 1.5
      meshRef.current.position.z = 0
    }

    // rotación sobre propio eje 
    meshRef.current.rotation.x += 0.01
    meshRef.current.rotation.y += 0.02

    // escala con función temporal
    const s = 1 + 0.4 * Math.sin(t * 1.5)
    meshRef.current.scale.set(s, s, s)
  })

  return (
    <mesh ref={meshRef} castShadow>
      <icosahedronGeometry args={[0.8, 1]} />
      <meshStandardMaterial
        color="#7c3aed"
        emissive="#3b0764"
        roughness={0.3}
        metalness={0.6}
        wireframe={false}
      />
    </mesh>
  )
}

function OrbitRing({ trajectory }) {
  if (trajectory !== 'circular') return null
  const points = Array.from({ length: 64 }, (_, i) => {
    const a = (i / 64) * Math.PI * 2
    return [Math.cos(a) * 3, 0, Math.sin(a) * 3]
  })
  return (
    <lineLoop>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flat())}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#7c3aed" opacity={0.3} transparent />
    </lineLoop>
  )
}

function Scene({ trajectory }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow />
      <pointLight position={[-4, 3, -4]} intensity={0.8} color="#a78bfa" />

      <AnimatedObject trajectory={trajectory} />

      <OrbitRing trajectory={trajectory} />

      <Grid
        position={[0, -2, 0]}
        args={[20, 20]}
        cellSize={1}
        cellThickness={0.5}
        cellColor="#4c1d95"
        sectionSize={5}
        sectionThickness={1}
        sectionColor="#7c3aed"
        fadeDistance={25}
        fadeStrength={1}
        followCamera={false}
        infiniteGrid
      />

      <axesHelper args={[3]} />

      <OrbitControls makeDefault />
    </>
  )
}

export default function App() {
  const [trajectory, setTrajectory] = useState('circular')

  return (
    <div className="app-wrapper">
      <div className="ui-panel">
        <h2>Transformaciones 3D</h2>

        <div className="info-row">
          <span className="badge translate">Traslación</span>
          <span>{trajectory === 'circular' ? 'Trayectoria circular' : 'Trayectoria senoidal'}</span>
        </div>
        <div className="info-row">
          <span className="badge rotate">Rotación</span>
          <span>Incremento por frame (X + Y)</span>
        </div>
        <div className="info-row">
          <span className="badge scale">Escala</span>
          <span>1 + 0.4 · sin(t · 1.5)</span>
        </div>

        <div className="btn-group">
          <button
            className={trajectory === 'circular' ? 'active' : ''}
            onClick={() => setTrajectory('circular')}
          >
            Circular
          </button>
          <button
            className={trajectory === 'sinusoidal' ? 'active' : ''}
            onClick={() => setTrajectory('sinusoidal')}
          >
            Senoidal
          </button>
        </div>

        <p className="hint">Arrastra para orbitar · Scroll para zoom</p>
      </div>

      <Canvas
        shadows
        camera={{ position: [6, 4, 8], fov: 50 }}
        className="canvas"
      >
        <Scene trajectory={trajectory} />
      </Canvas>
    </div>
  )
}
