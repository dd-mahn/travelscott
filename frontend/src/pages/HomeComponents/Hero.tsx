import React, { useEffect, useRef, memo, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";

// Component imports
import airplane1 from "src/assets/svg/airplane-1.svg";
import airplane2 from "src/assets/svg/airplane-2.svg";
import airplane3 from "src/assets/svg/airplane-3.svg";
import { PrimaryButton, SecondaryButton } from "src/components/common/Button";

// Framer motion variants
const variants = {
  // default
  hidden: {
    opacity: 0,
    y: 20,
  },

  hiddenFullY:{
    y: "100%"
  },

  visible: {
    opacity: 1,
    y: 0,
  },

  // rotate
  rotate: {
    rotate: [0, 360, 390],
    transition: {
      delay: 2,
      duration: 1.5,
      repeat: 2,
      repeatDelay: 1,
    },
  },

  // scale
  initialScale: {
    scale: 0,
  },
  visibleScale: {
    scale: 1,
    transition: {
      delay: 1,
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  hoverScale: {
    scale: 1.05,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },

  // Airplanes animation
  airplane1Start: {
    opacity: 0,
    x: -50,
    y: 50,
    // width: "30vw",
  },
  airPlane1End: {
    opacity: 1,
    x: 0,
    y: 0,
    // width: "30vw",
    transition: {
      delay: 2.5,
      duration: 0.5,
      type: "spring",
      stiffness: 260,
      damping: 10,
    },
  },

  airplane2Start: {
    opacity: 0,
    // width: "15vw",
    x: 100,
    y: 100,
  },
  airPlane2End: {
    // width: "15vw",
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      delay: 3,
      duration: 0.5,
      type: "spring",
    },
  },

  airplane3Start: {
    opacity: 0,
    // width: "8vw",
    x: 100,
    y: -10,
  },
  airPlane3End: {
    // width: "8vw",
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      delay: 3.5,
      duration: 0.5,
      type: "spring",
    },
  },

  // Star animation
  hoverStar: {
    scale: [1, 0.5, 1.2, 1],
    rotate: [30, 30, 330, 360],
    transition: { duration: 3 },
  },

  // Blobs
  blob1Animation: {
    scale: [1, 1.5, 1],
    opacity: [0.6, 0.7, 0.6],
    zIndex: [0, 0, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
    },
  },

  blob2Animation: {
    scale: [1, 1.5, 1],
    opacity: [0.5, 0.7, 0.5],
    zIndex: [0, 0, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
    },
  },
};

// Hero Component
const Hero: React.FC = () => {
  // Animation controls
  const starRef = useRef<HTMLElement>(null);
  const starSiblingControls = useAnimation();

  useEffect(() => {
    if (starRef.current) {
      const starWidth = starRef.current.clientWidth + 10;

      starSiblingControls.start({
        opacity: [0, 1],
        y: [75, 0],
      });

      starSiblingControls.start({
        x: starWidth,
        transition: {
          delay: 1,
          duration: 0.6,
          ease: "circInOut",
        },
      });
    }
  }, [starRef, starSiblingControls]);

  return (
    <section className="hero px-sect relative flex h-screen flex-col justify-center lg:gap-6 xl:gap-8 2xl:gap-8 3xl:gap-8">
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

      <div className="z-15 relative">
        {/* Airplanes */}
        <motion.div
          variants={variants}
          initial="airplane1Start"
          whileInView="airPlane1End"
          viewport={{ once: true }}
          className="airplane-1 absolute transform lg:-bottom-full lg:right-[0%] lg:w-[25vw] xl:-bottom-full xl:right-0 2xl:-bottom-full 2xl:-right-[5%] 2xl:w-[25vw] 3xl:-bottom-full 3xl:right-[5%]"
        >
          <motion.img
            whileHover="hoverScale"
            loading="lazy"
            transition={{ duration: 0.4 }}
            variants={variants}
            drag
            dragConstraints={{
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
            src={airplane1}
            alt="Airplane"
            className="w-full"
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
          dragConstraints={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          src={airplane2}
          className="airplane-2 absolute w-[15vw] transform lg:-top-1/2 lg:right-[5%] xl:-top-1/3 xl:right-[5%] 2xl:-top-1/3 2xl:right-0 3xl:-top-1/3 3xl:right-[5%]"
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
          dragConstraints={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          src={airplane3}
          className="airplane-3 absolute w-[8vw] transform lg:-top-1/3 lg:right-[40%] xl:-top-[40%] xl:right-1/3 2xl:-top-1/2 2xl:right-[40%] 3xl:-top-1/2 3xl:right-[40%]"
          alt="Airplane"
        />
        {/* Star */}
        <motion.i
          ref={starRef}
          variants={variants}
          initial="initialScale"
          whileInView={["visibleScale", "rotate"]}
          viewport={{ once: true }}
          whileHover="hoverStar"
          transition={{ delay: 1, duration: 0.4 }}
          className="star ri-shining-2-fill absolute -top-[5%] rotate-[30deg] transform text-yellow lg:text-5.5xl xl:text-6xl 2xl:text-6.5xl 3xl:text-7.5xl"
        ></motion.i>
        {/* Text */}
        <div className="overflow-hidden">
          <motion.h1
            variants={variants}
            initial="hiddenFullY"
            animate={starSiblingControls}
            transition={{ duration: 0.5 }}
            className="h1-md inline-block"
          >
            From your new
          </motion.h1>
        </div>

        <div className="overflow-hidden">
          <motion.h1
            variants={variants}
            initial="hiddenFullY"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.1 }}
            className="h1-md"
          >
            favorite{" "}
            <span className="uppercase text-main-green">travel guide</span>
          </motion.h1>
        </div>

        <div className="overflow-hidden pb-2">
          <motion.h1
            variants={variants}
            initial="hiddenFullY"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h1-md"
          >
            to{" "}
            <motion.span className="border-b-4 border-solid border-text-light dark:border-text-dark">
              unforgettable
            </motion.span>{" "}
            <span className="uppercase text-main-brown">experience</span>.
          </motion.h1>
        </div>
      </div>

      <motion.p
        variants={variants}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
        className="p-medium lg:w-2/5 xl:w-2/5 2xl:w-1/3 3xl:w-1/3"
      >
        From the smallest idea to the most memorable journeys. Join us to awaken
        your traveling spirit and discover the adventurer within you.
      </motion.p>

      <motion.div
        variants={variants}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-8 flex flex-row lg:gap-4 xl:gap-4 2xl:gap-6 3xl:gap-8"
      >
        <PrimaryButton text="Get started" link="/discover" />
        <SecondaryButton text="Learn more" link="/about" />
      </motion.div>
    </section>
  );
};

export default memo(Hero);
