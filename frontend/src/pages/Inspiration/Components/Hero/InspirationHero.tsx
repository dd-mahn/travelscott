import React, { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "src/store/store";
import { VisibilityVariants } from "src/utils/constants/variants";
import { getInspirationHeading } from "src/utils/inspirationUtils";
import { selectIsDarkMode } from "src/store/slices/themeSlice";

// Define motion variants for visibility
const variants = {
  hidden: VisibilityVariants.hidden,
  visible: VisibilityVariants.visible,
};

const InspirationHero = memo(({ currentCategory }: { currentCategory: string }) => {
  // Get the current category image from the Redux store
  const { currentCategoryImage } = useSelector(
    (state: RootState) => state.inspiration,
  );

  // Determine if dark mode is enabled
  const isDarkMode = useSelector(selectIsDarkMode);

  // Memoize the heading based on the current category
  const heading = useMemo(() => 
    getInspirationHeading(currentCategory),
  [currentCategory]);

  // Memoize the background style based on the current category and dark mode
  const backgroundStyle = useMemo(() => {
    return currentCategory !== "All"
      ? {
          backgroundImage: `url(${currentCategoryImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }
      : {
          background: `var(--${heading
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/\d{4}/, "")
            .trim()}gradient${isDarkMode ? "-dark" : ""})`,
        };
  }, [currentCategory, currentCategoryImage, heading, isDarkMode]);

  // Memoize the gradient style for the overlay
  const overlayGradient = useMemo(() => {
    return isDarkMode
      ? "linear-gradient(180deg, rgba(30, 33, 37, 0.5) 50%, #1e2125 100%)"
      : "linear-gradient(180deg, rgb(10.02, 10.23, 10.38, 0.2) 50%, #FBF9F7 100%)";
  }, [isDarkMode]);

  return (
    <motion.div
      data-testid="hero-container"
      initial="hidden"
      animate="visible"
      transition={{ duration: 1 }}
      variants={variants}
      className="absolute top-0 z-0 h-screen w-full hero-layer"
      style={backgroundStyle}
    >
      {currentCategory !== "All" && (
        <motion.div
          data-testid="hero-overlay"
          initial="hiddenY"
          animate="visible"
          transition={{ duration: 1 }}
          className="h-full w-full hero-image-layer"
          style={{
            background: overlayGradient,
          }}
        />
      )}
    </motion.div>
  );
});

export default InspirationHero;
