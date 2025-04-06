import React, { useEffect, lazy } from "react";
import { useOutlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Header = lazy(() => import("src/components/Header/Header"));
const Footer = lazy(() => import("src/components/Footer/Footer"));
const Cursor = lazy(() => import("src/common/Cursors/Cursors"));
const LoadingDebugger = lazy(() => import("src/components/LoadingDebugger/LoadingDebugger"));

import LenisProvider from "src/components/Lenis/Lenis";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { selectIsDarkMode } from "src/store/slices/themeSlice";
import { useThemeInitialization } from "src/hooks/useThemeInitialization/useThemeInitialization";
import { Analytics } from "@vercel/analytics/react";
import PageTransition from "../PageTransition/PageTransition";
import { resetStuckLoadingStates } from "src/store/slices/loadingSlice";

const Layout: React.FC = () => {
  const isDarkMode = useSelector(selectIsDarkMode);
  const dispatch = useDispatch();

  useThemeInitialization();

  const element = useOutlet();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  // Periodically check for stuck loading states
  useEffect(() => {
    // Initial check for stuck loading states after 2 seconds
    const initialCheckTimeout = setTimeout(() => {
      dispatch(resetStuckLoadingStates());
    }, 2000);

    // Set up interval to periodically check for stuck loading states
    const intervalId = setInterval(() => {
      dispatch(resetStuckLoadingStates());
    }, 5000); // Check every 5 seconds

    return () => {
      clearTimeout(initialCheckTimeout);
      clearInterval(intervalId);
    };
  }, [dispatch]);

  return (
    <main
      className={`${isDarkMode ? "bg-background-dark" : "bg-background-light"}`}
    >
      <LenisProvider>
        <Header />
        <Cursor />
        <PageTransition>
          {element}
        </PageTransition>
        <Footer />
        <LoadingDebugger />
        <SpeedInsights />
        <Analytics />
      </LenisProvider>
    </main>
  );
};

export default Layout;
