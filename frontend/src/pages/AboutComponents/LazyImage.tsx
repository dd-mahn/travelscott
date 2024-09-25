import React, { useState, useEffect } from "react";

const LazyImage = ({ src, alt, ...props }: { src: string; alt: string; [key: string]: any }) => {
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setLoadedSrc(src);
  }, [src]);

  return (
    <img
      src={loadedSrc || "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="}
      alt={alt}
      style={{ opacity: loadedSrc ? 1 : 0, transition: "opacity 0.3s" }}
      {...props}
    />
  );
};

export default LazyImage;