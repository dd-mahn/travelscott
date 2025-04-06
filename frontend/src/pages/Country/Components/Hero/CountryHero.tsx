import React, { memo, useMemo } from "react";
import { motion } from "framer-motion";
import Country from "src/types/Country";
import { VisibilityVariants } from "src/utils/constants/variants";
import { Carousel } from "@material-tailwind/react";
import OptimizedImage from "src/common/OptimizedImage/OptimizedImage";

// Define motion variants for animations
const variants = {
  hiddenY: VisibilityVariants.hiddenY,
  hiddenFullY: VisibilityVariants.hiddenFullY,
  visible: VisibilityVariants.visible,
};

const CountryHero = memo(({ country }: { country: Country }) => {
  // Memoize country images for carousel to prevent unnecessary re-renders
  const carouselImages = useMemo(() => {
    return country.images.otherImages?.map((image, index) => (
      <div className="image-suspense h-full w-svw" key={index}>
        <OptimizedImage
          src={image}
          alt={`${country.name} image`}
          className="h-full w-full"
        />
      </div>
    ));
  }, [country.images.otherImages, country.name]);

  // Memoize letter animations to prevent unnecessary re-renders
  const countryNameLetters = useMemo(() => {
    return country.name.split("").map((letter, index) => (
      <motion.h1
        key={index}
        variants={variants}
        initial="hiddenFullY"
        animate="visible"
        transition={{
          duration: country.name.split("").length < 10 ? 0.8 : 0.6,
          delay: 1.2 + index * 0.1,
          type: "spring",
          bounce: 0.5,
        }}
        className="inline-block"
      >
        {letter}
      </motion.h1>
    ));
  }, [country.name, variants]);

  return (
    <motion.section
      initial="hiddenY"
      animate="visible"
      variants={variants}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="hero flex h-[95svh] flex-col gap-4 md:h-screen md:gap-8"
    >
      {/* @ts-ignore */}
      <Carousel autoplay autoplayDelay={4000} transition={{ duration: 2 }} loop>
        {carouselImages}
      </Carousel>

      {/* Section for displaying country flag and name */}
      <div className="px-sect flex items-center gap-4 md:gap-8">
        <motion.img
          initial="hiddenY"
          animate="visible"
          variants={variants}
          transition={{ duration: 0.5, delay: 1 }}
          src={country.images.flagImages?.[0]}
          className="w-1/4 rounded-lg md:w-1/6 md:rounded-xl"
          alt={`${country.name} flag`}
          loading="eager" // Prioritize flag loading
        />
        <div className="big-heading overflow-hidden">
          {countryNameLetters}
        </div>
      </div>
    </motion.section>
  );
});

export default CountryHero;
