import React, { memo, Suspense } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Component imports
import Country from "src/types/Country";
import OptimizedImage from "src/common/OptimizedImage";
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
      fallback={
        <div className="h-full w-full rounded-xl bg-gradient-to-t from-blue-gray-900 to-gray lg:h-20 lg:w-32" />
      }
    >
      <div className="flex h-fit flex-col gap-2 lg:flex-row lg:gap-4 2xl:gap-4">
        <motion.div
          whileHover="hoverRotate"
          whileTap="tapRotate"
          variants={variants}
          className="flex h-24 cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-gradient-to-t from-blue-gray-900 to-gray shadow-component dark:shadow-component-dark lg:h-20 lg:w-2/3"
        >
          <Link
            to={`countries/${country._id}`}
            target="_top"
            className="h-full w-full"
          >
            {country?.images?.flagImages?.[0] && (
              <OptimizedImage
                src={country.images.flagImages[0]}
                alt={country.name}
                className="cursor-hover h-full w-full rounded-xl"
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
            <Link to={`countries/${country._id}`} target="_top">
              {country.name}
            </Link>
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
