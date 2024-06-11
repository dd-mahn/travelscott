import React, { Ref, useEffect, useRef } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GroupProps, useFrame } from "@react-three/fiber";

interface GLTFResult {
  nodes: {
    earth4_blinn1_0: THREE.Mesh;
    earth4_lambert1_0: THREE.Mesh;
  };
  materials: {
    blinn1: THREE.MeshBasicMaterial;
    lambert1: THREE.MeshBasicMaterial;
  };
}

type MeshType = THREE.Mesh<
  THREE.BufferGeometry<THREE.NormalBufferAttributes>,
  THREE.Material | THREE.Material[],
  THREE.Object3DEventMap
>;

type MeshRef = React.Ref<MeshType>;

export default function Model(props: GroupProps) {
  const { nodes, materials } = useGLTF("/earth.gltf") as unknown as GLTFResult;

  // Create a ref for the Earth mesh
  const globeRef = useRef<THREE.Mesh>();
  const landRef = useRef<THREE.Mesh>();

  // Rotate the Earth mesh
  useFrame(() => {
    if (globeRef.current && landRef.current) {
      globeRef.current.rotation.y += 0.002;
      landRef.current.rotation.y += 0.002;
    }
  });

  useEffect(() => {
    // Assuming 'blinn1' and 'lambert1' can be treated as MeshStandardMaterial
    if (materials.blinn1 instanceof THREE.MeshStandardMaterial) {
      materials.blinn1.metalness = 0.5;
      materials.blinn1.roughness = 0.8;
    }
    if (materials.lambert1 instanceof THREE.MeshStandardMaterial) {
      materials.lambert1.metalness = 0.5;
      materials.lambert1.roughness = 0.8;
    }
  }, [materials]);

  return (
    <group {...props} dispose={null} receiveShadow>
      <mesh
        castShadow
        // receiveShadow
        ref={globeRef as MeshRef}
        geometry={nodes.earth4_blinn1_0.geometry}
        material={materials.blinn1}
        scale={1}
      />
      <mesh
        castShadow
        // receiveShadow
        ref={landRef as MeshRef}
        geometry={nodes.earth4_lambert1_0.geometry}
        material={materials.lambert1}
        scale={1}
      />
    </group>
  );
}

useGLTF.preload("/earth.gltf");
