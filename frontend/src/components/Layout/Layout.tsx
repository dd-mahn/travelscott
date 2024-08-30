import React, { useEffect, useState, useCallback } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { ReactLenis } from "lenis/dist/lenis-react";
import { motion, AnimatePresence } from "framer-motion";

import Header from "src/components/Header/Header";
import Footer from "src/components/Footer/Footer";
import AnimatedLogoScreen from "../common/AnimatedLogoScreen";
import Cursor from "../common/Cursors";

const Layout: React.FC = () => {
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingShown, setLoadingShown] = useState<boolean>(false);

  // Handle loading state for the home page
  const handleLoading = useCallback(() => {
    if (location.pathname === "/") {
      setLoading(true);
      // Show loading screen for 3 seconds
      setTimeout(() => {
        setLoading(false);
        setLoadingShown(true);
      }, 3000);
    }
  }, [location.pathname]);

  // Trigger loading handler on component mount and location change
  useEffect(() => {
    handleLoading();
    return () => {
      setLoading(false);
    };
  }, [handleLoading]);

  // Animation variants for the loader
  const loaderVariants = {
    initial: { opacity: 1 },
    exit: {
      opacity: 0,
      scale: 0.1,
      transition: { duration: 1.5, ease: "easeInOut" },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {loading && !loadingShown ? (
        // Render AnimatedLogoScreen while loading
        <motion.div
          key="logo-loader"
          variants={loaderVariants}
          initial="initial"
          exit="exit"
          transition={{
            duration: 2,
            ease: "easeInOut",
            layout: { duration: 10, ease: "easeInOut" },
          }}
          layoutId="main-logo"
          layoutRoot
        >
          <AnimatedLogoScreen />
        </motion.div>
      ) : (
        // Render main layout after loading
        <ReactLenis root options={{ lerp: 0.02 }}>
          <ScrollRestoration />
          <Header />
          <Cursor />
          <Outlet />
          <Footer />
        </ReactLenis>
      )}
    </AnimatePresence>
  );
};

export default Layout;
