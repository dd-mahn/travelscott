import React, { useRef } from "react";
import EarthScene from "./EarthScene";
import { motion, useScroll, useTransform } from "framer-motion";

type GlobeProps = {
  articlesHookRef: React.RefObject<HTMLSpanElement>;
}

const Globe: React.FC<GlobeProps> = ({articlesHookRef}) => {
  const spanRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: spanRef,
    offset: ["end end", "start start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
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

export default Globe;
