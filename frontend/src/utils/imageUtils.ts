/**
 * Get the appropriate image size based on the viewport width.
 * @param {number} containerWidth - The width of the container.
 * @param {number} viewportWidth - The width of the viewport.
 * @param {number} devicePixelRatio - The device pixel ratio.
 * @returns {number} - The appropriate image size.
 */
export const getImageSize = (
  containerWidth: number,
  viewportWidth: number,
  devicePixelRatio = window.devicePixelRatio
) => {
  // Base size on container width
  const baseWidth = Math.ceil(containerWidth * devicePixelRatio);
  
  // Round up to nearest breakpoint for caching efficiency
  const breakpoints = [320, 640, 768, 1024, 1280, 1440, 1920];
  const optimalWidth = breakpoints.find(bp => bp >= baseWidth) || breakpoints[breakpoints.length - 1];
  
  // Never exceed viewport width
  return Math.min(optimalWidth, viewportWidth);
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

/**
 * Detect the optimal format for the image.
 * @returns {string} - The optimal format.
 */
const detectOptimalFormat = () => {
  if (window.navigator.userAgent.includes('Safari') && !window.navigator.userAgent.includes('Chrome')) {
    return 'jpg'; // Safari has better jpg performance
  }
  return 'webp'; // Default to WebP for better compression
};

/**
 * Determine the quality for the image.
 * @param {number} width - The width of the image.
 * @returns {number} - The quality.
 */
const determineQuality = (width?: number) => {
  if (!width) return 80;
  // Adjust quality based on image size
  if (width <= 640) return 85;
  if (width <= 1024) return 80;
  return 75; // Lower quality for larger images
};
