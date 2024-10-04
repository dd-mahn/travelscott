// Import necessary React hooks and Framer Motion components
import React, { memo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Import asset files
import airplane1 from "src/assets/svg/airplane-1.svg";
import briefVideo from "src/assets/videos/brief.mp4";
import { VisibilityVariants } from "src/utils/variants";
import { useViewportWidth } from "src/utils/imageUtils";

// Define animation variants for Framer Motion
const variants = {
  hiddenY: VisibilityVariants.hiddenY,
  hiddenFullY: VisibilityVariants.hiddenFullY,
  visible: VisibilityVariants.visible,

  airplaneStart: {
    opacity: 0,
    x: -80,
    y: 50,
  },

  airplaneEnd: {
    opacity: [0, 1, 0, 0, 0, 1],
    y: [50, 0, -50, 50, 50, 0],
    x: [-80, 0, 80, -80, -80, 0],
    time: [0.4, 0.6, 0.7, 0.8, 0.9, 1],
    transition: {
      duration: 2,
    },
  },

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

// Brief component definition
const Brief: React.FC = () => {
  const viewportWidth = useViewportWidth();
  // Create refs for each paragraph to be animated
  const paragraphRefs = [useRef(null), useRef(null), useRef(null)];

  // Create scroll-based animations for each paragraph
  const scrollYProgresses = paragraphRefs.map(
    (ref) =>
      useScroll({
        target: ref,
        offset: ["start center", "end center"],
      }).scrollYProgress,
  );

  // Transform scroll progress into opacity values
  const opacities = scrollYProgresses.map((scrollYProgress) =>
    useTransform(scrollYProgress, [0, 1], [0.1, 1]),
  );

  return (
    <section className="brief px-sect flex flex-col py-24 md:pb-40 lg:gap-36 lg:py-sect-medium xl:gap-48 xl:py-sect-semi 2xl:gap-64 2xl:py-sect-long 3xl:gap-80 3xl:py-sect-long">
      {/* Header section with animated airplane */}
      <div className="flex min-h-20 flex-row items-center justify-center md:min-h-40 md:justify-start md:gap-28 xl:gap-28 2xl:gap-44 3xl:gap-52">
        <motion.img
          variants={variants}
          initial="airplaneStart"
          whileInView="airplaneEnd"
          viewport={{ once: true }}
          src={airplane1}
          alt=""
          className="hidden rotate-[45deg] transform md:block md:w-20 lg:w-24 xl:w-24 2xl:w-28 3xl:w-32"
        />
        <div className="flex flex-col items-center md:items-start">
          {/* Animated header text */}
          <div
            className={`${viewportWidth < 768 ? "h3-inter" : "h2-inter"} overflow-hidden 2xl:pb-2`}
          >
            <motion.div
              variants={variants}
              initial="hiddenFullY"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="whitespace-nowrap text-center md:text-left"
            >
              A{" "}
              <span className="text-main-green dark:text-dark-green">
                Comprehensive Catalog
              </span>{" "}
              of
            </motion.div>
          </div>
          <div
            className={`${viewportWidth < 768 ? "h3-inter" : "h2-inter"} overflow-hidden pb-2`}
          >
            <motion.div
              variants={variants}
              initial="hiddenFullY"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center md:text-left"
            >
              Destinations with Tailored Travel Insights.
            </motion.div>
          </div>
        </div>
      </div>
      {/* Main content section with video and paragraphs */}
      <div className="relative flex h-screen justify-center md:h-[175svh] lg:h-[225svh] lg:gap-20 xl:h-[175svh] xl:gap-28 2xl:h-[200svh] 2xl:gap-32 3xl:h-[200svh] 3xl:gap-40">
        {/* Video section */}
        <motion.div
          variants={variants}
          initial="hiddenY"
          whileInView="visible"
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="sticky top-0 z-0 h-svh rounded-2xl py-4"
        >
          <video
            src={briefVideo}
            autoPlay
            muted
            loop
            className="h-full rounded-2xl object-cover shadow-component brightness-50 dark:shadow-component-dark lg:brightness-100"
          ></video>
        </motion.div>

        {/* Paragraphs section with animated blobs */}
        <div className="absolute top-[10%] z-10 grid place-items-center sm:top-1/3 md:static md:w-1/2">
          <div className="relative flex w-[90%] flex-col items-center justify-center gap-12 lg:w-full lg:gap-16 xl:gap-20 2xl:gap-20 3xl:gap-24 3xl:pt-48">
            {/* Animated blobs */}
            <motion.div
              animate="blob1Animation"
              variants={variants}
              className="blob-green blur-blob absolute left-0 top-[15%] h-1/3 w-1/3 opacity-60"
            ></motion.div>
            <motion.div
              animate="blob2Animation"
              variants={variants}
              className="blob-brown blur-blob absolute bottom-[15%] right-0 h-1/3 w-1/3 opacity-60"
            ></motion.div>
            {/* Paragraphs with scroll-based opacity animation */}
            <motion.p
              ref={paragraphRefs[0]}
              style={{ opacity: opacities[0] }}
              className={`${viewportWidth < 768 ? "text-center" : "p-medium"} z-10 text-text-dark dark:text-text-light sm:w-3/4 md:w-2/3 md:text-left md:text-text-light md:dark:text-text-dark lg:w-4/5 3xl:w-2/3`}
            >
              Take a break from your daily routine. When was the last time you
              explored beyond your city? Discover new places, meet new people,
              and experience different cultures. It's time to refresh your
              spirit and broaden your horizons.
            </motion.p>

            <motion.p
              ref={paragraphRefs[1]}
              style={{ opacity: opacities[1] }}
              className={`${viewportWidth < 768 ? "text-center" : "p-medium"} z-10 text-text-dark dark:text-text-light sm:w-3/4 md:w-2/3 md:text-left md:text-text-light md:dark:text-text-dark lg:w-4/5 3xl:w-2/3`}
            >
              To help you get started, explore our virtual gallery. It features
              a curated selection of global destinations with visuals and key
              information to simplify your travel planning and inspire your next
              trip.
            </motion.p>

            <motion.p
              ref={paragraphRefs[2]}
              style={{ opacity: opacities[2] }}
              className={`${viewportWidth < 768 ? "text-center" : "p-medium"} z-10 text-text-dark dark:text-text-light sm:w-3/4 md:w-2/3 md:text-left md:text-text-light md:dark:text-text-dark lg:w-4/5 3xl:w-2/3`}
            >
              For more insights, visit our blog. Our travel stories and tips
              will help you plan and make the most of your adventures.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Export the memoized Brief component
export default memo(Brief);
