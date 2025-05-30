import React, { memo, useCallback, useMemo, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Select, Option } from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/store/store";
import { startRequest, endRequest } from "src/store/slices/loadingSlice";

// Component imports
import CountryCard from "src/common/Cards/CountryCard";
import RelatedSections from "src/common/RelatedSections/RelatedSections";
import {
  HoverVariants,
  TapVariants,
  VisibilityVariants,
} from "src/utils/constants/variants";
import {
  ErrorState,
  LoadingState,
  NotFoundState,
} from "src/common/Catalogs/CatalogStates";
import OptimizedImage from "src/common/OptimizedImage/OptimizedImage";

// Framer motion variants
const variants = {
  hiddenY: VisibilityVariants.hiddenY,
  hiddenFullY: VisibilityVariants.hiddenFullY,
  hiddenYScale: VisibilityVariants.hiddenYScale,
  hiddenX: VisibilityVariants.hiddenX,
  exitScale: VisibilityVariants.exitScale,
  exitX: VisibilityVariants.exitX,
  visible: VisibilityVariants.visible,
  hoverScale: HoverVariants.hoverScale,
  tapScale: TapVariants.tapScale,
};

// DiscoverCountries component
const DiscoverCountries: React.FC = () => {
  // Redux selectors
  const { continents } = useSelector((state: RootState) => state.continent);
  const { loading, error } = useSelector((state: RootState) => state.country);
  const dispatch = useDispatch();

  // State hooks for selected continent name
  const [selectedContinentName, setSelectedContinentName] =
    useState<string>("Asia");

  // Memoized selected continent object
  const selectedContinent = useMemo(() => {
    return continents.find(
      (continent) => continent.name === selectedContinentName,
    );
  }, [selectedContinentName, continents]);

  // Handle select continent
  const handleSelectContinent = useCallback((value: string) => {
    setSelectedContinentName(value);
  }, []);

  // Select and SelectOption elements props - memoize to prevent re-renders
  const selectProps = useMemo(
    () => ({
      color: "gray",
      label: "Select Continent",
      variant: "outlined",
      size: "lg",
      className:
        "span-small dark:bg-background-dark-transparent font-sans shadow-component dark:shadow-component-dark rounded-xl border-none",
      children: undefined,
      animate: {
        mount: { y: 0 },
        unmount: { y: 40 },
      },
      onChange: (value: string) => handleSelectContinent(value),
      menuProps: {
        className:
          "bg-background-light dark:bg-background-dark shadow-component dark:shadow-component-dark rounded-xl",
      },
      labelProps: {
        className:
          "font-medium text-text-light after:border-none before:border-none",
      },
    }),
    [handleSelectContinent],
  );

  const selectOptionProp = useMemo(
    () => ({
      className: "span-small font-sans",
    }),
    [],
  );

  // Memoized filter key
  const filterKey = useMemo(() => {
    return selectedContinentName;
  }, [selectedContinentName]);

  // Memoize country cards to avoid re-renders
  const countryCards = useMemo(() => {
    if (!selectedContinent || !selectedContinent.countries) return null;

    return selectedContinent.countries.map((country) => (
      <motion.div variants={variants} key={country._id}>
        <CountryCard country={country} />
      </motion.div>
    ));
  }, [selectedContinent, variants]);

  // Start request with content-only flag for filter changes
  useEffect(() => {
    if (loading) {
      dispatch(
        startRequest({
          page: "discover",
          requestId: `discover-countries-${filterKey}`,
          isContentOnly: true,
        }),
      );
    } else {
      dispatch(
        endRequest({
          page: "discover",
          requestId: `discover-countries-${filterKey}`,
          isContentOnly: true,
        }),
      );
    }
  }, [loading, filterKey, dispatch]);

  // Render logic
  return (
    <>
      <section className="countries px-sect flex w-full flex-col items-center gap-4 py-sect-short lg:py-20 2xl:py-40">
        <div className="overflow-hidden">
          <motion.h1
            initial="hiddenFullY"
            whileInView="visible"
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            variants={variants}
            className="h1-md-bold leading-[0.8]"
          >
            Discover countries
          </motion.h1>
        </div>

        {/* SELECT ELEMENT */}
        <motion.div
          initial="hiddenY"
          whileInView="visible"
          transition={{ duration: 0.5, delay: 0.4 }}
          variants={variants}
          viewport={{ once: true }}
          className="z-50 grid place-items-center lg:w-1/6"
        >
          {/* @ts-ignore */}
          <Select {...selectProps}>
            {continents.map((continent) => (
              <Option
                key={continent.name}
                value={continent.name}
                {...selectOptionProp}
              >
                {continent.name}
              </Option>
            ))}
          </Select>
        </motion.div>

        {/* SELECTED COMPONENT AND COUNTRY LIST */}
        <div className="z-0 w-full py-10 lg:py-10 2xl:py-sect-short">
          <AnimatePresence mode="wait">
            {loading ? (
              <LoadingState keyName={`loading-${filterKey}`} />
            ) : error ? (
              <ErrorState keyName={`error-${filterKey}`} />
            ) : !selectedContinent || selectedContinent.count === 0 ? (
              <NotFoundState keyName={`not-found-${filterKey}`} />
            ) : (
              <motion.div
                key={filterKey}
                id="continent"
                initial="hiddenY"
                whileInView="visible"
                viewport={{ once: true }}
                exit="exitX"
                transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
                variants={variants}
                className="flex w-full flex-col items-start gap-4 md:min-h-[70svh] md:gap-8 lg:flex-row lg:gap-8 2xl:gap-12"
              >
                <div className="relative flex items-center justify-center">
                  <div className="image-suspense w-full overflow-hidden rounded-xl shadow-component dark:shadow-component-dark lg:h-[70svh] lg:w-[40svw]">
                    <OptimizedImage
                      whileHover="hoverScale"
                      variants={variants}
                      transition={{
                        duration: 0.4,
                      }}
                      src={selectedContinent.image}
                      alt="map"
                      className="h-full w-full rounded-xl"
                      imageClassName="brightness-75 rounded-xl"
                    />
                  </div>

                  <h2 className="h2-logo pointer-events-none absolute m-auto select-none uppercase text-text-dark">
                    {selectedContinent.name}
                  </h2>
                </div>
                <motion.div
                  initial="hiddenY"
                  whileInView="visible"
                  variants={variants}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delayChildren: 0.5,
                    staggerChildren: 0.2,
                  }}
                  className="grid grid-cols-3 justify-between gap-2 sm:grid-cols-4 md:gap-4 lg:grid-cols-2 lg:gap-8 xl:grid-cols-3 2xl:grid-cols-3 2xl:gap-8 3xl:grid-cols-4 country-card-layer"
                  aria-label="Country list"
                >
                  {countryCards}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* RELATED SECTION */}
      <section className="related flex flex-col gap-3 overflow-hidden lg:gap-4 2xl:gap-8">
        <div className="px-sect overflow-hidden">
          <motion.h2
            initial="hiddenFullY"
            whileInView="visible"
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            variants={variants}
            className="h2-md"
          >
            Related articles
          </motion.h2>
        </div>
        {/* <AnimatePresence mode="wait">
          <motion.div
            key={selectedContinentName}
            initial="hiddenY"
            whileInView="visible"
            exit="hiddenY"
            variants={variants}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          > */}
        <RelatedSections type={"blog"} data={selectedContinentName} />
        {/* </motion.div>
        </AnimatePresence> */}
      </section>
    </>
  );
};

export default memo(DiscoverCountries);
