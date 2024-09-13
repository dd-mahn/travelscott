import { useState, useRef, useEffect, useCallback } from "react";
import Lenis from "lenis";

export function usePagedData(
  initialPage: number = 1,
  onPageChange: (page: number) => void,
) {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const sectionRef = useRef<HTMLElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenisRef.current?.destroy();
    };
  }, []);

  const handlePagination = useCallback(
    (newPage: number) => {
      setCurrentPage(newPage);
      onPageChange(newPage);
      if (sectionRef.current && lenisRef.current) {
        lenisRef.current.scrollTo(sectionRef.current, { offset: -100 });
      }
    },
    [onPageChange],
  );

  return { currentPage, sectionRef, handlePagination };
}
