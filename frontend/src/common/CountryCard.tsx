import React, { memo, Suspense, useMemo } from "react";
import { motion } from "framer-motion";

// Component imports
import Country from "src/types/Country";
import { Link } from "react-router-dom";
import {
  useViewportWidth,
  getImageSize,
  optimizeImage,
} from "src/utils/imageUtils";
import { HoverVariants, TapVariants } from "src/utils/variants";

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
  const viewportWidth = useViewportWidth();

  const optimizedImage = useMemo(
    () =>
      country?.images?.flagImages?.[0]
        ? optimizeImage(country.images.flagImages[0], {
            width: getImageSize(viewportWidth),
            quality: 80,
            format: "auto",
          })
        : null,
    [country.images.flagImages, viewportWidth],
  );

  // Render logic
  return (
    <Suspense
      fallback={
        <div className="rounded-xl bg-gradient-to-t from-blue-gray-900 to-gray lg:h-20 lg:w-32" />
      }
    >
      <div className="flex h-fit flex-row lg:gap-4 2xl:gap-4">
        <motion.div
          whileHover="hoverRotate"
          whileTap="tapRotate"
          variants={variants}
          className="flex cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-gradient-to-t from-blue-gray-900 to-gray shadow-component lg:h-20 lg:w-2/3"
        >
          <Link
            to={`countries/${country._id}`}
            target="_top"
            className="h-full w-full"
          >
            {optimizedImage && (
              <motion.img
                whileHover="hoverScale"
                transition={{ duration: 0.4 }}
                variants={variants}
                src={optimizedImage.src}
                srcSet={optimizedImage.srcSet}
                alt={country.name}
                className="cursor-hover h-full w-full rounded-xl"
                loading="lazy"
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
