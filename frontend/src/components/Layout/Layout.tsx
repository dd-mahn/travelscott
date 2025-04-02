import React, { useEffect, useState, lazy, Suspense } from "react";
import { Outlet, useLocation, useOutlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = lazy(() => import("src/components/Header/Header"));
const Footer = lazy(() => import("src/components/Footer/Footer"));
const Cursor = lazy(() => import("src/common/Cursors/Cursors"));

import LenisProvider from "src/components/Lenis/Lenis";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { selectIsDarkMode } from "src/store/slices/themeSlice";
import { useThemeInitialization } from "src/hooks/useThemeInitialization/useThemeInitialization";
import { Analytics } from "@vercel/analytics/react";
import PageTransition from "../PageTransition/PageTransition";

const Layout: React.FC = () => {
  const isDarkMode = useSelector(selectIsDarkMode);

  useThemeInitialization();

  const element = useOutlet();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <main
      className={`${isDarkMode ? "bg-background-dark" : "bg-background-light"}`}
    >
      <LenisProvider>
        <Header />
        <Cursor />
        <PageTransition>
          {element && React.cloneElement(element, { key: location.pathname })}
        </PageTransition>
        <Footer />
        <SpeedInsights />
        <Analytics />
      </LenisProvider>
    </main>
  );
};

export default Layout;
