import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import Header from "src/components/Header/Header";
import Footer from "src/components/Footer/Footer";
import AnimatedLogoScreen from "src/common/AnimatedLogoScreen/AnimatedLogoScreen";
import Cursor from "src/common/Cursors/Cursors";
import LenisProvider from "src/components/Lenis/Lenis";

const Layout: React.FC = () => {
  const location = useLocation();
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    if (isHomePage) {
      const timer = setTimeout(() => {
        setShowLoadingScreen(false);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setShowLoadingScreen(false);
    }
  }, [isHomePage]);

  return (
    <AnimatePresence mode="wait">
      {showLoadingScreen && isHomePage ? (
        <motion.div
          key="logo-loader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 4,
            transition: { duration: 1.5, ease: "easeInOut" }
          }}
        >
          <AnimatedLogoScreen />
        </motion.div>
      ) : (
        <motion.div
          key={location.pathname}
        >
          <LenisProvider>
            <Header />
            <Cursor />
            <Outlet />
            <Footer />
          </LenisProvider>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Layout;
