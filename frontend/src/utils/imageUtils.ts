import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";

export const getImageSize = (viewportWidth: number) => {
  if (viewportWidth < 640) return 640;
  if (viewportWidth < 1024) return 1024;
  return 1440;
};

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

interface ImageKitOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: "auto" | "webp" | "jpg" | "png";
}

export const optimizeImage = (src: string, options: ImageKitOptions = {}) => {
  const imageKitEndpoint = "https://ik.imagekit.io/godsadeser/travelscott/";

  if (src.startsWith(imageKitEndpoint)) {
    return applyImageKitTransformations(src, options);
  }

  const s3Endpoint = "https://travelscott.s3.amazonaws.com/";
  if (src.startsWith(s3Endpoint)) {
    const imagePath = src.replace(s3Endpoint, "");
    return applyImageKitTransformations(
      `${imageKitEndpoint}${imagePath}`,
      options,
    );
  }

  return { src, srcSet: `${src} 1x` };
};

function applyImageKitTransformations(
  url: string,
  options: ImageKitOptions,
): { src: string; srcSet: string } {
  const { width, height, quality = 80, format = "auto" } = options;
  let transformations = `q-${quality},f-${format}`;

  if (width) transformations += `,w-${width}`;
  if (height) transformations += `,h-${height}`;

  const optimizedSrc = `${url}?tr=${transformations}`;

  // Create srcSet for responsive images
  const srcSet = width
    ? `${optimizedSrc} 1x, ${url}?tr=${transformations},dpr-2 2x, ${url}?tr=${transformations},dpr-3 3x`
    : `${optimizedSrc} 1x`;

  return { src: optimizedSrc, srcSet };
}
