import React, { memo } from "react";
import { motion } from "framer-motion";

// Component imports
import HorizontalScrollCarousel from "./FeaturedHorizontalScroller";
import { featuredDemo } from "src/data/featuredDemo";
import { SecondaryButton } from "src/common/Button";
import { VisibilityVariants } from "src/utils/variants";
import { useViewportWidth } from "src/utils/imageUtils";

// Framer motion variants for animations
const variants = {
  hidden: VisibilityVariants.hidden,
  hiddenY: VisibilityVariants.hiddenY,
  hiddenFullY: VisibilityVariants.hiddenFullY,
  visible: VisibilityVariants.visible,
};

// Featured component: Displays featured destinations
const Featured: React.FC = () => {
  const viewportWidth = useViewportWidth();
  return (
    <section className="featured flex flex-col lg:gap-28 xl:gap-32 2xl:gap-36 3xl:gap-40">
      {/* Header */}
      <div className="px-sect grid w-full place-items-center overflow-hidden">
        <motion.h1
          initial="hiddenFullY"
          whileInView="visible"
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          variants={variants}
          className="h1-md relative leading-[0.85]"
        >
          {/* Decorative icon */}
          <i className="ri-shining-2-fill hidden md:block rotate-30 absolute md:-left-[7%] lg:-left-[5%] top-0 transform text-yellow dark:text-yellow md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-4xl 3xl:text-5xl"></i>{" "}
          Featured Destinations
        </motion.h1>
      </div>

      {/* Horizontal scroll carousel */}
      <HorizontalScrollCarousel data={featuredDemo} />

      {/* Footer section */}
      <div className="px-sect flex w-full flex-col items-start md:items-end justify-start gap-4 md:flex-row md:justify-between">
        {/* Destinations count */}
        <motion.p
          initial="hiddenY"
          whileInView="visible"
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "0% 0% -10% 0%" }}
          variants={variants}
          className={`${viewportWidth > 576 ? "p-large" : "p-medium"}`}
        >
          They are just so few among the{" "}
          <span className="font-semibold text-main-brown dark:text-dark-brown h3-inter">
            100
          </span>
          + <br />
          destinations that we have covered in our Catalogue.
        </motion.p>

        {/* CTA button */}
        <motion.div
          initial="hiddenY"
          whileInView="visible"
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true, margin: "0% 0% -10% 0%" }}
          variants={variants}
          className="relative flex items-end"
        >
          {/* Decorative blob */}
          <div className="blob-green blur-blob absolute z-0 h-full w-1/3 -top-[40%] -right-[10%] opacity-100"></div>
          <div className="z-10">
            <SecondaryButton text="Discover More" link="/discover" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(Featured);
