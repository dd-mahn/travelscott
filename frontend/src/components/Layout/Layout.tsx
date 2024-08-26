import React, { useEffect, useState, useCallback } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { ReactLenis } from "lenis/dist/lenis-react";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";

import Header from "src/components/Header/Header";
import Footer from "src/components/Footer/Footer";
import AnimatedLogoScreen from "../common/AnimatedLogoScreen";
import Cursor from "../common/Cursors";

const Layout = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [loadingShown, setLoadingShown] = useState(false);

  const handleLoading = useCallback(() => {
    if (location.pathname === "/") {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setLoadingShown(true);
      }, 4000);
    }
  }, []);

  useEffect(() => {
    handleLoading();
    return () => {
      setLoading(false);
    };
  }, [handleLoading]);

  return (
    <AnimatePresence mode="wait">
      {loading && !loadingShown ? (
        <motion.div
          key={"logo-loader"}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          exit={{ y: "-50%", opacity: 0, transition: { duration: 0.5 } }}
        >
          <AnimatedLogoScreen />
        </motion.div>
      ) : (
        <ReactLenis root options={{ lerp: 0.05 }}>
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
