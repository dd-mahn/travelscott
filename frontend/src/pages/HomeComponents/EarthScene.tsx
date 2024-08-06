import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, useHelper } from "@react-three/drei";
import * as THREE from "three";
import Earth from "src/../public/Earth";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Scanline,
  ToneMapping,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useInView, AnimatePresence } from "framer-motion";
import { motion, MotionCanvas } from "framer-motion-3d";
import { LeftCountryCarousel, RightCountryCarousel } from "./CountryCarousel";

type SceneProps = {
  articlesHookRef: React.RefObject<HTMLSpanElement>;
};

const EarthScene: React.FC<SceneProps> = ({ articlesHookRef }) => {
  // Handle when to trigger the scene
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasInView = useInView(canvasRef, {
    margin: "0% 0% -10% 0%",
  });
  const articlesHookInView = useInView(articlesHookRef, {
    margin: "0% 0% -50% 0%",
  });

  const [frameLoopValue, setFrameLoopValue] = useState<"always" | "demand">(
    "demand",
  );
  const [isHookAboveViewport, setIsHookAboveViewport] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHookAboveViewport(entry.boundingClientRect.top < 0);
      },
      { threshold: [0] },
    );

    if (articlesHookRef.current) {
      observer.observe(articlesHookRef.current);
    }

    return () => {
      if (articlesHookRef.current) {
        observer.unobserve(articlesHookRef.current);
      }
    };
  }, [articlesHookRef]);

  useEffect(() => {
    if (canvasInView && !articlesHookInView && !isHookAboveViewport) {
      setFrameLoopValue("always");
    } else if (articlesHookInView || isHookAboveViewport || !canvasInView) {
      setFrameLoopValue("demand");
    }
  }, [canvasInView, articlesHookInView]);

  return (
    <motion.div className="relative">
      <div className="absolute left-[10%] top-1/3 flex flex-col gap-20">
        <RightCountryCarousel />
        <LeftCountryCarousel />
        <RightCountryCarousel />
      </div>
      <Canvas
        ref={canvasRef}
        frameloop={frameLoopValue}
        className="lg:pb-60 lg:pt-sect-short 2xl:pb-sect-default 2xl:pt-sect-short"
        shadows
        camera={{ position: [15, 10, 15] }}
        dpr={[1, 1.5]}
      >
        <ambientLight color={"white"} position={[20, 10, 10]} intensity={0.3} />
        <directionalLight
          color={"white"}
          position={[-20, 20, 20]}
          intensity={10}
          castShadow
        />

        <Suspense fallback={null}>
          <Earth />
        </Suspense>
        {/* <Suspense fallback={null}>
            <EffectComposer>
              <Bloom
                luminanceThreshold={2}
                luminanceSmoothing={1}
                mipmapBlur
                intensity={2}
              />
              <Vignette eskil={false} offset={0.5} darkness={1} />
              <ToneMapping
                blendFunction={BlendFunction.NORMAL}
                adaptive={true}
                resolution={256}
                middleGrey={0.6}
                maxLuminance={16.0}
                averageLuminance={1.0}
                adaptationRate={1.0}
              />
            </EffectComposer>
          </Suspense> */}
        <OrbitControls enableZoom={false} />
        <Environment preset="lobby" />
      </Canvas>
    </motion.div>
  );
};

export default EarthScene;
