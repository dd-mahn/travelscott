import React, { memo, useMemo } from "react";
import { Carousel } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Destination from "src/types/Destination";
import { getImageSize, useViewportWidth, optimizeImage } from "src/utils/imageUtils";
import { HoverVariants, VisibilityVariants } from "src/utils/variants";

// Define animation variants
const variants = {
  hiddenY: VisibilityVariants.hiddenY,
  hiddenFullY: VisibilityVariants.hiddenFullY,
  visible: VisibilityVariants.visible,
  hoverScale: HoverVariants.hoverScale,
};

interface DiscoverPosterProps {
  featuredDestinations: Destination[];
}

const DiscoverPoster: React.FC<DiscoverPosterProps> = ({ featuredDestinations }) => {
  const viewportWidth = useViewportWidth();

  // Optimize images based on viewport width
  const optimizedDestinations = useMemo(() => {
    return featuredDestinations.map((destination) => {
      if (!destination.images || destination.images.length === 0) {
        return destination;
      }
      return {
        ...destination,
        images: destination.images.map((image) =>
          optimizeImage(image, {
            width: getImageSize(viewportWidth),
            quality: 80,
            format: "auto",
          }),
        ),
      };
    });
  }, [featuredDestinations, viewportWidth]);

  // Return null if there are no featured destinations
  if (featuredDestinations.length === 0 || !featuredDestinations) {
    return null;
  }

  return (
    <motion.section
      initial="hiddenY"
      animate="visible"
      transition={{ duration: 0.5, delay: 0.1 }}
      variants={variants}
      className="posters h-[60svh] md:h-[95svh] w-screen"
    >
      {/* @ts-ignore */}
      <Carousel
        autoplay={featuredDestinations.length > 1}
        autoplayDelay={5000}
        transition={{ duration: 2 }}
        loop
        className="h-full"
      >
        {optimizedDestinations.map((destination) => (
          <motion.div
            className="poster px-sect relative flex h-full w-screen cursor-pointer flex-col gap-0 bg-gradient-to-t from-blue-gray-900 to-gray pb-sect-short lg:pb-sect-default"
            key={destination._id}
          >
            <Link
              to={`destinations/${destination._id}`}
              target="_top"
              className="absolute left-0 top-0 h-full w-full overflow-hidden"
            >
              <motion.img
                whileHover="hoverScale"
                transition={{ duration: 0.4 }}
                variants={variants}
                src={
                  destination.images && destination.images.length > 0
                    ? typeof destination.images[0] === "string"
                      ? destination.images[0]
                      : destination.images[0].src || ""
                    : ""
                }
                srcSet={
                  destination.images && destination.images.length > 0
                    ? typeof destination.images[0] === "string"
                      ? ""
                      : destination.images[0].srcSet || ""
                    : ""
                }
                loading="lazy"
                className="cursor-hover z-0 h-full w-full object-cover brightness-75"
                alt={`Featured destination: ${destination.name}`}
              />
            </Link>

            <div className="pointer-events-none z-10 w-fit pt-sect-short">
              <div className="overflow-hidden big-heading">
                {destination.name.split("").map((letter, index) => (
                  <motion.h1
                    key={index}
                    variants={variants}
                    initial="hiddenFullY"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.8,
                      delay: 0.5 + index * 0.1,
                      type: "spring",
                      bounce: 0.5,
                    }}
                    className="inline-block text-text-dark"
                  >
                    {letter}
                  </motion.h1>
                ))}
              </div>

              <motion.div
                initial="hiddenY"
                animate="visible"
                transition={{
                  duration: 0.5,
                  delay: 1,
                  staggerChildren: 0.3,
                  delayChildren: 1,
                }}
                variants={variants}
                className="pointer-events-none flex w-full justify-between"
              >
                <motion.span
                  variants={variants}
                  className="span-medium select-none text-text-dark"
                >
                  {destination.country}
                </motion.span>
                <motion.span
                  variants={variants}
                  className="span-medium mr-2 select-none text-text-dark"
                >
                  {destination.continent}
                </motion.span>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </Carousel>
    </motion.section>
  );
};

export default memo(DiscoverPoster);
