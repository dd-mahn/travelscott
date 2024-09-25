import React, { memo } from "react";
import { motion, useInView } from "framer-motion";
import { HoverVariants, VisibilityVariants } from "src/utils/variants";
import { people } from "src/data/about-people";
import { Suspense } from "react";

import who1 from "src/assets/images/ui/about/about-1.webp";
import who2 from "src/assets/images/ui/about/about-2.webp";
import who3 from "src/assets/images/ui/about/about-3.webp";
import who4 from "src/assets/images/ui/about/about-4.webp";
import who5 from "src/assets/images/ui/about/about-5.webp";
import who6 from "src/assets/images/ui/about/about-6.webp";
import who7 from "src/assets/images/ui/about/about-7.webp";
import who8 from "src/assets/images/ui/about/about-8.webp";
import LazyImage from "./LazyImage";

const variants = {
  hiddenY: VisibilityVariants.hiddenY,
  hiddenFullY: VisibilityVariants.hiddenFullY,
  visible: VisibilityVariants.visible,
  hoverScale: HoverVariants.hoverScale,

  imgVisible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
  
  imgFloat: {
    y: [0, 10, -10, 0],
    scale: [1, 0.98, 1.02, 1],
    transition: { duration: 5, repeat: Infinity },
  },

  blobAnimation: {
    scale: [1, 1.5, 1],
    opacity: [0.6, 0.7, 0.6],
    zIndex: [0, 0, 0],
    transition: { duration: 5, repeat: Infinity },
  },

  blob1Animation: {
    scale: [1, 1.5, 1],
    opacity: [0.5, 0.7, 0.5],
    x: [0, 300, 0],
    y: [0, 100, 0],
    zIndex: [0, 0, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
    },
  },

  blob2Animation: {
    scale: [1, 1.5, 1],
    opacity: [0.5, 0.7, 0.5],
    x: [0, 300, 0],
    y: [0, -200, 0],
    zIndex: [0, 0, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
    },
  },
};

const whoImages = [who1, who2, who3, who4, who5, who6, who7, who8];

const AboutWho = () => {
  return (
    <section className="who px-sect sticky top-0 z-20 rounded-5xl bg-background-dark-transparent dark:bg-background-dark-transparent overflow-hidden shadow-section lg:pb-sect-default lg:pt-40 2xl:py-sect-default">
      <div className="relative flex flex-col">
        <motion.div initial="hidden" animate="blob2Animation" variants={variants} className="blob-brown blur-blob left-1/2 top-[20%] h-1/4 w-1/4 opacity-30"></motion.div>
        <motion.div initial="hidden" animate="blob1Animation" variants={variants} className="blob-green blur-blob top-[5%] left-[5%] h-1/4 w-1/3 opacity-20"></motion.div>
        <motion.div
          initial="hiddenY"
          whileInView="visible"
          variants={variants}
          viewport={{ once: true, margin: "0% 0% -20% 0%" }}
          transition={{ duration: 0.5 }}
          className="h3-inter text-center lg:py-40 2xl:pb-sect-default"
        >
          <h1 className="text-text-dark">Who?</h1>
        </motion.div>
        <motion.div
          initial="hiddenY"
          whileInView="visible"
          variants={variants}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="z-10 flex flex-wrap justify-center gap-12"
        >
          {people.map((person, index) => (
            <div
              className="person flex w-1/5 flex-col items-center gap-4"
              key={index}
            >
              <div className="h-[35svh] w-full overflow-hidden rounded-xl bg-gradient-to-t from-blue-gray-900 to-gray shadow-component dark:shadow-component-dark saturate-0 duration-300 hover:saturate-[0.75]">
                {person.img && (
                  <motion.img
                    whileHover="hoverScale"
                    variants={variants}
                    transition={{ duration: 0.4 }}
                    src={person.img}
                    alt=""
                    className="h-full w-full rounded-xl object-cover"
                  />
                )}
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="span-regular text-center text-text-dark">
                  {person.name}
                </h3>
                <p className="span-small text-center text-text-dark">
                  {person.role}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
        <div className="px-sect relative pb-sect-default pt-sect-long 2xl:mt-sect-default">
          <motion.div initial="hidden" animate="blobAnimation" variants={variants} className="blob-brown blur-blob left-[20%] top-1/3 h-1/2 w-1/2 opacity-30"></motion.div>

          {whoImages.map((img, index) => (
            <AnimatedImage key={`whoImg-${index}`} src={img} index={index} />
          ))}

          <motion.p
            initial="hiddenY"
            whileInView="visible"
            variants={variants}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="p-regular text-text-dark lg:w-2/3 xl:w-2/3 2xl:w-1/2 3xl:w-2/5"
          >
            In 2024, we came together, fueled by an unwavering passion for
            adventure and a deep-seated commitment to unveiling the splendor of
            our planet. Our aspiration is to witness the joy of discovery on the
            faces of those who traverse the globe, and we take pride in
            extending a helping hand to make each journey unforgettable.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

const AnimatedImage = memo(({ src, index }: { src: string; index: number }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="hiddenY"
      animate={isInView ? ["visible", "imgFloat"] : "hiddenY"}
      variants={variants}
      transition={{ delay: 0.2 + index * 0.1 }}
      className={`img-${index + 1} absolute rounded-lg overflow-hidden will-change-transform`}
    >
      <Suspense fallback={<div className="w-full h-full bg-gray-200" />}>
        <LazyImage src={src} alt="" loading="lazy" />
      </Suspense>
    </motion.div>
  );
});

export default memo(AboutWho);
