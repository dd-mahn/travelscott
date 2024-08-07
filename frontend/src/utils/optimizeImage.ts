export const optimizeImage = (src: string) => {
  const extension = src.split(".").pop();
  const baseName = src.replace(`.${extension}`, "");
  return {
    src,
    srcSet: `${src} 1x `
  };
};