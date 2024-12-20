// Visibility Variants for different animation states
export const VisibilityVariants = {
  visible: { opacity: 1, y: 0, x: 0, scale: 1 },
  hidden: { opacity: 0 },
  hiddenY: { opacity: 0, y: 40 },
  hiddenShortY: { opacity: 0, y: 20 },
  hiddenFullY: { y: "100%" },
  hiddenYScale: { scale: 0.95, y: 100, opacity: 0 },
  hiddenX: { x: 1000, opacity: 0 },
  hiddenScale: {
    scale: [0.9, 0.9, 1],
    y: [50, 50, 0],
    opacity: [0, 1, 1],
    transition: { originX: "50%" },
  },
  hiddenScaleY: { scale: 0.5, y: 300, opacity: 0 },
  hiddenScaleRight: { scale: 0.95, x: 1000, opacity: 0 },
  hiddenFullScale: { scale: 0 },
  hiddenLeft: { opacity: 0, x: -50 },
  exitScale: { scale: 0, opacity: 0, y: 200, originX: 0 },
  exitX: { x: -1000, opacity: 0 },
  rotate: {
    rotate: 180,
    transition: { duration: 0.2 },
  },
  dropHidden: { opacity: 0 },
};

// Button Variants for hover and tap states
export const ButtonVariants = {
  buttonHover: {
    y: -3,
    scale: 1.02,
    rotate: -5,
    transition: { duration: 0.4, type: "spring", bounce: 0.5 },
  },
  buttonTap: {
    y: 3,
    scale: 0.98,
    rotate: 5,
    transition: { duration: 0.4, type: "spring", bounce: 0.5 },
  },
};

// Aurora Variants for hover state
export const AuroraVariants = {
  auroraHover: {
    opacity: 1,
    scale: 1.2,
    transition: { duration: 0.3 },
  },
};

// Hover Variants for different hover effects
export const HoverVariants = {
  hoverX: {
    x: 5,
    transition: { duration: 1, type: "spring", bounce: 0.5 },
  },
  hoverScale: {
    scale: 1.05,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
  hoverRotate: {
    rotate: -5,
    transition: { duration: 0.4, type: "spring" },
  },
  hoverBrightness: {
    filter: "brightness(0.5)",
    transition: { duration: 0.4 },
  },
};

// Tap Variants for different tap effects
export const TapVariants = {
  tapRotate: {
    rotate: 5,
    transition: { duration: 0.4, type: "spring" },
  },
  tapScale: {
    scale: 0.95,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
};

// Blob Variants for continuous animation
export const BlobVariants = {
  blob: {
    scale: [1, 1.5, 1],
    opacity: [0.6, 0.7, 0.6],
    zIndex: [0, 0, 0],
    transition: { duration: 5, repeat: Infinity },
  },
};
