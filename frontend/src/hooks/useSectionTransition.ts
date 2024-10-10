import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

type Edge = "start" | "end" | "center";
type ProgressIntersection = `${number}%`;
  
export const useSectionTransition = (offset?: string[], scaleValues?: number[], opacityValues?: number[]) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ 
    target: ref,
    offset: offset as (Edge | `${number} ${number}` | `${number} start` | `${number} end` | `${number} center` | `${number} ${number}px` | `${number} ${number}vw` | `${number} ${number}vh` | `${number} ${number}%` | `start ${number}` | "start start" | "start end" | "start center" | ProgressIntersection)[]
      || ["start end", "start center"]
  });

  // Transform the scroll progress to scale and opacity values
  const scale = useTransform(scrollYProgress, [0, 1], scaleValues || [1, 0.7]);
  const opacity = useTransform(scrollYProgress, [0, 1], opacityValues || [1, 0]);

  return { ref, scale, opacity };
};

export const useSectionTransition2 = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref,
    offset: ["start end", "start center"]
   });

  // Transform the scroll progress to scale and opacity values
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  return { ref, scale };
};
