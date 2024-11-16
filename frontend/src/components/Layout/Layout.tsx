import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";

import Header from "src/components/Header/Header";
import Footer from "src/components/Footer/Footer";
import AnimatedLogoScreen from "src/common/AnimatedLogoScreen/AnimatedLogoScreen";
import Cursor from "src/common/Cursors/Cursors";
import LenisProvider from "src/components/Lenis/Lenis";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { selectIsDarkMode } from "src/store/slices/themeSlice";

const Layout: React.FC = () => {
  const location = useLocation();
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const isHomePage = location.pathname === "/";
  const isDarkMode = useSelector(selectIsDarkMode);

  // Handle loading screen timing
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
    <main
      className={`${isDarkMode ? "bg-background-dark" : "bg-background-light"}`}
    >
      <AnimatePresence mode="wait">
        {showLoadingScreen && isHomePage ? (
          <motion.div
            key="logo-loader"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 4,
              transition: { duration: 1.5, ease: "easeInOut" },
            }}
            className={`h-screen w-screen`}
          >
            <AnimatedLogoScreen />
          </motion.div>
        ) : (
          <motion.div key={location.pathname}>
            <LenisProvider>
              <Header />
              <Cursor />
              <Outlet />
              <Footer />
              <SpeedInsights />
            </LenisProvider>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Layout;
