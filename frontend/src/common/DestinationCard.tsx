import React, { useMemo } from "react";
import { motion } from "framer-motion";

import Destination from "src/types/Destination";
import { Link } from "react-router-dom";
import { useViewportWidth, getImageSize, optimizeImage } from "src/utils/imageUtils";
import { HoverVariants } from "src/utils/variants";

interface DestinationCardProps {
  destination: Destination;
}

const variants = {
  hoverX: HoverVariants.hoverX,
  hoverScale: HoverVariants.hoverScale,
};

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  const viewportWidth = useViewportWidth();

  const optimizedImage = useMemo(() => destination.images && destination.images.length > 0
    ? optimizeImage(destination.images[0], {
        width: getImageSize(viewportWidth),
        quality: 80,
        format: "auto",
      })
    : null,
    [destination.images, viewportWidth]
  );

  return (
    <div
      key={destination.name}
      className="destination-card flex w-full flex-col gap-2"
    >
      <Link
        to={`/discover/destinations/${destination._id}`}
        target="_top"
        className="grid h-[50svh] place-items-center overflow-hidden rounded-2xl shadow-component bg-gradient-to-t from-blue-gray-900 to-gray"
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
        <div className="mt-4 flex flex-row items-start justify-start gap-2">
          {destination.tags && destination.tags.map((tag) => (
            <span
              key={tag}
              className="span-small rounded-2xl border-solid border-gray px-4 lg:border"
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
