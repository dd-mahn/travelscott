import { useState, useRef, useEffect, useCallback } from "react";
import Lenis from "lenis";

export function usePagedData() {
  const [currentPage, setCurrentPage] = useState<number>(1);
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
      if (sectionRef.current && lenisRef.current) {
        lenisRef.current.scrollTo(sectionRef.current, { offset: -100 });
      }
    },
    [],
  );

  return { currentPage, sectionRef, handlePagination };
}
