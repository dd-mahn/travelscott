import React, { Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Destination from "src/types/Destination";
import planeIcon from "src/assets/svg/plane-icon.svg";

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
    },
  },
};

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  const navigate = useNavigate();
  return (
    <Suspense
      fallback={
        <div className="grid h-[50svh] w-full place-items-center overflow-hidden rounded-xl bg-gradient-to-t from-background-dark to-transparent">
          <img src={planeIcon} alt="" className="w-1/5" />
        </div>
      }
    >
      <div
        key={destination.name}
        className="destination-card flex w-full cursor-pointer flex-col gap-2"
      >
        <div
          className="grid h-[50svh] place-items-center overflow-hidden rounded-xl bg-gradient-to-t from-background-dark to-transparent"
          onClick={() => {
            navigate(`/discover/destinations/${destination._id}`);
          }}
        >
          {destination.images[0] && (
            <motion.img
              whileHover="hoverScale"
              variants={variants}
              loading="lazy"
              src={destination.images[0]}
              alt={destination.name}
              className="h-full w-full rounded-xl"
            />
          )}
        </div>
        <div className="flex h-fit flex-col justify-start gap-0">
          <span className="span-regular text-gray">
            {destination.country || "Country"}
          </span>
          <motion.span
            whileHover="hoverX"
            variants={variants}
            className="span-medium w-fit uppercase"
          >
            {destination.name}
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
    </Suspense>
  );
};

export default DestinationCard;
