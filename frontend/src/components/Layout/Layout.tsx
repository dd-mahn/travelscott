import React, { useEffect, useState, useCallback } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { ReactLenis } from "lenis/dist/lenis-react";

import Header from "src/components/Header/Header";
import Footer from "src/components/Footer/Footer";
import AnimatedLogoScreen from "../common/AnimatedLogoScreen";
import useScrollToTop from "src/hooks/useScrollToTop";

const Layout = () => {
  const [loading, setLoading] = useState(false);
  const [loadingShown, setLoadingShown] = useState(false);

  const handleLoading = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLoadingShown(true);
    }, 3000);
  }, []);

  useEffect(() => {
    handleLoading();
    return () => {
      setLoading(true);
    };
  }, [handleLoading]);

  useScrollToTop();

  return (
    <>
      {loading && !loadingShown ? (
        <AnimatedLogoScreen />
      ) : (
        <ReactLenis root options={{ lerp: 0.08 }}>
          <ScrollRestoration />
          <Header />
          <Outlet />
          <Footer />
        </ReactLenis>
      )}
    </>
  );
};

export default Layout;
