import React, { memo, useEffect, useMemo } from "react";
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

const CountryHero = ({ country }: { country: Country }) => {
  return (
    <motion.section
      initial="hiddenY"
      animate="visible"
      variants={variants}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="hero flex h-[95svh] md:h-screen flex-col gap-4 md:gap-8"
    >
      {/* @ts-ignore */}
      <Carousel autoplay autoplayDelay={4000} transition={{ duration: 2 }} loop>
        {country.images.otherImages?.map((image, index) => (
          <div
            className="h-full w-svw bg-gradient-to-t from-blue-gray-900 to-gray"
            key={index}
          >
            <OptimizedImage
              src={image}
              alt={`${country.name} image`}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </Carousel>

      {/* Section for displaying country flag and name */}
      <div className="px-sect flex items-center gap-4 md:gap-8">
        <motion.img
          initial="hiddenY"
          animate="visible"
          variants={variants}
          transition={{ duration: 0.5, delay: 1 }}
          src={country.images.flagImages?.[0]}
          className="w-1/4 md:w-1/6 rounded-lg md:rounded-xl"
          alt={`${country.name} flag`}
        />
        <div className="big-heading overflow-hidden">
          {country.name.split("").map((letter, index) => (
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
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default memo(CountryHero);
