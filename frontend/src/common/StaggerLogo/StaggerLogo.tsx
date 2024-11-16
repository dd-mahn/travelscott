import React, { memo, useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { selectIsDarkMode } from "src/store/slices/themeSlice";
import { VisibilityVariants } from "src/utils/constants/variants";

// Define animation variants
const variants = {
  hiddenY: VisibilityVariants.hiddenY,
  hiddenFullY: VisibilityVariants.hiddenFullY,
  visible: VisibilityVariants.visible,
};

interface StaggerLogoProps {
  containerClassName?: string;
}

function StaggerLogo({
  containerClassName = "",
}: StaggerLogoProps) {
  const isDarkMode = useSelector(selectIsDarkMode);
  const text = "TravelScott";
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState(16);

  const resizeText = useCallback(() => {
    const container = containerRef.current;
    const textElement = textRef.current;

    if (!container || !textElement) return;

    // Reset font size to ensure accurate width calculation
    textElement.style.fontSize = "16px";
    
    // Get the container width after a small delay to ensure styles are applied
    requestAnimationFrame(() => {
      if (!container || !textElement) return;
      
      const containerWidth = container.offsetWidth;
      const scale = containerWidth / textElement.offsetWidth;
      const newFontSize = Math.floor(16 * scale * 0.95); // 0.95 for safety margin
      
      setFontSize(newFontSize);
    });
  }, []);

  // Initial resize
  useEffect(() => {
    // Wait for container to be properly rendered
    const timer = setTimeout(() => {
      resizeText();
    }, 100);

    return () => clearTimeout(timer);
  }, [resizeText]);

  // Handle resize events with debounce
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(resizeText, 100);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, [resizeText]);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none flex w-screen items-center justify-start overflow-y-hidden font-logo leading-[1] ${
        isDarkMode ? 'text-text-dark' : 'text-text-light'
      } ${containerClassName}`}
    >
      <div
        ref={textRef}
        className="whitespace-nowrap"
        style={{ fontSize: `${fontSize}px` }}
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
            className={`inline-block w-fit select-none ${
              isDarkMode ? 'text-text-dark' : 'text-text-light'
            } `}
          >
            {char}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

export default memo(StaggerLogo);
