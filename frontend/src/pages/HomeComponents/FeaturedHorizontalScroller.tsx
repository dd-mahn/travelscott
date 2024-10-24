import React, {
  memo,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { debounce } from "lodash";

import Destination from "src/types/Destination";
import Loading from "src/common/Loading";
import FeaturedDestinationCard from "./FeaturedDestinationCard";
import { HoverVariants, VisibilityVariants } from "src/utils/constants/variants";

type HorizontalScrollCarouselProps = {
  data: Destination[];
};

// Animation variants for Framer Motion
const variants = {
  hiddenY: VisibilityVariants.hiddenY,
  hiddenScale: VisibilityVariants.hiddenScale,
  hiddenX: VisibilityVariants.hiddenX,
  visible: VisibilityVariants.visible,
  hoverScale: HoverVariants.hoverScale,
  hoverX: HoverVariants.hoverX,
};

const HorizontalScrollCarousel: React.FC<HorizontalScrollCarouselProps> = memo(
  ({ data }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const targetRef = useRef(null);
    const [scrollPixels, setScrollPixels] = useState(0);

    // Calculate the number of pixels to scroll horizontally
    const calculateScrollPixels = useCallback(() => {
      const scrollContainer = scrollContainerRef.current;
      if (!scrollContainer) return 0;

      const viewportWidth = window.innerWidth;
      const containerPadding =
        parseFloat(getComputedStyle(scrollContainer).paddingLeft) || 0;
      const initialVisiblePart = viewportWidth - containerPadding;
      return scrollContainer.scrollWidth - initialVisiblePart;
    }, []);

    // Debounced resize handler to recalculate scroll pixels
    const handleResize = useMemo(
      () => debounce(() => setScrollPixels(calculateScrollPixels()), 100),
      [calculateScrollPixels],
    );

    // Set up resize listener and initial calculation
    useEffect(() => {
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [handleResize]);

    // Use Framer Motion's useScroll hook to track vertical scroll progress
    const { scrollYProgress } = useScroll({ target: targetRef });

    // Transform vertical scroll progress into horizontal movement
    const x = useTransform(scrollYProgress, [0, 1], [0, -scrollPixels]);

    return (
      <Suspense fallback={<Loading />}>
        <motion.section
          initial="hiddenScale"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          variants={variants}
          ref={targetRef}
          className="relative h-[400svh]"
        >
          <div className="sticky top-0 h-screen overflow-hidden">
            <motion.div
              ref={scrollContainerRef}
              style={{ x }}
              className="px-sect mt-20 grid auto-cols-[70%] md:auto-cols-[60%] lg:auto-cols-[35%] grid-flow-col gap-4 md:gap-8"
            >
              {data.map((destination) => (
                <FeaturedDestinationCard
                  key={destination._id}
                  destination={destination}
                />
              ))}
            </motion.div>
          </div>
        </motion.section>
      </Suspense>
    );
  },
);

export default HorizontalScrollCarousel;
