import React, { Ref, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GroupProps, useFrame } from "@react-three/fiber";
import {motion, useScroll} from "framer-motion";

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
  const { nodes, materials } = useMemo(() => useGLTF("/earth.gltf"), []) as unknown as GLTFResult;
  const [rotationSpeed, setRotationSpeed] = useState(0.001);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);

  // Create a ref for the Earth mesh
  const globeRef = useRef<THREE.Mesh>();
  const landRef = useRef<THREE.Mesh>();

  // Rotate the Earth mesh 
  useFrame(() => {
    if (globeRef.current && landRef.current) {
      globeRef.current.rotation.y += rotationSpeed;
      landRef.current.rotation.y += rotationSpeed;
    }
  });

  // Add some materials to the Earth mesh
  useEffect(() => {
    if (materials.blinn1 instanceof THREE.MeshStandardMaterial) {
      materials.blinn1.metalness = 0.6;
      materials.blinn1.roughness = 0.5;
    }
    if (materials.lambert1 instanceof THREE.MeshStandardMaterial) {
      materials.lambert1.metalness = 0.6;
      materials.lambert1.roughness = 0.5;
    }
  }, [materials]);

  // Update rotation speed based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newSpeed = 0.004; // Adjust the multiplier as needed
      setRotationSpeed(newSpeed);

      // Clear the previous timeout if it exists
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      // Set a timeout to reset the speed after scrolling stops
      const timeout = setTimeout(() => {
        setRotationSpeed(0.001);
      }, 200); // Adjust the delay as needed
      setScrollTimeout(timeout);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [scrollTimeout]);

  return (
    
    <group {...props} dispose={null} receiveShadow>
      
      <mesh
        ref={globeRef as MeshRef}
        geometry={nodes.earth4_blinn1_0.geometry}
        material={materials.blinn1}
        scale={1}
      />
      <mesh
        ref={landRef as MeshRef}
        geometry={nodes.earth4_lambert1_0.geometry}
        material={materials.lambert1}
        scale={1}
      />
    </group>
  );
}

useGLTF.preload("/earth.gltf");
