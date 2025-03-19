import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import Destination from "src/types/Destination";
import OptimizedImage from "src/common/OptimizedImage/OptimizedImage";
import { HoverVariants } from "src/utils/constants/variants";

// Define the props for the DestinationCard component
interface DestinationCardProps {
  destination: Destination;
}

// Define the hover variants for the motion components
const variants = {
  hoverX: HoverVariants.hoverX,
  hoverScale: HoverVariants.hoverScale,
};

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  return (
    <div
      key={destination.name}
      data-testid="destination-card"
      className="destination-card flex w-full flex-col gap-2"
    >
      <Link
        to={`/discover/destinations/${destination._id}`}
        className="image-suspense grid h-[30svh] place-items-center overflow-hidden rounded-2xl shadow-component dark:shadow-component-dark sm:h-[35svh] lg:h-[50svh]"
      >
        {destination.images && destination.images.length > 0 && (
          <OptimizedImage
            src={destination.images[0]}
            alt={destination.name}
            className="h-full w-full rounded-xl"
            imageClassName="cursor-hover rounded-xl"
            whileHover="hoverScale"
            transition={{ duration: 0.4 }}
            variants={variants}
          />
        )}
      </Link>
      <div className="flex h-fit flex-col justify-start gap-0">
        <span className="span-regular text-gray">
          {destination.country || "Country"}
        </span>

        <motion.span
          whileHover="hoverX"
          variants={variants}
          transition={{ duration: 0.3 }}
          className="cursor-hover-small span-medium w-fit uppercase"
        >
          <Link to={`/discover/destinations/${destination._id}`}>
            {destination.name}
          </Link>
        </motion.span>
        <div className="mt-2 flex flex-row flex-wrap items-start justify-start gap-1 md:mt-4 md:gap-2">
          {destination.tags &&
            destination.tags.map((tag) => (
              <span
                key={tag}
                className="span-small rounded-2xl border border-solid border-gray px-2 lg:px-4"
              >
                {tag}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
