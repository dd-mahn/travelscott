import React, { Suspense } from "react";
import { easeIn, motion } from "framer-motion";

import Destination from "src/types/Destination";
import planeIcon from "src/assets/svg/plane-icon.svg";
import { Link } from "react-router-dom";

interface DestinationCardProps {
  destination: Destination;
}

const variants = {
  hoverX: {
    x: 5,
    transition: {
      duration: 1,
      type: "spring",
      bounce: 0.5,
    },
  },
  hoverScale: {
    scale: 1.05,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
};

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  return (
    <div
      key={destination.name}
      className="destination-card flex w-full flex-col gap-2"
    >
      <Link
        to={`/discover/destinations/${destination._id}`}
        target="_top"
        className="grid h-[50svh] place-items-center overflow-hidden rounded-2xl bg-gradient-to-t from-background-dark to-transparent shadow-component"
      >
        {destination.images[0] && (
          <motion.img
            whileHover="hoverScale"
            transition={{ duration: 0.4 }}
            variants={variants}
            loading="lazy"
            src={destination.images[0]}
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
          {destination.tags.map((tag) => (
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
