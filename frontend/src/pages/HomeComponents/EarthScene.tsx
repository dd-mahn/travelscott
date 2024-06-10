import React, { Suspense, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import Earth from "src/../public/Earth";

function EarthModel() {
    const sceneRef = useRef<any>();
  
    useFrame(() => {
      if (sceneRef.current) {
        sceneRef.current.rotation.x += 0.01;
        sceneRef.current.rotation.y += 0.01;
      }
    });
  
    return (
      <Earth ref={sceneRef} />
    );
  }

const EarthScene: React.FC = () => {

  return (
    <>
      <Canvas shadows camera={{ position: [15, 15, 15] }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <Suspense fallback={null}>
          <EarthModel/>
        </Suspense>
        <OrbitControls enableZoom={false} />
        <Environment preset="sunset" />
      </Canvas>
    </>
  );
};

export default EarthScene;
