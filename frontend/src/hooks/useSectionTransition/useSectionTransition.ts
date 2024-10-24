import { useRef, useCallback } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

// Define types for edge and progress intersection
type Edge = "start" | "end" | "center";
type ProgressIntersection = `${number}%`;

// Hook to handle section transition with scale and opacity transformations
export const useSectionTransition = (
  offset?: string[],
  scaleValues?: number[],
  opacityValues?: number[],
) => {
  const ref = useRef<HTMLDivElement>(null);

  // Define default offset values if not provided
  const defaultOffset: (Edge | `${number} ${number}` | `${number} start` | `${number} end` | `${number} center` | `${number} ${number}px` | `${number} ${number}vw` | `${number} ${number}vh` | `${number} ${number}%` | `start ${number}` | "start start" | "start end" | "start center" | ProgressIntersection)[] = ["start end", "start center"];

  // Get scroll progress based on the target ref and offset
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: (offset as typeof defaultOffset) || defaultOffset,
  });

  // Transform the scroll progress to scale and opacity values
  const scale = useTransform(scrollYProgress, [0, 1], scaleValues || [1, 0.7]);
  const opacity = useTransform(scrollYProgress, [0, 1], opacityValues || [1, 0]);

  return { ref, scale, opacity };
};

// Hook to handle section transition with only scale transformation
export const useSectionTransition2 = (
  offset?: string[],
  scaleValues?: number[],
) => {
  const ref = useRef<HTMLDivElement>(null);

  // Define default offset values if not provided
  const defaultOffset: (Edge | `${number} ${number}` | `${number} start` | `${number} end` | `${number} center` | `${number} ${number}px` | `${number} ${number}vw` | `${number} ${number}vh` | `${number} ${number}%` | `start ${number}` | "start start" | "start end" | "start center" | ProgressIntersection)[] = ["start end", "start center"];

  // Get scroll progress based on the target ref and offset
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: (offset as typeof defaultOffset) || defaultOffset,
  });

  // Transform the scroll progress to scale values
  const scale = useTransform(scrollYProgress, [0, 1], scaleValues || [1, 0.95]);

  return { ref, scale };
};
