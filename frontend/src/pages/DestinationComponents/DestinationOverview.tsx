import React, { memo, useState, useRef, useEffect } from "react";
import Destination from "src/types/Destination";
import { AnimatePresence, motion } from "framer-motion";
import {
  HoverVariants,
  TapVariants,
  VisibilityVariants,
} from "src/utils/variants";
import DestinationMenu from "./DestinationMenu";

const variants = {
  hiddenY: VisibilityVariants.hiddenY,
  hiddenFullY: VisibilityVariants.hiddenFullY,
  visible: VisibilityVariants.visible,
  hoverScale: HoverVariants.hoverScale,
  tapScale: TapVariants.tapScale,
};

const DestinationOverview = ({ destination }: { destination: Destination }) => {
  return (
    <section id="overview" className="overview px-sect py-sect-short">
      <div className="flex justify-between">
        <motion.div className="flex w-1/2 flex-col gap-4">
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
                className="span-small rounded-2xl border-solid border-text-light dark:border-text-dark px-4 lg:border 2xl:border-2"
              >
                {tag}
              </span>
            ))}
          </motion.div>
          <motion.p
            variants={variants}
            initial="hiddenY"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ ease: "easeInOut", duration: 0.5, delay: 0.6 }}
            className="p-regular mt-2 w-3/4"
          >
            {destination.description}
          </motion.p>
        </motion.div>
        <DestinationMenu />
      </div>
    </section>
  );
};

export default memo(DestinationOverview);
