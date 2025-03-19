import React, { memo } from "react";
import { motion } from "framer-motion";
import { VisibilityVariants } from "src/utils/constants/variants";
import { getSeason } from "src/utils/getSeason";
import { useViewportWidth } from "src/hooks/useViewportWidth/useViewportWidth";

// Define the props for the SeasonHeading component
type SeasonHeadingProps = {};

// Define the animation variants
const variants = {
  hiddenY: VisibilityVariants.hiddenY,
  hiddenFullY: VisibilityVariants.hiddenFullY,
  visible: VisibilityVariants.visible,
};

const SeasonHeading: React.FC<SeasonHeadingProps> = () => {
  const viewportWidth = useViewportWidth();
  // Get the current season
  const season = getSeason();

  return (
    <motion.div className="big-heading flex h-fit items-center gap-[2svw] overflow-hidden">
      <div className="inline-block h-fit w-fit overflow-hidden border-b-4 border-text-dark">
        {/* Animate each letter of the season */}
        {season.split("").map((letter, index) => (
          <motion.h1
            key={index}
            initial="hiddenFullY"
            whileInView="visible"
            transition={{
              duration: season.split("").length < 10 ? 0.8 : 0.6,
              delay: index * 0.1,
              type: "spring",
              bounce: 0.5,
            }}
            viewport={{ once: true }}
            variants={variants}
            className="inline-block text-text-dark"
            style={{ lineHeight: 0.8 }}
          >
            {letter}
          </motion.h1>
        ))}
      </div>
      {/* Animate the current year */}
      <motion.h1
        initial="hiddenFullY"
        whileInView="visible"
        transition={{ duration: 0.5, delay: 1 }}
        viewport={{ once: true }}
        variants={variants}
        className={`${viewportWidth < 768 ? "text-stroke-bright" : "text-stroke-bright-bold"} inline-block border-b-4 border-transparent text-transparent dark:text-transparent`}
      >
        {new Date().getFullYear()}
      </motion.h1>
    </motion.div>
  );
};

// Export the memoized component to prevent unnecessary re-renders
export default SeasonHeading;
