import React, { memo, useMemo } from "react";
import { Carousel } from "@material-tailwind/react";
import Destination from "src/types/Destination";
import { optimizeImage } from "src/utils/optimizeImage";
import { getImageSize, useViewportWidth } from "src/utils/imageUtils";
import { motion } from "framer-motion";
import { HoverVariants, VisibilityVariants } from "src/utils/variants";

interface DestinationHeroProps {
  destination: Destination;
}

const variants = {
  hiddenY: VisibilityVariants.hiddenY,
  hiddenFullY: VisibilityVariants.hiddenFullY,
  visible: VisibilityVariants.visible,
  hoverScale: HoverVariants.hoverScale,
};

const DestinationHero: React.FC<DestinationHeroProps> = ({ destination }) => {
  const viewportWidth = useViewportWidth();

  const optimizedImages = useMemo(
    () =>
      destination.images?.map((image) => {
        return optimizeImage(image, {
          width: getImageSize(viewportWidth),
          quality: 80,
          format: "auto",
        });
      }),
    [destination.images, viewportWidth],
  );

  return (
    <section className="hero relative h-screen">
      <div className="pointer-events-none absolute top-0 z-10 grid h-[90%] w-full place-items-center bg-background-dark bg-opacity-20">
        <div className="flex flex-col items-start gap-0 px-8 py-4">
          <motion.span
            variants={variants}
            initial="hiddenY"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.8 }}
            className="span-medium ml-2 text-text-dark"
          >
            {destination.country}
          </motion.span>
          <div className="overflow-hidden">
            <div className="big-heading overflow-hidden">
              {destination.name.split("").map((letter, index) => (
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
                  className="inline-block text-text-dark"
                >
                  {letter}
                </motion.h1>
              ))}
            </div>
          </div>
        </div>
      </div>
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
          {optimizedImages?.map((image, index) => (
            <div
              className="grid h-full w-full place-items-center overflow-hidden bg-gradient-to-t from-blue-gray-900 to-gray"
              key={index}
            >
              <img
                src={image.src}
                srcSet={image.srcSet}
                alt={destination.name}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </Carousel>
      </motion.div>
    </section>
  );
};

export default memo(DestinationHero);
