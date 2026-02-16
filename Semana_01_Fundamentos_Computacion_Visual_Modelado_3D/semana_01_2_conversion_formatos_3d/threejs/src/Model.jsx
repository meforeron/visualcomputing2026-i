import { useLoader } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useEffect } from 'react'

export default function Model({ format, onModelLoad }) {

  const countVerticesAndFaces = (object) => {
    let vertices = 0
    let faces = 0
    
    object.traverse((child) => {
      if (child.geometry) {
        const geo = child.geometry
        
        // Contar vértices
        if (geo.attributes.position) {
          vertices += geo.attributes.position.count
        }
        
        // Contar caras
        if (geo.index) {
          faces += geo.index.count / 3
        } else if (geo.attributes.position) {
          faces += geo.attributes.position.count / 3
        }
      }
    })
    
    return { vertices, faces: Math.floor(faces) }
  }

  if (format === 'obj') {
    const obj = useLoader(OBJLoader, '/model.obj')
    
    useEffect(() => {
      if (obj) {
        const clonedObj = obj.clone()
        const info = countVerticesAndFaces(clonedObj)
        onModelLoad?.(info)
      }
    }, [obj, onModelLoad])

    const sceneObj = obj.clone()
    sceneObj.position.set(0, 0, 0)
    sceneObj.scale.set(1, 1, 1)
    
    return <primitive object={sceneObj} />
  }

  if (format === 'stl') {
    const geometry = useLoader(STLLoader, '/model.stl')
    
    useEffect(() => {
      const vertices = geometry.attributes.position?.count || 0
      const faces = geometry.index ? geometry.index.count / 3 : vertices / 3
      onModelLoad?.({ vertices, faces: Math.floor(faces) })
    }, [geometry, onModelLoad])

    return (
      <mesh scale={1}>
        <primitive object={geometry} />
        <meshStandardMaterial color="orange" />
      </mesh>
    )
  }

  if (format === 'gltf') {
    const gltf = useLoader(GLTFLoader, '/model.gltf')
    
    useEffect(() => {
      const info = countVerticesAndFaces(gltf.scene)
      onModelLoad?.(info)
    }, [gltf, onModelLoad])

    const scene = gltf.scene.clone()
    scene.scale.set(1, 1, 1)
    scene.position.set(0, 0, 0)
    return <primitive object={scene} />
  }

  return null
}