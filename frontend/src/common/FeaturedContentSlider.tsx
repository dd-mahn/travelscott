import React, { memo, useCallback, useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { DotPagination } from "./Pagination";
import { VisibilityVariants } from "src/utils/constants/variants";

// Framer motion variants
const variants = {
  hiddenY: VisibilityVariants.hiddenY,
  visible: VisibilityVariants.visible,
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

type FeaturedContentSliderProps = {
  children: React.ReactNode[];
};

const FeaturedContentSlider: React.FC<FeaturedContentSliderProps> = ({
  children,
}) => {
  const [direction, setDirection] = useState(1);
  const [index, setIndex] = useState(0);
  const childRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(childRef, { once: true });

  // Handle next slide
  const handleNext = useCallback(() => {
    if (index < children.length - 1) {
      setDirection(1);
      setIndex(index + 1);
    }
  }, [index, children.length]);

  // Handle previous slide
  const handlePrev = useCallback(() => {
    if (index > 0) {
      setDirection(-1);
      setIndex(index - 1);
    }
  }, [index]);

  // Update container height based on child content
  const updateHeight = useCallback(() => {
    if (containerRef.current && childRef.current) {
      containerRef.current.style.height = `${childRef.current.scrollHeight}px`;
    }
  }, []);

  // Update height on initial mount and on window resize/zoom
  useEffect(() => {
    updateHeight();

    const handleResize = () => {
      updateHeight();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("zoom", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("zoom", handleResize);
    };
  }, [index, updateHeight]);

  // Update height when children or index changes
  useEffect(() => {
    updateHeight();
  }, [children, index, updateHeight]);

  // Update height when the component is in view
  useEffect(() => {
    if (inView) {
      updateHeight();
    }
  }, [inView, updateHeight]);

  return (
    <>
      <div ref={containerRef} className="relative w-full overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            ref={childRef}
            key={index}
            custom={direction}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            variants={variants}
            className="absolute left-0 top-0 z-10 w-full pb-5"
          >
            {children[index]}
          </motion.div>
        </AnimatePresence>
      </div>
      <motion.div
        initial="hiddenY"
        whileInView="visible"
        transition={{ duration: 0.5, delay: 0.5 }}
        viewport={{ once: true }}
        variants={variants}
        className="mt-2 flex w-full justify-center md:mt-8"
      >
        <DotPagination
          count={children.length}
          index={index}
          handleNextClick={handleNext}
          handlePreviousClick={handlePrev}
        />
      </motion.div>
    </>
  );
};

export default memo(FeaturedContentSlider);
