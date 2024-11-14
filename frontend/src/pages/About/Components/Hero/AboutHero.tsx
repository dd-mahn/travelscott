import React, { memo, useEffect, useRef, useState } from "react";
import { motion, useAnimation, useScroll, useTransform } from "framer-motion";

import { HoverVariants, VisibilityVariants } from "src/utils/constants/variants";
import heroVideo from "src/assets/videos/about-hero.mp4";

// Define animation variants
const variants = {
  hidden: VisibilityVariants.hidden,
  hiddenY: VisibilityVariants.hiddenY,
  hiddenFullY: VisibilityVariants.hiddenFullY,
  visible: VisibilityVariants.visible,
  hoverScale: HoverVariants.hoverScale,
  blob1Animation: {
    scale: [1, 1.5, 1],
    opacity: [0.5, 0.7, 0.5],
    x: [0, 300, 0],
    zIndex: [0, 0, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
    },
  },
  blob2Animation: {
    scale: [1, 1.5, 1],
    opacity: [0.5, 0.7, 0.5],
    y: [0, -200, 0],
    zIndex: [0, 0, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
    },
  },
};

const AboutHero = () => {
  const [leftValue, setLeftValue] = useState(0);

  // Refs for DOM elements
  const sideBlockRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
  const blockRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const aboutVideoRef = useRef<HTMLVideoElement>(null);

  // Animation controls
  const sideBlockControls = [useAnimation(), useAnimation()];
  const blockControls = useAnimation();

  // Effect to handle block positioning and animations
  useEffect(() => {
    const handleResize = () => {
      if (blockRef.current && containerRef.current) {
        const blockWidth = blockRef.current.offsetWidth;
        setLeftValue(containerRef.current.offsetWidth / 2 - blockWidth / 2);
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (blockRef.current) {
      resizeObserver.observe(blockRef.current);
    }

    handleResize(); // Initial calculation

    return () => {
      if (blockRef.current) {
        resizeObserver.unobserve(blockRef.current);
      }
    };
  }, [blockRef, containerRef]);

  // Effect to trigger animations
  useEffect(() => {
    if (blockRef.current) {
      const blockWidth = blockRef.current.offsetWidth;

      // Animate side blocks
      sideBlockControls.forEach((control, index) => {
        control.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.4, ease: "easeInOut" },
        });
        control.start({
          x: index === 0 ? -blockWidth / 2 : blockWidth / 2,
          transition: { delay: 0.9, duration: 0.6, ease: "circInOut" },
        });
      });

      // Animate main block
      blockControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: 1, ease: "easeInOut" },
      });
    }
  }, [sideBlockControls, blockRef]);

  // Handle about video scroll animation
  const { scrollYProgress } = useScroll({
    target: aboutVideoRef,
    offset: ["start 30%", "center center"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section data-testid="about-hero" className="hero px-sect relative flex flex-col items-center gap-3 md:gap-4 lg:gap-6 lg:py-10 2xl:gap-12 2xl:py-sect-short">
      {/* Background blobs */}
      <motion.div
        initial="hidden"
        animate="blob1Animation"
        variants={variants}
        className="blur-blob blob-brown left-[10%] top-0 h-1/3 w-1/5 opacity-50"
      ></motion.div>
      <motion.div
        initial="hidden"
        animate="blob2Animation"
        variants={variants}
        className="blur-blob blob-green right-1/3 top-[10%] h-[20%] w-1/3 opacity-50"
      ></motion.div>

      {/* Hero Title */}
      <motion.div
        ref={containerRef}
        className="h1-md-bold h-fit relative z-10 w-screen overflow-hidden pt-sect-short flex justify-center items-end"
      >
        {/* Animated title parts */}
        <motion.div
          initial="hiddenFullY"
          ref={sideBlockRefs[0]}
          animate={sideBlockControls[0]}
          variants={variants}
          className="inline-block text-main-green dark:text-dark-green"
        >
          Travel
        </motion.div>
        <motion.div
          ref={blockRef}
          initial={{ opacity: 0, y: "100%" }}
          animate={blockControls}
          variants={variants}
          className={`bottom-[0.5px] absolute inline-block w-fit`}
          style={{ left: leftValue ? leftValue : "50%" }}
        >
          <span className="font-logo font-medium normal-case text-text-light">
            Scott,
          </span>{" "}
          <span className="text-text-light">your</span>
        </motion.div>{" "}
        <motion.div
          ref={sideBlockRefs[1]}
          initial="hiddenFullY"
          animate={sideBlockControls[1]}
          variants={variants}
          className="inline-block text-main-green dark:text-dark-green"
        >
          guide
        </motion.div>
      </motion.div>

      {/* Hero Paragraphs */}
      <motion.p
        initial="hiddenY"
        animate="visible"
        variants={variants}
        transition={{ duration: 0.5, delay: 1 }}
        className="p-medium z-10 text-center lg:w-2/5 xl:w-2/5 2xl:w-1/3 3xl:w-1/3"
      >
        We simply want to awaken the passion for <br />
        travel within you.
      </motion.p>

      <motion.p
        initial="hiddenY"
        animate="visible"
        variants={variants}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="p-medium z-10 text-center lg:w-2/5 xl:w-2/5 2xl:w-1/3 3xl:w-1/3"
      >
        We simplify your travel experience.
      </motion.p>

      {/* Hero Video */}
      <motion.div
        initial={{ opacity: 0, y: "20%" }}
        animate="visible"
        variants={variants}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="relative h-[80svh] md:h-screen w-full mt-32 lg:mt-40 2xl:mt-sect-default"
      >
        <motion.video
          ref={aboutVideoRef}
          data-testid="about-hero-video"
          src={heroVideo}
          style={{ scale }}
          autoPlay
          loop
          muted
          className="absolute top-0 z-10 w-full h-full object-cover rounded-3xl shadow-section dark:shadow-section-dark"
        ></motion.video>
        <motion.h2
          style={{ opacity }}
          className={`h2-md absolute top-1/2 md:top-1/2 z-[15] w-full text-center text-text-dark`}
        >
          We want you to travel.
        </motion.h2>
      </motion.div>
    </section>
  );
};

export default memo(AboutHero);
