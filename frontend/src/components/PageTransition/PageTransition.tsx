import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import airplane1 from "src/assets/svg/airplane-1.svg";

const slideVariants = {
  enter: {
    y: "100px",
    opacity: 0
  },

  center: {
    y: "0px",
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeInOut"
    }
  },

  exit: {
    y: "-200px",
    scale: 0.9,
    opacity: 0,
    transition: {
      duration: 1,
      ease: "easeInOut"
    }
  }
};

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();
  const [isFirstMount, setIsFirstMount] = useState(true);

  useEffect(() => {
    if (isFirstMount && location.pathname === "/") {
      setIsFirstMount(false);
      return;
    }
  }, [location.pathname]);

  if (isFirstMount && location.pathname === "/") {
    return <>{children}</>;
  }

  return (
    <motion.div
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
