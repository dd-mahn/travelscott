/**
 * Get the appropriate image size based on the viewport width.
 * @param {number} viewportWidth - The width of the viewport.
 * @returns {number} - The appropriate image size.
 */
export const getImageSize = (viewportWidth: number) => {
  if (viewportWidth < 640) return 640;
  if (viewportWidth < 1024) return 1024;
  return 1440;
};

interface ImageKitOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: "auto" | "webp" | "jpg" | "png";
}

/**
 * Optimize the image URL using ImageKit transformations.
 * @param {string} src - The source URL of the image.
 * @param {ImageKitOptions} options - The options for image optimization.
 * @returns {object} - The optimized image source and srcSet.
 */
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

/**
 * Apply ImageKit transformations to the image URL.
 * @param {string} url - The URL of the image.
 * @param {ImageKitOptions} options - The options for image optimization.
 * @returns {object} - The optimized image source and srcSet.
 */
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
