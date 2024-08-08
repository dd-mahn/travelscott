import React, {
  memo,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
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
import { motion } from "framer-motion";
import { LeftCountryCarousel, RightCountryCarousel } from "./CountryCarousel";

type SceneProps = {
  articlesHookRef: React.RefObject<HTMLSpanElement>;
};

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
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
    if (!articlesHookInView) return;

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

  // Memoize the carousels to prevent re-rendering
  const memoizedCarousels = useMemo(
    () => (
      <>
        <RightCountryCarousel />
        <LeftCountryCarousel />
        <RightCountryCarousel />
      </>
    ),
    [],
  );

  return (
    <div className="relative">
      {!isHookAboveViewport && (
        <AnimatePresence>
          <motion.div
            initial="hidden"
            whileInView="visible"
            exit="hidden"
            transition={{ duration: 0.5 }}
            variants={variants}
            className="absolute left-[10%] top-1/3 flex flex-col gap-20"
          >
            {memoizedCarousels}
          </motion.div>
        </AnimatePresence>
      )}

      <Canvas
        ref={canvasRef}
        frameloop={frameLoopValue}
        className="lg:pb-60 lg:pt-sect-short 2xl:pb-sect-default 2xl:pt-sect-short"
        shadows
        camera={{ position: [15, 10, 15] }}
        dpr={[1, 2]}
      >
        <ambientLight color={"white"} position={[20, 10, 10]} intensity={2} />
        <directionalLight
          color={"white"}
          position={[-20, 20, 20]}
          intensity={10}
          castShadow
        />
        <Suspense fallback={null}>
          <Earth />
        </Suspense>

        <Suspense fallback={null}>
          <EffectComposer>
            <Bloom
              luminanceThreshold={2}
              luminanceSmoothing={1}
              mipmapBlur
              intensity={2}
            />
            {/* <Vignette eskil={false} offset={0.5} darkness={1} /> */}
            {/* <ToneMapping
                blendFunction={BlendFunction.NORMAL}
                adaptive={true}
                resolution={256}
                middleGrey={0.6}
                maxLuminance={16.0}
                averageLuminance={1.0}
                adaptationRate={1.0}
              /> */}
          </EffectComposer>
        </Suspense>
        <OrbitControls enableZoom={false} />
        {/* <Environment preset="lobby" /> */}
      </Canvas>
    </div>
  );
};

export default memo(EarthScene);
