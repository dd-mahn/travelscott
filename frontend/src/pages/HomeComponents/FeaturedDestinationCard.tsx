import React, { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import Destination from "src/types/Destination";
import { optimizeImage } from "src/utils/optimizeImage";
import { getImageSize, useViewportWidth } from "src/utils/imageUtils";

// Define prop types for the component
type DestinationCardProps = {
  destination: Destination;
};

// Define animation variants for Framer Motion
const variants = {
  hidden: { opacity: 0, y: 20 },
  hiddenScale: { opacity: 0.9, scale: 0.95 },
  hiddenX: { opacity: 0, x: 50 },
  visible: { opacity: 1, y: 0, x: 0, scale: 1, transition: { duration: 0.5 } },
  hoverScale: {
    scale: 1.05,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
  hoverX: {
    x: 5,
    transition: {
      duration: 1,
      type: "spring",
      bounce: 0.5,
    },
  },
};

// FeaturedDestinationCard component
const FeaturedDestinationCard: React.FC<DestinationCardProps> = memo(
  ({ destination }) => {
    // Get the current viewport width
    const viewportWidth = useViewportWidth();

    // Memoize image properties to prevent unnecessary recalculations
    const imageProps = useMemo(() => {
      const imageSize = getImageSize(viewportWidth);
      return optimizeImage(destination.images?.[0] ?? "", {
        width: imageSize,
        quality: 80,
        format: "auto",
      });
    }, [destination.images, viewportWidth]);

    return (
      <div className="destination-card flex h-full flex-col gap-4 pb-8">
        {/* Image container */}
        <div className="h-[70svh] w-full overflow-hidden rounded-xl shadow-component">
          <motion.img
            whileHover="hoverScale"
            transition={{ duration: 0.4 }}
            variants={variants}
            loading="lazy"
            {...imageProps}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            alt={`Image of ${destination.name}`}
            className="cursor-hover h-full w-full cursor-pointer rounded-xl object-cover"
          />
        </div>
        {/* Destination information */}
        <div className="flex flex-col lg:gap-0 xl:gap-0 2xl:gap-0 3xl:gap-0">
          <span className="span-regular text-gray">{destination.country}</span>
          <motion.span
            whileHover="hoverX"
            variants={variants}
            className="cursor-hover-small span-medium w-fit cursor-pointer uppercase"
          >
            <Link to={"/"} aria-label={`View details for ${destination.name}`}>
              {destination.name}
            </Link>
          </motion.span>
          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {destination.tags.map((tag, index) => (
              <span
                key={index}
                className="span-small rounded-2xl border-gray px-4 lg:border"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  },
);

export default FeaturedDestinationCard;
