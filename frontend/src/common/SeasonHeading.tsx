import React, { memo, useCallback } from "react";
import { motion } from "framer-motion";
import { VisibilityVariants } from "src/utils/variants";
import { getSeason } from "src/utils/getSeason";

type SeasonHeadingProps = {};

const variants = {
  hiddenY: VisibilityVariants.hiddenY,
  hiddenFullY: VisibilityVariants.hiddenFullY,
  visible: VisibilityVariants.visible,
};

const SeasonHeading: React.FC<SeasonHeadingProps> = () => {
  const season = getSeason();
  return (
    <motion.div className="big-heading flex h-fit items-center gap-[2svw] overflow-hidden">
      <div className="inline-block h-fit w-fit overflow-hidden border-b-4 border-text-dark ">
        {season.split("").map((letter, index) => (
          <motion.h1
            key={index}
            initial="hiddenFullY"
            whileInView="visible"
            transition={{
              duration: 1,
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
      <motion.h1
        initial="hiddenFullY"
        whileInView="visible"
        transition={{ duration: 0.5, delay: 1 }}
        viewport={{ once: true }}
        variants={variants}
        className="text-stroke-light-bold inline-block border-b-4 border-transparent text-transparent dark:text-transparent"
      >
        {new Date().getFullYear()}
      </motion.h1>
    </motion.div>
  );
};

export default memo(SeasonHeading);
