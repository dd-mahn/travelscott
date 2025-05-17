import React, { Suspense } from "react";
import { motion } from "framer-motion";

// OptimizedImage component to load images lazily
const OptimizedImage = ({
  src,
  alt,
  className,
  hoverClassName,
  ...motionProps
}: {
  src: string;
  alt: string;
  className?: string;
  hoverClassName?: string;
  [key: string]: any;
}) => {

  return (
    <motion.div className={className}>
      <Suspense fallback={<div className="h-full w-full image-suspense" />}>
        <motion.img
          loading="lazy"
          src={src}
          alt={alt}
          className={hoverClassName ? hoverClassName : "h-full w-full"}
          {...motionProps}
        />
      </Suspense>
    </motion.div>
  );
};

export default React.memo(OptimizedImage);
