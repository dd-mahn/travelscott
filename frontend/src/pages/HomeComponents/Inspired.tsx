import React, { memo } from "react";
import { motion } from "framer-motion";
import { MarqueeCountryCarousel } from "./CountryCarousel";

// Framer motion variants for animations
const variants = {
  hidden: { opacity: 0, y: 20 },
  hiddenFullY: { y: "100%" },
  hiddenScale: { scale: 0.9, x: 500, opacity: 0 },
  visible: { opacity: 1, y: 0, scale: 1, x: 0 },
};

// Inspired component: Displays inspiration from travelers around the world
const Inspired: React.FC = () => {
  return (
    <section className="px-sect relative inspired flex items-center justify-center lg:pb-sect-semi lg:pt-sect-default 2xl:pb-sect-semi 2xl:pt-sect-medium">
      {/* Background carousel */}
      <motion.div 
        className="absolute left-0 top-0 z-0 h-svh w-full"
        variants={variants}
        initial="hiddenScale"
        whileInView="visible"
        viewport={{ once: true, margin: "-300px" }}
        transition={{ duration: 1, delay: 2 }}
      >
        <MarqueeCountryCarousel />
      </motion.div>

      {/* Main content */}
      <div className="relative flex w-fit flex-col lg:gap-2 xl:gap-2 2xl:gap-4 3xl:gap-4">
        {/* Decorative blob */}
        <div className="blob-brown blur-blob absolute -left-1/3 -top-[10%] z-0 h-full w-1/2 opacity-60"></div>

        {/* Headline */}
        <motion.h2
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-300px" }}
          transition={{ duration: 0.8 }}
          className="h2-inter text-center tracking-tight"
          style={{ lineHeight: "1.2" }}
        >
          We got inspired by travelers of <br />
          <span className="text-main-green">20</span>+ countries around the
          world
        </motion.h2>

        {/* Subtext */}
        <motion.span
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.5, delay: 1 }}
          variants={variants}
          viewport={{ once: true, margin: "-200px" }}
          className="p-medium self-end"
        >
          (Maybe you are one)
        </motion.span>
      </div>
    </section>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(Inspired);
