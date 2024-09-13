import React from "react";
import { motion } from "framer-motion";
import { VisibilityVariants } from "src/utils/variants";

export const LoadingState: React.FC<{ key: string }> = React.memo(({ key }) => {
  return (
    <motion.div
      key={key}
      initial="hiddenY"
      whileInView="visible"
      viewport={{ once: true }}
      variants={VisibilityVariants}
      exit="hiddenShort"
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="grid h-[50svh] w-full place-items-center py-sect-short"
    >
      <h3 className="h3-md">Loading...</h3>
    </motion.div>
  );
});

export const ErrorState: React.FC<{ key: string }> = React.memo(({ key }) => {
  return (
    <motion.div
      key={key}
      initial="hiddenY"
      whileInView="visible"
      viewport={{ once: true }}
      variants={VisibilityVariants}
      exit="hiddenShort"
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="grid h-[50svh] w-full place-items-center py-sect-short"
    >
      <h3 className="h3-md">
        Error... Please reload the page or try again later.
      </h3>
    </motion.div>
  );
});

export const NotFoundState: React.FC<{ key: string }> = React.memo(
  ({ key }) => {
    return (
      <motion.div
        key={key}
        initial="hiddenY"
        whileInView="visible"
        viewport={{ once: true }}
        variants={VisibilityVariants}
        exit="hiddenShort"
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="grid h-[50svh] w-full place-items-center py-sect-short"
      >
        <h3 className="h3-md">No destinations found.</h3>
      </motion.div>
    );
  },
);
