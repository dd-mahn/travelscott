import { motion, useTransform, useScroll } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import Destination from "src/types/Destination";
import { preloadImage } from "src/utils/preloadImage";

type HorizontalScrollCarouselProps = {
  data: Destination[];
};
const variants = {
  hidden: { opacity: 0, y: 20 },
  hiddenScale: { opacity: 0.8, scale: 0.8 },
  hiddenX: { opacity: 0, x: 50 },
  visible: { opacity: 1, y: 0, x: 0, scale: 1 },
};

const HorizontalScrollCarousel: React.FC<HorizontalScrollCarouselProps> = ({
  data,
}) => {
  // Set up the animation prerequisites
  const [scrollPixels, setScrollPixels] = useState(0);
  const scrollElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateScrollPixels = () => {
      const scrollElement = scrollElementRef.current;
      if (scrollElement) {
        const x = window.innerWidth; // Viewport width
        const x1 = parseFloat(getComputedStyle(scrollElement).paddingLeft) || 0; // Padding of the container
        const initialVisiblePart = x - x1; // Initial visible part of the scrollElement
        const y = scrollElement.scrollWidth; // Full width of the scrollElement
        const hiddenPart = y - initialVisiblePart; // Hidden part of the scrollElement
        return hiddenPart; // Total width to be translated in pixels
      } else {
        return 0;
      }
    };

    const handleResize = () => {
      setScrollPixels(calculateScrollPixels());
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

  // Handle the animation
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
  // Render logic
  return (
    <motion.section
      initial="hiddenScale"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay:0.2, duration: 0.5, ease: "easeInOut" }}
      variants={variants}
      ref={targetRef}
      className="relative h-[400svh]"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          ref={scrollElementRef}
          style={{ x }}
          className="px-sect mt-20 grid auto-cols-[35%] grid-flow-col gap-8"
        >
          {data &&
            data.length > 0 &&
            data.map((destination: Destination) => {
              const [bgImage, setBgImage] = useState("");

              useEffect(() => {
                const highResImage = new Image();
                highResImage.src = destination.images?.[0] || "";
                highResImage.onload = () => {
                  setBgImage(highResImage.src);
                };
              }, [destination.images]);

              return (
                <motion.div
                  variants={variants}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  key={destination._id}
                  className="destination-card flex h-full flex-col gap-4 pb-8"
                >
                  <img
                    src={bgImage}
                    alt={destination.name}
                    className="h-[70svh] w-full rounded-lg object-cover"
                  />
                  <div className="flex flex-col lg:gap-0 xl:gap-0 2xl:gap-0 3xl:gap-0">
                    <span className="span-regular text-gray">
                      {destination.country}
                    </span>
                    <span className="span-medium uppercase">
                      {destination.name}
                    </span>
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
                </motion.div>
              );
            })}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HorizontalScrollCarousel;
