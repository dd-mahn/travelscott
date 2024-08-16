import React, { memo, useCallback } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Component imports
import HorizontalScrollCarousel from "./FeaturedHorizontalScroller";
import { featuredDemo } from "src/data/featuredDemo";
import { SecondaryButton } from "src/components/common/Button";

// Framer motion variants
const variants = {
  hidden: {
    opacity: 0,
  },
  hiddenShort: {
    opacity: 0,
    y: 20,
  },
  hiddenY: (y: string) => {
    return { y: y };
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

// Featured component
const Featured: React.FC = () => {
  // Navigate hook
  const navigate = useNavigate();

  // Handle button 
  const handleButtonClick = useCallback(() => {
    navigate("/discover");
  }, []);

  return (
    <section className="featured flex flex-col lg:gap-28 xl:gap-32 2xl:gap-36 3xl:gap-40">
      <div className="px-sect grid w-full place-items-center overflow-hidden">
        <motion.h1
          initial={variants.hiddenY("var(--y-from)")}
          whileInView="visible"
          viewport={{ once: true }}
          variants={variants}
          className="h1-md relative lg:[--y-from:75px] 2xl:[--y-from:100px] 3xl:[--y-from:120px]"
        >
          <i className="ri-shining-2-fill rotate-30 absolute -left-[5%] -top-0 transform text-yellow lg:text-3xl xl:text-4xl 2xl:text-4xl 3xl:text-5xl"></i>{" "}
          Featured Destinations
        </motion.h1>
      </div>
      <HorizontalScrollCarousel data={featuredDemo} />
      <div className="px-sect flex w-full flex-row justify-between">
        <motion.p
          initial="hiddenShort"
          whileInView="visible"
          viewport={{ once: true, margin: "0% 0% -10% 0%" }}
          variants={variants}
          className="p-large"
        >
          They are just so few among the{" "}
          <span className="font-semibold text-main-brown lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl">
            100
          </span>
          + <br />
          destinations that we have covered in our Catalogue.
        </motion.p>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0% 0% -10% 0%" }}
          transition={{ delay: 0.3, staggerChildren: 0.1 }}
          variants={variants}
          className="relative flex items-end"
        >
          <div className="blob blur-blob absolute z-0 h-full w-1/3"></div>
          <SecondaryButton text="Discover More" onClick={handleButtonClick} />
        </motion.div>
      </div>
    </section>
  );
};

export default memo(Featured);
