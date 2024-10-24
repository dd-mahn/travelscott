import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";

/**
 * Custom hook to get the current viewport width and update it on resize.
 * @returns {number} - The current viewport width.
 */
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
