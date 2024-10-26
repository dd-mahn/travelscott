import React, { useEffect, useState, useCallback } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import Header from "src/components/Header/Header";
import Footer from "src/components/Footer/Footer";
import AnimatedLogoScreen from "../../common/AnimatedLogoScreen";
import Cursor from "../../common/Cursors";
import LenisProvider from "../Lenis/Lenis";

const Layout: React.FC = () => {
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingShown, setLoadingShown] = useState<boolean>(false);

  // Handle loading state for the home page
  const handleLoading = useCallback(() => {
    if (location.pathname === "/") {
      setLoading(true);
      // Show loading screen for 2 seconds
      setTimeout(() => {
        setLoading(false);
        setLoadingShown(true);
      }, 2000);
    }
  }, [location.pathname]);

  // Trigger loading handler on component mount and location change
  useEffect(() => {
    handleLoading();
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
          }}
        >
          <AnimatedLogoScreen />
        </motion.div>
      ) : (
        // Render main layout after loading
        <LenisProvider>
          <Header />
          <Cursor />
          <Outlet />
          <Footer />
        </LenisProvider>
      )}
    </AnimatePresence>
  );
};

export default Layout;
