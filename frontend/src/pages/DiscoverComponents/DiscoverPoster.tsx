import React, { memo, useMemo } from "react";
import { Carousel } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Destination from "src/types/Destination";
import { optimizeImage } from "src/utils/optimizeImage";
import { useViewportWidth } from "src/utils/imageUtils";
import { HoverVariants, VisibilityVariants } from "src/utils/variants";

const variants = {
  hiddenY: VisibilityVariants.hiddenY,
  visible: VisibilityVariants.visible,
  hoverScale: HoverVariants.hoverScale,
};

interface DiscoverPosterProps {
  featuredDestinations: Destination[];
}

const DiscoverPoster: React.FC<DiscoverPosterProps> = ({
  featuredDestinations,
}) => {
  const viewportWidth = useViewportWidth();

  return (
    <motion.section
      initial="hiddenY"
      animate="visible"
      transition={{ duration: 0.5, delay: 0.1 }}
      variants={variants}
      className="posters h-[95svh] w-screen"
    >
      {/* @ts-ignore */}
      <Carousel
        autoplay={featuredDestinations.length > 1}
        autoplayDelay={5000}
        transition={{ duration: 2 }}
        loop
        className="h-full"
      >
        {featuredDestinations.map((destination) => {
          const imageProps = useMemo(() => {
            if (destination.images && destination.images.length > 0 && destination.images[0]) {
              return optimizeImage(destination.images[0], {
                width: Math.min(viewportWidth, 1920),
                quality: 80,
                format: "auto",
              });
            }
            return { src: "", srcSet: "" };
          }, [destination.images, viewportWidth]);

          return (
            <motion.div
              className="poster px-sect relative flex h-full w-screen cursor-pointer flex-col gap-0 bg-gradient-to-t from-background-dark to-transparent py-sect-short"
              key={destination._id}
            >
              {imageProps.src && (
                <Link
                  to={`destinations/${destination._id}`}
                  target="_top"
                  className="absolute left-0 top-0 h-full w-full overflow-hidden"
                >
                  <motion.img
                    whileHover="hoverScale"
                    transition={{ duration: 0.4 }}
                    variants={variants}
                    {...imageProps}
                    loading="lazy"
                    className="cursor-hover z-0 h-full w-full object-cover brightness-75"
                    alt="Featured destination"
                  />
                </Link>
              )}

              <div className="z-10 w-fit pt-sect-short pointer-events-none">
                <div className="overflow-hidden">
                  <motion.h1
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="big-heading pointer-events-none select-none text-text-dark"
                  >
                    {destination.name}
                  </motion.h1>
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
          );
        })}
      </Carousel>
    </motion.section>
  );
};

export default memo(DiscoverPoster);
