import React from "react";
import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0 },
  blob1Animation: {
    scale: [1, 1.5, 1],
    opacity: [0.2, 0.4, 0.2],
    x: [0, 300, 0],
    zIndex: [0, 0, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
    },
  },
  blob2Animation: {
    scale: [1, 1.5, 1],
    opacity: [0.2, 0.4, 0.2],
    y: [0, -200, 0],
    zIndex: [0, 0, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
    },
  },
};
const Loading: React.FC = () => {
  return (
    <div className="h-screen w-screen">
      {/* <motion.div
        initial="hidden"
        animate="blob1Animation"
        variants={variants}
        className="blur-blob blob-brown left-1/4 top-[15%] h-1/3 w-1/3 opacity-10"
      ></motion.div>
      <motion.div
        initial="hidden"
        animate="blob2Animation"
        variants={variants}
        className="blur-blob blob-green right-1/4 top-[10%] h-[20%] w-1/3 opacity-10"
      ></motion.div> */}
    </div>
  );
};

export default Loading;
