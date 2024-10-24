import React, { Suspense, useMemo } from "react";
import { motion } from "framer-motion";
import {
  getImageSize,
  optimizeImage,
  useViewportWidth,
} from "src/utils/imageUtils";

// OptimizedImage component to load images lazily
const OptimizedImage = ({
  src,
  alt,
  className,
  ...motionProps
}: {
  src: string;
  alt: string;
  className?: string;
  [key: string]: any;
}) => {
  const viewportWidth = useViewportWidth();
  const optimizedImage = useMemo(
    () =>
      optimizeImage(src, {
        width: getImageSize(viewportWidth),
        quality: 80,
        format: "auto",
      }),
    [src, viewportWidth],
  );

  return (
    <Suspense fallback={<div className="h-full w-full bg-transparent"></div>}>
      <motion.img
        loading="lazy"
        src={optimizedImage.src}
        srcSet={optimizedImage.srcSet}
        alt={alt}
        className={className}
        {...motionProps}
      />
    </Suspense>
  );
};

export default React.memo(OptimizedImage);
