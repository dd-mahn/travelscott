import { describe, it, expect } from "vitest";
import { getImageSize, optimizeImage } from "src/utils/imageUtils";

describe("imageUtils", () => {
  describe("getImageSize", () => {
    it("should return 640 for viewport width less than 640", () => {
      expect(getImageSize(639)).toBe(640);
      expect(getImageSize(320)).toBe(640);
    });

    it("should return 1024 for viewport width between 640 and 1023", () => {
      expect(getImageSize(640)).toBe(1024);
      expect(getImageSize(800)).toBe(1024);
      expect(getImageSize(1023)).toBe(1024);
    });

    it("should return 1440 for viewport width 1024 or greater", () => {
      expect(getImageSize(1024)).toBe(1440);
      expect(getImageSize(1920)).toBe(1440);
    });
  });

  describe("optimizeImage", () => {
    const imageKitEndpoint = "https://ik.imagekit.io/godsadeser/travelscott/";
    const s3Endpoint = "https://travelscott.s3.amazonaws.com/";

    it("should handle ImageKit URLs correctly", () => {
      const src = `${imageKitEndpoint}test-image.jpg`;
      const result = optimizeImage(src, { width: 800, quality: 75 });

      expect(result.src).toBe(`${src}?tr=q-75,f-auto,w-800`);
      expect(result.srcSet).toBe(
        `${src}?tr=q-75,f-auto,w-800 1x, ${src}?tr=q-75,f-auto,w-800,dpr-2 2x, ${src}?tr=q-75,f-auto,w-800,dpr-3 3x`
      );
    });

    it("should convert S3 URLs to ImageKit URLs", () => {
      const s3Src = `${s3Endpoint}test-image.jpg`;
      const expectedImageKitUrl = `${imageKitEndpoint}test-image.jpg`;
      const result = optimizeImage(s3Src, { width: 800, quality: 75 });

      expect(result.src).toBe(`${expectedImageKitUrl}?tr=q-75,f-auto,w-800`);
      expect(result.srcSet).toBe(
        `${expectedImageKitUrl}?tr=q-75,f-auto,w-800 1x, ${expectedImageKitUrl}?tr=q-75,f-auto,w-800,dpr-2 2x, ${expectedImageKitUrl}?tr=q-75,f-auto,w-800,dpr-3 3x`
      );
    });

    it("should use default options when none provided", () => {
      const src = `${imageKitEndpoint}test-image.jpg`;
      const result = optimizeImage(src);

      expect(result.src).toBe(`${src}?tr=q-80,f-auto`);
      expect(result.srcSet).toBe(`${src}?tr=q-80,f-auto 1x`);
    });

    it("should return original URL for non-ImageKit/S3 URLs", () => {
      const externalSrc = "https://example.com/image.jpg";
      const result = optimizeImage(externalSrc);

      expect(result.src).toBe(externalSrc);
      expect(result.srcSet).toBe(`${externalSrc} 1x`);
    });

    it("should handle height parameter correctly", () => {
      const src = `${imageKitEndpoint}test-image.jpg`;
      const result = optimizeImage(src, { height: 600, quality: 75 });

      expect(result.src).toBe(`${src}?tr=q-75,f-auto,h-600`);
      expect(result.srcSet).toBe(`${src}?tr=q-75,f-auto,h-600 1x`);
    });
  });
});
