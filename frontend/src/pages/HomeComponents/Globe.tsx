import React, { memo, useRef } from "react";
import EarthScene from "./EarthScene";
import { motion, useScroll, useTransform } from "framer-motion";

// Component props
type GlobeProps = {
  articlesHookRef: React.RefObject<HTMLSpanElement>;
}

// Globe component
const Globe: React.FC<GlobeProps> = ({articlesHookRef}) => {
  // Create a ref for the span element
  const spanRef = useRef(null);

  // Handle scroll animation
  const { scrollYProgress } = useScroll({
    target: spanRef,
    offset: ["end end", "start start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  // Render logic
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

export default memo(Globe);
