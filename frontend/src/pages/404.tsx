import React from "react";
import { motion } from "framer-motion";
import "src/styles/404.css";
import { NoirButton } from "src/common/Button";
import { AuroraVariants, VisibilityVariants } from "src/utils/variants";

const variants = {
  hidden: VisibilityVariants.hidden,
  hiddenY: VisibilityVariants.hiddenY,
  hiddenFullY: VisibilityVariants.hiddenFullY,
  visible: VisibilityVariants.visible,
  auroraHover: AuroraVariants.auroraHover,
};

const NotFoundPage: React.FC = () => {
  return (
    <main className="not-found relative flex h-screen w-full flex-col items-center justify-center gap-8">
      <motion.div
        whileHover="auroraHover"
        variants={variants}
        className="blur-blob blob-1 bottom-0 left-[30%] h-[30%] w-1/5 opacity-80"
      ></motion.div>
      <motion.div
        whileHover="auroraHover"
        variants={variants}
        className="blur-blob blob-2 right-[30%] top-[10%] h-1/5 w-[30%] opacity-80"
      ></motion.div>
      <div className="big-heading z-20 overflow-hidden">
        <motion.div
          initial="hiddenFullY"
          animate="visible"
          variants={variants}
          transition={{ duration: 1, type: "spring", bounce: 0.5 }}
          className="pointer-events-none inline-block text-text-light dark:text-text-dark"
        >
          4
        </motion.div>
        <motion.div
          initial="hiddenFullY"
          animate="visible"
          variants={variants}
          transition={{ duration: 1, type: "spring", bounce: 0.5, delay: 0.2 }}
          className="pointer-events-none inline-block text-text-light dark:text-text-dark"
        >
          0
        </motion.div>
        <motion.div
          initial="hiddenFullY"
          animate="visible"
          variants={variants}
          transition={{ duration: 1, type: "spring", bounce: 0.5, delay: 0.4 }}
          className="pointer-events-none inline-block text-text-light dark:text-text-dark"
        >
          4
        </motion.div>
      </div>
      <motion.p
        initial="hiddenY"
        animate="visible"
        variants={variants}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="p-medium z-20 text-center"
      >
        The page you are looking for might have been removed <br /> had its name
        changed or is temporarily unavailable.
      </motion.p>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ duration: 0.4, delay: 0.8 }}
        className="z-20"
      >
        <NoirButton text="Back to home" link="/" />
      </motion.div>
    </main>
  );
};

export default NotFoundPage;
