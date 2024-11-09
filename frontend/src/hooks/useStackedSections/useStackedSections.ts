import { useRef, useEffect, useCallback } from "react";

function useStackedSections() {
  // Reference to hold the section elements
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // Function to set the reference for each section
  const setRef = useCallback(
    (index: number) => (el: HTMLElement | null) => {
      sectionRefs.current[index] = el;
    },
    [],
  );

  // Function to update the top position of each section
  const updateSectionTops = useCallback(() => {
    let previousBottom = 0;
    sectionRefs.current.forEach((section, index) => {
      if (section) {
        const topValue = section.offsetHeight < window.innerHeight
          ? 0
          : Math.min(previousBottom, window.innerHeight - section.offsetHeight);
        
        section.style.top = `${topValue}px`;
        previousBottom = topValue + section.offsetHeight;
      }
    });
  }, []);

  // Effect to handle initial update and window resize events
  useEffect(() => {
    const timer = setTimeout(() => {
      updateSectionTops();
    }, 1000);

    window.addEventListener("resize", updateSectionTops);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateSectionTops);
    };
  }, [updateSectionTops]);

  // Effect to handle mutations in the section elements
  useEffect(() => {
    if (sectionRefs.current.length > 0) {
      const observer = new MutationObserver(() => {
        updateSectionTops();
      });
      sectionRefs.current.forEach((section) => {
        if (section) {
          observer.observe(section, {
            childList: true,
            subtree: true,
            attributes: true,
          });
        }
      });
      return () => observer.disconnect();
    }
  }, [updateSectionTops]);

  return { refs: sectionRefs, setRef };
}

export default useStackedSections;
