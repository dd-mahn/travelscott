import React, { useRef } from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { Mesh } from 'three'
import { GroupProps } from '@react-three/fiber'

interface GLTFResult {
  nodes: {
    earth4_blinn1_0: Mesh
    earth4_lambert1_0: Mesh
  }
  materials: {
    blinn1: THREE.Material
    lambert1: THREE.Material
  }
}

export default function Model(props: GroupProps) {
  const { nodes, materials } = useGLTF('/earth.gltf') as unknown as GLTFResult

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.earth4_blinn1_0.geometry} material={materials.blinn1} scale={1} />
      <mesh geometry={nodes.earth4_lambert1_0.geometry} material={materials.lambert1} scale={1} />
    </group>
  )
}

useGLTF.preload('/earth.gltf')
