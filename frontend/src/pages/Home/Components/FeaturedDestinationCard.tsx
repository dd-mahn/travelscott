import React, { memo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import Destination from "src/types/Destination";
import {
  HoverVariants,
  VisibilityVariants,
} from "src/utils/constants/variants";
import OptimizedImage from "src/common/OptimizedImage";

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
    return (
      <div className="destination-card flex h-full flex-col gap-1 lg:gap-2 lg:pb-6 2xl:gap-4 2xl:pb-8">
        {/* Image container */}
        <Link
          to={`/discover/destinations/${destination._id}`}
          className="h-[60svh] w-full overflow-hidden rounded-xl bg-gradient-to-t from-blue-gray-900 to-gray shadow-component dark:shadow-component-dark md:h-[65svh] lg:h-[65svh] 2xl:h-[70svh]"
        >
          <OptimizedImage
            src={destination.images?.[0] ?? ""}
            alt={`Image of ${destination.name}`}
            className="cursor-hover h-full w-full cursor-pointer rounded-xl object-cover"
            whileHover="hoverScale"
            transition={{ duration: 0.4 }}
            variants={variants}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </Link>
        {/* Destination information */}
        <div className="flex flex-col pt-2 lg:gap-0 xl:gap-0 2xl:gap-0 3xl:gap-0">
          <span className="span-small text-gray">{destination.country}</span>
          <motion.span
            whileHover="hoverX"
            transition={{ duration: 0.3 }}
            variants={variants}
            className="cursor-hover-small span-medium w-fit cursor-pointer uppercase"
          >
            <Link
              to={`/destinations/${destination._id}`}
              aria-label={`View ${destination.name}`}
            >
              {destination.name}
            </Link>
          </motion.span>
          {/* Tags */}
          <div className="mt-2 flex flex-wrap gap-1 lg:mt-4 lg:gap-2">
            {destination.tags.map((tag, index) => (
              <span
                key={index}
                className="span-small rounded-2xl border border-gray px-2 lg:px-4"
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
