import React, { memo, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Component imports
import StarterBlogs from "./StarterBlog";
import airplane1 from "src/assets/svg/airplane-1.svg";
import Blog from "src/types/Blog";
import { SecondaryButton } from "src/components/common/Button";

// Framer motion variants
const variants = {
  hidden: {
    opacity: 0,
  },
  hiddenShort: {
    opacity: 0,
    y: 40,
  },
  hiddenPlane: {
    opacity: 0,
    scale: 0.8,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

// Start component
const Starter: React.FC<{ blogs: Blog[] }> = ({ blogs }) => {
  // Navigation hook
  const navigate = useNavigate();

  // Handle navigate
  const handleButtonClick = useCallback(() => {
    navigate("/inspiration");
  }, []);

  return (
    <section className="starter relative rounded-5xl bg-main-brown lg:py-sect-medium 2xl:py-sect-semi">
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
        className="absolute -top-[5%] left-[5%] z-0 lg:w-44 xl:w-44 2xl:w-44 3xl:w-48"
      />
      <div className="h-full w-full overflow-hidden">
        <StarterBlogs blogs={blogs} />
      </div>
      <motion.div
        initial="hiddenShort"
        whileInView="visible"
        transition={{ duration: 0.5 }}
        variants={variants}
        viewport={{ once: true }}
        className="absolute -bottom-4 right-0 lg:mr-12 xl:mr-16 2xl:mr-20 3xl:mr-24"
      >
        <SecondaryButton text="Find More" onClick={handleButtonClick} />
      </motion.div>
    </section>
  );
};

export default memo(Starter);
