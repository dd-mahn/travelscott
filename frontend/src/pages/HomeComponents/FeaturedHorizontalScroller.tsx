import { motion, useTransform, useScroll } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import useLazyBackgroundImage from "src/hooks/useLazyBackgroundImage";
import Destination from "src/types/Destination";

type HorizontalScrollCarouselProps = {
  data: Destination[];
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

  // Other animation variants
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Render logic
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      variants={variants}
      ref={targetRef}
      className="relative h-[300svh]"
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
              const bgRef = useLazyBackgroundImage(destination.images?.[0]);
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
                  <div
                    ref={bgRef}
                    className="h-[70svh] w-full rounded-lg"
                    style={{
                      // backgroundImage: `url(${destination.images?.[0]})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
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
