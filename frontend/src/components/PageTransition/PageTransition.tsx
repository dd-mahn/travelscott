import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import airplane1 from "src/assets/svg/airplane-1.svg";
import { useSelector } from "react-redux";
import { selectIsDarkMode } from "src/store/slices/themeSlice";

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();
  const isDarkMode = useSelector(selectIsDarkMode);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("Location changed:", location.key);
    console.log(`loader-${location.pathname}-${location.key}`);
    console.log(`page-${location.pathname}-${location.key}`);
    // Start transition on location change
    setIsLoading(true);

    // End transition after delay
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [location.key]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      {isLoading ? (
        <motion.div
          key={`loader-${location.pathname}-${location.key}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onAnimationComplete={() => console.log("Animation complete")}
          className={`flex h-screen w-screen items-center justify-center ${
            isDarkMode ? "bg-background-dark" : "bg-background-light"
          }`}
        >
          <img
            src={airplane1}
            alt="airplane"
            className="h-16 w-16 animate-bounce"
          />
        </motion.div>
      ) : (
        <motion.div
          key={`page-${location.pathname}-${location.key}`}
          initial={{ opacity: 0, filter: "blur(8px)" }}
          animate={{
            opacity: 1,
            filter: "blur(0px)",
            transition: { duration: 0.5, ease: "easeInOut" },
          }}
          exit={{
            opacity: 0,
            filter: "blur(8px)",
            transition: { duration: 0.3, ease: "easeInOut" },
          }}
          onAnimationComplete={() => console.log("Animation complete")}
          className={`${isDarkMode ? "bg-background-dark" : "bg-background-light"}`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageTransition;
