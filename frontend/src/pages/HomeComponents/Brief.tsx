import React, { useRef } from "react";
import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
import airplane1 from "src/assets/svg/airplane-1.svg";
import briefVideo from "src/assets/videos/brief.mp4";

const Brief: React.FC = () => {
  const paragraphRefs = [useRef(null), useRef(null), useRef(null)];
  const scrollYProgresses = paragraphRefs.map(
    (ref) =>
      useScroll({
        target: ref,
        offset: ["start center", "end center"],
      }).scrollYProgress,
  );

  const opacities = scrollYProgresses.map((scrollYProgress) =>
    useTransform(scrollYProgress, [0, 1], [0.1, 1]),
  );

  const briefVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
    airplaneStart: {
      opacity: 0,
      x: -100,
      y: 30,
    },
    airplaneEnd: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 1,
        type: "spring",
      },
    },
  };
  return (
    <section className="brief px-sect flex flex-col lg:gap-36 lg:py-sect-medium xl:gap-48 xl:py-sect-semi 2xl:gap-64 2xl:py-sect-long 3xl:gap-80 3xl:py-sect-long">
      <div className="flex min-h-40 flex-row items-center lg:gap-28 xl:gap-28 2xl:gap-44 3xl:gap-60">
        <motion.img
          variants={briefVariants}
          initial="airplaneStart"
          whileInView="airplaneEnd"
          viewport={{ once: true }}
          src={airplane1}
          alt=""
          className="rotate-[30deg] transform lg:w-20 xl:w-24 2xl:w-28 3xl:w-32"
        />
        <motion.h1
          variants={briefVariants}
          initial="initial"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="h2-inter"
        >
          A <span className="text-main-green">Comprehensive Catalog</span> of{" "}
          <br />
          Destinations with Tailored Travel Insights.
        </motion.h1>
      </div>
      <div className="relative flex lg:h-[225svh] lg:flex-row lg:gap-20 xl:h-[175svh] xl:gap-28 2xl:h-[200svh] 2xl:gap-32 3xl:h-[200svh] 3xl:gap-40">
        <motion.div
          variants={briefVariants}
          initial="initial"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="sticky top-0 z-0 h-svh rounded-lg py-4"
        >
          <video
            src={briefVideo}
            autoPlay
            muted
            loop
            className="h-full rounded-lg"
          ></video>
        </motion.div>
        <div className="relative flex flex-col items-center justify-center lg:w-2/5 lg:gap-16 xl:gap-20 2xl:gap-20 3xl:gap-24 3xl:pt-48">
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0.8, 0.5],
              x: [0, 300, 0],
              zIndex: [0, 0, 0],
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="blob-1 blur-blob absolute h-1/3 w-1/3"
          ></motion.div>
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
              y: [0, -200, 0],
              zIndex: [0, 0, 0],
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="blob-2 blur-blob absolute h-1/3 w-1/3"
          ></motion.div>
          <motion.p
            ref={paragraphRefs[0]}
            style={{ opacity: opacities[0] }}
            className="p-medium lg:w-4/5 3xl:w-2/3"
          >
            Pause the hustle of everyday life and breathe in a moment of
            tranquility. Embark on a journey guided by your emotions with our
            unique, mood-based travel analysis. Our website invites you to
            partake in adventures that harmonize with your spirit, awaiting your
            personal touch.
          </motion.p>

          <motion.p
            ref={paragraphRefs[1]}
            style={{ opacity: opacities[1] }}
            className="p-medium lg:w-4/5 3xl:w-2/3"
          >
            Then explore our virtual gallery for a curated selection of global
            destinations, complete with beautiful visuals and key information to
            simplify your travel planning. It’s the ideal resource for
            inspiration or booking your next journey, offering a gateway to the
            world’s most rewarding experiences.
          </motion.p>

          <motion.p
            ref={paragraphRefs[2]}
            style={{ opacity: opacities[2] }}
            className="p-medium lg:w-4/5 3xl:w-2/3"
          >
            If you find yourself captivated by the myriad ways in which people
            explore the world, then our blog is a must-visit for you. It’s
            packed with engaging travel tales and tips that ignite your desire
            to explore and help navigate your upcoming escapades.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default Brief;
