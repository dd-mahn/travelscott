import React from "react";
import { ReactLenis, useLenis } from 'lenis/react'
import { PropsWithChildren, useEffect } from "react";
import { useLocation } from "react-router-dom";

const LenisProvider = ({ children }: PropsWithChildren) => {
  const lenis = useLenis();
  const { pathname } = useLocation();

  useEffect(() => {
    if (lenis) {
      lenis.stop();
    }

    const handleScrollToTop = () => {
      if (lenis) {
        lenis.start();
        window.scrollTo(0, 0);
      }
    };

    handleScrollToTop();
  }, [pathname, lenis]);

  return (
    <ReactLenis className="h-full" options={{ lerp: 0.05 }} root>
      {children}
    </ReactLenis>
  );
};

export default LenisProvider;
