import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { HoverVariants } from "src/utils/variants";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode, selectIsDarkMode, setDarkMode } from "src/store/slices/themeSlice";
import { useViewportWidth } from "src/utils/imageUtils";

const ThemeButton = () => {
  const viewportWidth = useViewportWidth();
  const dispatch = useDispatch();
  const isDarkMode = useSelector(selectIsDarkMode);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('isDarkMode');
    if (storedDarkMode) {
      dispatch(setDarkMode(JSON.parse(storedDarkMode)));
    }
  }, [dispatch]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <motion.button
      variants={HoverVariants}
      whileHover="hoverScale"
      transition={{ duration: 0.2 }}
      whileTap={{ scale: 1 }}
      title="Toggle Contrast"
      className={`${viewportWidth > 768 ? "p-large" : "h2-inter"} px-1`}
      onClick={handleToggleDarkMode}
    >
      <i className="ri-contrast-2-fill pointer-events-none"></i>
    </motion.button>
  );
};

export default ThemeButton;
