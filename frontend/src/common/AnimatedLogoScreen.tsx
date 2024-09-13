import React, { memo } from "react";
import { motion } from "framer-motion";
import StaggerLogo from "src/common/StaggerLogo";

const AnimatedLogoScreen: React.FC = () => {
  return (
    <motion.div className="grid h-screen w-screen place-items-center bg-background-light">
      <motion.div
        transition={{
          layout: {
            duration: 1.5,
          },
        }}
        className="w-screen select-none overflow-hidden text-center font-logo text-text-light lg:mr-16 lg:pr-12 lg:text-8xl xl:text-13xl 2xl:pr-20 2xl:text-14xl 3xl:text-15xl"
      >
        <StaggerLogo />
      </motion.div>
    </motion.div>
  );
};

export default memo(AnimatedLogoScreen);
