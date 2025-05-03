import React, { useEffect, useState, lazy, Suspense, useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";

const Header = lazy(() => import('src/components/Header/Header'));
const Footer = lazy(() => import('src/components/Footer/Footer'));
const Cursor = lazy(() => import('src/common/Cursors/Cursors'));

import AnimatedLogoScreen from "src/common/AnimatedLogoScreen/AnimatedLogoScreen";
import LenisProvider from "src/components/Lenis/Lenis";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { selectIsDarkMode } from "src/store/slices/themeSlice";
import { useThemeInitialization } from "src/hooks/useThemeInitialization/useThemeInitialization";

const Layout: React.FC = () => {
  const location = useLocation();
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);
  const isHomePage = location.pathname === "/";
  const isDarkMode = useSelector(selectIsDarkMode);

  useThemeInitialization();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  // useEffect(() => {
  //   if (isHomePage) {
  //     const handle = setTimeout(() => {
  //       setShowLoadingScreen(false);
  //     }, 2000);
      
  //     return () => clearTimeout(handle);
  //   }
  //   setShowLoadingScreen(false);
  // }, [isHomePage]);

  const content = useMemo(() => (
    <LenisProvider>
      <Header />
      <Cursor />
      <Outlet />
      <Footer />
      <SpeedInsights />
    </LenisProvider>
  ), []);

  return (
    <main
      className={`${isDarkMode ? "bg-background-dark" : "bg-background-light"}`}
    >
      <AnimatePresence mode="wait">
        {showLoadingScreen && isHomePage ? (
          <Suspense fallback={null}>
            <motion.div
              key="logo-loader"
              initial={{ opacity: 1 }}
              exit={{
                opacity: 0,
                scale: 4,
                transition: { duration: 1.5, ease: "easeInOut" },
              }}
              className="h-screen w-screen"
            >
              <AnimatedLogoScreen />
            </motion.div>
          </Suspense>
        ) : (
          <motion.div key={location.pathname}>
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Layout;
