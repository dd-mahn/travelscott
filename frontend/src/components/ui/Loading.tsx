import React, { memo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import StaggerLogo from "./staggerLogo";

const variants = {
  hidden: { opacity: 0, y: 50 },
  hiddenY: (y: string) => {
    return {
      y: y,
    };
  },
  visible: { opacity: 1, y: 0 },
};

const Loading: React.FC = () => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="WaitScreen"
        initial="visible"
        animate="visible"
        exit={{ y: -1000 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="grid h-screen w-screen place-items-center bg-background-light"
      >
        <div className="w-screen select-none overflow-hidden text-center font-logo text-text-light lg:mr-16 lg:pr-12 lg:text-8xl xl:text-13xl 2xl:pr-20 2xl:text-14xl 3xl:text-15xl">
          <StaggerLogo />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default memo(Loading);
