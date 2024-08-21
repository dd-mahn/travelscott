import React from "react";
import { motion } from "framer-motion";
import "src/styles/404.css";
import { NoirButton } from "src/components/common/Button";

const variants = {
  hiddenOpacity: { opacity: 0 },
  hidden: { opacity: 0, y: 40 },
  hiddenY: (y: string) => {
    return {
      y: y,
    };
  },
  visible: { opacity: 1, y: 0 },
  auroraHover: {
    opacity: 1,
    scale: 1.2,
    transition: { duration: 0.3 },
  },
  buttonHover: {
    y: -3,
    scale: 1.02,
    rotate: -5,
    transition: { duration: 0.4, type: "spring", bounce: 0.5 },
  },
  buttonTap: {
    y: 3,
    scale: 0.98,
    rotate: 5,
    transition: { duration: 0.4, type: "spring", bounce: 0.5 },
  },
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
          initial={variants.hiddenY("var(--y-from)")}
          animate="visible"
          variants={variants}
          transition={{ duration: 1, type: "spring", bounce: 0.5 }}
          className="pointer-events-none inline-block text-text-light lg:[--y-from:100px] 2xl:[--y-from:150px] dark:text-text-dark"
        >
          4
        </motion.div>
        <motion.div
          initial={variants.hiddenY("var(--y-from)")}
          animate="visible"
          variants={variants}
          transition={{ duration: 1, type: "spring", bounce: 0.5, delay: 0.2 }}
          className="pointer-events-none inline-block text-text-light lg:[--y-from:100px] 2xl:[--y-from:150px] dark:text-text-dark"
        >
          0
        </motion.div>
        <motion.div
          initial={variants.hiddenY("var(--y-from)")}
          animate="visible"
          variants={variants}
          transition={{ duration: 1, type: "spring", bounce: 0.5, delay: 0.4 }}
          className="pointer-events-none inline-block text-text-light lg:[--y-from:100px] 2xl:[--y-from:150px] dark:text-text-dark"
        >
          4
        </motion.div>
      </div>
      <motion.p
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="p-medium z-20 text-center"
      >
        The page you are looking for might have been removed <br /> had its name
        changed or is temporarily unavailable.
      </motion.p>
      <motion.div
        initial="hiddenOpacity"
        animate="visible"
        variants={variants}
        transition={{ duration: 0.4, delay: 0.8 }}
        className="z-20"
      >
        {/* <motion.button
          whileHover="buttonHover"
          whileTap="buttonTap"
          variants={variants}
          className="btn bg-background-dark uppercase text-text-dark"
          onClick={() => navigate("/")}
        >
          Back to home
        </motion.button> */}
        <NoirButton text="Back to home" link="/" />
      </motion.div>
    </main>
  );
};

export default NotFoundPage;
