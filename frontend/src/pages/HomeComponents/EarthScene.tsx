import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, useHelper } from "@react-three/drei";
import { useControls } from "leva";
import * as THREE from "three";

import Earth from "src/../public/Earth"


function Lights() {
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const directionalRef = useRef<THREE.DirectionalLight>(null);
  const pointRef = useRef<THREE.PointLight>(null);
  const spotRef = useRef<THREE.SpotLight>(null);

  useControls("Ambient Light", {
    visible: {
      value: false,
      onChange: (v) => {
        if (ambientRef.current) {
          ambientRef.current.visible = v;
        }
      },
    },
    color: {
      value: "white",
      onChange: (v) => {
        if (ambientRef.current) {
          ambientRef.current.color = new THREE.Color(v);
        }
      },
    },
  });
  useControls("Directional Light", {
    visible: {
      value: true,
      onChange: (v) => {
        if (directionalRef.current) {
          directionalRef.current.visible = v;
        }
      },
    },
    position: {
      value: { x: 10, y: 10, z: 15 },
      onChange: (v) => {
        if (directionalRef.current) {
          directionalRef.current.position.set(v.x, v.y, v.z);
        }
      },
    },
    color: {
      value: "white",
      onChange: (v) => {
        if (directionalRef.current) {
          directionalRef.current.color = new THREE.Color(v);
        }
      },
    },
  });

  useControls("Point Light", {
    visible: {
      value: false,
      onChange: (v) => {
        if (pointRef.current) {
          pointRef.current.visible = v;
        }
      },
    },
    position: {
      value: { x: 2, y: 0, z: 0 },
      onChange: (v) => {
        if (pointRef.current) {
          pointRef.current.position.set(v.x, v.y, v.z);
        }
      },
    },
    color: {
      value: "white",
      onChange: (v) => {
        if (pointRef.current) {
          pointRef.current.color = new THREE.Color(v);
        }
      },
    },
  });

  useControls("Spot Light", {
    visible: {
      value: false,
      onChange: (v) => {
        if (spotRef.current) {
          spotRef.current.visible = v;
        }
      },
    },
    position: {
      value: { x: 3, y: 2.5, z: 1 },
      onChange: (v) => {
        if (spotRef.current) {
          spotRef.current.position.set(v.x, v.y, v.z);
        }
      },
    },
    color: {
      value: "white",
      onChange: (v) => {
        if (spotRef.current) {
          spotRef.current.color = new THREE.Color(v);
        }
      },
    },
  });

  return (
    <>
      <ambientLight ref={ambientRef} />
      <directionalLight ref={directionalRef} />
      <pointLight ref={pointRef} />
      <spotLight ref={spotRef} />
    </>
  );
}

const EarthScene: React.FC = () => {
  return (
    <Canvas shadows={"basic"} camera={{ position: [15, 10, 15] }}>
      <ambientLight color={"orange"} position={[20, 10, 10]} intensity={0.5} />
      <directionalLight
        color={"white"}
        position={[50, 40, 7.5]}
        intensity={5}
        castShadow
      />
      {/* <Lights /> */}
      <Suspense fallback={null}>
        <Earth/>
      </Suspense>
      <OrbitControls enableZoom={false} />
      <Environment preset="lobby" />
    </Canvas>
  );
};

export default EarthScene;
