import React, { memo, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Country from "src/types/Country";
import { VisibilityVariants } from "src/utils/variants";
import { Carousel } from "@material-tailwind/react";
import { getImageSize, useViewportWidth, optimizeImage } from "src/utils/imageUtils";

const variants = {
  hiddenY: VisibilityVariants.hiddenY,
  hiddenFullY: VisibilityVariants.hiddenFullY,
  visible: VisibilityVariants.visible,
};

const CountryHero = ({ country }: { country: Country }) => {
  const viewportWidth = useViewportWidth();

  const optimizedImages = useMemo(() => {
    return country.images.otherImages?.map((image) =>
      optimizeImage(image, {
        width: getImageSize(viewportWidth),
        quality: 80,
        format: "auto",
      }),
    );
  }, [country.images.otherImages, viewportWidth]);

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
        {optimizedImages?.map((image, index) => (
          <div
            className="h-full w-svw bg-gradient-to-t from-blue-gray-900 to-gray"
            key={index}
          >
            <img
              src={image.src}
              srcSet={image.srcSet}
              alt={`${country.name} image`}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </Carousel>

      <div className="px-sect flex items-center gap-4 md:gap-8">
        <motion.img
          initial="hiddenY"
          animate="visible"
          variants={variants}
          transition={{ duration: 0.5, delay: 1 }}
          src={country.images.flagImages?.[0]}
          className=" w-1/4 md:w-1/6 rounded-lg md:rounded-xl"
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
                duration: 0.8,
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
