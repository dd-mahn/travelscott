import React, { memo, Suspense } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Component imports
import Country from "src/types/Country";
import OptimizedImage from "src/common/OptimizedImage/OptimizedImage";
import { HoverVariants, TapVariants } from "src/utils/constants/variants";

// Component props type
type CountryCardProps = {
  country: Country;
};

// Framer motion variants
const variants = {
  hoverScale: HoverVariants.hoverScale,
  hoverX: HoverVariants.hoverX,
  hoverRotate: HoverVariants.hoverRotate,
  tapRotate: TapVariants.tapRotate,
};

// CountryCard component
const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  // Render logic
  return (
    <Suspense
      fallback={<div className="h-full w-full rounded-xl lg:h-20 lg:w-32" />}
    >
      <div className="flex h-fit flex-col gap-2 lg:flex-row lg:gap-4 2xl:gap-4">
        <motion.div
          whileHover="hoverRotate"
          whileTap="tapRotate"
          variants={variants}
          className="image-suspense flex h-16 cursor-pointer items-center justify-center overflow-hidden rounded-xl shadow-component dark:shadow-component-dark sm:h-20 lg:h-20 lg:w-2/3"
        >
          <Link to={`countries/${country._id}`} className="h-full w-full">
            {country?.images?.flagImages?.[0] && (
              <OptimizedImage
                src={country.images.flagImages[0]}
                alt={country.name}
                className="h-full w-full rounded-xl"
                imageClassName="cursor-hover rounded-xl"
                whileHover="hoverScale"
                transition={{ duration: 0.4 }}
                variants={variants}
              />
            )}
          </Link>
        </motion.div>
        <div className="flex h-fit flex-col justify-start gap-0">
          <motion.span
            whileHover="hoverX"
            transition={{ duration: 0.3 }}
            variants={variants}
            className="cursor-hover-small span-medium cursor-pointer"
          >
            <Link to={`countries/${country._id}`}>{country.name}</Link>
          </motion.span>
          <span className="span-small whitespace-nowrap">
            {country.totalDestinations} destinations
          </span>
        </div>
      </div>
    </Suspense>
  );
};

export default CountryCard;
