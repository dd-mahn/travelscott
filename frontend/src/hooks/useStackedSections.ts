import { useRef, useEffect, useCallback } from 'react';

function useStackedSections() {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const setRef = useCallback((index: number) => (el: HTMLElement | null) => {
    sectionRefs.current[index] = el;
  }, []);

  const updateSectionTops = useCallback(() => {
    let previousBottom = 0;
    sectionRefs.current.forEach((section, index) => {
      if (section) {
        const topValue = Math.min(previousBottom, window.innerHeight - section.offsetHeight);
        section.style.top = `${topValue}px`;
        previousBottom = topValue + section.offsetHeight;
        console.log(`Section ${index} top set to: ${topValue}px`);
      }
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateSectionTops();
      console.log("Initial update of section tops");
    }, 1000);

    window.addEventListener('resize', updateSectionTops);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateSectionTops);
    };
  }, [updateSectionTops]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      updateSectionTops();
      console.log("Mutation observed, updating section tops");
    });
    sectionRefs.current.forEach(section => {
      if (section) {
        observer.observe(section, { childList: true, subtree: true, attributes: true });
      }
    });
    return () => observer.disconnect();
  }, [updateSectionTops]);

  return { refs: sectionRefs, setRef };
}

export default useStackedSections;

