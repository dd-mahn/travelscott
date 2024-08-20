import React, { memo, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Component imports
import Country from "src/types/Country";

// Component props type
type CountryCardProps = {
  country: Country;
};

// Framer motion variants
const variants = {
  hoverScale: {
    scale: 1.05,
    transition: {
      duration: 0.4,
    },
  },
  hoverRight: {
    x: 5,
    transition: {
      duration: 1,
      type: "spring",
      bounce: 0.5,
    },
  },
  hoverRotate: {
    rotate: -5,
    transition: {
      duration: 0.4,
      type: "spring",
    },
  },
  tapRotate: {
    rotate: 5,
    transition: {
      duration: 0.4,
      type: "spring",
    },
  },
};

// CountryCard component
const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  // Navigate hook
  const navigate = useNavigate();

  // Render logic
  return (
    <Suspense
      fallback={
        <div className="rounded-xl bg-gradient-to-t from-background-dark to-transparent lg:h-20 lg:w-32" />
      }
    >
      <div className="flex h-fit flex-row lg:gap-2 2xl:gap-4">
        <motion.div
          whileHover="hoverRotate"
          whileTap="tapRotate"
          variants={variants}
          className="flex cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-gradient-to-t from-background-dark to-transparent lg:h-20 lg:w-2/3"
          onClick={() => {
            navigate(`countries/${country._id}`);
          }}
        >
          <motion.img
            whileHover="hoverScale"
            variants={variants}
            src={country?.images?.flagImages?.[0]}
            alt={country.name}
            className="h-full w-full rounded-xl"
          />
        </motion.div>
        <div className="flex h-fit flex-col justify-start gap-0">
          <motion.span
            whileHover="hoverRight"
            variants={variants}
            className="span-medium cursor-pointer"
            onClick={() => {
              navigate(`countries/${country._id}`);
            }}
          >
            {country.name}
          </motion.span>
          <span className="span-small whitespace-nowrap">
            {country.totalDestinations} destinations
          </span>
        </div>
      </div>
    </Suspense>
  );
};

export default memo(CountryCard);
