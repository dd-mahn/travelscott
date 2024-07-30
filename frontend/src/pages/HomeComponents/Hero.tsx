import React, { useRef } from "react";
import { motion } from "framer-motion";

import airplane1 from "src/assets/svg/airplane-1.svg";
import airplane2 from "src/assets/svg/airplane-2.svg";
import airplane3 from "src/assets/svg/airplane-3.svg";
import { useNavigate } from "react-router-dom";

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const starRef = useRef<HTMLElement>(null);
  const starWidth = starRef.current?.clientWidth;
  const heroVariants = {
    // default
    initial: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
    // slide
    slideRight: {
      x: starWidth ? starWidth + 10 : 100,
      transition: {
        delay: 1,
        duration: 0.5,
        ease: "easeOut",
      },
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
        ease: "easeOut",
      },
    },

    // Airplanes animation
    airplane1Start: {
      opacity: 0,
      x: -50,
      y: 50,
      width: "30vw",
    },
    airPlane1End: {
      opacity: 1,
      x: 0,
      y: 0,
      width: "30vw",
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
      width: "15vw",
      x: 100,
      y: 100,
    },
    airPlane2End: {
      width: "15vw",
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
      width: "8vw",
      x: 100,
      y: -10,
    },
    airPlane3End: {
      width: "8vw",
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        delay: 3.5,
        duration: 0.5,
        type: "spring",
      },
    },

  };
  return (
    <section className="hero px-sect relative flex h-screen flex-col justify-center lg:gap-6 xl:gap-8 2xl:gap-8 3xl:gap-8">
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 0.8, 0.5],
          x: [0, 50, 0],
          zIndex: [0, 0, 0],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="blob-1 blur-blob z-0 h-1/3 w-1/3"
      ></motion.div>
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
          x: [0, -50, 0],
          zIndex: [0, 0, 0],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="blob-2 blur-blob z-0 h-3/5 w-3/5"
      ></motion.div>

      <motion.div className="z-15 h1-md relative">
        {/* Airplanes */}
        <motion.div
          variants={heroVariants}
          initial="airplane1Start"
          animate="airPlane1End"
          className="airplane-1 absolute transform lg:-bottom-full lg:right-[0%] xl:-bottom-full xl:right-0 2xl:-bottom-full 2xl:-right-[5%] 3xl:-bottom-full 3xl:right-0"
        >
          <motion.img
            drag
            dragConstraints={{
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
            src={airplane1}
            alt="Airplane"
          />
          <div className="blob-3 blur-blob z-0 h-1/3"></div>
        </motion.div>
        <motion.img
          variants={heroVariants}
          initial="airplane2Start"
          animate="airPlane2End"
          drag
          dragConstraints={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          src={airplane2}
          className="airplane-2 absolute transform lg:-top-1/2 lg:right-[5%] xl:-top-1/3 xl:right-[5%] 2xl:-top-1/3 2xl:right-0 3xl:-top-1/3 3xl:right-[5%]"
          alt="Airplane"
        />
        <motion.img
          variants={heroVariants}
          initial="airplane3Start"
          animate="airPlane3End"
          drag
          dragConstraints={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          src={airplane3}
          className="airplane-3 absolute transform lg:-top-1/3 lg:right-[40%] xl:-top-[40%] xl:right-1/3 2xl:-top-1/2 2xl:right-[40%] 3xl:-top-1/2 3xl:right-[40%]"
          alt="Airplane"
        />
        {/* Star */}
        <motion.i
          ref={starRef}
          variants={heroVariants}
          initial="initialScale"
          animate={["visibleScale", "rotate"]}
          transition={{ delay: 1, duration: 0.5 }}
          className="star ri-shining-2-fill absolute -top-[5%] rotate-[30deg] transform text-yellow lg:text-5.5xl xl:text-6xl 2xl:text-6.5xl 3xl:text-7.5xl"
        ></motion.i>
        {/* Text */}
        <motion.div
          variants={heroVariants}
          initial="initial"
          animate={["visible", "slideRight"]}
          transition={{ duration: 0.5 }}
          className="inline-block"
        >
          From your new
        </motion.div>
        <motion.div
          variants={heroVariants}
          initial="initial"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.2 }}
          className=""
        >
          favorite{" "}
          <motion.span className="uppercase text-main-green">
            travel guide
          </motion.span>
        </motion.div>
        <motion.div
          variants={heroVariants}
          initial="initial"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.4 }}
          className=""
        >
          to{" "}
          <motion.span className="border-b-4 border-solid border-text-light dark:border-text-dark">
            unforgettable
          </motion.span>{" "}
          <motion.span className="uppercase text-main-brown">
            experience
          </motion.span>
          .
        </motion.div>
      </motion.div>

      <motion.p
        variants={heroVariants}
        initial="initial"
        animate="visible"
        transition={{ duration: 0.5 }}
        className="p-medium lg:w-2/5 xl:w-2/5 2xl:w-1/3 3xl:w-1/3"
      >
        From the smallest idea to the most memorable journeys. Join us to awaken
        your traveling spirit and discover the adventurer within you.
      </motion.p>

      <motion.div
        variants={heroVariants}
        initial="initial"
        animate="visible"
        transition={{ duration: 0.5 }}
        className="mt-8 flex flex-row lg:gap-4 xl:gap-4 2xl:gap-6 3xl:gap-8"
      >
        <button
          className="btn btn-primary"
          onClick={() => navigate("/discover")}
        >
          Get started
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/about")}
        >
          Learn more
        </button>
      </motion.div>
    </section>
  );
};

export default Hero;
