import { useEffect, useRef } from "react";

const useLazyBackgroundImage = (imageUrl: string) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (ref.current) {
              ref.current.style.backgroundImage = `url(${imageUrl})`;
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [imageUrl]);

  return ref;
};

export default useLazyBackgroundImage;
