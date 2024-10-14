import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { VisibilityVariants } from "src/utils/variants";

const variants = {
  hiddenY: VisibilityVariants.hiddenY,
  hiddenFullY: VisibilityVariants.hiddenFullY,
  visible: VisibilityVariants.visible,
};

interface StaggerLogoProps {
  containerClassName?: string;
}

export default function StaggerLogo({
  containerClassName = "",
}: StaggerLogoProps) {
  const text = "TravelScott";
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState(16); // Default size

  useEffect(() => {
    const handleResize = () => {
      resizeText();
    };

    resizeText();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const resizeText = () => {
    const container = containerRef.current;
    const textElement = textRef.current;

    if (!container || !textElement) {
      return;
    }

    const containerWidth = container.offsetWidth;
    let min = 1;
    let max = 2500;

    while (min <= max) {
      const mid = Math.floor((min + max) / 2);
      textElement.style.fontSize = mid + "px";

      if (textElement.offsetWidth <= containerWidth) {
        min = mid + 1;
      } else {
        max = mid - 1;
      }
    }

    // Ensure the font size is set correctly after the loop
    textElement.style.fontSize = max + "px";
    setFontSize(max);
  };

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none flex w-screen items-center justify-start overflow-y-hidden font-logo leading-[1] ${containerClassName}`}
    >
      <div
        ref={textRef}
        className="whitespace-nowrap"
        style={{ fontSize: `${fontSize * 0.95}px` }}
      >
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            initial="hiddenFullY"
            whileInView="visible"
            viewport={{ once: true }}
            variants={variants}
            transition={{
              duration: 1,
              type: "spring",
              bounce: 0.4,
              delay: index * 0.05,
            }}
            className="inline-block w-fit select-none"
          >
            {char}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
