import React from "react";
import { motion } from "framer-motion";
import { VisibilityVariants } from "src/utils/constants/variants";

// Common motion div component to avoid repetition
const MotionDiv: React.FC<{ keyName: string; children: React.ReactNode; className?: string }> = ({
  keyName,
  children,
  className = "grid h-[50svh] w-full place-items-center py-sect-short"
}) => (
  <motion.div
    key={keyName}
    initial="hiddenY"
    whileInView="visible"
    viewport={{ once: true }}
    variants={VisibilityVariants}
    exit="hiddenY"
    transition={{ duration: 0.5, ease: "easeInOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

// Loading state component - shown when filtering or loading data
export const LoadingState: React.FC<{ keyName: string }> = ({ keyName }) => {
  return (
    <MotionDiv 
      keyName={keyName} 
      className="grid w-full place-items-center py-8 transition-all"
    >
      <div className="flex flex-col items-center gap-2">
        <div className="loading-spinner h-12 w-12 rounded-full border-4 border-gray border-t-text-light"></div>
        <p className="p-medium">Updating results...</p>
      </div>
      
      <style jsx>{`
        .loading-spinner {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </MotionDiv>
  );
};

// Error state component
export const ErrorState: React.FC<{ keyName: string }> = ({ keyName }) => {
  return (
    <MotionDiv keyName={keyName}>
      <div className="flex flex-col items-center gap-4">
        <i className="ri-error-warning-line text-5xl text-red-500"></i>
        <h3 className="h3-md text-center">
          Error occurred while loading data
        </h3>
        <p className="p-regular text-center">
          Please reload or try again later.
        </p>
      </div>
    </MotionDiv>
  );
};

// Not found state component
export const NotFoundState: React.FC<{ keyName: string }> = ({ keyName }) => {
  return (
    <MotionDiv keyName={keyName}>
      <div className="flex flex-col items-center gap-4">
        <i className="ri-search-line text-5xl"></i>
        <h3 className="h3-md text-center">
          No results found
        </h3>
        <p className="p-regular text-center">
          Try adjusting your search or filters to find what you're looking for.
        </p>
      </div>
    </MotionDiv>
  );
};
