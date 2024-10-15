import React, { memo } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "src/store/store";
import { VisibilityVariants } from "src/utils/variants";
import { getInspirationHeading } from "src/utils/inspirationUtils";
import { selectIsDarkMode } from "src/store/slices/themeSlice";

// Define motion variants for visibility
const variants = {
  hidden: VisibilityVariants.hidden,
  visible: VisibilityVariants.visible,
};

const InspirationHero = ({ currentCategory }: { currentCategory: string }) => {
  // Get the current category image from the Redux store
  const { currentCategoryImage } = useSelector(
    (state: RootState) => state.inspiration,
  );

  // Get the heading based on the current category
  const heading = getInspirationHeading(currentCategory);

  // Determine if dark mode is enabled
  const isDarkMode = useSelector(selectIsDarkMode);

  // Determine the background style based on the current category and dark mode
  const backgroundStyle = currentCategory !== "All"
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

  // Define the gradient style for the overlay
  const overlayGradient = isDarkMode
    ? "linear-gradient(180deg, rgba(30, 33, 37, 0.5) 50%, #1e2125 100%)"
    : "linear-gradient(180deg, rgb(10.02, 10.23, 10.38, 0.2) 50%, #FBF9F7 100%)";

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{ duration: 1 }}
      variants={variants}
      className="absolute top-0 z-0 h-screen w-full"
      style={backgroundStyle}
    >
      {currentCategory !== "All" && (
        <motion.div
          initial="hiddenY"
          animate="visible"
          transition={{ duration: 1 }}
          className="h-full w-full"
          style={{
            background: overlayGradient,
          }}
        />
      )}
    </motion.div>
  );
};

export default memo(InspirationHero);
