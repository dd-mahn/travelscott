import React, { memo, useEffect, useRef, useState, useCallback } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { VisibilityVariants } from "src/utils/constants/variants";

// Define the prop types for the component
type SlideRevealIconHeadingProps = {
  iconClass: string;
  headingText: string;
};

// Define the animation variants
const variants = {
  hidden: VisibilityVariants.hidden,
  hiddenY: VisibilityVariants.hiddenY,
  hiddenFullY: VisibilityVariants.hiddenFullY,
  visible: VisibilityVariants.visible,
};

const SlideRevealIconHeading = ({
  iconClass,
  headingText,
}: SlideRevealIconHeadingProps) => {
  const [inViewed, setInViewed] = useState(false);
  const iconRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  // Check if the text is in view
  const textInViewed = useInView(textRef, { once: true });

  // Update the inViewed state when text comes into view
  useEffect(() => {
    if (textInViewed) {
      setInViewed(true);
    }
  }, [textInViewed]);

  const textControl = useAnimation();

  // Update the slide value based on the icon's width
  const updateSlideValue = useCallback(() => {
    if (inViewed && textRef.current && iconRef.current) {
      const slideValue = iconRef.current.offsetWidth + 16;
      textControl.start("visible");
      textControl.start({
        x: slideValue,
        transition: { duration: 0.5, ease: "circInOut", delay: 1 },
      });
    }
  }, [inViewed, textControl]);

  // Trigger slide value update when inViewed changes
  useEffect(() => {
    updateSlideValue();
  }, [inViewed, updateSlideValue]);

  // Add and clean up resize event listener
  useEffect(() => {
    window.addEventListener("resize", updateSlideValue);
    return () => {
      window.removeEventListener("resize", updateSlideValue);
    };
  }, [updateSlideValue]);

  return (
    <div className="relative">
      <motion.i
        ref={iconRef}
        data-testid="icon"
        variants={variants}
        whileInView="visible"
        initial="hidden"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 1.3 }}
        className={`${iconClass} h1-md absolute left-0`}
      ></motion.i>

      <div className="overflow-hidden">
        <motion.h1
          ref={textRef}
          variants={variants}
          initial="hiddenFullY"
          className="h1-md leading-[1.2]"
          animate={textControl}
          transition={{ duration: 0.5 }}
        >
          {headingText}
        </motion.h1>
      </div>
    </div>
  );
};

export default memo(SlideRevealIconHeading);
