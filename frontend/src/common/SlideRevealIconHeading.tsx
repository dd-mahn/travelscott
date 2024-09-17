import React, { memo, useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { VisibilityVariants } from "src/utils/variants";

type SlideRevealIconHeadingProps = {
  iconClass: string;
  headingText: string;
};

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

  const textInViewed = useInView(textRef, { once: true });

  useEffect(() => {
    if (textInViewed) {
      setInViewed(true);
    }
  }, [textInViewed]);

  const textControl = useAnimation();

  useEffect(() => {
    if (inViewed && textRef.current && iconRef.current) {
      const slideValue = iconRef.current.offsetWidth + 16;
      textControl.start("visible");
      textControl.start({
        x: slideValue,
        transition: { duration: 0.5, ease: "circInOut", delay: 1 },
      });
    }
  }, [inViewed]);

  return (
    <div className="relative">
      <motion.i
        ref={iconRef}
        variants={variants}
        whileInView="visible"
        initial="hidden"
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 1.3 }}
        className={`${iconClass} h1-md absolute left-0`}
      ></motion.i>

      <div className="overflow-hidden">
        <motion.h1
          ref={textRef}
          variants={variants}
          initial="hiddenFullY"
          className="h1-md"
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
