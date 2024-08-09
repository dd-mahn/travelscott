import React, { memo, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";

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
  // const location = useLocation();
  return (
    // <AnimatePresence mode="wait">
      <motion.div
        // key="WaitScreen"
        initial="visible"
        animate="visible"
        exit={{ y: -1000 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="grid h-screen w-screen place-items-center bg-background-light"
      >
        <div className="font-kaushan w-screen select-none overflow-hidden text-center text-text-light lg:mr-16 lg:text-8xl lg:pr-12 xl:text-13xl 2xl:pr-20 2xl:text-14xl 3xl:text-15xl">
          <motion.div
            initial={variants.hiddenY("var(--y-from)")}
            whileInView="visible"
            viewport={{ once: true }}
            variants={variants}
            transition={{ duration: 1, delay: 0, type: "spring", bounce: 0.4 }}
            className="inline-block lg:[--y-from:250px] 2xl:[--y-from:350px]"
          >
            T
          </motion.div>
          <motion.div
            initial={variants.hiddenY("var(--y-from)")}
            whileInView="visible"
            viewport={{ once: true }}
            variants={variants}
            transition={{
              duration: 1,
              delay: 0.05,
              type: "spring",
              bounce: 0.4,
            }}
            className="inline-block lg:[--y-from:250px] 2xl:[--y-from:350px]"
          >
            r
          </motion.div>
          <motion.div
            initial={variants.hiddenY("var(--y-from)")}
            whileInView="visible"
            viewport={{ once: true }}
            variants={variants}
            transition={{
              duration: 1,
              delay: 0.1,
              type: "spring",
              bounce: 0.4,
            }}
            className="inline-block lg:[--y-from:250px] 2xl:[--y-from:350px]"
          >
            a
          </motion.div>
          <motion.div
            initial={variants.hiddenY("var(--y-from)")}
            whileInView="visible"
            viewport={{ once: true }}
            variants={variants}
            transition={{
              duration: 1,
              delay: 0.15,
              type: "spring",
              bounce: 0.4,
            }}
            className="inline-block lg:[--y-from:250px] 2xl:[--y-from:350px]"
          >
            v
          </motion.div>
          <motion.div
            initial={variants.hiddenY("var(--y-from)")}
            whileInView="visible"
            viewport={{ once: true }}
            variants={variants}
            transition={{
              duration: 1,
              delay: 0.2,
              type: "spring",
              bounce: 0.4,
            }}
            className="inline-block lg:[--y-from:250px] 2xl:[--y-from:350px]"
          >
            e
          </motion.div>
          <motion.div
            initial={variants.hiddenY("var(--y-from)")}
            whileInView="visible"
            viewport={{ once: true }}
            variants={variants}
            transition={{
              duration: 1,
              delay: 0.25,
              type: "spring",
              bounce: 0.4,
            }}
            className="inline-block lg:[--y-from:250px] 2xl:[--y-from:350px]"
          >
            l
          </motion.div>
          <motion.div
            initial={variants.hiddenY("var(--y-from)")}
            whileInView="visible"
            viewport={{ once: true }}
            variants={variants}
            transition={{
              duration: 1,
              delay: 0.3,
              type: "spring",
              bounce: 0.4,
            }}
            className="inline-block lg:[--y-from:250px] 2xl:[--y-from:350px]"
          >
            S
          </motion.div>
          <motion.div
            initial={variants.hiddenY("var(--y-from)")}
            whileInView="visible"
            viewport={{ once: true }}
            variants={variants}
            transition={{
              duration: 1,
              delay: 0.35,
              type: "spring",
              bounce: 0.4,
            }}
            className="inline-block lg:[--y-from:250px] 2xl:[--y-from:350px]"
          >
            c
          </motion.div>
          <motion.div
            initial={variants.hiddenY("var(--y-from)")}
            whileInView="visible"
            viewport={{ once: true }}
            variants={variants}
            transition={{
              duration: 1,
              delay: 0.4,
              type: "spring",
              bounce: 0.4,
            }}
            className="inline-block lg:[--y-from:250px] 2xl:[--y-from:350px]"
          >
            o
          </motion.div>
          <motion.div
            initial={variants.hiddenY("var(--y-from)")}
            whileInView="visible"
            viewport={{ once: true }}
            variants={variants}
            transition={{
              duration: 1,
              delay: 0.45,
              type: "spring",
              bounce: 0.4,
            }}
            className="inline-block lg:[--y-from:250px] 2xl:[--y-from:350px]"
          >
            t
          </motion.div>
          <motion.div
            initial={variants.hiddenY("var(--y-from)")}
            whileInView="visible"
            viewport={{ once: true }}
            variants={variants}
            transition={{
              duration: 1,
              delay: 0.5,
              type: "spring",
              bounce: 0.4,
            }}
            className="inline-block lg:[--y-from:250px] 2xl:[--y-from:350px]"
          >
            t
          </motion.div>
        </div>
      </motion.div>
    // </AnimatePresence>
  );
};

export default memo(Loading);
