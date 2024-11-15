import { useRef, useEffect, useCallback, useState } from "react";

function useStackedSections() {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const updateTimeoutRef = useRef<NodeJS.Timeout>();
  const observersRef = useRef<{
    mutation?: MutationObserver;
    resize?: ResizeObserver;
  }>({});
  const [initialized, setInitialized] = useState(false);

  const setRef = useCallback((index: number) => (el: HTMLElement | null) => {
    const prevEl = sectionRefs.current[index];
    if (prevEl === el) return;

    sectionRefs.current[index] = el;
    if (!initialized && el) {
      setInitialized(true);
    }
  }, [initialized]);

  const updateSectionTops = useCallback(() => {
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }

    const scheduleUpdate = () => {
      requestAnimationFrame(() => {
        let previousBottom = 0;
        sectionRefs.current.forEach((section) => {
          if (section) {
            const topValue = section.offsetHeight < window.innerHeight
              ? 0
              : Math.min(previousBottom, window.innerHeight - section.offsetHeight);
            
            section.style.top = `${topValue}px`;
            previousBottom = topValue + section.offsetHeight;
          }
        });
      });
    };

    scheduleUpdate();
    updateTimeoutRef.current = setTimeout(scheduleUpdate, 100);
    updateTimeoutRef.current = setTimeout(scheduleUpdate, 300);
    updateTimeoutRef.current = setTimeout(scheduleUpdate, 600);
  }, []);

  useEffect(() => {
    updateSectionTops();
    window.addEventListener("resize", updateSectionTops);
    
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
      window.removeEventListener("resize", updateSectionTops);
    };
  }, [updateSectionTops]);

  useEffect(() => {
    if (!initialized) return;

    observersRef.current.mutation?.disconnect();
    observersRef.current.resize?.disconnect();

    observersRef.current.mutation = new MutationObserver(updateSectionTops);
    observersRef.current.resize = new ResizeObserver(updateSectionTops);

    sectionRefs.current.forEach((section) => {
      if (section) {
        observersRef.current.mutation?.observe(section, {
          childList: true,
          subtree: true,
          attributes: true,
          characterData: true,
        });
        observersRef.current.resize?.observe(section);

        section.querySelectorAll('*').forEach(element => {
          observersRef.current.resize?.observe(element);
        });
      }
    });

    return () => {
      observersRef.current.mutation?.disconnect();
      observersRef.current.resize?.disconnect();
    };
  }, [updateSectionTops, initialized]);

  return { refs: sectionRefs, setRef };
}

export default useStackedSections;
