import React, { memo, Suspense } from "react";
import { motion, useInView } from "framer-motion";
import { HoverVariants, VisibilityVariants } from "src/utils/constants/variants";
import { people } from "src/data/about-people";
import OptimizedImage from "src/common/OptimizedImage/OptimizedImage";

// Import images
import who1 from "src/assets/images/ui/about/about-1.webp";
import who2 from "src/assets/images/ui/about/about-2.webp";
import who3 from "src/assets/images/ui/about/about-3.webp";
import who4 from "src/assets/images/ui/about/about-4.webp";
import who5 from "src/assets/images/ui/about/about-5.webp";
import who6 from "src/assets/images/ui/about/about-6.webp";
import who7 from "src/assets/images/ui/about/about-7.webp";
import who8 from "src/assets/images/ui/about/about-8.webp";

// Define animation variants
const variants = {
  hidden: VisibilityVariants.hidden,
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
    transition: { duration: 5, repeat: Infinity },
  },
  blob2Animation: {
    scale: [1, 1.5, 1],
    opacity: [0.5, 0.7, 0.5],
    x: [0, 300, 0],
    y: [0, -200, 0],
    zIndex: [0, 0, 0],
    transition: { duration: 5, repeat: Infinity },
  },
};

// Array of images
const whoImages = [who1, who2, who3, who4, who5, who6, who7, who8];

// Main component
const AboutWho = () => {
  return (
    <section data-testid="about-who" className="who px-sect sticky top-0 z-20 overflow-hidden rounded-5xl bg-background-dark-transparent pb-64 pt-32 shadow-section dark:bg-background-dark-transparent lg:pb-sect-default lg:pt-40 2xl:py-sect-default">
      <div className="relative flex flex-col">
        {/* Animated blobs */}
        <motion.div
          initial="hidden"
          animate="blob2Animation"
          variants={variants}
          className="blob-brown blur-blob left-1/2 top-[20%] h-1/4 w-1/4 opacity-30"
        ></motion.div>
        <motion.div
          initial="hidden"
          animate="blob1Animation"
          variants={variants}
          className="blob-green blur-blob left-[5%] top-[5%] h-1/4 w-1/3 opacity-20"
        ></motion.div>

        {/* Section title */}
        <motion.div
          initial="hiddenY"
          whileInView="visible"
          variants={variants}
          viewport={{ once: true, margin: "0% 0% -20% 0%" }}
          transition={{ duration: 0.5 }}
          className="h3-inter py-32 text-center lg:py-40 2xl:pb-sect-default"
        >
          <h1 className="text-text-dark">Who?</h1>
        </motion.div>

        {/* People grid */}
        <motion.div
          initial="hiddenY"
          whileInView="visible"
          variants={variants}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="z-10 grid grid-cols-3 justify-center gap-x-3 gap-y-6 sm:gap-x-6 sm:gap-y-8 lg:grid-cols-4 lg:gap-12"
        >
          {people.map((person, index) => (
            <div
              className="person flex flex-col items-center gap-2 lg:gap-4"
              key={index}
            >
              <div className="h-[20svh] w-full overflow-hidden rounded-xl bg-gradient-to-t from-blue-gray-900 to-gray shadow-component saturate-0 duration-300 hover:saturate-[0.75] dark:shadow-component-dark sm:h-[25svh] md:h-[30svh] lg:h-[40svh]">
                {person.img && (
                  <motion.div
                    whileHover="hoverScale"
                    variants={variants}
                    transition={{ duration: 0.4 }}
                    className="overflow-hidden rounded-xl h-full"
                  >
                    <OptimizedImage
                      src={person.img}
                      alt=""
                      className="h-full w-full rounded-xl object-cover"
                    />
                  </motion.div>
                )}
              </div>
              <div className="flex flex-col gap-1 lg:gap-2">
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

        {/* Animated images and description */}
        <div className="px-sect relative pb-48 pt-sect-medium lg:pb-sect-default lg:pt-sect-long 2xl:mt-sect-default">
          <motion.div
            initial="hidden"
            animate="blobAnimation"
            variants={variants}
            className="blob-brown blur-blob left-[20%] top-1/3 h-1/3 w-1/3 opacity-30"
          ></motion.div>

          {whoImages.map((img, index) => (
            <AnimatedImage key={`whoImg-${index}`} src={img} index={index} />
          ))}

          <motion.p
            initial="hiddenY"
            whileInView="visible"
            variants={variants}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="p-regular z-10 text-text-dark lg:w-2/3 xl:w-2/3 2xl:w-1/2 3xl:w-2/5"
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

// Animated image component
const AnimatedImage = memo(({ src, index }: { src: string; index: number }) => {
  const ref = React.useRef(null);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView={["visible", "imgFloat"]}
      variants={variants}
      transition={{ delay: 0.2 + index * 0.1 }}
      className={`img-${index + 1} absolute -z-10 overflow-hidden rounded-md bg-gradient-to-t from-blue-gray-900 to-gray will-change-transform lg:rounded-lg`}
    >
      <OptimizedImage src={src} alt="" className="h-full w-full object-cover" />
    </motion.div>
  );
});

export default memo(AboutWho);
