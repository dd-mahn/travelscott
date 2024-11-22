import React, { Suspense, useMemo, useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  getImageSize,
  optimizeImage,
} from "src/utils/imageUtils";
import { useViewportWidth } from "src/hooks/useViewportWidth/useViewportWidth";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportWidth = useViewportWidth();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: rect.width,
          height: rect.height
        });
      }
    };

    // Initial measurement
    updateDimensions();

    // Setup ResizeObserver
    const resizeObserver = new ResizeObserver(updateDimensions);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  const optimizedImage = useMemo(
    () =>
      optimizeImage(src, {
        width: Math.ceil(dimensions.width * window.devicePixelRatio),
        height: dimensions.height > 0 ? Math.ceil(dimensions.height * window.devicePixelRatio) : undefined,
        quality: 80,
        format: "auto",
      }),
    [src, dimensions]
  );

  return (
    <motion.div ref={containerRef} className={className}>
      <Suspense fallback={<div className="h-full w-full image-suspense" />}>
        <motion.img
          loading="lazy"
          src={optimizedImage.src}
          srcSet={optimizedImage.srcSet}
          sizes={`(max-width: ${viewportWidth}px) 100vw, ${dimensions.width}px`}
          alt={alt}
          className={hoverClassName ? hoverClassName : "h-full w-full"}
          {...motionProps}
        />
      </Suspense>
    </motion.div>
  );
};

export default React.memo(OptimizedImage);
