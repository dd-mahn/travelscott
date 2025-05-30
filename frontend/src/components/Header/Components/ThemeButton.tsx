import React, { memo, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode, selectIsDarkMode, setDarkMode } from "src/store/slices/themeSlice";
import { HoverVariants } from "src/utils/constants/variants";
import { useViewportWidth } from "src/hooks/useViewportWidth/useViewportWidth";

const ThemeButton = () => {
  const viewportWidth = useViewportWidth();
  const dispatch = useDispatch();
  const isDarkMode = useSelector(selectIsDarkMode);

  // Retrieve dark mode setting from local storage on component mount
  useEffect(() => {
    const storedDarkMode = localStorage.getItem('isDarkMode');
    if (storedDarkMode) {
      dispatch(setDarkMode(JSON.parse(storedDarkMode)));
    }
  }, [dispatch]);

  // Apply or remove dark mode class based on isDarkMode state
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Handle dark mode toggle button click
  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  return (
    viewportWidth > 768 ? (
    <motion.button
      variants={HoverVariants}
      whileHover="hoverScale"
      transition={{ duration: 0.2 }}
      whileTap={{ scale: 1 }}
      title="Toggle Contrast"
      className="p-large px-1"
      onClick={handleToggleDarkMode}
    >
        <i className="ri-contrast-2-fill pointer-events-none"></i>
      </motion.button>
    ) : (
      <motion.button
      variants={HoverVariants}
      whileHover="hoverScale"
      transition={{ duration: 0.2 }}
      whileTap={{ scale: 1 }}
      title="Toggle Contrast"
      className="flex h-fit w-fit items-center justify-center rounded-md bg-background-dark px-2 py-1 dark:bg-background-light"
      onClick={handleToggleDarkMode}
    >
        <i className="ri-contrast-2-fill text-text-dark dark:text-text-light"></i>
      </motion.button>
    )
  );
};

export default ThemeButton;
