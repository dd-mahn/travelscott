import React, { memo } from "react";
import { motion } from "framer-motion";
import { MarqueeCountryCarousel } from "src/pages/Home/Components/Inspired/CountryCarousel";
import { VisibilityVariants } from "src/utils/constants/variants";

// Framer motion variants for animations
const variants = {
  hidden: VisibilityVariants.hidden,
  hiddenY: VisibilityVariants.hiddenY,
  hiddenFullY: VisibilityVariants.hiddenFullY,
  hiddenScaleRight: VisibilityVariants.hiddenScaleRight,
  hiddenScaleY: VisibilityVariants.hiddenScaleY,
  visible: VisibilityVariants.visible,
  blobAnimation: {
    scale: [1, 1.5, 1],
    opacity: [0.6, 0.7, 0.6],
    zIndex: [0, 0, 0],
    transition: { duration: 5, repeat: Infinity },
  },
};

// Inspired component: Displays inspiration from travelers around the world
const Inspired: React.FC = () => {
  return (
    <section className="px-sect inspired relative flex items-center justify-center pt-[40svh] pb-[70svh]">
      {/* Background carousel */}
      <motion.div
        className="absolute left-0 top-0 z-0 h-svh w-full"
        variants={variants}
        initial="hiddenScaleY"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 2, type: "tween", ease: "easeInOut" }}
      >
        <MarqueeCountryCarousel />
      </motion.div>

      {/* Main content */}
      <div className="relative flex w-fit flex-col lg:gap-2 xl:gap-2 2xl:gap-4 3xl:gap-4">
        {/* Decorative blob */}
        <motion.div
          initial="hidden"
          animate="blobAnimation"
          variants={variants}
          className="blob-brown blur-blob absolute -left-1/3 -top-[10%] z-0 h-full w-1/2 opacity-60"
        ></motion.div>

        {/* Headline */}
        <motion.h2
          variants={variants}
          initial="hiddenY"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="h2-inter text-center tracking-tight"
          style={{ lineHeight: "1.2" }}
        >
          We got inspired by travelers of <br />
          <span className="text-main-green dark:text-dark-green">20</span>+ countries around the
          world
        </motion.h2>

        {/* Subtext */}
        <motion.span
          initial="hiddenY"
          whileInView="visible"
          transition={{ duration: 0.5, delay: 1.5 }}
          variants={variants}
          viewport={{ once: true }}
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
