import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "src/styles/404.css";

const variants = {
  hiddenOpacity: { opacity: 0 },
  hidden: { opacity: 0, y: 40 },
  hiddenY: (y: string) => {
    return {
      y: y,
    };
  },
  visible: { opacity: 1, y: 0 },
};

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <main className="not-found relative flex h-screen w-full flex-col items-center justify-center gap-8">
      <div className="blur-blob blob-1"></div>
      <div className="blur-blob blob-2"></div>
      <div className="big-heading overflow-hidden">
        <motion.div
          initial={variants.hiddenY("var(--y-from)")}
          animate="visible"
          variants={variants}
          transition={{ duration: 1, type: "spring", bounce: 0.5 }}
          className="inline-block text-text-light lg:[--y-from:100px] 2xl:[--y-from:150px] dark:text-text-dark"
        >
          4
        </motion.div>
        <motion.div
          initial={variants.hiddenY("var(--y-from)")}
          animate="visible"
          variants={variants}
          transition={{ duration: 1, type: "spring", bounce: 0.5, delay: 0.2 }}
          className="inline-block text-text-light lg:[--y-from:100px] 2xl:[--y-from:150px] dark:text-text-dark"
        >
          0
        </motion.div>
        <motion.div
          initial={variants.hiddenY("var(--y-from)")}
          animate="visible"
          variants={variants}
          transition={{ duration: 1, type: "spring", bounce: 0.5, delay: 0.4 }}
          className="inline-block text-text-light lg:[--y-from:100px] 2xl:[--y-from:150px] dark:text-text-dark"
        >
          4
        </motion.div>
      </div>
      <motion.p
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="p-medium text-center"
      >
        The page you are looking for might have been removed <br /> had its name
        changed or is temporarily unavailable.
      </motion.p>
      <motion.button
        initial="hiddenOpacity"
        animate="visible"
        variants={variants}
        transition={{ duration: 0.4, delay: 0.8 }}
        className="btn bg-background-dark uppercase text-text-dark"
        onClick={() => navigate("/")}
      >
        Back to home
      </motion.button>
    </main>
  );
};

export default NotFoundPage;
