import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const Loading: React.FC = () => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, type: "spring" }}
        exit={{ opacity: 0 }}
        className="grid h-screen w-screen place-items-center"
      >
        <h2 className="h2-md">Loading...</h2>
      </motion.div>
    </AnimatePresence>
  );
};

export default Loading;
