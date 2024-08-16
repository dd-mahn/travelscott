import React, { memo } from "react";
import { motion } from "framer-motion";

// Framer motion variants
const variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  hiddenY: {
    opacity: 0,
    y: 100,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
};

// Inspired component
const Inspired: React.FC = () => {
  return (
    <section className="px-sect inspired flex items-center justify-center lg:pb-sect-semi lg:pt-sect-default 2xl:pb-sect-semi 2xl:pt-sect-medium">
      <div className="relative flex w-fit flex-col lg:gap-2 xl:gap-2 2xl:gap-4 3xl:gap-4">
        <div className="blob-brown blur-blob absolute -left-1/3 -top-[10%] z-0 h-full w-1/2 opacity-60"></div>
        <motion.h1
          variants={variants}
          initial="hiddenY"
          whileInView="visible"
          viewport={{ once: true, margin: "0% 0% -20% 0%" }}
          className="h2-inter text-center leading-normal tracking-tight"
        >
          We got inspired by travelers of <br />
          <span className="text-main-green">20</span>+ countries around the
          world
        </motion.h1>
        <motion.span
          initial="hidden"
          whileInView="visible"
          transition={{ delay: 1 }}
          variants={variants}
          viewport={{ once: true, margin: "0% 0% -20% 0%" }}
          className="p-medium self-end"
        >
          (Maybe you are one)
        </motion.span>
      </div>
    </section>
  );
};

export default memo(Inspired);
