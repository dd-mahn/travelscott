import React from "react";
import { motion } from "framer-motion";
import { VisibilityVariants } from "src/utils/constants/variants";
import SeasonHeading from "src/common/SeasonHeading/SeasonHeading";
import { getInspirationHeading } from "src/utils/inspirationUtils";

// Define animation variants for the motion component
const variants = {
  hidden: VisibilityVariants.hidden,
  hiddenFullY: VisibilityVariants.hiddenFullY,
  visible: VisibilityVariants.visible,
};

// InspirationHeading component to display the heading based on the current category
const InspirationHeading: React.FC<{ currentCategory: string }> = ({ currentCategory }) => {
  // Determine the heading content based on the current category
  const headingContent = currentCategory === "All" ? (
    <SeasonHeading />
  ) : (
    <div className="overflow-hidden">
      <motion.h1
        initial="hiddenFullY"
        animate="visible"
        variants={variants}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="big-heading text-text-dark"
      >
        {getInspirationHeading(currentCategory)}
      </motion.h1>
    </div>
  );

  return (
    <div className="z-20 h-fit overflow-hidden pt-28 lg:pt-10 2xl:pt-20">
      {headingContent}
    </div>
  );
};

export default InspirationHeading;
