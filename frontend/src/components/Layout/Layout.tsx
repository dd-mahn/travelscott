import React, { useEffect, useState, useCallback } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { ReactLenis } from "lenis/dist/lenis-react";

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
      }, 3000);
    }
  }, []);

  useEffect(() => {
    handleLoading();
    return () => {
      setLoading(false);
    };
  }, [handleLoading]);

  return (
    <>
      {loading && !loadingShown ? (
        <AnimatedLogoScreen />
      ) : (
        <ReactLenis root options={{ lerp: 0.05 }}>
          <ScrollRestoration />
          <Header />
          <Cursor />
          <Outlet />
          <Footer />
        </ReactLenis>
      )}
    </>
  );
};

export default Layout;
