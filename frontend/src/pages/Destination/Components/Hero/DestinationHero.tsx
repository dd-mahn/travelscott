import React, { memo, useMemo } from "react";
import { Carousel } from "@material-tailwind/react";
import Destination from "src/types/Destination";
import { motion } from "framer-motion";
import {
  HoverVariants,
  VisibilityVariants,
} from "src/utils/constants/variants";

// Define the interface for the component props
interface DestinationHeroProps {
  destination: Destination;
}

// Define animation variants
const variants = {
  hiddenY: VisibilityVariants.hiddenY,
  hiddenFullY: VisibilityVariants.hiddenFullY,
  visible: VisibilityVariants.visible,
  hoverScale: HoverVariants.hoverScale,
};

const DestinationHero: React.FC<DestinationHeroProps> = memo(({ destination }) => {
  // Memoize the letter animations to prevent unnecessary re-renders
  const destinationNameLetters = useMemo(() => {
    return destination.name.split("").map((letter, index) => (
      <motion.h1
        key={index}
        variants={variants}
        initial="hiddenFullY"
        animate="visible"
        transition={{
          duration:
            destination.name.split("").length < 10 ? 0.8 : 0.6,
          delay: 0.5 + index * 0.1,
          type: "spring",
          bounce: 0.5,
        }}
        className="inline-block text-text-dark"
      >
        {letter}
      </motion.h1>
    ));
  }, [destination.name, variants]);

  // Memoize carousel images to prevent unnecessary re-renders
  const carouselImages = useMemo(() => {
    return destination.images?.map((image, index) => (
      <div
        className="image-suspense grid h-full w-full place-items-center overflow-hidden"
        key={index}
      >
        <motion.img
          src={image}
          alt={destination.name}
          className="h-full w-full object-cover"
        />
      </div>
    ));
  }, [destination.images, destination.name]);

  return (
    <section className="hero relative h-screen">
      {/* Overlay with country and destination name */}
      <div className="pointer-events-none absolute top-0 z-10 grid h-[90%] w-full place-items-center bg-background-dark bg-opacity-20">
        <div className="flex flex-col items-start justify-center gap-0 px-8 py-4">
          {/* Country name */}
          <motion.span
            variants={variants}
            initial="hiddenY"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.8 }}
            className="span-medium w-full text-center text-text-dark md:ml-2 md:text-left"
          >
            {destination.country}
          </motion.span>
          {/* Destination name */}
          <div className="overflow-hidden">
            <div className="big-heading overflow-hidden">
              {destinationNameLetters}
            </div>
          </div>
        </div>
      </div>
      {/* Carousel with optimized images */}
      <motion.div
        variants={variants}
        initial="hiddenY"
        animate="visible"
        transition={{ duration: 0.5 }}
        className="h-[90%]"
      >
        {/* @ts-ignore */}
        <Carousel
          className=""
          autoplay
          autoplayDelay={4000}
          transition={{ duration: 2 }}
          loop
        >
          {carouselImages}
        </Carousel>
      </motion.div>
    </section>
  );
});

export default DestinationHero;
