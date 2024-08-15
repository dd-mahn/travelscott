import { motion, useTransform, useScroll } from "framer-motion";
import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import Destination from "src/types/Destination";
import { preloadImage } from "src/utils/preloadImage";
import { optimizeImage } from "src/utils/optimizeImage";

type HorizontalScrollCarouselProps = {
  data: Destination[];
};
const variants = {
  hidden: { opacity: 0, y: 20 },
  hiddenScale: { opacity: 0.9, scale: 0.95 },
  hiddenX: { opacity: 0, x: 50 },
  visible: { opacity: 1, y: 0, x: 0, scale: 1 },
};

const HorizontalScrollCarousel: React.FC<HorizontalScrollCarouselProps> = ({
  data,
}) => {
  // Set up the animation prerequisites
  const [scrollPixels, setScrollPixels] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateScrollPixels = () => {
      const scrollContainer = scrollContainerRef.current;
      if (scrollContainer) {
        const x = window.innerWidth; // Viewport width
        const x1 =
          parseFloat(getComputedStyle(scrollContainer).paddingLeft) || 0; // Padding of the container
        const initialVisiblePart = x - x1; // Initial visible part of the scrollContainer
        const y = scrollContainer.scrollWidth; // Full width of the scrollContainer
        const hiddenPart = y - initialVisiblePart; // Hidden part of the scrollContainer
        return hiddenPart; // Total width to be translated in pixels
      } else {
        return 0;
      }
    };

    const handleResize = () => {
      setScrollPixels(calculateScrollPixels());
      console.log("Scroll pixels changed - Featured section");
    };

    // Initial calculation
    handleResize();

    // Re-operate when the window is resized
    window.addEventListener("resize", handleResize);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [data]);

  // Handle horizontal scroll animation
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollPixels]);

  // Image handling
  useEffect(() => {
    data.forEach((destination) => {
      if (destination.images?.[0]) {
        preloadImage(destination.images[0]);
      }
    });
  }, [data]);

  // Memoize the optimized images
  const optimizedImages = useMemo(() => {
    return data.map((destination) => {
      const highResImage = new Image();
      highResImage.src = destination.images?.[0] || "";
      return optimizeImage(highResImage.src);
    });
  }, [data]);

  // Render logic
  return (
    <motion.section
      initial="hiddenScale"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      variants={variants}
      ref={targetRef}
      className="relative h-[400svh]"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          ref={scrollContainerRef}
          style={{ x }}
          className="px-sect mt-20 grid auto-cols-[35%] grid-flow-col gap-8"
        >
          {data &&
            data.length > 0 &&
            data.map((destination: Destination, index) => {
              const { src, srcSet } = optimizedImages[index];

              return (
                <div
                  key={destination._id}
                  className="destination-card flex h-full flex-col gap-4 pb-8"
                >
                  <div className="h-[70svh] w-full overflow-hidden rounded-xl">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                      loading="lazy"
                      src={src}
                      srcSet={srcSet}
                      alt={destination.name}
                      className="h-full w-full cursor-pointer rounded-xl object-cover"
                    />
                  </div>

                  <div className="flex flex-col lg:gap-0 xl:gap-0 2xl:gap-0 3xl:gap-0">
                    <span className="span-regular text-gray">
                      {destination.country}
                    </span>
                    <motion.span
                      whileHover={{ x: 5 }}
                      transition={{
                        duration: 1,
                        type: "spring",
                        bounce: 0.5,
                      }}
                      className="span-medium w-fit cursor-pointer uppercase"
                    >
                      {destination.name}
                    </motion.span>
                    <div className="mt-4 flex gap-2">
                      {destination.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="span-small rounded-2xl border-gray px-4 lg:border"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default memo(HorizontalScrollCarousel);
