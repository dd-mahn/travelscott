export const HeaderVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const InputVariants = {
  hidden: { opacity: 0, x: 20, width: 0 },
  visible: {
    opacity: 1,
    x: 0,
    width: "10rem",
    transition: {
      duration: 0.5,
      width: { duration: 0.4 },
    },
  },
  exit: {
    opacity: 0,
    x: 20,
    width: 0,
    transition: {
      duration: 0.5,
      width: { duration: 0.4 },
    },
  },
};

export const BorderVariants = {
  hidden: { width: 0 },
  visible: {
    width: "100%",
    transition: {
      duration: 0.3,
      delay: 0.2,
    },
  },
  exit: {
    width: 0,
    transition: {
      duration: 0.2,
    },
  },
};

export const HoverVariants = {
  hoverScale: {
    scale: 1.1,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  rotateHover: {
    rotate: [0, 360, 360, 0],
    transition: { duration: 0.8, ease: "linear" },
  },
};
