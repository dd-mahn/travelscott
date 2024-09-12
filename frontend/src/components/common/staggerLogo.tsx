import React from "react";
import { motion } from "framer-motion";
import { VisibilityVariants } from "src/utils/variants";

const variants = {
  hiddenY: VisibilityVariants.hiddenY,
  hiddenFullY: VisibilityVariants.hiddenFullY,
  visible: VisibilityVariants.visible,
};

export default function StaggerLogo() {
  const text = "TravelScott";
  const characters = text.split("");

  return (
    <>
      {characters.map((char, index) => (
        <motion.div
          key={index}
          initial="hiddenFullY"
          whileInView="visible"
          viewport={{ once: true }}
          variants={variants}
          transition={{
            duration: 1,
            type: "spring",
            bounce: 0.4,
            delay: index * 0.05,
          }}
          className="inline-block"
        >
          {char}
        </motion.div>
      ))}
    </>
  );
}
