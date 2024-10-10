import React from "react";
import { motion } from "framer-motion";
import { VisibilityVariants } from "src/utils/variants";

export const LoadingState: React.FC<{ keyName: string }> = React.memo(
  ({ keyName }) => {
    return (
      <motion.div
        key={keyName}
        initial="hiddenY"
        whileInView="visible"
        viewport={{ once: true }}
        variants={VisibilityVariants}
        exit="hiddenY"
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="grid h-[50svh] w-full place-items-center py-sect-short"
      >
        <h3 className="h3-md">Loading...</h3>
      </motion.div>
    );
  },
);

export const ErrorState: React.FC<{ keyName: string }> = React.memo(
  ({ keyName }) => {
    return (
      <motion.div
        key={keyName}
        initial="hiddenY"
        whileInView="visible"
        viewport={{ once: true }}
        variants={VisibilityVariants}
        exit="hiddenY"
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="grid h-[50svh] w-full place-items-center py-sect-short"
      >
        <h3 className="h3-md">
          Error... Please reload the page or try again later.
        </h3>
      </motion.div>
    );
  },
);

export const NotFoundState: React.FC<{ keyName: string }> = React.memo(
  ({ keyName }) => {
    return (
      <motion.div
        key={keyName}
        initial="hiddenY"
        whileInView="visible"
        viewport={{ once: true }}
        variants={VisibilityVariants}
        exit="hiddenY"
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="grid h-[50svh] w-full place-items-center py-sect-short"
      >
        <h3 className="h3-md">Nothing found.</h3>
      </motion.div>
    );
  },
);
