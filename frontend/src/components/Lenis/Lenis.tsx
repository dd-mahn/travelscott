import React from "react";
import { ReactLenis, useLenis } from 'lenis/react'
import { PropsWithChildren, useEffect } from "react";
import { useLocation } from "react-router-dom";

const LenisProvider = ({ children }: PropsWithChildren) => {
  const lenis = useLenis();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!lenis) return;
    
    lenis.stop();
    window.scrollTo(0, 0);
    
    // Start Lenis after scroll
    const timeoutId = setTimeout(() => {
      lenis.start();
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      lenis.stop();
    };
  }, [pathname, lenis]);

  return (
    <ReactLenis 
      className="h-full" 
      root 
      options={{ 
        lerp: 0.05,
        duration: 2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      }}
    >
      {children}
    </ReactLenis>
  );
};

export default LenisProvider;
