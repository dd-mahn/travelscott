// Import necessary React hooks and Framer Motion
import React, { useEffect, useRef, memo, useState } from "react";
import { motion, useAnimation } from "framer-motion";

// Import SVG assets for airplanes
import airplane1 from "src/assets/svg/airplane-1.svg";
import airplane2 from "src/assets/svg/airplane-2.svg";
import airplane3 from "src/assets/svg/airplane-3.svg";

// Import custom button components
import { PrimaryButton, SecondaryButton } from "src/common/Buttons/Button";
import {
  HoverVariants,
  VisibilityVariants,
} from "src/utils/constants/variants";
import { useViewportWidth } from "src/hooks/useViewportWidth/useViewportWidth";

// Define Framer Motion animation variants
const variants = {
  hiddenY: VisibilityVariants.hiddenY,
  hiddenFullY: VisibilityVariants.hiddenFullY,
  visible: VisibilityVariants.visible,
  hoverScale: HoverVariants.hoverScale,
  hiddenFullScale: VisibilityVariants.hiddenFullScale,

  // Airplane animations
  airplane1Start: { opacity: 0, x: -50, y: 50 },
  airPlane1End: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      delay: 2,
      duration: 0.5,
      type: "spring",
      stiffness: 260,
      damping: 10,
    },
  },
  airplane2Start: { opacity: 0, x: "100%", y: "100%" },
  airPlane2End: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { delay: 2.5, duration: 0.5, type: "spring" },
  },
  airplane3Start: { opacity: 0, x: 100, y: -10 },
  airPlane3End: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { delay: 3, duration: 0.5, type: "spring" },
  },

  // Star animations
  hoverStar: {
    scale: [1, 0.5, 1.2, 1],
    rotate: [30, 30, 330, 360],
    transition: { duration: 3 },
  },

  starRotate: {
    rotate: [0, 360, 390],
    transition: { delay: 2, duration: 1.5, repeat: 4, repeatDelay: 1 },
  },

  // Blob animations
  blob1Animation: {
    scale: [1, 1.5, 1],
    opacity: [0.6, 0.7, 0.6],
    zIndex: [0, 0, 0],
    transition: { duration: 5, repeat: Infinity },
  },
  blob2Animation: {
    scale: [1, 1.5, 1],
    opacity: [0.5, 0.7, 0.5],
    zIndex: [0, 0, 0],
    transition: { duration: 5, repeat: Infinity },
  },
};

// Hero Component
const Hero: React.FC = () => {
  // Refs for DOM elements
  const starRef = useRef<HTMLElement>(null);
  const switchTextRef = useRef<HTMLDivElement>(null);
  const switchContainerRef = useRef<HTMLDivElement>(null);
  const [switchTextHeight, setSwitchTextHeight] = useState<number | null>(null);
  const viewportWidth = useViewportWidth();

  // Animation controls for star sibling
  const starSiblingControls = useAnimation();

  // Effect to animate star sibling
  useEffect(() => {
    const updateStarSiblingX = () => {
      if (starRef.current) {
        const starWidth = starRef.current.clientWidth + 10;
        starSiblingControls.start({ opacity: [0, 1], y: [75, 0] });
        starSiblingControls.start({
          x: starWidth,
          transition: { delay: 1, duration: 0.6, ease: "circInOut" },
        });
      }
    };

    updateStarSiblingX();
    window.addEventListener("resize", updateStarSiblingX);

    return () => {
      window.removeEventListener("resize", updateStarSiblingX);
    };
  }, [starRef, starSiblingControls]);

  // Effect to set switch container height
  useEffect(() => {
    if (switchTextRef.current && switchContainerRef.current) {
      const switchTextWidth = switchTextRef.current.clientHeight;
      switchContainerRef.current.style.height = `${switchTextWidth}px`;
    }
  }, [switchTextHeight]);

  // Effect to update switch text height on resize
  useEffect(() => {
    const updateSwitchTextHeight = () => {
      if (switchTextRef.current) {
        setSwitchTextHeight(switchTextRef.current.offsetHeight);
      }
    };

    window.addEventListener("resize", updateSwitchTextHeight);

    return () => {
      window.removeEventListener("resize", updateSwitchTextHeight);
    };
  }, [switchTextRef.current]);

  return (
    <section
      data-testid="hero-section"
      className="hero px-sect relative mb-12 flex h-screen flex-col items-center justify-center md:items-start md:gap-4 lg:mb-0 lg:gap-6 xl:gap-8 2xl:gap-8 3xl:gap-8"
    >
      {/* Animated blobs for background effect */}

      <div className="absolute inset-0 h-full w-screen overflow-x-hidden md:overflow-visible">
        <motion.div
          animate="blob1Animation"
          variants={variants}
          className="blob-brown blur-blob -left-[10%] top-[5%] z-0 h-1/3 w-1/3 opacity-60"
        ></motion.div>

        <motion.div
          animate="blob2Animation"
          variants={variants}
          className="blob-green blur-blob -right-1/3 bottom-[20%] z-0 h-3/5 w-3/5 opacity-40"
        ></motion.div>
      </div>

      <div className="z-15 relative w-full">
        {/* Animated Airplanes */}
        <motion.div
          variants={variants}
          initial="airplane1Start"
          whileInView="airPlane1End"
          viewport={{ once: true }}
          className="airplane-1 absolute -bottom-[80%] -right-[5%] w-[15vw] transform sm:-bottom-[80%] sm:right-[5%] sm:w-[20vw] md:-bottom-[80%] md:right-[0%] md:w-[23vw] lg:-bottom-full lg:right-[0%] lg:w-[25vw] xl:-bottom-full xl:right-0 2xl:-bottom-full 2xl:-right-[5%] 2xl:w-[25vw] 3xl:-bottom-full 3xl:right-[5%]"
        >
          <motion.img
            whileHover="hoverScale"
            loading="lazy"
            transition={{ duration: 0.4 }}
            variants={variants}
            drag
            dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
            src={airplane1}
            alt="Airplane"
            className="w-full dark:brightness-90"
          />
          <div className="blob-shadow blur-blob -bottom-[20%] h-1/3 w-full opacity-60"></div>
        </motion.div>
        <motion.img
          whileHover="hoverScale"
          loading="lazy"
          transition={{ duration: 0.4 }}
          variants={variants}
          initial="airplane2Start"
          whileInView="airPlane2End"
          viewport={{ once: true }}
          drag
          dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
          src={airplane2}
          className="airplane-2 absolute right-0 top-[0] w-[15vw] transform dark:brightness-90 sm:right-[5%] sm:top-[0%] md:-top-[30%] md:right-[15%] lg:-top-1/2 lg:right-[5%] xl:-top-1/3 xl:right-[5%] 2xl:-top-1/3 2xl:right-0 3xl:-top-1/3 3xl:right-[5%]"
          alt="Airplane"
        />
        <motion.img
          variants={variants}
          initial="airplane3Start"
          loading="lazy"
          whileInView="airPlane3End"
          viewport={{ once: true }}
          whileHover="hoverScale"
          transition={{ duration: 0.4 }}
          drag
          dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
          src={airplane3}
          className="airplane-3 md:w-10vw] absolute left-[5%] top-[10%] w-[10svw] transform dark:brightness-90 sm:left-[5%] sm:top-[15%] sm:w-[10vw] md:-top-[40%] md:left-[40%] lg:-top-1/2 lg:right-[40%] xl:-top-[40%] xl:right-1/3 2xl:-top-1/2 2xl:right-[40%] 3xl:-top-1/2 3xl:right-[40%]"
          alt="Airplane"
        />
        {/* Animated Star */}
        {viewportWidth >= 768 && (
          <motion.i
            ref={starRef}
            variants={variants}
            initial="hiddenFullScale"
            whileInView={["visible", "starRotate"]}
            viewport={{ once: true }}
            whileHover="hoverStar"
            transition={{ delay: 1, duration: 0.4 }}
            className="star ri-shining-2-fill absolute rotate-[30deg] transform text-yellow dark:text-yellow md:top-0 md:text-3xl lg:text-5xl xl:text-6xl 2xl:-top-[5%] 2xl:text-6.5xl 3xl:text-7.5xl"
          ></motion.i>
        )}
        {/* Animated Text */}
        {viewportWidth >= 768 && (
          <>
            <div className="overflow-hidden">
              <motion.h1
                variants={variants}
                initial="hiddenFullY"
                animate={starSiblingControls}
                transition={{ duration: 0.5 }}
                className="h1-md inline-block leading-[0.8]"
              >
                From your new
              </motion.h1>
            </div>

            <div className="overflow-hidden">
              <motion.h1
                variants={variants}
                initial="hiddenFullY"
                animate="visible"
                transition={{
                  duration: 0.5,
                  delay: 0.15,
                  delayChildren: 0.2,
                }}
                className="h1-md text-left leading-[0.8]"
              >
                favorite
                <motion.span
                  variants={variants}
                  className="uppercase text-main-green dark:text-dark-green"
                >
                  travel guide
                </motion.span>
              </motion.h1>
            </div>

            <div className="overflow-hidden pb-2">
              <motion.h1
                variants={variants}
                initial="hiddenFullY"
                animate="visible"
                transition={{
                  duration: 0.5,
                  delay: 0.3,
                  delayChildren: 0.2,
                }}
                className="h1-md overflow-hidden text-left leading-[0.9]"
              >
                <span className="inline-block">to </span>{" "}
                <div className="inline-block">
                  {/* Animated text switch */}
                  <div
                    ref={switchContainerRef}
                    className="relative flex w-fit flex-col overflow-hidden leading-[1]"
                  >
                    <motion.div
                      className="absolute bottom-0 left-0 h-[4px] w-full origin-left bg-text-light dark:bg-text-dark"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        duration: 1,
                        delay: 1,
                        ease: "easeInOut",
                      }}
                    />
                    <motion.div
                      initial={{ y: 0 }}
                      animate={{ y: "-100%" }}
                      transition={{
                        duration: 1,
                        delay: 4,
                        repeat: 3,
                        repeatDelay: 4,
                        type: "spring",
                        bounce: 0.5,
                      }}
                      ref={switchTextRef}
                    >
                      unforgettable
                    </motion.div>
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ y: 0 }}
                        animate={{ y: "-100%" }}
                        transition={{
                          duration: 1,
                          delay: 4,
                          repeat: 3,
                          repeatDelay: 4,
                          type: "spring",
                          bounce: 0.5,
                        }}
                      >
                        unforgettable
                      </motion.div>
                    ))}
                  </div>
                </div>{" "}
                <motion.span
                  variants={variants}
                  className="uppercase text-main-brown dark:text-dark-brown"
                >
                  experience
                </motion.span>
                .
              </motion.h1>
            </div>
          </>
        )}

        {viewportWidth < 768 && (
          <>
            <div className="overflow-hidden">
              <motion.h1
                variants={variants}
                initial="hiddenFullY"
                animate="visible"
                transition={{
                  duration: 0.5,
                  delay: 0.15,
                  delayChildren: 0.2,
                }}
                className="h1-md text-center leading-[0.8]"
              >
                favorite
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                variants={variants}
                initial="hiddenFullY"
                animate="visible"
                transition={{
                  duration: 0.5,
                  delay: 0.3,
                  delayChildren: 0.2,
                }}
                className="h1-md text-center uppercase leading-[0.8] text-main-green dark:text-dark-green"
              >
                travel guide
              </motion.h1>
            </div>
            <div className="overflow-hidden pb-2">
              <motion.h1
                variants={variants}
                initial="hiddenFullY"
                animate="visible"
                transition={{
                  duration: 0.5,
                  delay: 0.45,
                  delayChildren: 0.2,
                }}
                className="h1-md overflow-hidden text-center leading-[0.9]"
              >
                <div className="inline-block">
                  {/* Animated text switch */}
                  <div
                    ref={switchContainerRef}
                    className="relative flex w-fit flex-col overflow-hidden leading-[1]"
                  >
                    <motion.div
                      className="absolute bottom-0 left-0 h-[4px] w-full origin-left bg-text-light dark:bg-text-dark"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        duration: 1,
                        delay: 1,
                        ease: "easeInOut",
                      }}
                    />
                    <motion.div
                      initial={{ y: 0 }}
                      animate={{ y: "-100%" }}
                      transition={{
                        duration: 1,
                        delay: 4,
                        repeat: 3,
                        repeatDelay: 4,
                        type: "spring",
                        bounce: 0.5,
                      }}
                      ref={switchTextRef}
                    >
                      unforgettable
                    </motion.div>
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ y: 0 }}
                        animate={{ y: "-100%" }}
                        transition={{
                          duration: 1,
                          delay: 4,
                          repeat: 3,
                          repeatDelay: 4,
                          type: "spring",
                          bounce: 0.5,
                        }}
                      >
                        unforgettable
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                variants={variants}
                initial="hiddenFullY"
                animate="visible"
                transition={{ duration: 0.5, delay: 0.8, delayChildren: 0.2 }}
                className="h1-md text-center uppercase leading-[0.8] text-main-brown dark:text-dark-brown"
              >
                experience .
              </motion.h1>
            </div>
          </>
        )}
      </div>

      {/* Animated paragraph */}
      <motion.p
        variants={variants}
        initial="hiddenY"
        whileInView="visible"
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
        className="p-medium w-3/4 text-center sm:w-[70%] md:w-1/2 md:text-left xl:w-2/5 2xl:w-1/3 3xl:w-1/3"
      >
        From the smallest idea to the most memorable journeys. Join us to awaken
        your traveling spirit and discover the adventurer within you.
      </motion.p>

      {/* Animated buttons */}
      <motion.div
        variants={variants}
        initial="hiddenY"
        whileInView="visible"
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-4 flex flex-row gap-2 lg:mt-8 lg:gap-4 xl:gap-4 2xl:gap-6 3xl:gap-8"
      >
        <SecondaryButton text="Get started" link="/discover" />
        <PrimaryButton text="Learn more" link="/about" />
      </motion.div>
    </section>
  );
};

export default memo(Hero);
