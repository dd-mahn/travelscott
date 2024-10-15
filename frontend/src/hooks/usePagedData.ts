import { useState, useRef, useEffect, useCallback } from "react";
import Lenis from "lenis";

export function usePagedData(
  initialPage: number = 1,
  onPageChange: (page: number) => void,
) {
  // State to keep track of the current page
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  // Refs to store the section element and Lenis instance
  const sectionRef = useRef<HTMLElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis instance with configuration
    lenisRef.current = new Lenis({
      duration: 2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    });

    // Function to handle requestAnimationFrame
    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }

    // Start the animation frame loop
    requestAnimationFrame(raf);

    // Cleanup function to destroy Lenis instance
    return () => {
      lenisRef.current?.destroy();
    };
  }, []);

  // Callback to handle pagination changes
  const handlePagination = useCallback(
    (newPage: number) => {
      setCurrentPage(newPage);
      onPageChange(newPage);

      // Scroll to the section element with an offset
      if (sectionRef.current && lenisRef.current) {
        lenisRef.current.scrollTo(sectionRef.current, { offset: -100 });
      }
    },
    [onPageChange],
  );

  // Return the current page, section ref, and pagination handler
  return { currentPage, sectionRef, handlePagination };
}
