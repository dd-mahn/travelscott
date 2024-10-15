import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import Destination from "src/types/Destination";
import { useViewportWidth, getImageSize, optimizeImage } from "src/utils/imageUtils";
import { HoverVariants } from "src/utils/variants";

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
  const viewportWidth = useViewportWidth();

  // Optimize the image based on the viewport width and destination images
  const optimizedImage = useMemo(() => {
    if (destination.images && destination.images.length > 0) {
      return optimizeImage(destination.images[0], {
        width: getImageSize(viewportWidth),
        quality: 80,
        format: "auto",
      });
    }
    return null;
  }, [destination.images, viewportWidth]);

  return (
    <div
      key={destination.name}
      className="destination-card flex w-full flex-col gap-2"
    >
      <Link
        to={`/discover/destinations/${destination._id}`}
        target="_top"
        className="grid h-[30svh] sm:h-[35svh] lg:h-[50svh] place-items-center overflow-hidden rounded-2xl shadow-component dark:shadow-component-dark bg-gradient-to-t from-blue-gray-900 to-gray"
      >
        {optimizedImage && (
          <motion.img
            whileHover="hoverScale"
            transition={{ duration: 0.4 }}
            variants={variants}
            loading="lazy"
            src={optimizedImage.src}
            srcSet={optimizedImage.srcSet}
            alt={destination.name}
            className="cursor-hover h-full w-full rounded-xl"
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
          <Link to={`/discover/destinations/${destination._id}`} target="_top">
            {destination.name}
          </Link>
        </motion.span>
        <div className="mt-2 md:mt-4 flex flex-row items-start flex-wrap justify-start gap-1 md:gap-2">
          {destination.tags && destination.tags.map((tag) => (
            <span
              key={tag}
              className="span-small rounded-2xl border-solid border-gray px-2 lg:px-4 border"
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
