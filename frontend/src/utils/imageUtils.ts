import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";

export const getImageSize = (viewportWidth: number) => {
    if (viewportWidth < 640) return 640;
    if (viewportWidth < 1024) return 1024;
    return 1440;
  };
  
  export const useViewportWidth = () => {
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  
    const handleResize = useCallback(
      debounce(() => {
        setViewportWidth(window.innerWidth);
      }, 100),
      [],
    );
  
    useEffect(() => {
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, [handleResize]);
  
    return viewportWidth;
  };