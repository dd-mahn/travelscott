import React, { memo, useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DotPagination } from "./Pagination";
import { VisibilityVariants } from "src/utils/variants";

// Framer motion variants
const variants = {
  hiddenY: VisibilityVariants.hiddenY,
  visible: VisibilityVariants.visible,
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

type FeaturedContentSliderProps = {
  children: React.ReactNode[];
};

const FeaturedContentSlider: React.FC<FeaturedContentSliderProps> = ({
  children,
}) => {
  const [direction, setDirection] = useState(1);
  const [index, setIndex] = useState(0);
  const childRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleNext = useCallback(() => {
    if (index < children.length - 1) {
      setDirection(1);
      setIndex(index + 1);
    }
  }, [index, children.length]);

  const handlePrev = useCallback(() => {
    if (index > 0) {
      setDirection(-1);
      setIndex(index - 1);
    }
  }, [index]);

  useEffect(() => {
    if (containerRef.current && childRef.current) {
      containerRef.current.style.height = `${childRef.current.offsetHeight}px`;
    }
  }, [index]);

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
            className="absolute left-0 top-0 h-fit w-full"
          >
            {children[index]}
          </motion.div>
        </AnimatePresence>
      </div>
      <motion.div
        initial="hiddenY"
        whileInView="visible"
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-10%" }}
        variants={variants}
        className="flex w-full justify-center"
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
