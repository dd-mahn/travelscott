import React, { useEffect, useState, useCallback } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import Header from "src/components/Header/Header";
import Footer from "src/components/Footer/Footer";
import AnimatedLogoScreen from "src/common/AnimatedLogoScreen/AnimatedLogoScreen";
import Cursor from "src/common/Cursors/Cursors";
import LenisProvider from "src/components/Lenis/Lenis";
// import PageTransition from "src/components/PageTransition/PageTransition";

const Layout: React.FC = () => {
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingFinished, setLoadingFinished] = useState<boolean>(false);
  // const [loadingEnded, setLoadingEnded] = useState<boolean>(false);

  // Handle loading state for the home page
  const handleLoading = useCallback(() => {
    if (location.pathname === "/") {
      setLoading(true);
      // Show loading screen for 2 seconds
      setTimeout(() => {
        setLoading(false);
        setLoadingFinished(true);
      }, 2000);

      // setTimeout(() => {
      //   setLoadingEnded(true);
      // }, 1500);
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
      scale: 4,
      transition: { duration: 1.5, ease: "easeInOut" },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {loading && !loadingFinished ? (
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
