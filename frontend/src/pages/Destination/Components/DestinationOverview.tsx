import React, { memo } from "react";
import Destination from "src/types/Destination";
import { AnimatePresence, motion } from "framer-motion";
import {
  HoverVariants,
  TapVariants,
  VisibilityVariants,
} from "src/utils/constants/variants";
import DestinationMenu from "./DestinationMenu";

// Define animation variants
const variants = {
  hiddenY: VisibilityVariants.hiddenY,
  hiddenFullY: VisibilityVariants.hiddenFullY,
  visible: VisibilityVariants.visible,
  hoverScale: HoverVariants.hoverScale,
  tapScale: TapVariants.tapScale,
};

// Define the DestinationOverview component
const DestinationOverview = ({ destination }: { destination: Destination }) => {
  return (
    <section id="overview" className="overview px-sect md:py-sect-short">
      <div className="flex flex-col gap-8">
        <motion.div className="flex justify-between">
          <div className="flex flex-col gap-2">
            {/* Location heading */}
            <motion.h2
              variants={variants}
              initial="hiddenY"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ ease: "easeInOut", duration: 0.5 }}
              className="h2-md"
            >
              {destination.location}
            </motion.h2>
            {/* Tags */}
            <motion.div
              variants={variants}
              initial="hiddenY"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ ease: "easeInOut", duration: 0.5, delay: 0.3 }}
              className="flex flex-row items-start justify-start gap-2"
            >
              {destination.tags.map((tag) => (
                <span
                  key={tag}
                  className="span-small rounded-2xl border border-solid border-text-light px-4 dark:border-text-dark lg:border 2xl:border-2"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
          {/* Destination menu */}
          <DestinationMenu />
        </motion.div>
        {/* Description */}
        <motion.div className="flex md:w-3/4 lg:w-1/2 flex-col gap-4">
          <motion.p
            variants={variants}
            initial="hiddenY"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ ease: "easeInOut", duration: 0.5, delay: 0.6 }}
            className="p-regular mt-2 md:w-3/4"
          >
            {destination.description}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

// Export the memoized component
export default memo(DestinationOverview);
