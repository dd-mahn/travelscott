import React, { memo, useMemo } from "react";
import { motion } from "framer-motion";

// Component imports
import StarterBlogs from "src/pages/Home/Components/Starter/StarterBlog";
import airplane1 from "src/assets/svg/airplane-1.svg";
import Blog from "src/types/Blog";
import { SecondaryButton } from "src/common/Buttons/Button";
import { VisibilityVariants } from "src/utils/constants/variants";
import OptimizedImage from "src/common/OptimizedImage/OptimizedImage";

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
  // Filter out blogs without images for safety
  const validBlogs = useMemo(() => {
    const filtered = blogs.filter(blog => blog.image);
    console.log("Starter filtered blogs:", filtered.length);
    return filtered;
  }, [blogs]);

  return (
    <section className="starter relative h-[105svh] rounded-5xl bg-gradient-to-b from-[#eb996e] to-[#9e694d] dark:from-[#824c2f] dark:to-[#2e190e] md:h-[120svh] lg:h-[140svh]">
      {/* Draggable airplane image */}
      <OptimizedImage
        src={airplane1}
        alt="Plane"
        initial="hiddenPlane"
        whileInView="visible"
        transition={{ duration: 0.5 }}
        imageClassName="dark:brightness-90"
        variants={variants}
        viewport={{ once: true }}
        drag
        dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
        className="absolute -top-[3%] left-[5%] z-[1000] w-24 md:-top-[5%] md:w-32 lg:w-44 xl:w-44 2xl:w-44 3xl:w-48"
      />
      {/* Container for StarterBlogs component */}
      <div className="h-full w-full overflow-hidden">
        <StarterBlogs blogs={validBlogs} />
      </div>
      {/* "Find More" button */}
      <motion.div
        initial="hiddenY"
        whileInView="visible"
        transition={{ duration: 0.5 }}
        variants={variants}
        viewport={{ once: true }}
        className="mr-sect absolute -bottom-4 right-0 z-[1000]"
      >
        <SecondaryButton text="Find More" link="/inspiration" />
      </motion.div>
    </section>
  );
};

// Export memoized Starter component for performance optimization
export default memo(Starter);
