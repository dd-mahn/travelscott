import { motion, useTransform, useScroll } from "framer-motion";
import React, {
  memo,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

// Components imports
import Destination from "src/types/Destination";
import { optimizeImage } from "src/utils/optimizeImage";
import { debounce } from "lodash";
import Loading from "src/components/common/Loading";
import { Link } from "react-router-dom";

// Component props
type HorizontalScrollCarouselProps = {
  data: Destination[];
};

// Framer motion variants
const variants = {
  hidden: { opacity: 0, y: 20 },
  hiddenScale: { opacity: 0.9, scale: 0.95 },
  hiddenX: { opacity: 0, x: 50 },
  visible: { opacity: 1, y: 0, x: 0, scale: 1, transition: { duration: 0.5 } },
  hoverScale: {
    scale: 1.05,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
  hoverX: {
    x: 5,
    transition: {
      duration: 1,
      type: "spring",
      bounce: 0.5,
    },
  },
};

// HorizontalScrollCarousel component
const HorizontalScrollCarousel: React.FC<HorizontalScrollCarouselProps> = ({
  data,
}) => {
  // Add refs for scroll container and target
  const [scrollPixels, setScrollPixels] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Calculate scroll pixels based on container width and padding
  const calculateScrollPixels = useCallback(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      const x = window.innerWidth;
      const x1 = parseFloat(getComputedStyle(scrollContainer).paddingLeft) || 0;
      const initialVisiblePart = x - x1;
      const y = scrollContainer.scrollWidth;
      const hiddenPart = y - initialVisiblePart;
      return hiddenPart;
    } else {
      return 0;
    }
  }, []);

  // Debounce the resize event to optimize performance
  const handleResize = useCallback(
    debounce(() => {
      setScrollPixels(calculateScrollPixels());
    }, 100),
    [calculateScrollPixels],
  );

  // Update scroll pixels on component mount and window resize
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [data, handleResize]);

  // Handle horizontal scroll animation
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollPixels]);

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
    <Suspense fallback={<Loading />}>
      <motion.section
        initial="hiddenScale"
        whileInView="visible"
        viewport={{ once: true }}
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
                        whileHover="hoverScale"
                        transition={{ duration: 0.4 }}
                        variants={variants}
                        loading="lazy"
                        src={src}
                        srcSet={srcSet}
                        alt={destination.name}
                        className="cursor-hover h-full w-full cursor-pointer rounded-xl object-cover"
                      />
                    </div>

                    <div className="flex flex-col lg:gap-0 xl:gap-0 2xl:gap-0 3xl:gap-0">
                      <span className="span-regular text-gray">
                        {destination.country}
                      </span>

                      <motion.span
                        whileHover="hoverX"
                        variants={variants}
                        className="cursor-hover-small span-medium w-fit cursor-pointer uppercase"
                      >
                        <Link to={"/"}>
                          {destination.name}
                        </Link>
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
    </Suspense>
  );
};

export default memo(HorizontalScrollCarousel);
