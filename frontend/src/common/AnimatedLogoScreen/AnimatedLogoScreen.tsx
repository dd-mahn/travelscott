import React, { memo } from "react";
import { motion } from "framer-motion";
import StaggerLogo from "src/common/StaggerLogo/StaggerLogo";

const AnimatedLogoScreen: React.FC = () => {
  return (
    <motion.div data-testid="animated-logo-container" className="grid h-screen w-screen place-items-center bg-background-light dark:bg-background-dark">
      <motion.div
        data-testid="animated-logo-text"
        className="pointer-events-none w-screen overflow-hidden text-center font-logo leading-[1] lg:mr-16 lg:pr-12 lg:text-12xl xl:text-13xl 2xl:pr-20 2xl:text-14xl 3xl:text-15xl"
      >
        <StaggerLogo />
      </motion.div>
    </motion.div>
  );
};

export default memo(AnimatedLogoScreen);
