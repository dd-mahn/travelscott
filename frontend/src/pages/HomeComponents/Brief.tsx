import React, { memo, useEffect, useRef } from "react";
import {
  motion,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";

// Asset imports
import airplane1 from "src/assets/svg/airplane-1.svg";
import briefVideo from "src/assets/videos/brief.mp4";

// Framer motion variants
const variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },

  hiddenY: (y: string) => {
    return { y: y };
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },

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
    opacity: [0.5, 0.8, 0.5],
    x: [0, 300, 0],
    zIndex: [0, 0, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
    },
  },

  blob2Animation: {
    scale: [1, 1.5, 1],
    opacity: [0.5, 1, 0.5],
    y: [0, -200, 0],
    zIndex: [0, 0, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
    },
  },
};

// Animation control function
const useAnimatedInView = (ref: React.RefObject<HTMLDivElement>) => {
  const inView = useInView(ref);
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  return controls;
};

// Brief component
const Brief: React.FC = () => {
  // Add refs for animations
  const paragraphRefs = [useRef(null), useRef(null), useRef(null)];
  const h2ContainersRef = [useRef(null), useRef(null)];

  // Handle animations
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

  const h21Controls = useAnimatedInView(h2ContainersRef[0]);
  const h22Controls = useAnimatedInView(h2ContainersRef[1]);

  return (
    <section className="brief px-sect flex flex-col lg:gap-36 lg:py-sect-medium xl:gap-48 xl:py-sect-semi 2xl:gap-64 2xl:py-sect-long 3xl:gap-80 3xl:py-sect-long">
      <div className="flex min-h-40 flex-row items-center lg:gap-28 xl:gap-28 2xl:gap-44 3xl:gap-60">
        <motion.img
          variants={variants}
          initial="airplaneStart"
          whileInView="airplaneEnd"
          viewport={{ once: true }}
          src={airplane1}
          alt=""
          className="rotate-[45deg] transform lg:w-20 xl:w-24 2xl:w-28 3xl:w-32"
        />
        <div>
          <div
            ref={h2ContainersRef[0]}
            className="h2-inter overflow-hidden pb-2"
          >
            <motion.div
              variants={variants}
              initial={variants.hiddenY("var(--y-from)")}
              animate={h21Controls}
              transition={{ duration: 0.5 }}
              className="lg:[--y-from:75px] 2xl:[--y-from:100px]"
            >
              A <span className="text-main-green">Comprehensive Catalog</span>{" "}
              of
            </motion.div>
          </div>
          <div
            ref={h2ContainersRef[1]}
            className="h2-inter overflow-hidden pb-2"
          >
            <motion.div
              variants={variants}
              initial={variants.hiddenY("var(--y-from)")}
              animate={h22Controls}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="lg:[--y-from:75px] 2xl:[--y-from:100px]"
            >
              Destinations with Tailored Travel Insights.
            </motion.div>
          </div>
        </div>
      </div>
      <div className="flex lg:h-[225svh] lg:flex-row lg:gap-20 xl:h-[175svh] xl:gap-28 2xl:h-[200svh] 2xl:gap-32 3xl:h-[200svh] 3xl:gap-40">
        <motion.div
          variants={variants}
          initial="hidden"
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
            animate="blob1Animation"
            variants={variants}
            className="blob-green blur-blob absolute left-0 top-[15%] h-1/3 w-1/3 opacity-60"
          ></motion.div>
          <motion.div
            animate="blob2Animation"
            variants={variants}
            className="blob-brown blur-blob absolute bottom-[15%] right-0 h-1/3 w-1/3 opacity-60"
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

export default memo(Brief);
