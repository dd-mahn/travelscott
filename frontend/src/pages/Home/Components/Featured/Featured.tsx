import React, { memo, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch} from "react-redux";

// Component imports
import HorizontalScrollCarousel from "src/pages/Home/Components/Featured/FeaturedHorizontalScroller";
import { SecondaryButton } from "src/common/Buttons/Button";
import { ErrorState, LoadingState, NotFoundState } from "src/common/Catalogs/CatalogStates";

// Utility imports
import { VisibilityVariants } from "src/utils/constants/variants";
import { useViewportWidth } from "src/hooks/useViewportWidth/useViewportWidth";
import useFetch from "src/hooks/useFetch/useFetch";
import config from "src/config/config";

// Type imports
import { FetchDestinationType } from "src/types/FetchData";
import DestinationType from "src/types/Destination";

// Redux actions
import { setFeaturedDestinations } from "src/store/slices/destinationSlice";

// Framer motion variants for animations
const variants = {
  hidden: VisibilityVariants.hidden,
  hiddenY: VisibilityVariants.hiddenY,
  hiddenFullY: VisibilityVariants.hiddenFullY,
  visible: VisibilityVariants.visible,
};

interface FeaturedProps {
  // Optional props to receive data from parent
  featuredDestinations?: DestinationType[];
  isLoading?: boolean;
}

// Featured component: Displays featured destinations
const Featured: React.FC<FeaturedProps> = ({ featuredDestinations: propDestinations, isLoading: propLoading }) => {
  const viewportWidth = useViewportWidth();
  const dispatch = useDispatch();

  // Only fetch data if props are not provided (standalone mode)
  const { data, isLoading, error } = useFetch<FetchDestinationType>(
    "featured-destinations",
    `/destinations?featured=true&limit=10`,
    "home",
    {
      staleTime: 5 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
      // Skip fetch if props are provided
      enabled: !propDestinations,
    }
  );
  
  // Use either props or fetched data
  const destinations = useMemo(() => 
    propDestinations || data?.result?.slice(0, 10) || [], 
    [propDestinations, data?.result]
  );

  // Use either props loading state or internal loading state
  const isLoadingState = propLoading !== undefined ? propLoading : isLoading;

  // Only dispatch if we're in standalone mode (no props provided)
  useEffect(() => {
    if (!propDestinations && destinations.length > 0) {
      dispatch(setFeaturedDestinations(destinations));
    }
  }, [destinations, dispatch, propDestinations]);

  return (
    <section className="featured flex flex-col lg:gap-28 xl:gap-32 2xl:gap-36 3xl:gap-40">
      {/* Header */}
      <div className="px-sect grid w-full place-items-center overflow-hidden">
        <motion.h1
          initial="hiddenFullY"
          whileInView="visible"
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          variants={variants}
          className="h1-md relative leading-[0.85]"
        >
          {/* Decorative icon */}
          <i className="ri-shining-2-fill rotate-30 absolute top-0 hidden transform text-yellow dark:text-yellow md:-left-[7%] md:block md:text-3xl lg:-left-[5%] lg:text-3xl xl:text-4xl 2xl:text-4xl 3xl:text-5xl"></i>{" "}
          Featured Destinations
        </motion.h1>
      </div>

      {/* Horizontal scroll carousel */}
      <AnimatePresence mode="wait">
        {isLoadingState ? (
          <LoadingState keyName={`featured-loading-${isLoadingState}`} />
        ) : error ? (
          <ErrorState keyName={`featured-error-${error}`} />
        ) : destinations.length > 0 ? (
          <div key={`featured-destinations-${destinations.length}`}>
            <HorizontalScrollCarousel data={destinations} />
          </div>
        ) : (
          <NotFoundState keyName="featured-not-found" />
        )}
      </AnimatePresence>

      {/* Footer section */}
      <div className="px-sect flex w-full flex-col items-start justify-start gap-4 md:flex-row md:items-end md:justify-between">
        {/* Destinations count */}
        <motion.p
          initial="hiddenY"
          whileInView="visible"
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "0% 0% -10% 0%" }}
          variants={variants}
          className={`${viewportWidth > 576 ? "p-large" : "p-medium"}`}
        >
          They are just so few among the{" "}
          <span className="h3-inter font-semibold text-main-brown dark:text-dark-brown">
            100
          </span>
          + <br />
          destinations that we have covered in our Catalogue.
        </motion.p>

        {/* CTA button */}
        <motion.div
          initial="hiddenY"
          whileInView="visible"
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true, margin: "0% 0% -10% 0%" }}
          variants={variants}
          className="relative flex items-end"
        >
          {/* Decorative blob */}
          <div className="blob-green blur-blob absolute -right-[10%] -top-[40%] z-0 h-full w-1/3 opacity-100"></div>
          <div className="z-10">
            <SecondaryButton text="Discover More" link="/discover" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(Featured);
