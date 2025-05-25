import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import airplane1 from "src/assets/svg/airplane-1.svg";
import { useSelector, useDispatch } from "react-redux";
import { selectIsDarkMode } from "src/store/slices/themeSlice";
import { RootState } from "src/store/store";
import { setPageLoading } from "src/store/slices/loadingSlice";

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();
  const isDarkMode = useSelector(selectIsDarkMode);
  const dispatch = useDispatch();
  const [forceRender, setForceRender] = useState(false);

  // Get current page from location pathname
  const rawPath = location.pathname.split("/")[1] || "home";

  // Map the path segment to an actual page name
  const getPageName = (path: string, nestedPath?: string): string => {
    if (path === "discover") {
      if (nestedPath === "countries") return "country";
      if (nestedPath === "destinations") return "destination";
      return "discover";
    }
    if (path === "inspiration" && nestedPath) {
      return "article";
    }
    return path;
  };

  const nestedPath = location.pathname.split("/")[2];
  const currentPage = getPageName(rawPath, nestedPath);

  // Debug loading state info
  const loadingState = useSelector((state: RootState) => ({
    pageLoading: state.loading.pageLoading,
    requestLoading: state.loading.requestLoading,
    activeRequests: state.loading.activeRequests,
    lastUpdated: state.loading.lastUpdated,
  }));

  // Use the loading state from Redux
  const isLoading = useSelector((state: RootState) => {
    return state.loading.pageLoading[currentPage] || false;
  });

  // Get content loading state
  const isContentLoading = useSelector((state: RootState) => {
    return state.loading.isContentLoading[currentPage] || false;
  });

  // Safety mechanism to prevent infinite loading
  useEffect(() => {
    // Reset force render state on location change
    setForceRender(false);

    let timeoutId: NodeJS.Timeout;

    // Set a timeout to force loading to complete after 2 seconds
    if (isLoading && !isContentLoading) {
      timeoutId = setTimeout(() => {
        dispatch(setPageLoading({ page: currentPage, isLoading: false }));
        setForceRender(true);
      }, 2000);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [currentPage, isLoading, isContentLoading, dispatch, location.pathname]);

  // Determine if we should show loading screen - only for page loading, not content loading
  const shouldShowLoading = isLoading && !isContentLoading && !forceRender;

  return (
    <AnimatePresence mode="wait" initial={false}>
      {shouldShowLoading ? (
        <motion.div
          key={`loader-${location.pathname}-${location.key}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, staggerChildren: 0.3 }}
          className={`flex h-screen w-screen items-center justify-center ${
            isDarkMode ? "bg-background-dark" : "bg-background-light"
          }`}
        >
          <div className="h-[150px] w-[150px] rounded-full bg-background-dark-green flex items-center justify-center">
            <motion.img
              src={airplane1}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              alt="airplane"
              className="h-20 w-20 animate-bounce"
            />
          </div>
        </motion.div>
      ) : (
        <motion.div
          key={`page-${location.pathname}-${location.key}`}
          initial={{ opacity: 0, filter: "blur(8px)" }}
          animate={{
            opacity: 1,
            filter: "blur(0px)",
            transition: { duration: 0.5, ease: "easeInOut" },
          }}
          exit={{
            opacity: 0,
            filter: "blur(8px)",
            transition: { duration: 0.3, ease: "easeInOut" },
          }}
          className={`${isDarkMode ? "bg-background-dark" : "bg-background-light"}`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageTransition;
