import React, { memo, useMemo } from "react";
import { Carousel } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Destination from "src/types/Destination";
import OptimizedImage from "src/common/OptimizedImage/OptimizedImage";
import {
  HoverVariants,
  VisibilityVariants,
} from "src/utils/constants/variants";

// Define animation variants
const variants = {
  hiddenY: VisibilityVariants.hiddenY,
  hiddenShortY: VisibilityVariants.hiddenShortY,
  hiddenFullY: VisibilityVariants.hiddenFullY,
  visible: VisibilityVariants.visible,
  hoverScale: HoverVariants.hoverScale,
};

interface DiscoverPosterProps {
  featuredDestinations: Destination[];
}

const DiscoverPoster: React.FC<DiscoverPosterProps> = ({
  featuredDestinations,
}) => {
  // Return null if there are no featured destinations
  if (!featuredDestinations || featuredDestinations.length === 0) {
    return null;
  }

  // Limit to top 5 destinations for better performance
  const topDestinations = useMemo(() => 
    featuredDestinations.slice(0, 5), 
    [featuredDestinations]
  );

  return (
    <motion.section
      initial="hiddenShortY"
      animate="visible"
      transition={{ duration: 0.5 }}
      variants={variants}
      className="posters h-[60svh] w-screen md:h-[95svh]"
    >
      {/* @ts-ignore */}
      <Carousel
        autoplay={topDestinations.length > 1}
        autoplayDelay={5000}
        transition={{ duration: 2 }}
        loop
        className="h-full"
      >
        {topDestinations.map((destination) => (
          <motion.div
            className="poster px-sect relative flex h-full w-screen cursor-pointer flex-col gap-0 pb-sect-short lg:pb-sect-default"
            key={destination._id}
          >
            <Link
              to={`destinations/${destination._id}`}
              className="image-suspense absolute left-0 top-0 h-full w-full overflow-hidden"
            >
              <OptimizedImage
                whileHover="hoverScale"
                transition={{ duration: 0.4 }}
                variants={variants}
                src={
                  destination.images && destination.images.length > 0
                    ? typeof destination.images[0] === "string"
                      ? destination.images[0]
                      : destination.images[0] || ""
                    : ""
                }
                className="z-0 h-full w-full"
                imageClassName="cursor-hover brightness-75"
                alt={`Featured destination: ${destination.name}`}
              />
            </Link>

            <div className="pointer-events-none z-10 w-fit pt-sect-short">
              <div className="big-heading overflow-hidden">
                {destination.name.split("").map((letter, index) => (
                  <motion.h1
                    key={index}
                    variants={variants}
                    initial="hiddenFullY"
                    whileInView="visible"
                    viewport={{ once: true }}
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
