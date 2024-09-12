import React, { memo } from "react";
import { motion } from "framer-motion";

// Component imports
import StarterBlogs from "./StarterBlog";
import airplane1 from "src/assets/svg/airplane-1.svg";
import Blog from "src/types/Blog";
import { SecondaryButton } from "src/components/common/Button";
import { VisibilityVariants } from "src/utils/variants";

// Framer motion variants for animations
const variants = {
  hidden: VisibilityVariants.hidden,
  hiddenY: VisibilityVariants.hiddenY,
  visible: VisibilityVariants.visible,
  hiddenPlane: {
    opacity: 0,
    scale: 0.8,
    y: 30,
  },
};

// Starter component: Displays a section with blog posts for first-time travelers
const Starter: React.FC<{ blogs: Blog[] }> = ({ blogs }) => {
  return (
    <section className="starter relative rounded-5xl bg-main-brown h-[140svh]">
      {/* Draggable airplane image */}
      <motion.img
        initial="hiddenPlane"
        whileInView="visible"
        transition={{ duration: 0.5 }}
        variants={variants}
        viewport={{ once: true }}
        drag
        dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
        src={airplane1}
        alt="Plane"
        className="absolute z-[1000] -top-[5%] left-[5%] lg:w-44 xl:w-44 2xl:w-44 3xl:w-48"
      />
      {/* Container for StarterBlogs component */}
      <div className="h-full w-full overflow-hidden">
        <StarterBlogs blogs={blogs} />
      </div>
      {/* "Find More" button */}
      <motion.div
        initial="hiddenY"
        whileInView="visible"
        transition={{ duration: 0.5 }}
        variants={variants}
        viewport={{ once: true }}
        className="absolute -bottom-4 right-0 lg:mr-12 xl:mr-16 2xl:mr-20 3xl:mr-24 z-[1000]"
      >
        <SecondaryButton text="Find More" link="/inspiration" />
      </motion.div>
    </section>
  );
};

// Export memoized Starter component for performance optimization
export default memo(Starter);
