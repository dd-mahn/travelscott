import React from "react";
import { motion } from "framer-motion";
import { VisibilityVariants } from "src/utils/constants/variants";

// Common motion div component to avoid repetition
const MotionDiv: React.FC<{ keyName: string; children: React.ReactNode }> = ({
  keyName,
  children,
}) => (
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
    {children}
  </motion.div>
);

// Loading state component
export const LoadingState: React.FC<{ keyName: string }> = React.memo(
  ({ keyName }) => {
    return (
      <MotionDiv keyName={keyName}>
        <h3 className="h3-md text-center md:text-left">Loading...</h3>
      </MotionDiv>
    );
  },
);

// Error state component
export const ErrorState: React.FC<{ keyName: string }> = React.memo(
  ({ keyName }) => {
    return (
      <MotionDiv keyName={keyName}>
        <h3 className="h3-md text-center md:text-left">
          Error... Please reload or try again later.
        </h3>
      </MotionDiv>
    );
  },
);

// Not found state component
export const NotFoundState: React.FC<{ keyName: string }> = React.memo(
  ({ keyName }) => {
    return (
      <MotionDiv keyName={keyName}>
        <h3 className="h3-md text-center md:text-left">
          Nothing available at the moment, please reload or try again later.
        </h3>
      </MotionDiv>
    );
  },
);
