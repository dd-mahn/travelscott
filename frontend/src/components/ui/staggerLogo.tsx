import React from "react";
import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, y: 50 },
  hiddenY: (y: string) => {
    return {
      y: y,
    };
  },
  visible: { opacity: 1, y: 0 },
};

export default function StaggerLogo() {
  return (
    <>
      <motion.div
        initial={variants.hiddenY("var(--y-from)")}
        whileInView="visible"
        viewport={{ once: true }}
        variants={variants}
        transition={{ duration: 1, type: "spring", bounce: 0.4, delay: 0 }}
        className="inline-block lg:[--y-from:250px] 2xl:[--y-from:300px]"
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
          type: "spring",
          bounce: 0.4,
          delay: 0.05,
        }}
        className="inline-block lg:[--y-from:250px] 2xl:[--y-from:300px]"
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
          type: "spring",
          bounce: 0.4,
          delay: 0.1,
        }}
        className="inline-block lg:[--y-from:250px] 2xl:[--y-from:300px]"
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
          type: "spring",
          bounce: 0.4,
          delay: 0.15,
        }}
        className="inline-block lg:[--y-from:250px] 2xl:[--y-from:300px]"
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
          type: "spring",
          bounce: 0.4,
          delay: 0.2,
        }}
        className="inline-block lg:[--y-from:250px] 2xl:[--y-from:300px]"
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
          type: "spring",
          bounce: 0.4,
          delay: 0.25,
        }}
        className="inline-block lg:[--y-from:250px] 2xl:[--y-from:300px]"
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
          type: "spring",
          bounce: 0.4,
          delay: 0.3,
        }}
        className="inline-block lg:[--y-from:250px] 2xl:[--y-from:300px]"
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
          type: "spring",
          bounce: 0.4,
          delay: 0.35,
        }}
        className="inline-block lg:[--y-from:250px] 2xl:[--y-from:300px]"
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
          type: "spring",
          bounce: 0.4,
          delay: 0.4,
        }}
        className="inline-block lg:[--y-from:250px] 2xl:[--y-from:300px]"
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
          type: "spring",
          bounce: 0.4,
          delay: 0.45,
        }}
        className="inline-block lg:[--y-from:250px] 2xl:[--y-from:300px]"
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
          type: "spring",
          bounce: 0.4,
          delay: 0.5,
        }}
        className="inline-block lg:[--y-from:250px] 2xl:[--y-from:300px]"
      >
        t
      </motion.div>
    </>
  );
}
