import React, { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import Destination from "src/types/Destination";
import {
  getImageSize,
  useViewportWidth,
  optimizeImage,
} from "src/utils/imageUtils";
import { HoverVariants, VisibilityVariants } from "src/utils/variants";

// Define prop types for the component
type DestinationCardProps = {
  destination: Destination;
};

// Define animation variants for Framer Motion
const variants = {
  hiddenY: VisibilityVariants.hiddenY,
  hiddenScale: VisibilityVariants.hiddenScale,
  hiddenX: VisibilityVariants.hiddenX,
  visible: VisibilityVariants.visible,
  hoverScale: HoverVariants.hoverScale,
  hoverX: HoverVariants.hoverX,
};

// FeaturedDestinationCard component
const FeaturedDestinationCard: React.FC<DestinationCardProps> = memo(
  ({ destination }) => {
    // Get the current viewport width
    const viewportWidth = useViewportWidth();

    // Memoize image properties to prevent unnecessary recalculations
    const imageProps = useMemo(() => {
      return optimizeImage(destination.images?.[0] ?? "", {
        width: getImageSize(viewportWidth),
        quality: 80,
        format: "auto",
      });
    }, [destination.images, viewportWidth]);

    return (
      <div className="destination-card flex h-full flex-col gap-1 lg:gap-2 2xl:gap-4 lg:pb-6 2xl:pb-8">
        {/* Image container */}
        <div className="w-full overflow-hidden rounded-xl bg-gradient-to-t from-blue-gray-900 to-gray shadow-component dark:shadow-component-dark h-[60svh] md:h-[65svh] lg:h-[65svh] 2xl:h-[70svh]">
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
        <div className="flex flex-col lg:gap-0 xl:gap-0 2xl:gap-0 3xl:gap-0 pt-2">
          <span className="span-small text-gray">{destination.country}</span>
          <motion.span
            whileHover="hoverX"
            transition={{ duration: 0.3 }}
            variants={variants}
            className="cursor-hover-small span-medium w-fit cursor-pointer uppercase"
          >
            <Link to={"/"} aria-label={`View details for ${destination.name}`}>
              {destination.name}
            </Link>
          </motion.span>
          {/* Tags */}
          <div className=" mt-2 lg:mt-4 flex flex-wrap gap-1 lg:gap-2">
            {destination.tags.map((tag, index) => (
              <span
                key={index}
                className="span-small rounded-2xl border-gray px-2 lg:px-4 border"
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
