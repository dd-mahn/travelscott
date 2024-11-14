import React, { memo, useRef } from "react";
import EarthScene from "src/pages/Home/Components/Globe/EarthScene";
import { motion, useScroll, useTransform } from "framer-motion";

// Define the props for the Globe component
type GlobeProps = {
  articlesHookRef: React.RefObject<HTMLSpanElement>;
}

// Globe component
const Globe: React.FC<GlobeProps> = ({ articlesHookRef }) => {
  // Create a ref for the span element
  const spanRef = useRef<HTMLSpanElement>(null);

  // Handle scroll animation
  const { scrollYProgress } = useScroll({
    target: spanRef,
    offset: ["end end", "start start"],
  });

  // Transform the x position based on scroll progress
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  // Render the Globe component
  return (
    <section className="globe relative grid items-center rounded-5xl">
      <motion.span
        ref={spanRef}
        style={{ x }}
        className="px-sect p-large absolute -top-10 right-0 font-semibold uppercase"
      >
        And we've covered these countries in our catalog too!
      </motion.span>
      <EarthScene articlesHookRef={articlesHookRef} />
    </section>
  );
};

// Export the memoized Globe component to prevent unnecessary re-renders
export default memo(Globe);
