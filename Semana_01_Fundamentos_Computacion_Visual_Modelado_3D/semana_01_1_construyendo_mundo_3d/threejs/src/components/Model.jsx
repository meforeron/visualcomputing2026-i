import { useLoader } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'


import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function Model() {
  const object = useLoader(OBJLoader, '/model.obj')
  const groupRef = useRef()

  useEffect(() => {
    if (object && groupRef.current) {
      object.traverse(child => {
        if (child.isMesh) {
          // aristas
          const edges = new THREE.EdgesGeometry(child.geometry)
          const line = new THREE.LineSegments(
            edges,
            new THREE.LineBasicMaterial({ color: 'orange' })
          )
          child.add(line)

          // vértices
          const vertices = child.geometry.attributes.position
          const vertexGeometry = new THREE.BufferGeometry()
          vertexGeometry.setAttribute('position', new THREE.BufferAttribute(vertices.array, 3))
          const points = new THREE.Points(
            vertexGeometry,
            new THREE.PointsMaterial({ color: 'red', size: 0.1 })
          )
          child.add(points)

          // caras
          child.material = new THREE.MeshBasicMaterial({ color: 'blue', wireframe: true, transparent: true, opacity: 0.3 })
        }
      })
    }
  }, [object])

  return <group ref={groupRef}><primitive object={object} /></group>
}

export default Model
