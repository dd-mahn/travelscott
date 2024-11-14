import React from "react";
import { motion } from "framer-motion";
import { VisibilityVariants } from "src/utils/constants/variants";

const variants = {
    hiddenFullY: VisibilityVariants.hiddenFullY,
    visible: VisibilityVariants.visible,
  };

const Hook = () => {
  return (
    <motion.div className="sticky top-0 -z-10" >
      <section data-testid="hook" className="hook px-sect flex h-[120svh] items-center">
        <div className="mb-20 md:mb-40">
          <div className="overflow-hidden lg:pb-2">
            <motion.h2
              initial="hiddenFullY"
              whileInView="visible"
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              variants={variants}
              className="h2-inter"
            >
              If you are still hesitant,
            </motion.h2>
          </div>
          <div className="overflow-hidden lg:pb-2">
            <motion.h2
              initial="hiddenFullY"
              whileInView="visible"
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              variants={variants}
              className="h2-inter"
            >
              perhaps some of the articles below can help.
            </motion.h2>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Hook;
