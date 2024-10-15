import React, { useState, useEffect } from "react";

// LazyImage component to load images lazily
const LazyImage = ({ src, alt, ...props }: { src: string; alt: string; [key: string]: any }) => {
  // State to keep track of the loaded image source
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);

  useEffect(() => {
    // Create a new image object
    const img = new Image();
    img.src = src;
    // Set the loadedSrc state when the image is loaded
    img.onload = () => setLoadedSrc(src);
  }, [src]);

  return (
    <img
      // Use loadedSrc if available, otherwise use a placeholder
      src={loadedSrc || "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="}
      alt={alt}
      // Apply styles for smooth transition
      style={{ opacity: loadedSrc ? 1 : 0, transition: "opacity 0.3s" }}
      {...props}
    />
  );
};

export default LazyImage;