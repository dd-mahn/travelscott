import React, { memo, useCallback, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  VisibilityVariants,
  HoverVariants,
  TapVariants,
} from "src/utils/constants/variants";

// Define animation variants
const variants = {
  hiddenY: VisibilityVariants.hiddenY,
  visible: VisibilityVariants.visible,
  hoverScale: HoverVariants.hoverScale,
  tapScale: TapVariants.tapScale,
};

// Define the props for the FilterButton component
type FilterButtonProps = {
  children: React.ReactNode;
  onFilterBoardClose?: () => void;
};

const FilterButton: React.FC<FilterButtonProps> = ({
  children,
  onFilterBoardClose,
}) => {
  const [isFilterBoardOpen, setIsFilterBoardOpen] = useState<boolean>(false);
  const filterBoardRef = useRef<HTMLDivElement>(null);

  // Toggle the filter board visibility
  const toggleFilterBoard = useCallback(() => {
    setIsFilterBoardOpen((prev) => !prev);
  }, []);

  // Handle clicks outside the filter board to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterBoardRef.current &&
        !filterBoardRef.current.contains(event.target as Node)
      ) {
        setIsFilterBoardOpen(false);
        if (onFilterBoardClose) {
          onFilterBoardClose();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onFilterBoardClose]);

  return (
    <motion.div
      initial="hiddenY"
      whileInView="visible"
      variants={variants}
      transition={{ duration: 0.5, delay: 1 }}
      viewport={{ once: true }}
      className="relative"
    >
      <motion.button
        whileHover="hoverScale"
        transition={{ duration: 0.3 }}
        variants={variants}
        whileTap="tapScale"
        title="filter"
        className="h-10 w-10 rounded-full bg-background-dark shadow-component dark:bg-background-dark-transparent dark:shadow-component-dark md:h-12 md:w-12 lg:h-12 lg:w-12 xl:h-12 xl:w-12 2xl:h-16 2xl:w-16 3xl:h-16 3xl:w-16"
        onClick={toggleFilterBoard}
      >
        <i
          className={`ri-filter-3-line p-large pointer-events-none m-auto select-none text-text-dark transition-all ${isFilterBoardOpen ? "rotate-180" : ""}`}
        ></i>
      </motion.button>
      <AnimatePresence mode="wait">
        {isFilterBoardOpen && <div ref={filterBoardRef}>{children}</div>}
      </AnimatePresence>
    </motion.div>
  );
};

export default FilterButton;
